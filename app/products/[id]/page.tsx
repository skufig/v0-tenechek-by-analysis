import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductById, getProducts } from "@/lib/db"
import { ProductPageClient } from "./product-page-client"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const products = getProducts({ active_only: true })
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(parseInt(id))
  
  if (!product) {
    return {
      title: "Товар не найден | Тенёчек",
    }
  }

  const discount = product.old_price 
    ? Math.round((1 - product.price / product.old_price) * 100) 
    : 0

  return {
    title: `${product.name} — купить с установкой ${product.price} BYN | Тенёчек`,
    description: `${product.name} с установкой в Минске. ${product.description || ''} Цена ${product.price} BYN${discount > 0 ? ` (скидка ${discount}%)` : ''}. Гарантия ${product.warranty} лет. Доставка день в день.`,
    keywords: [
      product.name,
      product.brand,
      'кондиционер минск',
      'купить кондиционер',
      `${product.brand} кондиционер`,
      'кондиционер с установкой',
    ],
    openGraph: {
      title: `${product.name} — ${product.price} BYN с установкой`,
      description: product.description || `Кондиционер ${product.name} с установкой в Минске`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(parseInt(id))

  if (!product || !product.is_active) {
    notFound()
  }

  // Get related products (same category, excluding current)
  const allProducts = getProducts({ active_only: true })
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />
}

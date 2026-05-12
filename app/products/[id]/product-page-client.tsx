"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Phone, 
  Shield, 
  Truck, 
  CreditCard, 
  Star,
  Zap,
  Wind,
  Thermometer,
  Volume2,
  Wifi
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CallbackModal } from "@/components/callback-modal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  old_price: number | null
  image: string
  hoverImage: string | null
  description: string | null
  specs: Record<string, string> | null
  features: string[]
  areas: string[]
  energy_class: string
  warranty: number
  badge: string | null
  rating: number
  reviews: number
}

interface Props {
  product: Product
  relatedProducts: Product[]
}

const featureIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Инвертор": Zap,
  "Обогрев": Thermometer,
  "Тихий режим": Volume2,
  "19 дБ": Volume2,
  "21 дБ": Volume2,
  "22 дБ": Volume2,
  "24 дБ": Volume2,
}

const benefits = [
  { icon: Truck, title: "Доставка день в день", desc: "Бесплатно по Минску" },
  { icon: Shield, title: "Гарантия до 10 лет", desc: "Официальная гарантия" },
  { icon: CreditCard, title: "Рассрочка 0%", desc: "До 24 месяцев" },
]

export function ProductPageClient({ product, relatedProducts }: Props) {
  const [showFullKit, setShowFullKit] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  
  const discount = product.old_price 
    ? Math.round((1 - product.price / product.old_price) * 100) 
    : 0

  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-foreground transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Back button */}
          <Link 
            href="/#catalog" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад в каталог
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-4 px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full z-10 shadow-lg">
                    {product.badge}
                  </span>
                )}
                
                {discount > 0 && (
                  <span className="absolute top-4 right-4 px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-full z-10 shadow-lg">
                    -{discount}%
                  </span>
                )}

                <Image
                  src={showFullKit && product.hoverImage ? product.hoverImage : product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-opacity duration-300"
                  priority
                />

                {product.hoverImage && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    <button
                      onClick={() => setShowFullKit(false)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all shadow-md",
                        !showFullKit ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      Внутренний блок
                    </button>
                    <button
                      onClick={() => setShowFullKit(true)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all shadow-md",
                        showFullKit ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      Полный комплект
                    </button>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="text-center p-4 bg-slate-50 rounded-2xl">
                    <benefit.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-xs font-semibold">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Brand & Rating */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-sm font-bold bg-slate-100 text-slate-600 rounded-lg">{product.brand}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-lg">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.reviews} отзывов</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Description */}
              {product.description && (
                <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
              )}

              {/* Price Block */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  {product.old_price && (
                    <span className="text-xl text-muted-foreground line-through">{product.old_price} BYN</span>
                  )}
                  <span className="font-display text-4xl font-bold text-blue-600">{product.price} BYN</span>
                </div>
                <p className="text-green-600 font-medium flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Цена с установкой и доставкой
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Ключевые особенности:</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => {
                    const Icon = featureIcons[feature] || Wind
                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 text-primary rounded-xl font-medium"
                      >
                        <Icon className="h-4 w-4" />
                        {feature}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Areas & Energy */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-bold">{product.energy_class}</span>
                <span className="text-muted-foreground">Гарантия {product.warranty} лет</span>
                <span className="text-muted-foreground">Площадь: {product.areas.join(", ")}</span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-8">
                <Button 
                  size="lg"
                  className="w-full h-14 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-600/25"
                  onClick={() => setIsCallbackOpen(true)}
                >
                  Заказать с установкой
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full h-14 rounded-2xl font-semibold text-lg"
                  asChild
                >
                  <a href="tel:+375293989777">
                    <Phone className="mr-2 h-5 w-5" />
                    +375 29 398-97-77
                  </a>
                </Button>
              </div>

              {/* Specs Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="border border-border rounded-2xl overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-border">
                    <h3 className="font-semibold">Технические характеристики</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 p-4 hover:bg-slate-50 transition-colors">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Похожие модели</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                  <Link 
                    key={related.id} 
                    href={`/products/${related.id}`}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold text-muted-foreground mb-1">{related.brand}</p>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{related.name}</h3>
                      <div className="flex items-baseline gap-2">
                        {related.old_price && (
                          <span className="text-sm text-muted-foreground line-through">{related.old_price} BYN</span>
                        )}
                        <span className="text-xl font-bold text-blue-600">{related.price} BYN</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      
      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
        source="product_page"
        product={product.name}
      />
    </>
  )
}

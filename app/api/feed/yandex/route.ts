import { getProducts, type Product } from "@/lib/db"
import { NextResponse } from "next/server"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tenechek.by"
const SHOP_NAME = "Тенечек"
const COMPANY_NAME = "ИП Тенечек"

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function getCategoryId(category: string): number {
  switch (category) {
    case "premium":
      return 1
    case "optimal":
      return 2
    case "budget":
      return 3
    default:
      return 4
  }
}

function getCategoryName(category: string): string {
  switch (category) {
    case "premium":
      return "Премиум кондиционеры"
    case "optimal":
      return "Оптимальные кондиционеры"
    case "budget":
      return "Бюджетные кондиционеры"
    default:
      return "Кондиционеры"
  }
}

function generateOffer(product: Product): string {
  const categoryId = getCategoryId(product.category)
  const available = product.is_active ? "true" : "false"
  const imageUrl = product.image.startsWith("http") 
    ? product.image 
    : `${SITE_URL}${product.image}`
  
  // Extract model from specs or name
  const model = product.specs?.["Модель"] || product.name.split(" ").slice(-1)[0]
  
  // Get area from specs or areas array
  const area = product.specs?.["Площадь"] || product.areas[0] || "до 20 м²"
  
  // Check if inverter
  const isInverter = product.features.some(f => 
    f.toLowerCase().includes("инвертор") || f.toLowerCase().includes("inverter")
  )
  
  // Get noise level
  const noiseFeature = product.features.find(f => f.includes("дБ"))
  const noiseLevel = noiseFeature ? noiseFeature.replace(/[^\d]/g, "") : ""
  
  // Get power from specs
  const power = product.specs?.["Мощность охл./обогр."] || ""
  const coolingPower = power.split("/")[0]?.trim() || ""
  
  // Get freon type
  const freon = product.specs?.["Фреон"] || ""
  
  let offer = `    <offer id="${product.id}" available="${available}">
      <url>${SITE_URL}/products/${product.id}</url>
      <price>${product.price}</price>`
  
  if (product.old_price && product.old_price > product.price) {
    offer += `
      <oldprice>${product.old_price}</oldprice>`
  }
  
  offer += `
      <currencyId>BYN</currencyId>
      <categoryId>${categoryId}</categoryId>
      <picture>${escapeXml(imageUrl)}</picture>
      <name>${escapeXml(product.name)}</name>
      <vendor>${escapeXml(product.brand)}</vendor>
      <model>${escapeXml(model)}</model>
      <description>${escapeXml(product.description || `Кондиционер ${product.name} для помещений ${area}`)}</description>
      <sales_notes>Бесплатная доставка по Минску. Установка от 150 BYN.</sales_notes>
      <manufacturer_warranty>true</manufacturer_warranty>
      <country_of_origin>Китай</country_of_origin>`
  
  // Add params
  offer += `
      <param name="Бренд">${escapeXml(product.brand)}</param>
      <param name="Площадь помещения">${escapeXml(area)}</param>
      <param name="Класс энергоэффективности">${escapeXml(product.energy_class)}</param>
      <param name="Гарантия" unit="лет">${product.warranty}</param>
      <param name="Тип компрессора">${isInverter ? "Инверторный" : "Обычный"}</param>`
  
  if (noiseLevel) {
    offer += `
      <param name="Уровень шума" unit="дБ">${noiseLevel}</param>`
  }
  
  if (coolingPower) {
    offer += `
      <param name="Мощность охлаждения">${escapeXml(coolingPower)}</param>`
  }
  
  if (freon) {
    offer += `
      <param name="Хладагент">${escapeXml(freon)}</param>`
  }
  
  // Add features as params
  for (const feature of product.features.slice(0, 5)) {
    if (!feature.includes("дБ")) {
      offer += `
      <param name="Особенность">${escapeXml(feature)}</param>`
    }
  }
  
  offer += `
    </offer>`
  
  return offer
}

export async function GET() {
  const products = getProducts({ active_only: true })
  const now = new Date().toISOString().replace(/\.\d{3}Z$/, "+03:00")
  
  // Collect unique categories
  const categories = [...new Set(products.map(p => p.category))]
  
  let yml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${now}">
  <shop>
    <name>${escapeXml(SHOP_NAME)}</name>
    <company>${escapeXml(COMPANY_NAME)}</company>
    <url>${SITE_URL}</url>
    <currencies>
      <currency id="BYN" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Премиум кондиционеры</category>
      <category id="2">Оптимальные кондиционеры</category>
      <category id="3">Бюджетные кондиционеры</category>
    </categories>
    <delivery-options>
      <option cost="0" days="1-2" order-before="18"/>
    </delivery-options>
    <offers>
`

  for (const product of products) {
    yml += generateOffer(product) + "\n"
  }

  yml += `    </offers>
  </shop>
</yml_catalog>`

  return new NextResponse(yml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

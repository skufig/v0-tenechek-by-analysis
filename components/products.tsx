"use client"

import { motion } from "framer-motion"
import { ArrowRight, Wifi, Wind, Thermometer, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Gree G-Tech",
    category: "Инверторный",
    price: 1250,
    oldPrice: 1490,
    image: "/products/gree.jpg",
    features: ["Wi-Fi", "Инвертор", "Обогрев"],
    area: "до 25 м²",
    power: "9 BTU",
    badge: "Хит продаж",
  },
  {
    id: 2,
    name: "LG Dual Inverter",
    category: "Премиум",
    price: 2100,
    oldPrice: 2450,
    image: "/products/lg.jpg",
    features: ["Wi-Fi", "Инвертор", "Тихий"],
    area: "до 35 м²",
    power: "12 BTU",
    badge: null,
  },
  {
    id: 3,
    name: "Haier Flexis",
    category: "Оптимальный",
    price: 1650,
    oldPrice: null,
    image: "/products/haier.jpg",
    features: ["Wi-Fi", "Инвертор", "Обогрев"],
    area: "до 30 м²",
    power: "12 BTU",
    badge: "Новинка",
  },
]

const featureIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Инвертор": Thermometer,
  "Обогрев": Wind,
  "Тихий": Volume2,
}

export function Products() {
  return (
    <section id="catalog" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Популярные модели
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Цены указаны с установкой. Доставка по Минску бесплатно.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-background">
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{product.price} BYN</div>
                    {product.oldPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {product.oldPrice} BYN
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{product.area}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{product.power}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.features.map((feature) => {
                    const Icon = featureIcons[feature] || Wifi
                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-muted rounded-full"
                      >
                        <Icon className="h-3 w-3" />
                        {feature}
                      </span>
                    )
                  })}
                </div>

                <Button className="w-full mt-6" variant="outline">
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button size="lg" variant="outline" className="h-12 px-8">
            Смотреть весь каталог
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Wifi, Zap, Wind, Volume2, Snowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

const categories = ["Все", "Премиум", "Оптимальные", "Бюджет"]

const products = [
  {
    id: 1,
    name: "LG EVO MAX",
    category: "Премиум",
    price: 2803,
    image: "https://static.tildacdn.com/tild3535-3530-4436-b739-343663333263/LG_EVO_MAX_DC09RH_NS.png",
    features: ["Wi-Fi", "Инвертор", "19 дБ", "Обогрев"],
    areas: ["20 м²", "25 м²", "35 м²", "50 м²", "70 м²"],
    energyClass: "A++",
    warranty: 10,
    badge: "Хит продаж",
  },
  {
    id: 2,
    name: "Haier Flexis",
    category: "Премиум",
    price: 3340,
    image: "https://static.tildacdn.com/tild3434-3865-4636-b662-623134303532/Haier_FLEXIS_AS25HPL.png",
    features: ["Wi-Fi", "Инвертор", "UV лампа", "A+++"],
    areas: ["25 м²", "35 м²"],
    energyClass: "A+++",
    warranty: 5,
    badge: null,
  },
  {
    id: 3,
    name: "Haier Jade",
    category: "Премиум",
    price: 5340,
    image: "https://static.tildacdn.com/tild3762-3461-4665-b363-343836616564/AS25JBJHRA-W_-AS25J.png",
    features: ["Wi-Fi", "Инвертор", "15 дБ", "Ecosensor"],
    areas: ["25 м²", "35 м²", "50 м²"],
    energyClass: "A+++",
    warranty: 5,
    badge: "Супертихий",
  },
  {
    id: 4,
    name: "Gree G-Tech",
    category: "Оптимальные",
    price: 1550,
    image: "https://static.tildacdn.com/tild3364-6637-4339-b735-653237393635/Gree_G-Tech_Inverter.png",
    features: ["Wi-Fi", "Инвертор", "Обогрев"],
    areas: ["20 м²", "25 м²", "35 м²"],
    energyClass: "A++",
    warranty: 5,
    badge: "Выбор покупателей",
  },
  {
    id: 5,
    name: "Eurohoff EVA",
    category: "Бюджет",
    price: 890,
    image: "https://static.tildacdn.com/tild6633-6366-4131-a264-363235393835/Eurohoff_EVA_Inverte.png",
    features: ["Инвертор", "Обогрев", "Тихий"],
    areas: ["20 м²", "25 м²"],
    energyClass: "A+",
    warranty: 3,
    badge: "Лучшая цена",
  },
  {
    id: 6,
    name: "Dahatsu Comfort",
    category: "Бюджет",
    price: 750,
    image: "https://static.tildacdn.com/tild3637-3935-4638-a661-393030626537/Dahatsu_DA-09H_Comfo.png",
    features: ["Обогрев", "Осушение", "Таймер"],
    areas: ["20 м²", "25 м²"],
    energyClass: "A",
    warranty: 3,
    badge: null,
  },
]

const featureIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Инвертор": Zap,
  "Обогрев": Wind,
  "Тихий": Volume2,
  "15 дБ": Volume2,
  "19 дБ": Volume2,
}

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  const filteredProducts = activeCategory === "Все" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="catalog" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Каталог кондиционеров
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Более 100 моделей. Цены указаны с установкой.
            </p>
          </div>
          
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500",
                "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5",
                selectedProduct === product.id && "ring-2 ring-primary"
              )}
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-background p-6">
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                
                <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold bg-secondary text-foreground rounded-full z-10">
                  {product.energyClass}
                </span>
                
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-primary font-medium">{product.category}</p>
                    <h3 className="font-display text-xl font-bold mt-1">{product.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold">от {product.price}</div>
                    <div className="text-sm text-muted-foreground">BYN</div>
                  </div>
                </div>

                {/* Areas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.areas.slice(0, 4).map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 text-xs bg-secondary rounded-lg"
                    >
                      {area}
                    </span>
                  ))}
                  {product.areas.length > 4 && (
                    <span className="px-3 py-1 text-xs bg-secondary rounded-lg">
                      +{product.areas.length - 4}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => {
                    const Icon = featureIcons[feature] || Snowflake
                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-lg"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {feature}
                      </span>
                    )
                  })}
                </div>

                {/* Warranty */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <span>Гарантия {product.warranty} лет</span>
                  <span>В наличии</span>
                </div>

                <Button 
                  className="w-full h-12 rounded-xl font-semibold"
                  onClick={() => setSelectedProduct(product.id)}
                >
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
          <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl font-semibold border-border/50">
            Смотреть все 100+ моделей
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

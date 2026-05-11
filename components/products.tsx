"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Wifi, Wind, Volume2, Sparkles, Shield, Star, 
  ArrowRight, Check, ChevronLeft, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Eurohoff EVA",
    brand: "Eurohoff",
    category: "budget",
    price: 750,
    oldPrice: 890,
    image: "💨",
    rating: 4.5,
    reviews: 124,
    area: "до 25 м²",
    features: ["Инверторный", "A++ класс"],
    warranty: 3,
    popular: false,
  },
  {
    id: 2,
    name: "Gree G-Tech",
    brand: "Gree",
    category: "optimal",
    price: 1200,
    oldPrice: 1450,
    image: "❄️",
    rating: 4.8,
    reviews: 256,
    area: "до 35 м²",
    features: ["Инверторный", "Wi-Fi", "Обогрев"],
    warranty: 5,
    popular: true,
  },
  {
    id: 3,
    name: "Dahatsu Comfort",
    brand: "Dahatsu",
    category: "budget",
    price: 890,
    oldPrice: 1050,
    image: "🌬️",
    rating: 4.6,
    reviews: 89,
    area: "до 30 м²",
    features: ["Инверторный", "Тихий режим"],
    warranty: 3,
    popular: false,
  },
  {
    id: 4,
    name: "LG EVO MAX",
    brand: "LG",
    category: "premium",
    price: 2803,
    oldPrice: 3200,
    image: "✨",
    rating: 4.9,
    reviews: 312,
    area: "до 50 м²",
    features: ["Инверторный", "Wi-Fi", "19 дБ", "Автоочистка", "A++"],
    warranty: 10,
    popular: true,
  },
  {
    id: 5,
    name: "Haier Flexis",
    brand: "Haier",
    category: "premium",
    price: 3340,
    oldPrice: 3800,
    image: "🌟",
    rating: 4.9,
    reviews: 178,
    area: "до 35 м²",
    features: ["A+++ класс", "UV лампа", "Wi-Fi", "Комфортный сон"],
    warranty: 5,
    popular: false,
  },
  {
    id: 6,
    name: "Haier Jade",
    brand: "Haier",
    category: "premium",
    price: 5340,
    oldPrice: 5900,
    image: "💎",
    rating: 5.0,
    reviews: 67,
    area: "до 50 м²",
    features: ["15 дБ", "Ecosensor", "Wi-Fi", "Автоочистка"],
    warranty: 5,
    popular: false,
  },
]

const categories = [
  { id: "all", label: "Все модели" },
  { id: "budget", label: "Бюджетные" },
  { id: "optimal", label: "Оптимальные" },
  { id: "premium", label: "Премиум" },
]

export function Products() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const visibleProducts = filteredProducts.slice(currentIndex, currentIndex + 3)

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex + 3 < filteredProducts.length

  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Каталог
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight">
              Популярные модели
            </h2>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setCurrentIndex(0)
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden lg:block">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={!canScrollLeft}
              className={cn(
                "absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all",
                canScrollLeft ? "hover:border-primary hover:shadow-xl" : "opacity-30 cursor-not-allowed"
              )}
              aria-label="Предыдущие товары"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(filteredProducts.length - 3, currentIndex + 1))}
              disabled={!canScrollRight}
              className={cn(
                "absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all",
                canScrollRight ? "hover:border-primary hover:shadow-xl" : "opacity-30 cursor-not-allowed"
              )}
              aria-label="Следующие товары"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-card rounded-3xl border border-border/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {product.popular && (
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Хит продаж
                      </span>
                    )}
                    {product.oldPrice > product.price && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium ml-auto">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="h-40 flex items-center justify-center mb-6 mt-8">
                    <div className="text-7xl transform transition-transform duration-500 group-hover:scale-110">
                      {product.image}
                    </div>
                  </div>

                  {/* Brand & Name */}
                  <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} отзывов)</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Area & Warranty */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Wind className="h-4 w-4" />
                      {product.area}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      {product.warranty} лет
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif font-bold">{product.price} BYN</span>
                        {product.oldPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice} BYN
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        от {Math.round(product.price / 8)} BYN/мес в рассрочку
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button variant="outline" size="lg" className="h-12 px-8">
            Смотреть все модели
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

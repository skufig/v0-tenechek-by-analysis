"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Wifi, Zap, Volume2, Thermometer, Wind, X, Check, Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CallbackModal } from "./callback-modal"

const categories = [
  { id: "all", label: "Все модели" },
  { id: "premium", label: "Премиум" },
  { id: "optimal", label: "Оптимальные" },
  { id: "budget", label: "Бюджет" },
]

interface Product {
  id: number
  name: string
  category: string
  price: number
  old_price: number | null
  image: string
  features: string[]
  areas: string[]
  energy_class: string
  warranty: number
  badge: string | null
  rating: number
  reviews: number
  is_active: boolean
  sort_order: number
}

const featureIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Инвертор": Zap,
  "Обогрев": Thermometer,
  "Тихий режим": Volume2,
  "15 дБ": Volume2,
  "19 дБ": Volume2,
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory)
  
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6)

  return (
    <section id="catalog" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 pattern" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        
        {!loading && (
          <>
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-primary font-semibold mb-2">Каталог</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Популярные модели
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Более 100 моделей в наличии. Все цены указаны с установкой и гарантией.
            </p>
          </div>
          
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500"
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/30 to-background p-6">
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  
                  <div className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full z-10">
                    {product.energy_class}
                  </div>
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-700 rounded">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">{product.reviews} отзывов</span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Гарантия {product.warranty} лет</p>
                    </div>
                    <div className="text-right shrink-0">
                      {product.old_price && (
                        <div className="text-sm text-muted-foreground line-through">{product.old_price} BYN</div>
                      )}
                      <div className="font-display text-2xl font-bold">{product.price}</div>
                      <div className="text-xs text-primary font-medium">BYN</div>
                    </div>
                  </div>

                  {/* Areas */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.areas.slice(0, 4).map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 text-xs bg-secondary rounded-lg font-medium"
                      >
                        {area}
                      </span>
                    ))}
                    {product.areas.length > 4 && (
                      <span className="px-2.5 py-1 text-xs bg-secondary rounded-lg font-medium">
                        +{product.areas.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.slice(0, 3).map((feature) => {
                      const Icon = featureIcons[feature] || Wind
                      return (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-primary/10 text-primary rounded-lg font-medium"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {feature}
                        </span>
                      )
                    })}
                  </div>

                  <Button 
                    className="w-full h-12 rounded-xl font-semibold group/btn"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && filteredProducts.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-10 rounded-xl font-semibold border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              onClick={() => setShowAll(true)}
            >
              Смотреть все 100+ моделей
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
        
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-10 rounded-xl font-semibold border-border"
              onClick={() => setShowAll(false)}
            >
              Свернуть каталог
            </Button>
          </motion.div>
        )}
          </>
        )}
      </div>
      
      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onOrder={() => {
              setSelectedProduct(null)
              setIsCallbackOpen(true)
            }}
          />
        )}
      </AnimatePresence>
      
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </section>
  )
}

function ProductModal({ product, onClose, onOrder }: { product: Product, onClose: () => void, onOrder: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-card rounded-3xl overflow-hidden shadow-2xl border border-border"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-secondary/50 to-background p-8">
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                {product.badge}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-sm font-bold bg-amber-100 text-amber-700 rounded">{product.rating}</span>
              <span className="text-muted-foreground text-sm">{product.reviews} отзывов</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold mb-2">{product.name}</h3>
            
            <div className="flex items-baseline gap-3 mb-6">
              {product.old_price && (
                <span className="text-lg text-muted-foreground line-through">{product.old_price} BYN</span>
              )}
              <span className="font-display text-3xl font-bold">{product.price} BYN</span>
            </div>
            
            {/* Features */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold">Характеристики:</p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span key={feature} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg">
                    <Check className="h-4 w-4" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Areas */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold">Площадь помещения:</p>
              <div className="flex flex-wrap gap-2">
                {product.areas.map((area) => (
                  <span key={area} className="px-3 py-1.5 text-sm bg-secondary rounded-lg font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
              <span className="px-3 py-1 bg-secondary rounded-lg">{product.energy_class}</span>
              <span>Гарантия {product.warranty} лет</span>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full h-12 rounded-xl font-semibold glow" onClick={onOrder}>
                Заказать
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-xl font-semibold" asChild>
                <a href="tel:+375293989777">
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

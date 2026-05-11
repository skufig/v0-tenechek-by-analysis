"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Truck, BadgePercent } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Shield, label: "Гарантия 10 лет" },
  { icon: Truck, label: "Доставка день в день" },
  { icon: BadgePercent, label: "Рассрочка 0%" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Акция марта — скидки до 500 BYN
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold tracking-tight text-balance leading-[1.1]">
              <span className="block">Кондиционеры</span>
              <span className="block mt-2">с установкой</span>
              <span className="block mt-2 gradient-text">по всей Беларуси</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg text-pretty leading-relaxed">
              Прямые поставки от производителей Gree, LG, Haier. Профессиональный монтаж с гарантией качества.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50 shadow-sm"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 h-14 px-8 text-base"
              >
                Подобрать кондиционер
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base border-2"
              >
                Заказать выезд мастера
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: "1500+", label: "Установок" },
                { value: "100+", label: "Моделей" },
                { value: "от 750", label: "BYN" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-serif font-semibold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-border/30" />
              <div className="absolute inset-8 rounded-full border border-border/30" />
              <div className="absolute inset-16 rounded-full border border-primary/20" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  {/* AC Unit illustration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary rounded-3xl shadow-2xl border border-border/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-16 sm:w-56 sm:h-20 mx-auto rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center mb-4">
                        <div className="flex gap-1">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-1 h-8 sm:h-10 bg-primary/40 rounded-full" />
                          ))}
                        </div>
                      </div>
                      <div className="w-32 h-2 mx-auto bg-border rounded-full mb-3" />
                      <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-border" />
                        <div className="w-2 h-2 rounded-full bg-border" />
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border/50"
                  >
                    <div className="text-2xl font-serif font-bold text-primary">-40%</div>
                    <div className="text-xs text-muted-foreground">на монтаж</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border/50"
                  >
                    <div className="text-sm font-medium">от 95 BYN/мес</div>
                    <div className="text-xs text-muted-foreground">в рассрочку</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

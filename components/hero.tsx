"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
              Скидки до 40% на установку
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              Кондиционеры
              <br />
              <span className="text-primary">с установкой</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              Прямые поставки Gree, LG, Haier. Монтаж за 2 часа. 
              Гарантия 3 года. Рассрочка 0%.
            </motion.p>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex items-baseline gap-3"
            >
              <span className="text-4xl font-bold">от 750 BYN</span>
              <span className="text-muted-foreground">с установкой</span>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Button 
                size="lg" 
                className="h-12 px-6 text-base"
              >
                Подобрать модель
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-6 text-base"
                asChild
              >
                <a href="tel:+375293989777">
                  <Phone className="mr-2 h-4 w-4" />
                  +375 29 398-97-77
                </a>
              </Button>
            </motion.div>

            {/* Trust */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-border"
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium">4.9</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1500+</span> установок
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">100+</span> моделей
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />
              <Image
                src="/ac-hero.jpg"
                alt="Современный кондиционер"
                fill
                className="object-contain relative z-10"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

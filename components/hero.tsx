"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Shield, Truck, CreditCard, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary">Акция до 28 февраля</span>
              <span className="text-muted-foreground">— скидки до 500 BYN</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Кондиционеры
              <br />
              <span className="gradient-text">с установкой</span>
              <br />
              по всей Беларуси
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              Прямые поставки Gree, LG, Haier, Dahatsu. Профессиональный монтаж. 
              Гарантия до 10 лет. Рассрочка от 95 BYN/мес.
            </motion.p>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-baseline gap-4"
            >
              <span className="font-display text-5xl font-bold">от 750</span>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">BYN</span>
                <span className="text-sm text-muted-foreground">с установкой</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-semibold rounded-xl glow"
                onClick={() => setIsModalOpen(true)}
              >
                Подобрать кондиционер
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base font-semibold rounded-xl border-border/50 hover:bg-secondary"
                asChild
              >
                <a href="tel:+375293989777">
                  <Phone className="mr-2 h-5 w-5" />
                  +375 29 398-97-77
                </a>
              </Button>
            </motion.div>

            {/* Features strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border/50"
            >
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Гарантия <span className="text-foreground font-medium">до 10 лет</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Доставка <span className="text-foreground font-medium">день в день</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Рассрочка <span className="text-foreground font-medium">0%</span></span>
              </div>
            </motion.div>
          </div>

          {/* Image + Video preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
              
              {/* Main image - LG EVO MAX from their site */}
              <div className="relative rounded-3xl overflow-hidden glass glow">
                <Image
                  src="https://static.tildacdn.com/tild3535-3530-4436-b739-343663333263/LG_EVO_MAX_DC09RH_NS.png"
                  alt="LG EVO MAX - Премиум кондиционер"
                  width={600}
                  height={600}
                  className="object-contain p-8"
                  priority
                />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  Хит продаж
                </div>
                
                {/* Play button for video */}
                <button 
                  className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 transition-colors group"
                  aria-label="Смотреть видео"
                >
                  <Play className="h-6 w-6 text-foreground group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-4 bottom-20 hidden lg:block"
              >
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="font-display text-lg font-bold text-primary">A++</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Класс энергоэффективности</p>
                      <p className="text-xs text-muted-foreground">Экономия до 60%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-4 top-20 hidden lg:block"
              >
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-primary">1500+</p>
                    <p className="text-xs text-muted-foreground">установок в 2025</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modal for consultation */}
      {isModalOpen && (
        <ConsultationModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  )
}

function ConsultationModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9 && name.length >= 2) {
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md glass rounded-3xl p-8 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80"
        >
          <span className="sr-only">Закрыть</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foreground">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold">Заявка отправлена!</h3>
            <p className="text-muted-foreground mt-2">Перезвоним в течение 5 минут</p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold mb-2">Подобрать кондиционер</h3>
            <p className="text-muted-foreground mb-6">Оставьте контакты — поможем выбрать и закрепим скидку до 500 BYN</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+375 (29) 123-45-67"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold rounded-xl">
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с политикой обработки данных
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}

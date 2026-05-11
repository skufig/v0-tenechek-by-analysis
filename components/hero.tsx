"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Shield, Truck, CreditCard, Sparkles, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 noise" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] translate-y-1/3" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary">Скидки до 500 BYN</span>
              <span className="text-muted-foreground">до конца месяца</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-balance">Кондиционеры</span>
              <br />
              <span className="gradient-text">с установкой</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md"
            >
              Прямые поставки LG, Haier, Gree. Монтаж за 2-3 часа в любом городе Беларуси.
            </motion.p>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-end gap-3"
            >
              <span className="font-display text-6xl sm:text-7xl font-bold tracking-tight">750</span>
              <div className="flex flex-col mb-2">
                <span className="text-2xl font-semibold text-primary">BYN</span>
                <span className="text-sm text-muted-foreground">с установкой</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-semibold rounded-2xl glow group"
                onClick={() => setIsModalOpen(true)}
              >
                Подобрать кондиционер
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base font-semibold rounded-2xl border-border hover:bg-secondary"
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
              className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { icon: Shield, label: "Гарантия", value: "до 10 лет" },
                { icon: Truck, label: "Доставка", value: "день в день" },
                { icon: CreditCard, label: "Рассрочка", value: "0%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border border-border/30 scale-110" />
              <div className="absolute inset-0 rounded-full border border-border/20 scale-125" />
              
              {/* Glow */}
              <div className="absolute inset-8 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl" />
              
              {/* Main product card */}
              <div className="relative glass rounded-3xl p-6 glow-soft overflow-hidden">
                {/* Product image */}
                <div className="relative aspect-square">
                  <Image
                    src="https://static.tildacdn.com/tild3535-3530-4436-b739-343663333263/LG_EVO_MAX_DC09RH_NS.png"
                    alt="LG EVO MAX - Премиум кондиционер"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Хит 2025
                </div>
                
                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card/90 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-primary font-medium mb-1">LG EVO MAX</p>
                      <p className="text-sm text-muted-foreground">Премиум инвертор, Wi-Fi</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground line-through">3 200 BYN</p>
                      <p className="font-display text-xl font-bold">2 803 BYN</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -left-4 top-1/3 hidden lg:block"
              >
                <div className="glass rounded-2xl p-4 shadow-xl glow-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-primary-foreground">A++</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Класс A++</p>
                      <p className="text-xs text-muted-foreground">Экономия 60%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -right-4 bottom-1/3 hidden lg:block"
              >
                <div className="glass rounded-2xl p-4 shadow-xl glow-soft">
                  <p className="font-display text-2xl font-bold text-primary">1500+</p>
                  <p className="text-xs text-muted-foreground">установок в 2025</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">Листайте</span>
        <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
      
      {/* Modal */}
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
      setTimeout(() => onClose(), 2500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md glass rounded-3xl p-8 shadow-2xl glow-soft"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold">Заявка отправлена!</h3>
            <p className="text-muted-foreground mt-2">Перезвоним в течение 5 минут</p>
          </motion.div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold mb-2">Подбор кондиционера</h3>
            <p className="text-muted-foreground mb-6">Оставьте контакты — поможем выбрать оптимальную модель и закрепим скидку</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  className="w-full h-14 px-5 rounded-2xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                  className="w-full h-14 px-5 rounded-2xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold rounded-2xl glow">
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

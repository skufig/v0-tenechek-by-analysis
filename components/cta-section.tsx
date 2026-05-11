"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Send, CheckCircle2, Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function CTASection() {
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Gift className="h-4 w-4" />
              Специальное предложение
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance leading-tight">
              Получите скидку до 500 BYN на кондиционер
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Оставьте номер телефона — перезвоним за 15 минут, поможем подобрать идеальную модель и закрепим скидку за вашим номером.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {[
                { icon: Clock, text: "Перезвоним за 15 минут" },
                { icon: Gift, text: "Скидка до 500 BYN" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-xl">
              {!isSubmitted ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    Получить консультацию
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Оставьте номер — мы перезвоним и ответим на все вопросы
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="tel"
                        placeholder="+375 (__) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-14 text-lg px-4"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Отправка...
                        </span>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Перезвоните мне
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="#" className="underline hover:text-primary">
                        политикой обработки данных
                      </a>
                    </p>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Или свяжитесь с нами напрямую
                    </p>
                    <div className="flex justify-center gap-4">
                      <a
                        href="tel:+375293989777"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm font-medium">Позвонить</span>
                      </a>
                      <a
                        href="https://wa.me/375293989777"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Заявка отправлена!</h3>
                  <p className="text-muted-foreground mb-6">
                    Мы перезвоним вам в течение 15 минут
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false)
                      setPhone("")
                    }}
                  >
                    Отправить ещё заявку
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

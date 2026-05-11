"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Send, CheckCircle, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9) {
      setSubmitted(true)
    }
  }

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Получите бесплатную консультацию
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Оставьте номер — перезвоним за 5 минут, поможем выбрать кондиционер и закрепим скидку до 500 BYN
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-12"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 px-6 rounded-3xl glass">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold">Заявка отправлена!</p>
                <p className="text-muted-foreground text-center">
                  Перезвоним в течение 5 минут в рабочее время
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass">
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Александр"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 px-5 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+375 (29) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-14 px-5 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base font-semibold rounded-xl"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Получить консультацию
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <span className="text-sm text-muted-foreground">Или свяжитесь напрямую:</span>
            <div className="flex items-center gap-4">
              <a 
                href="tel:+375293989777" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">+375 29 398-97-77</span>
              </a>
              <a 
                href="https://wa.me/375293989777"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

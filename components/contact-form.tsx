"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Send, CheckCircle, Mail, MapPin, Clock } from "lucide-react"
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/3" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0 pattern" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold mb-2">Контакты</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Получите консультацию
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Оставьте номер — перезвоним за 5 минут, поможем выбрать и закрепим скидку до 500 BYN
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 px-6 rounded-3xl bg-card border border-border shadow-lg">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <p className="font-display text-2xl font-bold">Заявка отправлена!</p>
                  <p className="text-muted-foreground text-center">
                    Перезвоним в течение 5 минут в рабочее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border border-border shadow-lg">
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Александр"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-14 px-5 rounded-2xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+375 (29) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-14 px-5 rounded-2xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 mt-6 text-base font-semibold rounded-2xl glow"
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
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick contacts */}
            <div className="grid gap-4">
              <a 
                href="tel:+375293989777" 
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="font-display text-xl font-bold">+375 29 398-97-77</p>
                </div>
              </a>
              
              <a 
                href="mailto:vtenechke@gmail.com" 
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-display text-lg font-bold">vtenechke@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="font-semibold">г. Минск, ул. Ивановская, 43А</p>
                  <p className="text-sm text-muted-foreground">каб. 101</p>
                </div>
              </div>
            </div>
            
            {/* Working hours */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Время работы</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Пн-Пт</span>
                <span className="font-display text-xl font-bold text-primary">09:00 - 18:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

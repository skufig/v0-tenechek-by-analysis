"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Send, CheckCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactForm() {
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9) {
      setSubmitted(true)
    }
  }

  return (
    <section id="contacts" className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Получите бесплатную консультацию
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Оставьте номер — перезвоним за 5 минут и поможем выбрать кондиционер
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <p className="text-xl font-medium">Заявка отправлена</p>
                <p className="text-primary-foreground/80">Перезвоним в течение 5 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+375 (__) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-12 bg-primary-foreground text-foreground border-0"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Отправить
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          >
            <a href="tel:+375293989777" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              +375 29 398-97-77
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

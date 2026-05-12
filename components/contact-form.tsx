"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Send, CheckCircle, Mail, MapPin, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitLead } from "@/lib/utm"
import { reachGoal, GOALS } from "./analytics"
import { PhoneLink } from "./phone-link"

export function ContactForm() {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 9) return
    
    setLoading(true)
    setError("")
    
    const result = await submitLead({
      name: name || "Не указано",
      phone,
      source: "contact-form",
    })
    
    setLoading(false)
    
    if (result.success) {
      setSubmitted(true)
      reachGoal(GOALS.FORM_SUCCESS)
    } else {
      setError(result.error || "Ошибка отправки")
    }
  }

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/3" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0 pattern" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Контакты</p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Получите консультацию
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-muted-foreground">
              Оставьте номер — перезвоним за 5 минут, поможем выбрать и закрепим скидку до 500 BYN
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 sm:mt-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-4 sm:gap-5 py-10 sm:py-14 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-lg">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xl sm:text-2xl font-bold text-slate-900">Заявка отправлена!</p>
                    <p className="text-muted-foreground text-center text-sm sm:text-base mt-2 max-w-xs mx-auto">
                      Перезвоним в течение 5 минут в рабочее время
                    </p>
                  </div>
                  <div className="mt-1 p-3 sm:p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-700 font-medium text-center">
                    Пн-Пт, 9:00-18:00 | Сб, 10:00-15:00
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-xl">
                  {/* Form header */}
                  <div className="flex items-center gap-3 mb-5 sm:mb-6 p-3 sm:p-4 -mx-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                      <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">Бесплатная консультация</div>
                      <div className="text-xs sm:text-sm text-slate-600">Перезвоним за 5 минут</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 block">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Александр"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-base placeholder:text-slate-400"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 block">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+375 (29) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-base placeholder:text-slate-400"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-500 text-center mt-3 sm:mt-4">{error}</p>}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-13 sm:h-14 mt-5 sm:mt-6 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Получить консультацию
                        <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-3 sm:mt-4">
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
            className="space-y-3 sm:space-y-6"
          >
            {/* Quick contacts */}
            <div className="grid gap-2 sm:gap-4">
              <PhoneLink className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group active:scale-[0.99]">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Телефон</p>
                  <p className="font-display text-base sm:text-xl font-bold truncate">+375 29 398-97-77</p>
                </div>
              </PhoneLink>
              
              <a 
                href="mailto:vtenechke@gmail.com" 
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group active:scale-[0.99]"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <p className="font-display text-sm sm:text-lg font-bold truncate">vtenechke@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Адрес</p>
                  <p className="font-semibold text-sm sm:text-base">г. Минск, ул. Ивановская, 43А</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">каб. 101</p>
                </div>
              </div>
            </div>
            
            {/* Working hours */}
            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Время работы</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm sm:text-base">Пн-Пт</span>
                <span className="font-display text-base sm:text-xl font-bold text-primary">09:00 - 18:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

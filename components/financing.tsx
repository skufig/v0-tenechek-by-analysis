"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "./callback-modal"

const financingOptions = [
  {
    name: "Халва",
    bank: "МТБанк",
    terms: ["0% переплата", "MIX 2 мес / MAX 4 мес", "Без взноса"],
    color: "from-red-500 to-orange-500",
    textColor: "text-red-600",
  },
  {
    name: "Черепаха",
    bank: "ВТБ Банк",
    terms: ["0% переплата", "до 8 месяцев", "Без справок о доходах"],
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-600",
  },
  {
    name: "Карта покупок",
    bank: "Белгазпромбанк",
    terms: ["0% переплата", "2 месяца", "Без справок о доходах"],
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
  },
  {
    name: "Кредит",
    bank: "Альфа-банк",
    terms: ["18,5% годовых", "до 24 месяцев", "Оформление онлайн"],
    color: "from-red-500 to-pink-500",
    textColor: "text-red-600",
  },
]

export function Financing() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  
  return (
    <section id="financing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-medium mb-1 sm:mb-2 text-sm sm:text-base">Рассрочка</p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Без переплат
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-muted-foreground">
              Оформим рассрочку на месте за 5 минут. Без справок о доходах и первоначального взноса.
            </p>
            
            {/* Internal financing highlight */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-xl font-bold">Внутренняя рассрочка</h3>
                  <p className="text-muted-foreground mt-1 sm:mt-2 leading-relaxed text-xs sm:text-base">
                    Заключим договор напрямую без банка. 50% сейчас, 50% через месяц после установки. Без процентов.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {["Без банка", "0% переплата", "Любая сумма"].map((term) => (
                      <span key={term} className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-primary/10 text-primary rounded-full font-medium">
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 sm:mt-8"
            >
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold glow text-sm sm:text-base w-full sm:w-auto"
                onClick={() => setIsCallbackOpen(true)}
              >
                Оформить рассрочку
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
            {financingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-3 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className={`w-full h-1 sm:h-1.5 md:h-2 mb-3 sm:mb-4 md:mb-6 rounded-full bg-gradient-to-r ${option.color}`} />
                <h3 className={`font-display text-sm xs:text-base sm:text-lg md:text-xl font-bold ${option.textColor}`}>{option.name}</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 md:mb-4">{option.bank}</p>
                <ul className="space-y-1 sm:space-y-2">
                  {option.terms.map((term) => (
                    <li key={term} className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-tight">{term}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </section>
  )
}

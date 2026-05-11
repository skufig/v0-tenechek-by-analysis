"use client"

import { motion } from "framer-motion"
import { CreditCard, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const financingOptions = [
  {
    name: "Халва",
    bank: "МТБанк",
    terms: ["0% переплата", "2-4 месяца", "Без взноса"],
    color: "from-red-500 to-orange-500",
    textColor: "text-red-400",
  },
  {
    name: "Черепаха",
    bank: "ВТБ Банк",
    terms: ["0% переплата", "до 8 месяцев", "Без справок"],
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-400",
  },
  {
    name: "Карта покупок",
    bank: "Белгазпромбанк",
    terms: ["0% переплата", "2 месяца", "Мгновенно"],
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-400",
  },
  {
    name: "Кредит",
    bank: "Альфа-банк",
    terms: ["от 18.5%", "до 24 мес", "Онлайн"],
    color: "from-red-500 to-pink-500",
    textColor: "text-red-400",
  },
]

export function Financing() {
  return (
    <section id="financing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-medium mb-2">Рассрочка</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Без переплат
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Оформим рассрочку на месте за 5 минут. Без справок о доходах и первоначального взноса.
            </p>
            
            {/* Internal financing highlight */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <CreditCard className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Внутренняя рассрочка</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    Заключим договор напрямую без банка. 50% сейчас, 50% через месяц после установки. Без процентов.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Без банка", "0% переплата", "Любая сумма"].map((term) => (
                      <span key={term} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium">
                        <Check className="h-4 w-4" />
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
              className="mt-8"
            >
              <Button size="lg" className="h-14 px-8 rounded-2xl font-semibold glow">
                Оформить рассрочку
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {financingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-300 group"
              >
                <div className={`w-full h-2 mb-6 rounded-full bg-gradient-to-r ${option.color}`} />
                <h3 className={`font-display text-xl font-bold ${option.textColor}`}>{option.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.bank}</p>
                <ul className="space-y-2">
                  {option.terms.map((term) => (
                    <li key={term} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {term}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

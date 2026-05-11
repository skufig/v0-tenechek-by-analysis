"use client"

import { motion } from "framer-motion"
import { CreditCard, Check } from "lucide-react"
import Image from "next/image"

const financingOptions = [
  {
    name: "Халва",
    bank: "МТБанк",
    logo: "https://static.tildacdn.com/tild3039-6565-4830-b032-633533393836/halva.svg",
    terms: ["0% переплата", "2-4 месяца", "Без взноса"],
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Черепаха",
    bank: "ВТБ Банк",
    logo: "https://static.tildacdn.com/tild3663-6133-4638-a165-303934366433/cherepaha.svg",
    terms: ["0% переплата", "8 месяцев", "Без справок"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Карта покупок",
    bank: "Белгазпромбанк",
    logo: "https://static.tildacdn.com/tild3335-3365-4263-b235-383639613764/karta-pokupok.svg",
    terms: ["0% переплата", "2 месяца", "Без взноса"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Кредит",
    bank: "Альфа-банк",
    logo: "https://static.tildacdn.com/tild3839-3531-4830-b465-306233383164/alfa.svg",
    terms: ["18.5% годовых", "до 24 мес", "Онлайн"],
    color: "from-red-500/20 to-pink-500/20",
  },
]

export function Financing() {
  return (
    <section id="financing" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Рассрочка <span className="gradient-text">без переплат</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Оформим рассрочку на месте за 5 минут. Без справок о доходах и первоначального взноса.
            </p>
            
            {/* Internal financing highlight */}
            <div className="mt-8 p-6 rounded-2xl glass border border-primary/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Внутренняя рассрочка</h3>
                  <p className="text-muted-foreground mt-1">
                    Заключим договор напрямую без банка. 50% сейчас, 50% через месяц после установки.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                      <Check className="h-4 w-4" />
                      Без банка
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                      <Check className="h-4 w-4" />
                      0% переплата
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`w-full h-12 mb-4 relative rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                  <Image
                    src={option.logo}
                    alt={option.name}
                    width={120}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>
                <h3 className="font-semibold text-lg">{option.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{option.bank}</p>
                <ul className="space-y-1.5">
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

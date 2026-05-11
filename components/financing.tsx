"use client"

import { motion } from "framer-motion"
import { Check, CreditCard, Building2, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const financingOptions = [
  {
    id: "cherepaha",
    name: "Карта «Черепаха»",
    bank: "ВТБ Банк",
    icon: "🐢",
    features: [
      "0% первоначальный взнос",
      "0% за пользование рассрочкой",
      "Рассрочка на 8 месяцев",
      "Без справок о доходах",
    ],
    highlight: true,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "halva",
    name: "Карта «Халва»",
    bank: "МТБанк",
    icon: "💳",
    features: [
      "0% первоначальный взнос",
      "Халва MIX — 2 месяца",
      "Халва MAX — 4 месяца",
      "Без справок о доходах",
    ],
    highlight: false,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "pokupok",
    name: "Карта покупок",
    bank: "Белгазпромбанк",
    icon: "🏦",
    features: [
      "0% первоначальный взнос",
      "0% за пользование рассрочкой",
      "Рассрочка на 2 месяца",
      "Без справок о доходах",
    ],
    highlight: false,
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: "alfa",
    name: "Кредит «Альфа»",
    bank: "Альфа-банк",
    icon: "🅰️",
    features: [
      "18,5% годовых",
      "До 24 месяцев",
      "Онлайн-оформление",
      "Не нужно быть клиентом банка",
    ],
    highlight: false,
    color: "from-red-500/20 to-pink-500/20",
  },
]

export function Financing() {
  return (
    <section id="financing" className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Рассрочка
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance">
            Удобная оплата<br />без переплат
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Работаем со всеми популярными картами рассрочки. Оформление за 5 минут прямо на месте.
          </p>
        </motion.div>

        {/* Calculator Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-2">Пример расчёта для кондиционера</div>
              <div className="text-4xl font-serif font-bold">1 200 BYN</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-semibold text-primary">150</div>
                <div className="text-xs text-muted-foreground">BYN/мес × 8</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-semibold text-primary">300</div>
                <div className="text-xs text-muted-foreground">BYN/мес × 4</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-semibold text-primary">600</div>
                <div className="text-xs text-muted-foreground">BYN/мес × 2</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Percent className="h-4 w-4 text-primary" />
              Переплата 0% по картам рассрочки
            </div>
          </div>
        </motion.div>

        {/* Financing Options */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {financingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={cn(
                "h-full p-6 rounded-2xl border transition-all duration-300",
                option.highlight
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 shadow-lg"
                  : "bg-card border-border/50 hover:border-primary/30"
              )}>
                {option.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Популярно
                  </div>
                )}
                
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{option.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">{option.bank}</div>
                
                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Internal Financing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-card border border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Внутренняя рассрочка</h3>
                  <p className="text-sm text-muted-foreground">Напрямую от магазина</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Заключаем договор напрямую без банка. Оплата в 2 платежа с отсрочкой на вторую часть 1 месяц. 
                Никаких справок и проверок.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">50% сейчас</span>
                </div>
                <div className="text-muted-foreground">+</div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">50% через месяц</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="h-14 px-8 shrink-0">
              Узнать подробнее
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Truck, Shield, Clock, MapPin, Award, Percent } from "lucide-react"

const features = [
  {
    icon: Percent,
    title: "Лучшая цена",
    description: "Прямые поставки от производителей. Гарантия лучшей цены — найдёте дешевле, сделаем скидку.",
    highlight: "от 750 BYN",
  },
  {
    icon: Truck,
    title: "Доставка день в день",
    description: "По Минску — бесплатно в день заказа. По Беларуси — 1-2 дня от 20 BYN.",
    highlight: "Бесплатно",
  },
  {
    icon: Clock,
    title: "Монтаж за 2-3 часа",
    description: "Профессиональные монтажники с опытом от 5 лет. Чисто, аккуратно, по стандартам.",
    highlight: "от 400 BYN",
  },
  {
    icon: Shield,
    title: "Гарантия до 10 лет",
    description: "На оборудование и монтаж. Бесплатный выезд при любой неисправности.",
    highlight: "до 10 лет",
  },
  {
    icon: MapPin,
    title: "Вся Беларусь",
    description: "Минск, Гомель, Брест, Гродно, Витебск, Могилёв — выезжаем в любой город.",
    highlight: "6 областей",
  },
  {
    icon: Award,
    title: "Рассрочка 0%",
    description: "Халва, Черепаха, Карта покупок. Или внутренняя рассрочка от магазина.",
    highlight: "до 24 мес",
  },
]

export function WhyUs() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Почему <span className="gradient-text">выбирают нас</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            1500+ довольных клиентов по всей Беларуси за 2025 год
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                  {feature.highlight}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

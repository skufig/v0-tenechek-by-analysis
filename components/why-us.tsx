"use client"

import { motion } from "framer-motion"
import { Truck, Shield, CreditCard, Wrench, Clock, MapPin } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Доставка день в день",
    description: "Бесплатная доставка по Минску. По Беларуси — от 20 BYN.",
  },
  {
    icon: Wrench,
    title: "Монтаж за 2 часа",
    description: "Профессиональные монтажники с опытом от 5 лет.",
  },
  {
    icon: Shield,
    title: "Гарантия 3 года",
    description: "На все работы и оборудование. Бесплатный выезд при поломке.",
  },
  {
    icon: CreditCard,
    title: "Рассрочка 0%",
    description: "Халва, Карта покупок, Черепаха. До 24 месяцев.",
  },
  {
    icon: Clock,
    title: "Работаем без выходных",
    description: "Установка в удобное время, включая вечер и выходные.",
  },
  {
    icon: MapPin,
    title: "Вся Беларусь",
    description: "Выезжаем в любой город: Минск, Гомель, Брест, Гродно.",
  },
]

export function WhyUs() {
  return (
    <section id="installation" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Почему выбирают нас
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            1500+ довольных клиентов по всей Беларуси
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

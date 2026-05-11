"use client"

import { motion } from "framer-motion"
import { Truck, Shield, Clock, MapPin, Award, Percent, Wrench, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Percent,
    title: "Лучшая цена",
    description: "Прямые поставки от производителей без посредников.",
    highlight: "от 750 BYN",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Доставка день в день",
    description: "По Минску бесплатно. По Беларуси за 1-2 дня.",
    highlight: "Бесплатно",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Монтаж за 2-3 часа",
    description: "Профессиональные монтажники с опытом от 5 лет.",
    highlight: "от 400 BYN",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Гарантия до 10 лет",
    description: "На оборудование и монтаж. Бесплатный выезд при неисправности.",
    highlight: "до 10 лет",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: MapPin,
    title: "Вся Беларусь",
    description: "Минск, Гомель, Брест, Гродно, Витебск, Могилёв.",
    highlight: "6 областей",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    title: "Рассрочка 0%",
    description: "Халва, Черепаха, Карта покупок или внутренняя рассрочка.",
    highlight: "до 24 мес",
    gradient: "from-amber-500 to-yellow-500",
  },
]

const processSteps = [
  { icon: HeartHandshake, title: "Консультация", desc: "Поможем выбрать модель под ваш бюджет и помещение" },
  { icon: Truck, title: "Доставка", desc: "Привезём в удобное время, в день заказа по Минску" },
  { icon: Wrench, title: "Монтаж", desc: "Установим за 2-3 часа с гарантией качества" },
  { icon: Shield, title: "Поддержка", desc: "Гарантийное обслуживание до 10 лет" },
]

export function WhyUs() {
  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 noise" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary font-medium mb-2">Преимущества</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Почему выбирают <span className="gradient-text">нас</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            1500+ довольных клиентов по всей Беларуси за 2025 год
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <span className="px-3 py-1.5 text-sm font-bold text-primary bg-primary/10 rounded-full">
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
        
        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-3xl font-bold">Как мы работаем</h3>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center left-1/2 ml-4">
                  {index + 1}
                </div>
              </div>
              <h4 className="font-display text-lg font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

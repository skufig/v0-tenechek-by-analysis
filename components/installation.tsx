"use client"

import { motion } from "framer-motion"
import { 
  MapPin, Clock, Wrench, ShieldCheck, Phone, 
  CheckCircle2, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const cities = [
  { name: "Минск", count: 450, featured: true },
  { name: "Брест", count: 120 },
  { name: "Гродно", count: 95 },
  { name: "Витебск", count: 85 },
  { name: "Могилёв", count: 78 },
  { name: "Гомель", count: 92 },
  { name: "Барановичи", count: 45 },
  { name: "Бобруйск", count: 38 },
]

const steps = [
  {
    number: "01",
    title: "Заявка и консультация",
    description: "Оставьте заявку — перезвоним за 15 минут и подберём оптимальное решение",
    icon: Phone,
  },
  {
    number: "02",
    title: "Бесплатный выезд",
    description: "Мастер приедет, сделает замеры и рассчитает точную стоимость работ",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Монтаж за 3 часа",
    description: "Профессиональная установка с соблюдением всех норм и правил",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Гарантия 5 лет",
    description: "Выдаём гарантийный талон на оборудование и монтажные работы",
    icon: ShieldCheck,
  },
]

const benefits = [
  "Собственный склад — монтаж день в день",
  "Профессиональный инструмент Hilti",
  "Чистота после установки гарантирована",
  "Все материалы включены в стоимость",
  "Возможность оплаты после монтажа",
  "Работаем в выходные и праздники",
]

export function Installation() {
  return (
    <section id="installation" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Монтаж
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance">
            Профессиональная установка<br />по всей Беларуси
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 1500 выполненных монтажей. Собственная команда сертифицированных мастеров.
          </p>
        </motion.div>

        {/* Map + Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Map visualization */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />
              <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-2xl" />
              
              {/* Belarus outline approximation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full p-8">
                  {/* City dots */}
                  {cities.map((city, index) => {
                    const positions = [
                      { top: "45%", left: "48%" }, // Minsk
                      { top: "65%", left: "20%" }, // Brest
                      { top: "35%", left: "25%" }, // Grodno
                      { top: "20%", left: "55%" }, // Vitebsk
                      { top: "50%", left: "75%" }, // Mogilev
                      { top: "70%", left: "70%" }, // Gomel
                      { top: "55%", left: "30%" }, // Baranovichi
                      { top: "60%", left: "60%" }, // Bobruisk
                    ]
                    return (
                      <motion.div
                        key={city.name}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute group"
                        style={positions[index]}
                      >
                        <div className={`
                          relative rounded-full 
                          ${city.featured 
                            ? "w-8 h-8 bg-primary" 
                            : "w-4 h-4 bg-primary/60"
                          }
                        `}>
                          {city.featured && (
                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                          )}
                        </div>
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-card rounded-lg px-3 py-1.5 shadow-lg border border-border text-sm z-10">
                          <div className="font-medium">{city.name}</div>
                          <div className="text-xs text-muted-foreground">{city.count} монтажей</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Stats and CTA */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1500+", label: "Установок выполнено" },
                  { value: "от 400", label: "BYN монтаж под ключ" },
                  { value: "3 часа", label: "Среднее время работ" },
                  { value: "5 лет", label: "Гарантия на работы" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <div className="text-3xl font-serif font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                Заказать выезд мастера
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-serif font-semibold text-center mb-12">
            Как мы работаем
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-4xl font-serif font-bold text-primary/20">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

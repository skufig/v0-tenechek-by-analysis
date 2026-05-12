"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Phone, Calculator, Clock, Wifi, Zap, TrendingUp, Building2, Scissors, Stethoscope, Check, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

export function BusinessPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [avgCheck, setAvgCheck] = useState(50)
  const [hotDays, setHotDays] = useState(45)
  const [lostClients, setLostClients] = useState(3)
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const potentialLoss = avgCheck * hotDays * lostClients

  const businessTypes = [
    { icon: Scissors, label: "Салоны красоты", description: "Клиенты не возвращаются в душный салон" },
    { icon: Stethoscope, label: "Медицинские кабинеты", description: "Комфорт пациента = доверие" },
    { icon: Building2, label: "Офисы", description: "Продуктивность падает в жару на 30%" },
    { icon: Users, label: "Коворкинги", description: "Арендаторы уходят к конкурентам" },
  ]

  const benefits = [
    { icon: Wifi, title: "Wi-Fi управление", description: "Включите охлаждение по дороге на работу" },
    { icon: Zap, title: "Класс A++", description: "Экономия на электричестве до 40%" },
    { icon: Clock, title: "Монтаж за 3 часа", description: "Без пыли и грязи, без остановки работы" },
  ]

  const caseStudy = {
    title: "Салон красоты на Немиге",
    before: "Летом теряли 2-3 клиента в день — уходили в соседний салон с кондеем",
    after: "После установки LG EVO MAX поток вырос на 30%",
    roi: "Окупились за 2 месяца",
    quote: "Теперь клиенты сами спрашивают, что за тихий кондиционер у нас стоит"
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Тенёчек
          </Link>
          <a 
            href="tel:+375293989777"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-1/2 h-96 bg-gradient-to-l from-slate-200/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm mb-8"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Для бизнеса</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-slate-900">Деньги</span>
              <br />
              <span className="text-slate-400">не потеют</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-600 max-w-xl mb-10">
              Клиенты уходят туда, где прохладно. 
              <span className="text-slate-900 font-medium"> Посчитайте, сколько вы теряете</span> без кондиционера.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg rounded-xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Калькулятор потерь
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setIsCallbackOpen(true)}
                className="border-slate-300 text-slate-900 hover:bg-slate-50 px-8 py-6 text-lg rounded-xl"
              >
                Заказать проект под ключ
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <type.icon className="w-8 h-8 text-slate-700 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{type.label}</h3>
                <p className="text-slate-500 text-sm">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Калькулятор потерь
            </h2>
            <p className="text-xl text-slate-600">
              Посчитайте, сколько денег уходит с каждым клиентом
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              {/* Inputs */}
              <div className="space-y-8 mb-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-slate-700">Средний чек</label>
                    <span className="font-bold text-slate-900">{avgCheck} BYN</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={avgCheck}
                    onChange={(e) => setAvgCheck(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-slate-700">Жарких дней в году</label>
                    <span className="font-bold text-slate-900">{hotDays} дней</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={hotDays}
                    onChange={(e) => setHotDays(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-slate-700">Потерянных клиентов в день</label>
                    <span className="font-bold text-slate-900">{lostClients} чел.</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={lostClients}
                    onChange={(e) => setLostClients(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                  />
                </div>
              </div>

              {/* Result */}
              <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-100">
                <div className="text-sm text-red-600 font-medium mb-2">Вы теряете за сезон:</div>
                <div className="text-5xl font-bold text-red-600 mb-2">
                  {potentialLoss.toLocaleString()} BYN
                </div>
                <div className="text-red-500 text-sm">
                  Это {Math.round(potentialLoss / 1200)} кондиционеров с установкой
                </div>
              </div>

              {/* Solution */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <div className="text-slate-400 text-sm mb-2">Решение:</div>
                <div className="text-xl font-semibold mb-4">
                  LG EVO MAX — окупится за {Math.ceil(2331 / (avgCheck * lostClients))} дней
                </div>
                <Button
                  onClick={() => setIsCallbackOpen(true)}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 py-6 text-lg rounded-xl"
                >
                  Заказать расчёт для вашего бизнеса
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                LG EVO MAX
                <br />
                <span className="text-slate-400">Статус и холод</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Премиальный дизайн для вашего интерьера. Wi-Fi управление с телефона, 
                пока вас нет в кабинете. Класс A++ не разорит на коммуналке.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <benefit.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="font-semibold text-sm">{benefit.title}</div>
                    <div className="text-slate-500 text-xs">{benefit.description}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-4 mb-6">
                <div className="text-4xl font-bold">2 331 BYN</div>
                <div className="text-slate-400 line-through text-xl">2 590 BYN</div>
              </div>

              <Button
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg rounded-xl"
              >
                Заказать для офиса
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-100 rounded-3xl p-8">
                <Image
                  src="/products/lg-evo-max-07-full.jpg"
                  alt="LG EVO MAX"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Сделаем за 3 часа
            </h2>
            <p className="text-xl text-slate-400">
              Без пыли и грязи. Вечером закончили — утром принимаете клиентов.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Замер", description: "Приедем, осмотрим помещение, предложим варианты размещения" },
              { step: "2", title: "Монтаж", description: "Аккуратные штробы в коробах, никакой пыли на мебели" },
              { step: "3", title: "Запуск", description: "Проверим работу, объясним управление, выдадим гарантию" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>Кейс</span>
              </div>
              <h2 className="text-3xl font-bold">{caseStudy.title}</h2>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="text-red-600 font-medium text-sm mb-2">До установки:</div>
                  <p className="text-slate-700">{caseStudy.before}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-green-600 font-medium text-sm mb-2">После:</div>
                  <p className="text-slate-700">{caseStudy.after}</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{caseStudy.roi}</div>
              </div>

              <blockquote className="text-center text-lg text-slate-600 italic border-l-4 border-slate-300 pl-4">
                &ldquo;{caseStudy.quote}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Проект под ключ за 24 часа
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              От замера до пуска. Бесплатный выезд специалиста.
              Рассчитаем окупаемость для вашего бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg rounded-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Заказать проект
              </Button>
              <a href="tel:+375293989777">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-10 py-6 text-lg rounded-xl w-full"
                >
                  +375 29 398-97-77
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-white transition-colors">
            Тенёчек — кондиционеры с установкой
          </Link>
          <a 
            href="https://netnext.site" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)}
        source="promo_business"
      />
    </div>
  )
}

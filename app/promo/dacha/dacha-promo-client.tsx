"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Phone, Truck, Trash2, Shield, Clock, MapPin, Users, FileText, Check, ArrowRight, Home, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

export function DachaPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [callbackSource, setCallbackSource] = useState("promo_dacha")
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const priceComparison = [
    { model: "DENKO DU-07", regularPrice: 1190, tradeInPrice: 890, savings: 300 },
    { model: "DAHATSU Dragon", regularPrice: 1250, tradeInPrice: 950, savings: 300 },
    { model: "Eurohoff Astrid", regularPrice: 1300, tradeInPrice: 1000, savings: 300 },
  ]

  const team = [
    { name: "Алексей", role: "Мастер-монтажник", experience: "8 лет опыта" },
    { name: "Сергей", role: "Специалист по климату", experience: "5 лет опыта" },
    { name: "Дмитрий", role: "Водитель-помощник", experience: "3 года с нами" },
  ]

  const guarantees = [
    { icon: Shield, title: "Гарантия 10 лет", description: "На оборудование от производителя" },
    { icon: Wrench, title: "Гарантия 5 лет", description: "На монтажные работы" },
    { icon: FileText, title: "Все документы", description: "Договор, чек, акт выполненных работ" },
  ]

  const openCallback = (source: string) => {
    setCallbackSource(source)
    setIsCallbackOpen(true)
  }

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-amber-50/90 backdrop-blur-xl border-b border-amber-200">
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
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600 text-white text-sm mb-8"
            >
              <Truck className="w-4 h-4" />
              <span>Выездной шоурум</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-slate-900">Приедем с кондиционером</span>
              <br />
              <span className="text-amber-700">прямо к вашему дому</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-6">
              Покажете, где ставить — установим и уберём мусор. 
              <span className="text-slate-900 font-medium"> Старый хлам вывезем бесплатно.</span>
            </p>

            {/* Key benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium">Приедем за 30 минут</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm">
                <Trash2 className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium">Вывоз старого бесплатно</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium">Минск и область</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => openCallback("promo_dacha_hero")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                <Truck className="w-5 h-5 mr-2" />
                Вызвать замерщика бесплатно
              </Button>
              <a href="tel:+375293989777">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-slate-900 hover:bg-amber-100 px-8 py-6 text-lg rounded-xl w-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Перезвоните, я не разбираюсь в сайтах
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trade-in Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm mb-4">
              <Trash2 className="w-4 h-4" />
              <span>Trade-in</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Честная пенсионерская цена
            </h2>
            <p className="text-xl text-slate-600">
              Сдайте старый кондиционер — получите скидку до 300 BYN
            </p>
          </motion.div>

          {/* Price Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
              <div className="grid grid-cols-4 gap-4 p-4 bg-slate-100 font-semibold text-sm">
                <div>Модель</div>
                <div className="text-center">Обычная цена</div>
                <div className="text-center text-red-600">Цена по Trade-in</div>
                <div className="text-center text-green-600">Экономия</div>
              </div>
              {priceComparison.map((item) => (
                <div key={item.model} className="grid grid-cols-4 gap-4 p-4 border-t border-slate-200 items-center">
                  <div className="font-medium">{item.model}</div>
                  <div className="text-center text-slate-400 line-through">{item.regularPrice} BYN</div>
                  <div className="text-center text-2xl font-bold text-red-600">{item.tradeInPrice} BYN</div>
                  <div className="text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      -{item.savings} BYN
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm mb-4">
                * Принимаем любой старый кондиционер в любом состоянии
              </p>
              <Button
                size="lg"
                onClick={() => openCallback("promo_dacha_tradein")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                Узнать цену с Trade-in для моего кондиционера
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-200 text-amber-800 text-sm mb-4">
              <Users className="w-4 h-4" />
              <span>Наша бригада</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Не обманем
            </h2>
            <p className="text-xl text-slate-600">
              Работаем с 2018 года. Лица реальные, имена настоящие.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-amber-200"
              >
                <div className="w-20 h-20 rounded-full bg-amber-100 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <div className="text-amber-700 font-medium text-sm mb-2">{member.role}</div>
                <div className="text-slate-500 text-sm">{member.experience}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Гарантии документально
            </h2>
            <p className="text-xl text-slate-600">
              Всё официально, с договором и чеком
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-100 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Document preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-start gap-4">
                <FileText className="w-12 h-12 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Вы получите:</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Договор на установку</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Товарный чек</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Акт выполненных работ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>Гарантийный талон (подписанный от руки)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Как всё происходит
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Звоните", description: "Расскажите, куда приехать и какой кондей нужен" },
              { step: "2", title: "Приезжаем", description: "За 30 минут с кондиционером на борту" },
              { step: "3", title: "Показываем", description: "Даём пощупать, объясняем разницу моделей" },
              { step: "4", title: "Устанавливаем", description: "За 3-4 часа. Уберём мусор, вывезем старый" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-amber-100 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Home className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Прохлада на даче —<br />это просто
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Позвоните — приедем, покажем, установим. Без суеты и непонятных слов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => openCallback("promo_dacha_final")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg rounded-xl shadow-lg"
              >
                <Truck className="w-5 h-5 mr-2" />
                Вызвать замерщика сейчас
              </Button>
              <a href="tel:+375293989777">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-slate-900 hover:bg-amber-100 px-10 py-6 text-lg rounded-xl w-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Перезвоните мне
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-amber-100 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Тенёчек — кондиционеры с установкой
          </Link>
          <a 
            href="https://netnext.site" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)}
        source={callbackSource}
      />
    </div>
  )
}

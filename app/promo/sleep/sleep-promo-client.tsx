"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Phone, Shield, Moon, Wind, Sparkles, Volume2, VolumeX, ChevronRight, Baby, Heart, Check, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

export function SleepPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [noiseLevel, setNoiseLevel] = useState(70)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Noise comparison data
  const noiseComparisons = [
    { db: 70, label: "Улица за окном", color: "#ef4444" },
    { db: 50, label: "Разговор", color: "#f97316" },
    { db: 30, label: "Шёпот", color: "#eab308" },
    { db: 19, label: "Toshiba SEIYA", color: "#22c55e" },
  ]

  const quizQuestions = [
    {
      question: "Сколько лет вашему ребёнку?",
      options: ["0-2 года", "3-6 лет", "7-12 лет", "Подросток"]
    },
    {
      question: "Есть ли у ребёнка аллергия или астма?",
      options: ["Да, есть", "Нет", "Не уверен(а)"]
    },
    {
      question: "С какой стороны кровать относительно окна?",
      options: ["Под окном", "Напротив окна", "Сбоку от окна", "Окон несколько"]
    },
    {
      question: "Какой этаж?",
      options: ["1-3 этаж", "4-9 этаж", "10+ этаж", "Частный дом"]
    }
  ]

  const features = [
    {
      icon: Moon,
      title: "19 дБ — тише шёпота",
      description: "Ребёнок не проснётся даже в самую чуткую фазу сна"
    },
    {
      icon: Shield,
      title: "УФ-лампа Neutralizer",
      description: "Убивает 99.9% вирусов, бактерий и плесени в воздухе"
    },
    {
      icon: Wind,
      title: "3D-поток без сквозняков",
      description: "Воздух распределяется по потолку, не дует на кроватку"
    },
    {
      icon: Sparkles,
      title: "Самоочистка",
      description: "Автоматически сушит теплообменник — никакой плесени внутри"
    }
  ]

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [quizStep]: answer }))
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1)
    } else {
      setIsCallbackOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Тенёчек
          </Link>
          <a 
            href="tel:+375293989777"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-8"
            >
              <Moon className="w-4 h-4" />
              <span>Для детской и спальни</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Сон как в лесу,</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                иммунитет как у бога
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto mb-8">
              Единственный кондиционер в Минске, от которого дети 
              <span className="text-white font-medium"> не просыпаются </span>
              и 
              <span className="text-white font-medium"> не болеют</span>
            </p>

            {/* Key metric */}
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 mb-10">
              <div className="text-5xl font-bold text-indigo-400">19</div>
              <div className="text-left">
                <div className="text-white font-medium">децибел</div>
                <div className="text-white/60 text-sm">тише шёпота мамы</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25"
              >
                Подобрать тихий кондиционер
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Пройти тест (2 мин)
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Noise Level Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Тише воды
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Сравните уровень шума и почувствуйте разницу
            </p>
          </motion.div>

          {/* Noise Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              {/* Current level display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2" style={{ 
                  color: noiseLevel <= 19 ? '#22c55e' : noiseLevel <= 30 ? '#eab308' : noiseLevel <= 50 ? '#f97316' : '#ef4444'
                }}>
                  {noiseLevel} дБ
                </div>
                <div className="text-white/60 text-lg">
                  {noiseLevel >= 70 ? "Шумная улица" : 
                   noiseLevel >= 50 ? "Обычный разговор" :
                   noiseLevel >= 30 ? "Тихий шёпот" :
                   noiseLevel >= 20 ? "Почти тишина" :
                   "Toshiba SEIYA — абсолютный покой"}
                </div>
              </div>

              {/* Slider */}
              <div className="relative mb-8">
                <input
                  type="range"
                  min="19"
                  max="70"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #22c55e 0%, #eab308 30%, #f97316 60%, #ef4444 100%)`
                  }}
                />
              </div>

              {/* Comparison points */}
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                {noiseComparisons.map((item) => (
                  <button
                    key={item.db}
                    onClick={() => setNoiseLevel(item.db)}
                    className={`p-3 rounded-xl transition-all ${
                      noiseLevel === item.db 
                        ? 'bg-white/10 border border-white/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="font-bold mb-1" style={{ color: item.color }}>{item.db} дБ</div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virus Killer Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>Убийцы вирусов</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Пока обычный кондей размножает бактерии,
              <br />
              <span className="text-purple-400">этот их уничтожает</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* UV Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <div className="text-4xl font-bold text-purple-400">99.9%</div>
              <div className="text-left">
                <div className="text-white font-medium">вирусов и бактерий</div>
                <div className="text-white/60 text-sm">уничтожает УФ-лампа Neutralizer</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-6">
                <Baby className="w-4 h-4" />
                <span>Персональный подбор</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Подберём место установки
                <br />
                <span className="text-indigo-400">без сквозняков</span>
              </h2>
              <p className="text-white/60">
                Ответьте на 4 вопроса — рассчитаем идеальное место для кондиционера
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {quizQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx < quizStep ? 'bg-indigo-500' :
                      idx === quizStep ? 'bg-indigo-400' :
                      'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-sm text-white/40 mb-2">Вопрос {quizStep + 1} из {quizQuestions.length}</div>
                  <h3 className="text-2xl font-semibold mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>
                  
                  <div className="grid gap-3">
                    {quizQuestions[quizStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuizAnswer(option)}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-indigo-500/50 transition-all flex items-center justify-between group"
                      >
                        <span>{option}</span>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-indigo-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Recommendation */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 md:p-12 border border-indigo-500/20"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Рекомендуем для детской</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Toshiba SEIYA NEW</h3>
                <p className="text-white/70 mb-6">
                  Японское качество с самым тихим режимом работы 19 дБ. 
                  Фильтр Ultra Fresh нейтрализует 99.9% вирусов, самоочистка не даёт размножаться плесени.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "19 дБ — тише шёпота",
                    "УФ-фильтр Ultra Fresh",
                    "Самоочистка испарителя",
                    "Гарантия 5 лет",
                    "Установка за 3 часа"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-4 mb-6">
                  <div className="text-4xl font-bold text-white">1 350 BYN</div>
                  <div className="text-white/40 line-through text-xl">1 680 BYN</div>
                  <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">-20%</div>
                </div>

                <Button
                  size="lg"
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-xl"
                >
                  Заказать с установкой
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/5 rounded-3xl p-8 border border-white/10">
                  <Image
                    src="/products/toshiba-seiya-07.png"
                    alt="Toshiba SEIYA NEW"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Пусть ваш ребёнок спит
              <br />
              <span className="text-indigo-400">как в тихом лесу</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Бесплатный выезд замерщика. Покажем, где установить без сквозняков. 
              Установим за 3 часа — вечером уже спите в прохладе.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25"
              >
                <Phone className="w-5 h-5 mr-2" />
                Заказать звонок
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
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
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
        source="promo_sleep"
      />
    </div>
  )
}

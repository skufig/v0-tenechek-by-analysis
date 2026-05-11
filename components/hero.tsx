"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Shield, Clock, MapPin, ArrowRight, X, Check, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { submitLead } from "@/lib/utm"
import { reachGoal, GOALS } from "./analytics"
import { PhoneInput, validatePhone } from "./phone-input"

const reviews = [
  { name: "Александр М.", city: "Минск", text: "Установили за 2 часа, работает идеально", rating: 5 },
  { name: "Ольга К.", city: "Брест", text: "Лучшая цена в городе, монтажники молодцы", rating: 5 },
  { name: "Дмитрий В.", city: "Гродно", text: "Уже 2 год работает без нареканий", rating: 5 },
]

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState(0)
  const [slotsLeft] = useState(7)
  
  // Countdown to end of month
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      const diff = endOfMonth.getTime() - now.getTime()
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      }
    }
    
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />
      
      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/40 to-transparent rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        {/* Top urgency bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mb-8 sm:mb-12 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">До конца акции:</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold">{timeLeft.days}</span>
              <span className="text-blue-200 text-xs sm:text-sm">дн</span>
            </div>
            <span className="text-blue-300">:</span>
            <div className="flex items-center gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold">{timeLeft.hours}</span>
              <span className="text-blue-200 text-xs sm:text-sm">ч</span>
            </div>
            <span className="text-blue-300">:</span>
            <div className="flex items-center gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold">{timeLeft.minutes}</span>
              <span className="text-blue-200 text-xs sm:text-sm">мин</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">Осталось {slotsLeft} мест по акции</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="text-foreground">Кондиционер</span>
              <br />
              <span className="text-foreground">с установкой за</span>
              <br />
              <span className="text-blue-600">750 BYN</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 space-y-3"
            >
              {[
                "Официальная гарантия 3-10 лет от производителя",
                "Монтаж за 2-3 часа сертифицированными мастерами",
                "Бесплатный выезд замерщика в день обращения",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Button 
                size="lg" 
                className="h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 group w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                Рассчитать стоимость
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
                asChild
              >
                <a href="tel:+375293989777">
                  <Phone className="mr-2 sm:mr-3 h-5 w-5" />
                  +375 29 398-97-77
                </a>
              </Button>
            </motion.div>

            {/* Social proof - reviews carousel */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-600 font-medium">1500+ довольных клиентов</span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-700 font-medium">&ldquo;{reviews[currentReview].text}&rdquo;</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold text-slate-900">{reviews[currentReview].name}</span>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {reviews[currentReview].city}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Hero Visual - Product showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {/* Sale badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg">
                    -40%
                  </div>
                </div>
                
                {/* Product image */}
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src="/hero-ac.png"
                    alt="Кондиционер с установкой"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Product info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">LG EVO MAX</p>
                    <h3 className="text-xl font-bold text-slate-900">Инверторный кондиционер 25 м²</h3>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {["Wi-Fi", "Инвертор", "A++", "Тихий"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price row */}
                  <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-sm text-slate-500 line-through">4 650 BYN</p>
                      <p className="font-display text-3xl font-bold text-slate-900">2 803 BYN</p>
                      <p className="text-sm text-slate-500 mt-1">или 233 BYN/мес в рассрочку</p>
                    </div>
                    <Button 
                      className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Заказать
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating trust badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -left-4 lg:-left-8 top-8 hidden lg:block"
              >
                <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Гарантия</p>
                    <p className="text-sm text-slate-500">до 10 лет</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -right-4 lg:-right-8 bottom-24 hidden lg:block"
              >
                <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Монтаж</p>
                    <p className="text-sm text-slate-500">за 2-3 часа</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <QuizModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  )
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const questions = [
    {
      id: "room",
      question: "Какое помещение нужно охладить?",
      options: [
        { value: "bedroom", label: "Спальня", desc: "до 20 м²" },
        { value: "living", label: "Гостиная", desc: "20-35 м²" },
        { value: "office", label: "Офис", desc: "от 35 м²" },
        { value: "other", label: "Другое", desc: "уточним" },
      ],
    },
    {
      id: "budget",
      question: "Какой бюджет рассматриваете?",
      options: [
        { value: "economy", label: "Экономный", desc: "750-1500 BYN" },
        { value: "optimal", label: "Оптимальный", desc: "1500-2500 BYN" },
        { value: "premium", label: "Премиум", desc: "от 2500 BYN" },
        { value: "any", label: "Любой", desc: "главное качество" },
      ],
    },
    {
      id: "when",
      question: "Когда планируете установку?",
      options: [
        { value: "asap", label: "Срочно", desc: "1-2 дня" },
        { value: "week", label: "На неделе", desc: "3-7 дней" },
        { value: "month", label: "В этом месяце", desc: "7-30 дней" },
        { value: "later", label: "Пока выбираю", desc: "позже" },
      ],
    },
  ]
  
  const currentQuestion = questions[step - 1]
  const totalSteps = questions.length + 1 // +1 for contact form
  
  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
    if (step < questions.length) {
      setStep(step + 1)
    } else {
      setStep(step + 1) // Go to contact form
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone(phone) || name.length < 2) return
    
    setLoading(true)
    setError("")
    
    const comment = `Помещение: ${answers.room || "не указано"}, Бюджет: ${answers.budget || "не указано"}, Сроки: ${answers.when || "не указано"}`
    
    const result = await submitLead({
      name,
      phone,
      comment,
      source: "hero-quiz",
    })
    
    setLoading(false)
    
    if (result.success) {
      setSubmitted(true)
      reachGoal(GOALS.FORM_SUCCESS)
    } else {
      setError(result.error || "Ошибка отправки")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
        >
          <X className="h-5 w-5 text-slate-600" />
        </button>
        
        <div className="p-8">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Заявка принята!</h3>
              <p className="text-slate-600 mt-2">Перезвоним в течение 15 минут и подберем лучший вариант</p>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700 font-medium">Ваша персональная скидка 10% уже закреплена</p>
              </div>
            </motion.div>
          ) : step <= questions.length ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-500 font-medium mb-2">Шаг {step} из {totalSteps}</p>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-6">{currentQuestion.question}</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                    >
                      <p className="font-semibold text-slate-900 group-hover:text-blue-600">{option.label}</p>
                      <p className="text-sm text-slate-500">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-sm text-slate-500 font-medium mb-2">Последний шаг</p>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Куда отправить расчет?</h3>
              <p className="text-slate-600 mb-6">Подготовим персональное предложение со скидкой 10%</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    required
                    disabled={loading}
                  />
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Получить расчет со скидкой
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-slate-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

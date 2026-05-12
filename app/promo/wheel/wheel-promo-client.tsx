"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Phone, Gift, Sparkles, Trophy, Zap, Star, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const WHEEL_SEGMENTS = [
  { id: 1, label: "5%", color: "#3b82f6", prize: "Скидка 5%", probability: 0.25 },
  { id: 2, label: "15%", color: "#8b5cf6", prize: "Скидка 15%", probability: 0.20 },
  { id: 3, label: "Кофе", color: "#f59e0b", prize: "Кофе в подарок", probability: 0.15 },
  { id: 4, label: "32%", color: "#10b981", prize: "Скидка 32%!", probability: 0.10 },
  { id: 5, label: "10%", color: "#ec4899", prize: "Скидка 10%", probability: 0.15 },
  { id: 6, label: "Монтаж", color: "#ef4444", prize: "Бесплатная установка!", probability: 0.05 },
  { id: 7, label: "7%", color: "#06b6d4", prize: "Скидка 7%", probability: 0.10 },
]

const FAKE_WINNERS = [
  "Иван из Минска выиграл скидку 32%",
  "Елена крутанула и получила бесплатный монтаж",
  "Сергей выиграл скидку 15%",
  "Анна получила кофе в подарок",
  "Дмитрий выиграл скидку 10%",
  "Ольга крутанула на бесплатную установку",
  "Михаил выиграл скидку 32%",
  "Наталья получила скидку 15%",
]

export function WheelPromoClient() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [currentPrize, setCurrentPrize] = useState<typeof WHEEL_SEGMENTS[0] | null>(null)
  const [rotation, setRotation] = useState(0)
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [currentWinner, setCurrentWinner] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Rotate fake winners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWinner(prev => (prev + 1) % FAKE_WINNERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return
    
    setIsSpinning(true)
    setSpinsLeft(prev => prev - 1)
    
    // Weighted random selection
    const random = Math.random()
    let cumulative = 0
    let selectedSegment = WHEEL_SEGMENTS[0]
    
    for (const segment of WHEEL_SEGMENTS) {
      cumulative += segment.probability
      if (random <= cumulative) {
        selectedSegment = segment
        break
      }
    }
    
    setCurrentPrize(selectedSegment)
    
    // Calculate rotation to land on selected segment
    const segmentAngle = 360 / WHEEL_SEGMENTS.length
    const segmentIndex = WHEEL_SEGMENTS.findIndex(s => s.id === selectedSegment.id)
    const targetAngle = 360 - (segmentIndex * segmentAngle) - (segmentAngle / 2)
    const spins = 5 + Math.random() * 3
    const newRotation = rotation + (spins * 360) + targetAngle
    
    setRotation(newRotation)
    
    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setShowResult(true)
    }, 5000)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !name) return
    
    // Here you would send to your backend
    console.log("[v0] Form submitted:", { name, phone, prize: currentPrize?.prize })
    
    setFormSubmitted(true)
  }

  const closeResult = () => {
    setShowResult(false)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
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

      {/* Winner ticker */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-green-600 to-emerald-600 py-2 overflow-hidden">
        <motion.div
          key={currentWinner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center text-sm font-medium flex items-center justify-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          <span>{FAKE_WINNERS[currentWinner]} только что!</span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Каждый второй выигрывает!</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Крутите,</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                пока бесплатно
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-xl mx-auto mb-8">
              Выиграйте скидку до 500 BYN на кондиционер или бесплатную установку
            </p>

            {/* Spins counter */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Осталось <span className="font-bold text-yellow-400">{spinsLeft}</span> спина на сегодня</span>
            </div>

            {/* Wheel */}
            <div className="relative w-80 h-80 mx-auto mb-10">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
              </div>
              
              {/* Wheel container */}
              <div className="relative w-full h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50" />
                
                {/* Wheel */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full relative z-10 drop-shadow-2xl"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  animate={{ rotate: rotation }}
                  transition={{ duration: 5, ease: [0.17, 0.67, 0.12, 0.99] }}
                >
                  {WHEEL_SEGMENTS.map((segment, index) => {
                    const angle = (360 / WHEEL_SEGMENTS.length)
                    const startAngle = index * angle - 90
                    const endAngle = startAngle + angle
                    const startRad = (startAngle * Math.PI) / 180
                    const endRad = (endAngle * Math.PI) / 180
                    
                    const x1 = 50 + 45 * Math.cos(startRad)
                    const y1 = 50 + 45 * Math.sin(startRad)
                    const x2 = 50 + 45 * Math.cos(endRad)
                    const y2 = 50 + 45 * Math.sin(endRad)
                    
                    const largeArc = angle > 180 ? 1 : 0
                    
                    const textAngle = startAngle + angle / 2
                    const textRad = (textAngle * Math.PI) / 180
                    const textX = 50 + 30 * Math.cos(textRad)
                    const textY = 50 + 30 * Math.sin(textRad)
                    
                    return (
                      <g key={segment.id}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={segment.color}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="6"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                        >
                          {segment.label}
                        </text>
                      </g>
                    )
                  })}
                  {/* Center circle */}
                  <circle cx="50" cy="50" r="8" fill="#1e1b4b" stroke="white" strokeWidth="1" />
                  <text x="50" y="50" fill="white" fontSize="4" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
                    КРУТИ
                  </text>
                </motion.svg>
              </div>
            </div>

            {/* Spin button */}
            {!showForm && !formSubmitted && (
              <Button
                size="lg"
                onClick={spinWheel}
                disabled={isSpinning || spinsLeft <= 0}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold px-12 py-6 text-xl rounded-full shadow-lg shadow-yellow-500/25 disabled:opacity-50"
              >
                {isSpinning ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Star className="w-6 h-6" />
                    </motion.div>
                    Крутится...
                  </span>
                ) : spinsLeft <= 0 ? (
                  "Спины закончились"
                ) : (
                  <span className="flex items-center gap-2">
                    <Gift className="w-6 h-6" />
                    Крутить колесо
                  </span>
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && currentPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeResult}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10 text-center relative"
            >
              <button
                onClick={closeResult}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: currentPrize.color }}
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-2">Поздравляем!</h2>
              <p className="text-xl text-white/80 mb-6">
                Вы выиграли: <span className="font-bold text-yellow-400">{currentPrize.prize}</span>
              </p>
              
              <p className="text-white/60 text-sm mb-6">
                Оставьте контакты, чтобы зафиксировать приз
              </p>
              
              <Button
                size="lg"
                onClick={closeResult}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold py-6 rounded-xl"
              >
                Получить приз
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Section */}
      <AnimatePresence>
        {showForm && !formSubmitted && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 relative z-10"
          >
            <div className="max-w-md mx-auto px-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: currentPrize?.color || "#10b981" }}>
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Ваш приз ждёт!</h3>
                  <p className="text-white/70">
                    {currentPrize?.prize || "Бесплатный выезд замерщика"}
                  </p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-xl"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="+375 (__) ___-__-__"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-6 rounded-xl"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Получить приз и зафиксировать цену
                  </Button>
                </form>
                
                <p className="text-white/40 text-xs text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Success State */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 relative z-10"
          >
            <div className="max-w-md mx-auto px-4">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-20 h-20 rounded-full bg-green-500 mx-auto mb-6 flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2">Отлично!</h3>
                <p className="text-white/70 mb-6">
                  Ваш приз зафиксирован. Мы перезвоним в течение 15 минут.
                </p>
                
                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                  <div className="text-sm text-white/60 mb-1">Ваш приз:</div>
                  <div className="text-xl font-bold text-yellow-400">{currentPrize?.prize}</div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Prizes Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Что можно выиграть
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { prize: "Скидка 32%", description: "На любой кондиционер", color: "#10b981", icon: Star },
              { prize: "Бесплатный монтаж", description: "Экономия до 500 BYN", color: "#ef4444", icon: Gift },
              { prize: "Скидка 15%", description: "На любую модель", color: "#8b5cf6", icon: Sparkles },
              { prize: "Кофе в подарок", description: "Для хорошего настроения", color: "#f59e0b", icon: Trophy },
            ].map((item, index) => (
              <motion.div
                key={item.prize}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: item.color }}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.prize}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
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
    </div>
  )
}

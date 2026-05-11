"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, ArrowRight, Sparkles } from "lucide-react"
import { CallbackModal } from "./callback-modal"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [pulseText, setPulseText] = useState(0)

  const ctaTexts = [
    "Бесплатная консультация",
    "Перезвоним за 15 минут",
    "Рассчитаем стоимость"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseText((prev) => (prev + 1) % ctaTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCallbackClick = () => {
    setIsModalOpen(true)
    setIsExpanded(false)
  }

  return (
    <>
      {/* Desktop - справа внизу */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <div className="relative">
              {/* Expanded card */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden w-[320px]"
                  >
                    {/* Header gradient */}
                    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">Нужна помощь?</div>
                          <div className="text-white/80 text-sm">Мы всегда на связи</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-2">
                      <a
                        href="tel:+375293989777"
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">Позвонить</div>
                            <div className="text-sm text-slate-500">+375 29 398-97-77</div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </a>
                      
                      <button
                        onClick={handleCallbackClick}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-slate-900">Заказать звонок</div>
                            <div className="text-sm text-slate-500">Перезвоним за 15 минут</div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                    
                    <div className="px-4 pb-4">
                      <div className="text-xs text-slate-400 text-center">
                        Работаем Пн-Пт 9:00-18:00, Сб 10:00-15:00
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: isExpanded ? 135 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isExpanded ? (
                      <X className="h-7 w-7 text-white" />
                    ) : (
                      <Phone className="h-7 w-7 text-white" />
                    )}
                  </motion.div>
                  
                  {/* Pulse rings */}
                  {!isExpanded && (
                    <>
                      <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30" />
                      <span className="absolute -inset-1 rounded-full border border-blue-300 animate-pulse opacity-40" />
                    </>
                  )}
                </div>
                
                {/* Badge */}
                {!isExpanded && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile - внизу на всю ширину */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe"
          >
            {/* Gradient glow effect */}
            <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            
            <div className="bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <div className="px-4 py-3">
                <motion.button
                  onClick={handleCallbackClick}
                  className="relative w-full group"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-between h-14 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={pulseText}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-white font-bold text-[15px]"
                          >
                            {ctaTexts[pulseText]}
                          </motion.div>
                        </AnimatePresence>
                        <div className="text-white/80 text-xs flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Ответим на все вопросы
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    </motion.div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        source="sticky_cta"
      />
    </>
  )
}

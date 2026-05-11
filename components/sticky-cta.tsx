"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, MessageCircle } from "lucide-react"
import { CallbackModal } from "./callback-modal"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Показываем после прокрутки на 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
              {/* Expanded menu */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 min-w-[200px]"
                  >
                    <a
                      href="tel:+375293989777"
                      
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">Позвонить</div>
                        <div className="text-xs text-slate-500">+375 29 398-97-77</div>
                      </div>
                    </a>
                    <button
                      onClick={handleCallbackClick}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-slate-900">Заказать звонок</div>
                        <div className="text-xs text-slate-500">Перезвоним за 15 мин</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center group"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? (
                    <X className="h-7 w-7 text-white" />
                  ) : (
                    <Phone className="h-7 w-7 text-white" />
                  )}
                </motion.div>
                
                {/* Pulse animation */}
                {!isExpanded && (
                  <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30" />
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
            <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="flex gap-2">
                <a
                  href="tel:+375293989777"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 rounded-lg sm:rounded-xl bg-green-500 text-white font-semibold text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Позвонить
                </a>
                <button
                  onClick={handleCallbackClick}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 rounded-lg sm:rounded-xl bg-blue-600 text-white font-semibold text-sm sm:text-base"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">Перезвоните мне</span>
                  <span className="xs:hidden">Звонок</span>
                </button>
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

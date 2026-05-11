"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      // Показываем через 2 секунды после загрузки
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    localStorage.setItem("cookie_consent_date", new Date().toISOString())
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined")
    localStorage.setItem("cookie_consent_date", new Date().toISOString())
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Мы используем cookies
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Для улучшения работы сайта и персонализации рекламы. Продолжая использовать сайт, вы соглашаетесь с{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">политикой конфиденциальности</a>.
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleAccept}
                    className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700"
                  >
                    Принять
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleDecline}
                    className="h-9 px-4 rounded-lg"
                  >
                    Отклонить
                  </Button>
                </div>
              </div>
              <button 
                onClick={() => setShow(false)}
                className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, ArrowRight, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitLead } from "@/lib/utm"
import { reachGoal, GOALS } from "./analytics"
import { formatPhone } from "./phone-input"

export function ExitIntent() {
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Проверяем, показывали ли уже попап
    const shown = sessionStorage.getItem("exit_intent_shown")
    if (shown) return

    let triggered = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Курсор уходит вверх (к закрытию вкладки)
      if (e.clientY <= 0 && !triggered) {
        triggered = true
        sessionStorage.setItem("exit_intent_shown", "true")
        setShow(true)
      }
    }

    // Активируем через 5 секунд после загрузки страницы
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 9 || name.length < 2) return

    setLoading(true)
    setError("")

    const result = await submitLead({
      name,
      phone,
      source: "exit_intent",
    })

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      reachGoal(GOALS.FORM_SUCCESS)
    } else {
      setError(result.error || "Ошибка отправки")
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90dvh] overflow-y-auto"
          >
            {/* Декоративный фон */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            </button>

            <div className="relative p-5 sm:p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 sm:py-6"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Скидка 10% забронирована!
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Менеджер перезвонит и расскажет подробности
                  </p>
                  <Button onClick={handleClose} className="mt-4 sm:mt-6 h-10 sm:h-12 px-6 sm:px-8 rounded-xl text-sm sm:text-base">
                    Отлично
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-3 sm:mb-4">
                      <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">
                      Подождите!
                    </h2>
                    <p className="text-sm sm:text-lg text-slate-600">
                      Получите <span className="text-blue-600 font-bold">скидку 10%</span> на первый заказ
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white shadow-sm flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">10%</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">Персональная скидка</div>
                        <div className="text-xs sm:text-sm text-slate-600">Действует 24 часа</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 text-base"
                      required
                      disabled={loading}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+375 (XX) XXX-XX-XX"
                      className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 text-base"
                      required
                      disabled={loading}
                    />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-sm sm:text-base"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Получить скидку
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-[10px] sm:text-xs text-slate-500 text-center mt-3 sm:mt-4">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

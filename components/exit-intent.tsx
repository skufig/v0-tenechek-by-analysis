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
        reachGoal(GOALS.EXIT_POPUP_SHOW)
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
      reachGoal(GOALS.EXIT_POPUP_SUBMIT)
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Декоративный фон */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>

            <div className="relative p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    Скидка 10% забронирована!
                  </h3>
                  <p className="text-slate-600">
                    Менеджер перезвонит и расскажет подробности
                  </p>
                  <Button onClick={handleClose} className="mt-6 h-12 px-8 rounded-xl">
                    Отлично
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                      Подождите!
                    </h2>
                    <p className="text-lg text-slate-600">
                      Получите <span className="text-blue-600 font-bold">скидку 10%</span> на первый заказ
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">10%</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Персональная скидка</div>
                        <div className="text-sm text-slate-600">Действует 24 часа</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      required
                      disabled={loading}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+375 (XX) XXX-XX-XX"
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                      required
                      disabled={loading}
                    />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Получить скидку
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-slate-500 text-center mt-4">
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

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitLead } from "@/lib/utm"
import { PhoneInput, validatePhone } from "./phone-input"
import { reachGoal, GOALS } from "./analytics"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
  product?: string
}

export function CallbackModal({ isOpen, onClose, source = "modal", product }: CallbackModalProps) {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone(phone) || name.length < 2) return
    
    setLoading(true)
    setError("")
    
    const result = await submitLead({
      name,
      phone,
      source,
      product,
    })
    
    setLoading(false)
    
    if (result.success) {
      setSubmitted(true)
      reachGoal(GOALS.FORM_SUCCESS)
    } else {
      setError(result.error || "Ошибка отправки")
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setPhone("")
      setName("")
      setError("")
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={handleClose} 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90dvh] overflow-y-auto"
          >
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            </button>
            
            <div className="p-5 sm:p-8">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Check className="h-10 w-10 sm:h-12 sm:w-12 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Заявка принята!</h3>
                  <p className="text-slate-600 mt-2 text-sm sm:text-base px-2 max-w-xs mx-auto">Перезвоним в течение 15 минут в рабочее время</p>
                  <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-700 font-medium">
                    Пн-Пт, 9:00-18:00 | Сб, 10:00-15:00
                  </div>
                  <Button 
                    onClick={handleClose}
                    className="mt-5 sm:mt-6 h-11 sm:h-12 px-8 sm:px-10 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
                  >
                    Отлично
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Header with gradient */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 p-3 sm:p-4 -mx-1 sm:-mx-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">Заказать звонок</h3>
                      <p className="text-xs sm:text-sm text-slate-600">Перезвоним за 15 минут</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2 block">Ваше имя</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр"
                        className="w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 text-base"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2 block">Телефон</label>
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        required
                        disabled={loading}
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 text-center">{error}</p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Перезвоните мне"
                      )}
                    </Button>
                    <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </p>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

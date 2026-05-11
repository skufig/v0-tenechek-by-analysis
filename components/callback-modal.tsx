"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 9 && name.length >= 2) {
      setSubmitted(true)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setPhone("")
      setName("")
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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={handleClose}
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
                  <p className="text-slate-600 mt-2">Перезвоним в течение 15 минут в рабочее время (9:00-18:00)</p>
                  <Button 
                    onClick={handleClose}
                    className="mt-6 h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700"
                  >
                    Хорошо
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">Заказать звонок</h3>
                      <p className="text-sm text-slate-500">Перезвоним за 15 минут</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Ваше имя</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр"
                        className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Телефон</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+375 (29) 123-45-67"
                        className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Перезвоните мне
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
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

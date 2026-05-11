"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, Home, Building2, Store, ChevronRight, ArrowRight, Check, Loader2, Zap, Wind, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneInput, validatePhone } from "./phone-input"
import { submitLead } from "@/lib/utm"
import { reachGoal, GOALS } from "./analytics"

const roomTypes = [
  { id: "apartment", label: "Квартира", icon: Home },
  { id: "house", label: "Дом", icon: Building2 },
  { id: "office", label: "Офис / Магазин", icon: Store },
]

const areas = [
  { value: 20, label: "до 20 м²", power: "7", price: 750 },
  { value: 25, label: "20-25 м²", power: "9", price: 850 },
  { value: 35, label: "25-35 м²", power: "12", price: 1100 },
  { value: 50, label: "35-50 м²", power: "18", price: 1600 },
  { value: 70, label: "50-70 м²", power: "24", price: 2200 },
]

const extras = [
  { id: "wifi", label: "Wi-Fi управление", price: 100, icon: Wifi },
  { id: "inverter", label: "Инвертор", price: 200, icon: Zap },
  { id: "heating", label: "Обогрев до -25°C", price: 300, icon: Wind },
]

export function CalculatorSection() {
  const [step, setStep] = useState(1)
  const [roomType, setRoomType] = useState("")
  const [area, setArea] = useState<typeof areas[0] | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const totalPrice = () => {
    if (!area) return 0
    const extrasPrice = selectedExtras.reduce((sum, id) => {
      const extra = extras.find(e => e.id === id)
      return sum + (extra?.price || 0)
    }, 0)
    return area.price + extrasPrice + 400 // +400 за монтаж
  }

  const handleSubmit = async () => {
    if (!validatePhone(phone) || name.length < 2) return

    setLoading(true)
    setError("")

    const result = await submitLead({
      name,
      phone,
      source: "calculator",
      room_type: roomType,
      budget: `${totalPrice()} BYN`,
    })

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      reachGoal(GOALS.FORM_SUCCESS)
    } else {
      setError(result.error || "Ошибка отправки")
    }
  }

  const handleExtraToggle = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id)
        : [...prev, id]
    )
  }

  const nextStep = () => {
    if (step === 1) reachGoal(GOALS.CALC_USE)
    setStep(s => s + 1)
  }

  return (
    <section id="calculator" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            Онлайн расчет
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Рассчитайте стоимость за 30 секунд
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ответьте на 3 вопроса и узнайте точную цену с установкой
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Room Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-sm font-medium text-blue-600">Шаг 1 из 4</span>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                        Выберите тип помещения
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {roomTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => { setRoomType(type.id); nextStep() }}
                          className={`p-4 rounded-2xl border-2 transition-all text-center ${
                            roomType === type.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <type.icon className={`h-8 w-8 mx-auto mb-2 ${roomType === type.id ? "text-blue-600" : "text-slate-400"}`} />
                          <span className="text-sm font-medium text-slate-900">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Area */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-sm font-medium text-blue-600">Шаг 2 из 4</span>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                        Укажите площадь
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {areas.map((a) => (
                        <button
                          key={a.value}
                          onClick={() => { setArea(a); nextStep() }}
                          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                            area?.value === a.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-medium text-slate-900">{a.label}</div>
                            <div className="text-sm text-slate-500">Мощность {a.power} BTU</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">от {a.price} BYN</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-slate-500 hover:text-slate-700">
                      Назад
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Extras */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-sm font-medium text-blue-600">Шаг 3 из 4</span>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                        Дополнительные опции
                      </h3>
                    </div>
                    <div className="space-y-2 mb-6">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => handleExtraToggle(extra.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                            selectedExtras.includes(extra.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                            selectedExtras.includes(extra.id)
                              ? "border-blue-500 bg-blue-500"
                              : "border-slate-300"
                          }`}>
                            {selectedExtras.includes(extra.id) && <Check className="h-4 w-4 text-white" />}
                          </div>
                          <extra.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-slate-900">{extra.label}</div>
                          </div>
                          <div className="font-medium text-slate-600">+{extra.price} BYN</div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Price summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-slate-600">Итого с монтажом:</div>
                          <div className="font-display text-2xl font-bold text-slate-900">{totalPrice()} BYN</div>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                          <div>Кондиционер: {area?.price} BYN</div>
                          <div>Монтаж: 400 BYN</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="px-4 py-3 text-slate-600 hover:text-slate-900">
                        Назад
                      </button>
                      <Button onClick={nextStep} className="flex-1 h-12 rounded-xl">
                        Далее
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && !success && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-sm font-medium text-blue-600">Шаг 4 из 4</span>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                        Получите точный расчет
                      </h3>
                    </div>

                    {/* Price card */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-5 mb-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-blue-100 text-sm">Предварительная стоимость</div>
                          <div className="font-display text-3xl font-bold">{totalPrice()} BYN</div>
                        </div>
                        <div className="text-right text-sm text-blue-100">
                          <div>с установкой</div>
                          <div>под ключ</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white outline-none transition-all"
                        disabled={loading}
                      />
                      <PhoneInput value={phone} onChange={setPhone} disabled={loading} />
                      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                      <Button
                        onClick={handleSubmit}
                        disabled={loading || !validatePhone(phone) || name.length < 2}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600"
                      >
                        {loading ? (
                          <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Отправка...</>
                        ) : (
                          <>Получить расчет<ArrowRight className="h-5 w-5 ml-2" /></>
                        )}
                      </Button>
                    </div>
                    <button onClick={() => setStep(3)} className="mt-4 text-sm text-slate-500 hover:text-slate-700 mx-auto block">
                      Назад
                    </button>
                  </motion.div>
                )}

                {/* Success */}
                {success && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                      Заявка отправлена!
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Менеджер свяжется с вами в т��чение 15 минут и подтвердит стоимость
                    </p>
                    <div className="inline-block bg-blue-50 rounded-xl px-6 py-3">
                      <span className="text-sm text-slate-600">Предварительная цена: </span>
                      <span className="font-bold text-blue-600">{totalPrice()} BYN</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

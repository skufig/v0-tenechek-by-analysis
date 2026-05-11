"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, Building2, Hotel, Maximize2, Thermometer, 
  Volume2, Wifi, Wind, Sparkles, ArrowRight, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roomTypes = [
  { id: "apartment", icon: Home, label: "Квартира", description: "Жилое помещение" },
  { id: "house", icon: Hotel, label: "Частный дом", description: "Загородный дом" },
  { id: "office", icon: Building2, label: "Офис", description: "Коммерческое" },
]

const areaOptions = [
  { value: 20, label: "до 20 м²", power: "7 BTU" },
  { value: 25, label: "20-25 м²", power: "9 BTU" },
  { value: 35, label: "25-35 м²", power: "12 BTU" },
  { value: 50, label: "35-50 м²", power: "18 BTU" },
  { value: 70, label: "50-70 м²", power: "24 BTU" },
]

const features = [
  { id: "inverter", icon: Thermometer, label: "Инверторный", description: "Экономия энергии до 40%" },
  { id: "wifi", icon: Wifi, label: "Wi-Fi управление", description: "Управляй со смартфона" },
  { id: "silent", icon: Volume2, label: "Бесшумный", description: "Комфортный сон" },
  { id: "heater", icon: Wind, label: "Обогрев", description: "Работа зимой" },
  { id: "purifier", icon: Sparkles, label: "Очистка воздуха", description: "Антибактериальный фильтр" },
]

const recommendations = {
  budget: { name: "Eurohoff", price: "от 750 BYN", image: "💨" },
  optimal: { name: "Gree", price: "от 1 200 BYN", image: "❄️" },
  premium: { name: "LG EVO MAX", price: "от 2 800 BYN", image: "✨" },
}

export function Configurator() {
  const [step, setStep] = useState(1)
  const [roomType, setRoomType] = useState<string | null>(null)
  const [area, setArea] = useState<number | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const getRecommendation = () => {
    if (selectedFeatures.length >= 3 || (area && area >= 50)) return "premium"
    if (selectedFeatures.length >= 1 || (area && area >= 35)) return "optimal"
    return "budget"
  }

  const recommendation = recommendations[getRecommendation()]

  return (
    <section id="catalog" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Умный подбор
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance">
            Подберём идеальный<br />кондиционер за 30 секунд
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ответьте на несколько вопросов и получите персональную рекомендацию с учётом ваших требований
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={cn(
                    "w-12 sm:w-20 h-1 mx-2 rounded-full transition-all duration-300",
                    step > s ? "bg-primary" : "bg-secondary"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Room Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-center mb-8">
                  Выберите тип помещения
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {roomTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRoomType(type.id)}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                        roomType === type.id
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <type.icon className={cn(
                        "h-8 w-8 mb-4",
                        roomType === type.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex justify-center pt-6">
                  <Button 
                    size="lg" 
                    onClick={() => setStep(2)} 
                    disabled={!roomType}
                    className="h-12 px-8"
                  >
                    Продолжить
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-center mb-8">
                  Укажите площадь помещения
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {areaOptions.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setArea(opt.value)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 text-center",
                        area === opt.value
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <Maximize2 className={cn(
                        "h-5 w-5 mx-auto mb-2",
                        area === opt.value ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{opt.power}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex justify-center gap-4 pt-6">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)} className="h-12 px-8">
                    Назад
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={() => setStep(3)} 
                    disabled={!area}
                    className="h-12 px-8"
                  >
                    Продолжить
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Features & Result */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-semibold text-center">
                  Какие функции важны для вас?
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <motion.button
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-start gap-3",
                        selectedFeatures.includes(feature.id)
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        selectedFeatures.includes(feature.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      )}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{feature.label}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Recommendation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/20"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-6xl">{recommendation.image}</div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-sm text-primary font-medium mb-1">Рекомендуем для вас</div>
                      <div className="text-2xl font-serif font-semibold">{recommendation.name}</div>
                      <div className="text-muted-foreground mt-1">
                        {area && `Для помещения ${area} м² `}
                        {selectedFeatures.length > 0 && `• ${selectedFeatures.length} опций`}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-serif font-bold text-primary">{recommendation.price}</div>
                      <div className="text-sm text-muted-foreground">с установкой</div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} className="h-12 px-8">
                    Назад
                  </Button>
                  <Button 
                    size="lg" 
                    className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25"
                  >
                    Получить расчёт
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

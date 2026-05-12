"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Phone, Palette, Wifi, Sparkles, Wind, Thermometer, Volume2, Check, ArrowRight, Frame, Image as ImageIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

const GALLERY_STYLES = [
  { id: "classic", label: "Классика", image: "/products/lg-evo-max-07.jpg", description: "Звёздная ночь" },
  { id: "modern", label: "Модерн", image: "/products/lg-evo-max-07.jpg", description: "Абстракция" },
  { id: "photo", label: "Семейное фото", image: "/products/lg-evo-max-07.jpg", description: "Ваше фото" },
  { id: "minimal", label: "Минимализм", image: "/products/lg-evo-max-07.jpg", description: "Зеркало" },
]

export function PremiumPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(GALLERY_STYLES[0])
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const features = [
    { icon: Wifi, title: "Wi-Fi управление", description: "Управляйте с телефона из любой точки мира" },
    { icon: Wind, title: "Инверторный компрессор", description: "Тихая работа и экономия электричества" },
    { icon: Thermometer, title: "Точность ±0.5°C", description: "Идеальная температура без колебаний" },
    { icon: Volume2, title: "21 дБ", description: "Тише шёпота — идеально для спальни" },
  ]

  const process = [
    { step: "01", title: "Консультация", description: "Дизайнер-замерщик приезжает бесплатно, подбирает место и стиль панели" },
    { step: "02", title: "Выбор образа", description: "Подберём раму: багет, алюминий или скрытый монтаж. Любое изображение" },
    { step: "03", title: "Монтаж", description: "Аккуратная установка под ключ за 4-5 часов" },
    { step: "04", title: "Магия", description: "Вы даже не заметите, что это техника, пока не нажмёте кнопку" },
  ]

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-stone-900 tracking-tight">
            Тенёчек
          </Link>
          <a 
            href="tel:+375293989777"
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-stone-100 text-sm mb-8 font-medium tracking-wide"
              >
                <Frame className="w-4 h-4" />
                <span>LG ArtCool Gallery</span>
              </motion.div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6 tracking-tight">
                <span className="text-stone-900">Искусство</span>
                <br />
                <span className="text-stone-500 font-normal italic">быть прохладным</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-stone-600 max-w-lg mb-10 leading-relaxed">
                Кондиционер, который гости примут за дорогую картину. 
                Сменные панели с любым изображением.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-6 text-lg rounded-none tracking-wide"
                >
                  Создать свой арт-объект
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Product visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] bg-white rounded-sm shadow-2xl overflow-hidden border-8 border-stone-800">
                <Image
                  src="/products/lg-evo-max-07.jpg"
                  alt="LG ArtCool Gallery"
                  fill
                  className="object-cover"
                />
                {/* Frame effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" />
              </div>
              {/* Caption */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 shadow-lg">
                <p className="text-xs text-stone-500 font-medium tracking-widest uppercase">Gallery Series</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Style Selector */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-tight">
              Галерея образов
            </h2>
            <p className="text-xl text-stone-600">
              Примерьте разные стили для вашего интерьера
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-stone-100 rounded-sm relative overflow-hidden">
                {/* Room mockup background */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-200 to-stone-100" />
                
                {/* The "painting" */}
                <motion.div
                  key={selectedStyle.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-36 bg-white shadow-xl border-4 border-stone-800"
                >
                  <Image
                    src={selectedStyle.image}
                    alt={selectedStyle.label}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                {/* Furniture hint */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-300/50 to-transparent" />
              </div>
              
              <p className="text-center mt-4 text-stone-500 text-sm">
                Визуализация: {selectedStyle.description}
              </p>
            </motion.div>

            {/* Style options */}
            <div className="grid grid-cols-2 gap-4">
              {GALLERY_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`p-6 rounded-sm border-2 transition-all text-left ${
                    selectedStyle.id === style.id
                      ? 'border-stone-900 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-sm mb-3 flex items-center justify-center ${
                    selectedStyle.id === style.id ? 'bg-stone-900 text-white' : 'bg-stone-200'
                  }`}>
                    {style.id === "photo" ? <User className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                  <h3 className="font-medium mb-1">{style.label}</h3>
                  <p className="text-sm text-stone-500">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-tight">
              Не просто дизайн
            </h2>
            <p className="text-xl text-stone-600">
              За красотой скрываются передовые технологии
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-sm bg-white mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <feature.icon className="w-6 h-6 text-stone-700" />
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-stone-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-tight">
              Процесс покупки
            </h2>
            <p className="text-xl text-stone-400">
              От идеи до искусства на стене
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-stone-700" />
                )}
                <div className="text-5xl font-light text-stone-700 mb-4">{item.step}</div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-stone-50 rounded-sm p-8 md:p-12 border border-stone-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-sm mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>Премиум комплект</span>
                  </div>
                  <h3 className="text-2xl font-light mb-4">LG ArtCool Gallery</h3>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      "Кондиционер с панелью Gallery",
                      "Сменная панель на выбор",
                      "Профессиональный монтаж",
                      "Консультация дизайнера",
                      "Гарантия 5 лет"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-stone-600">
                        <Check className="w-5 h-5 text-stone-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="text-sm text-stone-500 mb-1">Комплект под ключ</div>
                  <div className="text-4xl font-light mb-4">от 3 500 BYN</div>
                  <Button
                    size="lg"
                    onClick={() => setIsCallbackOpen(true)}
                    className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-6 text-lg rounded-none tracking-wide w-full md:w-auto"
                  >
                    <Palette className="w-5 h-5 mr-2" />
                    Записаться на консультацию
                  </Button>
                  <p className="text-xs text-stone-500 mt-3">
                    Выезд дизайнера-замерщика бесплатно
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Frame className="w-16 h-16 text-stone-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-light mb-6 tracking-tight">
              Превратите технику<br />в искусство
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
              Закажите бесплатную консультацию дизайнера. 
              Подберём образ, который идеально впишется в ваш интерьер.
            </p>
            <Button
              size="lg"
              onClick={() => setIsCallbackOpen(true)}
              className="bg-stone-900 hover:bg-stone-800 text-white px-12 py-6 text-lg rounded-none tracking-wide"
            >
              Создать свой арт-объект
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
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

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)}
        source="promo_premium"
      />
    </div>
  )
}

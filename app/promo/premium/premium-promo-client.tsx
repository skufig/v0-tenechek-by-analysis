"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Wifi, Volume2, Shield, Star, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

const galleryImages = [
  { id: 1, name: "Абстракция", color: "from-violet-500 to-purple-600" },
  { id: 2, name: "Природа", color: "from-emerald-500 to-teal-600" },
  { id: 3, name: "Минимализм", color: "from-stone-400 to-stone-600" },
  { id: 4, name: "Искусство", color: "from-amber-500 to-orange-600" },
  { id: 5, name: "Ваше фото", color: "from-rose-500 to-pink-600" },
]

export function PremiumPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [selectedPanel, setSelectedPanel] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-rotate panels
  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setSelectedPanel((prev) => (prev + 1) % galleryImages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  return (
    <div className="min-h-screen bg-stone-950 text-white overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/promo/premium-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-7" primaryColor="#fbbf24" secondaryColor="#d97706" />
            <span className="font-bold text-white">Тенёчек</span>
          </Link>
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
            На главную
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-8 px-4 min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left - Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Эксклюзив
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 leading-tight">
              Искусство
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">климата</span>
            </h1>
            
            <p className="text-lg text-white/60 mb-8 max-w-md mx-auto lg:mx-0">
              LG ArtCool Gallery — кондиционер со сменными панелями. Выберите любое изображение под ваш интерьер.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Wifi className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">19 дБ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">10 лет гарантии</span>
              </div>
            </div>

            {/* Panel selector */}
            <div className="mb-8">
              <div className="text-sm text-white/40 mb-3">Выберите стиль панели:</div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => { setSelectedPanel(idx); setIsAutoPlay(false) }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${img.color} transition-all duration-300 ${
                      selectedPanel === idx 
                        ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-stone-950 scale-110" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                    title={img.name}
                  />
                ))}
              </div>
              <div className="text-xs text-amber-400/80 mt-2">
                {galleryImages[selectedPanel].name}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-semibold px-8 rounded-xl"
              >
                Заказать консультацию
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link href="/#products" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  variant="ghost"
                  className="w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8 rounded-xl"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Весь ассортимент
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Product Card */}
          <div className="flex-1 w-full max-w-md">
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${galleryImages[selectedPanel].color} opacity-20 blur-3xl rounded-3xl transition-all duration-500`} />
              
              {/* Frame with panel */}
              <div className="relative bg-stone-900 rounded-2xl p-3 border border-white/10 shadow-2xl">
                {/* Panel display */}
                <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${galleryImages[selectedPanel].color} mb-3 overflow-hidden relative transition-all duration-500`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/30 text-6xl font-light">LG</div>
                  </div>
                  {/* AC unit overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-stone-800/90 flex items-center justify-center">
                    <div className="flex gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-0.5 h-4 bg-stone-600 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-amber-400 font-medium">LG ArtCool Gallery</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-white/60 text-xs mb-3">
                    Сменная панель + Wi-Fi + установка бесплатно
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">2 331</span>
                      <span className="text-white/60 text-sm ml-1">BYN</span>
                    </div>
                    <span className="text-xs text-white/40 line-through">2 590 BYN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <span>Тенёчек — кондиционеры с установкой</span>
            <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              Разработка netnext.site
            </a>
          </div>
        </footer>
      </main>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_premium" />
    </div>
  )
}

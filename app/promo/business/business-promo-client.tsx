"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building2, TrendingDown, TrendingUp, Users, ThermometerSun, Snowflake, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function BusinessPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [lostMoney, setLostMoney] = useState(0)
  const [showCool, setShowCool] = useState(false)

  // Animated money counter - потери от жары
  useEffect(() => {
    if (showCool) return
    const interval = setInterval(() => {
      setLostMoney(prev => prev + 2.5) // +2.5 BYN каждую секунду
    }, 1000)
    return () => clearInterval(interval)
  }, [showCool])

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/promo/business-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className={`absolute inset-0 transition-all duration-1000 ${showCool ? 'bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-cyan-900/60' : 'bg-gradient-to-br from-red-900/50 via-slate-900/70 to-orange-900/40'}`} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-7" primaryColor="#60a5fa" secondaryColor="#93c5fd" />
            <span className="font-bold text-white">Тенёчек</span>
          </Link>
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
            На главную
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center pt-14">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          
          {/* Toggle switch */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <button
                onClick={() => setShowCool(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${!showCool ? 'bg-red-500 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <ThermometerSun className="w-4 h-4" />
                <span className="text-sm font-medium">Без кондиционера</span>
              </button>
              <button
                onClick={() => setShowCool(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${showCool ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <Snowflake className="w-4 h-4" />
                <span className="text-sm font-medium">С кондиционером</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left side - Stats comparison */}
            <div className="text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-4 transition-all duration-500 ${showCool ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300' : 'bg-red-500/20 border border-red-400/30 text-red-300'}`}>
                <Building2 className="w-4 h-4" />
                {showCool ? 'Комфортный офис' : 'Офис в жару'}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {showCool ? (
                  <>Клиенты выбирают вас,<span className="text-blue-400"> здесь комфортно</span></>
                ) : (
                  <>Клиенты уходят туда,<span className="text-red-400"> где прохладно</span></>
                )}
              </h1>

              {/* Animated stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Lost money / Saved money */}
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-4 transition-all duration-500 ${showCool ? 'border-green-400/30' : 'border-red-400/30'}`}>
                  {showCool ? (
                    <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-400 mb-2" />
                  )}
                  <div className={`text-2xl font-bold mb-1 transition-all ${showCool ? 'text-green-400' : 'text-red-400'}`}>
                    {showCool ? '+15%' : `-${lostMoney.toFixed(0)} BYN`}
                  </div>
                  <div className="text-xs text-white/50">
                    {showCool ? 'Рост продаж' : 'Потери сегодня'}
                  </div>
                </div>

                {/* Productivity */}
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-4 transition-all duration-500 ${showCool ? 'border-blue-400/30' : 'border-orange-400/30'}`}>
                  <Users className="w-6 h-6 text-white/60 mb-2" />
                  <div className={`text-2xl font-bold mb-1 transition-all ${showCool ? 'text-blue-400' : 'text-orange-400'}`}>
                    {showCool ? '100%' : '67%'}
                  </div>
                  <div className="text-xs text-white/50">
                    {showCool ? 'Продуктивность' : 'Эффективность'}
                  </div>
                </div>

                {/* Temperature */}
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-4 transition-all duration-500 ${showCool ? 'border-cyan-400/30' : 'border-red-400/30'}`}>
                  <ThermometerSun className={`w-6 h-6 mb-2 ${showCool ? 'text-cyan-400' : 'text-red-400'}`} />
                  <div className={`text-2xl font-bold mb-1 transition-all ${showCool ? 'text-cyan-400' : 'text-red-400'}`}>
                    {showCool ? '22°C' : '32°C'}
                  </div>
                  <div className="text-xs text-white/50">
                    В офисе
                  </div>
                </div>

                {/* Clients */}
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-4 transition-all duration-500 ${showCool ? 'border-green-400/30' : 'border-red-400/30'}`}>
                  <svg className={`w-6 h-6 mb-2 ${showCool ? 'text-green-400' : 'text-red-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d={showCool ? "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" : "M19 8l-4 4m0-4l4 4"} />
                  </svg>
                  <div className={`text-2xl font-bold mb-1 transition-all ${showCool ? 'text-green-400' : 'text-red-400'}`}>
                    {showCool ? '+30%' : '-40%'}
                  </div>
                  <div className="text-xs text-white/50">
                    {showCool ? 'Больше клиентов' : 'Меньше клиентов'}
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => setIsCallbackOpen(true)}
                  className={`px-8 rounded-xl transition-all ${showCool ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  {showCool ? 'Заказать расчёт' : 'Исправить ситуацию'}
                </Button>
                <Link href="/#products" className="block">
                  <Button 
                    size="lg"
                    variant="ghost"
                    className="w-full border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 rounded-xl"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Весь ассортимент
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Product card */}
            <div className="flex justify-center lg:justify-end">
              <div className={`backdrop-blur-md rounded-3xl border p-5 max-w-sm w-full shadow-2xl transition-all duration-500 ${showCool ? 'bg-blue-500/10 border-blue-400/20 shadow-blue-500/20' : 'bg-white/5 border-white/10 opacity-60 grayscale'}`}>
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 mb-4">
                  <Image
                    src="/products/lg-evo-max-07-full.jpg"
                    alt="LG Evo Max"
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-blue-300 mb-1">Рекомендуем для офиса</div>
                  <h3 className="text-xl font-bold mb-2">LG Evo Max DC07RH</h3>
                  
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-white/50 text-sm ml-1">(203)</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-2xl font-bold">2 331 BYN</span>
                    <span className="text-white/40 line-through">2 590 BYN</span>
                  </div>
                  
                  <div className="text-xs text-green-400 mb-4">
                    Установка бесплатно + гарантия 10 лет
                  </div>
                  
                  <Button 
                    onClick={() => setIsCallbackOpen(true)}
                    className={`w-full rounded-xl transition-all ${showCool ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-600 hover:bg-slate-500'}`}
                    disabled={!showCool}
                  >
                    {showCool ? 'Заказать для офиса' : 'Включите кондиционер'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 py-4 px-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Тенёчек — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_business" />
    </div>
  )
}

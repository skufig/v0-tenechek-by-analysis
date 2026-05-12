"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Sun, Snowflake, ArrowRight, ShoppingBag, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function DachaPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [conditionerAge, setConditionerAge] = useState(5)
  const [daysUntilSummer, setDaysUntilSummer] = useState(0)

  // Calculate days until summer (June 1)
  useEffect(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    let summerStart = new Date(currentYear, 5, 1) // June 1
    
    if (now > summerStart) {
      summerStart = new Date(currentYear + 1, 5, 1)
    }
    
    const diff = Math.ceil((summerStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    setDaysUntilSummer(diff)
  }, [])

  // Trade-in discount based on age
  const getTradeInDiscount = (age: number) => {
    if (age <= 3) return 200
    if (age <= 6) return 150
    if (age <= 10) return 100
    return 50
  }

  const discount = getTradeInDiscount(conditionerAge)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/promo/dacha-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-amber-800/60 to-orange-900/80" />
      </div>

      {/* Floating leaves animation */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {i % 2 === 0 ? '🍃' : '☀️'}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-6 h-7" primaryColor="#fbbf24" secondaryColor="#fcd34d" />
              <span className="font-bold text-white">Тенёчек</span>
            </Link>
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
              На главную
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center px-4 py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left side */}
              <div className="text-center lg:text-left">
                {/* Summer countdown */}
                {daysUntilSummer > 0 && daysUntilSummer < 120 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-200 text-sm mb-6">
                    <Sun className="w-4 h-4" />
                    До лета {daysUntilSummer} дней — успей подготовиться!
                  </div>
                )}

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Кондиционер
                  <br />
                  <span className="text-amber-400">на дачу</span>
                </h1>
                
                <p className="text-lg text-white/70 mb-6 max-w-md mx-auto lg:mx-0">
                  Привезём и установим за 1 день. Работает на обогрев до -15C — пригодится и зимой.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 py-3">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-lg font-bold text-white">50 км</div>
                      <div className="text-xs text-white/50">Бесплатный выезд</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 py-3">
                    <Snowflake className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-lg font-bold text-white">-15C</div>
                      <div className="text-xs text-white/50">Обогрев зимой</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 py-3">
                    <Sun className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="text-lg font-bold text-white">+52C</div>
                      <div className="text-xs text-white/50">Охлаждение в жару</div>
                    </div>
                  </div>
                </div>

                {/* Trade-in calculator */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5 mb-6 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Recycle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-white">Trade-in: сдай старый — получи скидку</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/70 mb-2">
                      <span>Возраст старого кондиционера</span>
                      <span className="text-white font-medium">{conditionerAge} лет</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={conditionerAge}
                      onChange={(e) => setConditionerAge(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>1 год</span>
                      <span>15 лет</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
                    <span className="text-white/80">Ваша скидка:</span>
                    <span className="text-2xl font-bold text-green-400">{discount} BYN</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => setIsCallbackOpen(true)}
                    className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 rounded-xl"
                  >
                    Заказать на дачу
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Link href="/#products" className="w-full sm:w-auto">
                    <Button 
                      size="lg"
                      variant="ghost"
                      className="w-full border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8 rounded-xl"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Весь ассортимент
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right side - Product card */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 max-w-sm w-full shadow-2xl">
                  <div className="text-amber-400 text-sm font-medium mb-2">Хит для дачи</div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4">
                    <Image
                      src="/products/dahatsu-onyx-07t-full.jpg"
                      alt="DAHATSU Onyx"
                      width={300}
                      height={200}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">DAHATSU Onyx DH-07T</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Надёжный, с обогревом до -15C. Компрессор Toshiba, гарантия 5 лет.
                  </p>
                  
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-white">900 BYN</span>
                    <span className="text-white/40 line-through">1 149 BYN</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-lg">-22%</span>
                  </div>

                  <div className="text-xs text-white/50 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Бесплатная установка
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>Тенёчек — кондиционеры с установкой</span>
            <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              Разработка netnext.site
            </a>
          </div>
        </footer>
      </div>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_dacha" />
    </div>
  )
}

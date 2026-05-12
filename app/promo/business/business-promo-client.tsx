"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building2, Wifi, Zap, Clock, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function BusinessPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/promo/business-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left side */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm mb-4">
                <Building2 className="w-4 h-4" />
                Для бизнеса
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                Клиенты уходят туда,
                <span className="text-blue-400"> где прохладно</span>
              </h1>
              
              <p className="text-base text-white/60 mb-5 max-w-md mx-auto lg:mx-0">
                Кондиционер для офиса, салона, кабинета. Тихий, экономичный, с Wi-Fi управлением.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 px-4 py-3">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-xl font-bold text-blue-400">Wi-Fi</div>
                    <div className="text-xs text-white/50">Управление</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 px-4 py-3">
                  <Zap className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-xl font-bold text-green-400">A++</div>
                    <div className="text-xs text-white/50">Экономия 40%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 px-4 py-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-xl font-bold text-amber-400">3 ч</div>
                    <div className="text-xs text-white/50">Монтаж</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 rounded-xl"
                >
                  Заказать расчёт
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
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 max-w-sm w-full shadow-2xl shadow-blue-500/10">
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
                    className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl"
                  >
                    Заказать для офиса
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

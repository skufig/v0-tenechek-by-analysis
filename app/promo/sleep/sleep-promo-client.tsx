"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Moon, Volume2, Star, Check, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function SleepPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleOrder = (product?: string) => {
    setSelectedProduct(product || null)
    setIsCallbackOpen(true)
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/promo/sleep-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
      </div>

      {/* Floating stars */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-6 h-7" primaryColor="#818cf8" secondaryColor="#c7d2fe" />
              <span className="font-bold">Тенёчек</span>
            </Link>
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
              На главную
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center pt-14">
          <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left - Text */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-6">
                  <Moon className="w-4 h-4" />
                  Для детской и спальни
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                  Ребёнок спит крепко
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Вы — отдыхаете
                  </span>
                </h1>
                
                <p className="text-lg text-white/60 mb-6">
                  Кондиционеры тише шёпота. Не разбудят даже в самую чуткую фазу сна.
                </p>

                {/* Noise badge */}
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 px-5 py-3 mb-6">
                  <Volume2 className="w-6 h-6 text-indigo-400" />
                  <div>
                    <div className="text-2xl font-bold text-indigo-400">19 дБ</div>
                    <div className="text-xs text-white/50">Тише шёпота</div>
                  </div>
                </div>

                {/* Features inline */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  {["Ночной режим", "УФ-фильтр", "Установка бесплатно"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-full">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => handleOrder()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl"
                  >
                    Подобрать кондиционер
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Link href="/#products">
                    <Button 
                      size="lg"
                      variant="ghost"
                      className="w-full border border-white/20 text-white hover:bg-white/10 px-6 rounded-xl"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Каталог
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Product Card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-6 border border-indigo-500/30">
                  
                  {/* Product image */}
                  <div className="bg-white/10 rounded-2xl p-4 mb-4">
                    <Image
                      src="/products/toshiba-seiya-07.png"
                      alt="Toshiba SEIYA NEW"
                      width={350}
                      height={250}
                      className="w-full h-auto drop-shadow-xl"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-white/50 ml-1">4.9</span>
                  </div>

                  <h2 className="text-xl font-bold mb-1">Toshiba SEIYA NEW</h2>
                  <p className="text-indigo-300 text-sm mb-3">Идеально для детской</p>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold">1 350 BYN</span>
                    <span className="text-white/40 line-through">1 680 BYN</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-sm rounded">-20%</span>
                  </div>

                  <Button 
                    onClick={() => handleOrder("Toshiba SEIYA NEW")}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl"
                  >
                    Заказать с установкой
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-4 border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Тенёчек — кондиционеры с установкой</Link>
            <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Разработка netnext.site
            </a>
          </div>
        </footer>
      </div>

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
        source="promo_sleep" 
        product={selectedProduct || undefined}
      />
    </div>
  )
}

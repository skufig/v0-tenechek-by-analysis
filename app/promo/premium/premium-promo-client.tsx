"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Wifi, Volume2, Shield, Star, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

const premiumProducts = [
  { 
    id: 1, 
    name: "LG Evo Max", 
    image: "/products/lg-evo-max-07.jpg",
    price: 2331,
    oldPrice: 2590,
    features: "Dual Inverter + УФ-лампа + Wi-Fi",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    id: 2, 
    name: "DAHATSU Mirror", 
    image: "/products/dahatsu-mirror-07i.jpg",
    price: 1590,
    oldPrice: 1900,
    features: "Черный дизайн + Gold Fin",
    color: "from-stone-600 to-stone-800"
  },
  { 
    id: 3, 
    name: "Eurohoff Velvet", 
    image: "/products/eurohoff-velvet-07.jpg",
    price: 1740,
    oldPrice: 2200,
    features: "Голосовое управление + 3D AirFlow",
    color: "from-violet-500 to-purple-600"
  },
  { 
    id: 4, 
    name: "DAHATSU Brilliant", 
    image: "/products/dahatsu-brilliant-07i.jpg",
    price: 1120,
    oldPrice: 1350,
    features: "Компрессор Toshiba + I-feel",
    color: "from-amber-500 to-orange-500"
  },
]

export function PremiumPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-rotate products
  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setSelectedProduct((prev) => (prev + 1) % premiumProducts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const product = premiumProducts[selectedProduct]

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
              Премиум коллекция
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 leading-tight">
              Элитные
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">кондиционеры</span>
            </h1>
            
            <p className="text-lg text-white/60 mb-8 max-w-md mx-auto lg:mx-0">
              Флагманские модели с Wi-Fi, инвертором и расширенной гарантией. Тишина, дизайн и надежность.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Wifi className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">19-21 дБ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/80">5-10 лет гарантии</span>
              </div>
            </div>

            {/* Product selector with images */}
            <div className="mb-8">
              <div className="text-sm text-white/40 mb-3">Выберите модель:</div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {premiumProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => { setSelectedProduct(idx); setIsAutoPlay(false) }}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedProduct === idx 
                        ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-stone-950 scale-110" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                    title={prod.name}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="text-xs text-amber-400/80 mt-2">
                {product.name}
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
              <div className={`absolute -inset-4 bg-gradient-to-r ${product.color} opacity-20 blur-3xl rounded-3xl transition-all duration-500`} />
              
              {/* Card */}
              <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Product image */}
                <div className="aspect-[4/3] relative bg-gradient-to-br from-white/5 to-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-all duration-500"
                  />
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${product.color} text-white`}>
                    Премиум
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-white">{product.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-white/60 text-sm mb-4">
                    {product.features} + установка бесплатно
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold text-white">{product.price.toLocaleString()}</span>
                      <span className="text-white/60 text-sm ml-1">BYN</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-white/40 line-through">{product.oldPrice.toLocaleString()} BYN</span>
                      <div className="text-xs text-green-400">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </div>
                    </div>
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

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_premium" product={product.name} />
    </div>
  )
}

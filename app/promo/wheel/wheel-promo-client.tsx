"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Gift, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

interface WheelProduct {
  id: number
  name: string
  shortName: string
  image: string
  price: number
  oldPrice: number
  discount: number
  color: string
}

const wheelProducts: WheelProduct[] = [
  { id: 1, name: "AUX J-Series Inverter", shortName: "AUX J-Series", image: "/products/aux-classic-07.jpg", price: 1110, oldPrice: 1655, discount: 33, color: "#8b5cf6" },
  { id: 9, name: "Green Triumph Inverter", shortName: "Green Triumph", image: "/products/green-triumph-07.jpg", price: 1090, oldPrice: 1810, discount: 40, color: "#10b981" },
  { id: 10, name: "DAHATSU Onyx DC INVERTER", shortName: "DAHATSU Onyx", image: "/products/dahatsu-onyx-07i.jpg", price: 1140, oldPrice: 1850, discount: 38, color: "#f59e0b" },
  { id: 11, name: "DAHATSU Brilliant DS-07i", shortName: "DAHATSU Brilliant", image: "/products/dahatsu-brilliant-07i.jpg", price: 1240, oldPrice: 1800, discount: 31, color: "#3b82f6" },
  { id: 4, name: "DENKO White Lotus Inverter", shortName: "DENKO Inverter", image: "/products/denko-white-lotus-07i.jpg", price: 2680, oldPrice: 3880, discount: 31, color: "#ec4899" },
  { id: 2, name: "Haier CORAL on/off", shortName: "Haier CORAL", image: "/products/haier-coral-07.jpg", price: 859, oldPrice: 1249, discount: 31, color: "#06b6d4" },
  { id: 13, name: "Eurohoff VELVET IRF-07B", shortName: "Eurohoff VELVET", image: "/products/eurohoff-velvet-07.jpg", price: 1740, oldPrice: 2200, discount: 21, color: "#f97316" },
  { id: 15, name: "DAHATSU Onyx DH-07T", shortName: "DAHATSU DH-07T", image: "/products/dahatsu-onyx-07t.jpg", price: 900, oldPrice: 1149, discount: 22, color: "#a855f7" },
]

export function WheelPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [wonProduct, setWonProduct] = useState<WheelProduct | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const spin = () => {
    if (hasSpun || isSpinning) return
    
    setIsSpinning(true)
    const prizeIndex = Math.floor(Math.random() * wheelProducts.length)
    const segmentAngle = 360 / wheelProducts.length
    const extraSpins = 5 * 360
    const targetRotation = extraSpins + (360 - (prizeIndex * segmentAngle) - segmentAngle / 2)
    
    setRotation(targetRotation)
    
    setTimeout(() => {
      setWonProduct(wheelProducts[prizeIndex])
      setHasSpun(true)
      setIsSpinning(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }, 4000)
  }

  const segmentAngle = 360 / wheelProducts.length

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/promo/wheel-bg.jpg)" }}
      />
      <div className="fixed inset-0 bg-violet-950/70" />
      
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#fbbf24', '#f472b6', '#34d399', '#60a5fa', '#a78bfa'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-violet-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-7" primaryColor="#fbbf24" secondaryColor="#fcd34d" />
            <span className="font-bold">Тенёчек</span>
          </Link>
          <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
            На главную
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative pt-20 pb-12 px-4 min-h-screen flex flex-col items-center justify-center">
        {!hasSpun ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm mb-4">
                <Gift className="w-4 h-4" />
                Розыгрыш скидок до 40%
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                Крутите колесо —
                <br />
                <span className="text-yellow-400">выиграйте скидку!</span>
              </h1>
              
              <p className="text-white/60 max-w-md mx-auto text-sm sm:text-base">
                Реальные скидки на реальные кондиционеры
              </p>
            </div>

            {/* Wheel */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-6">
              <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl animate-pulse" />
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
              </div>
              
              <div 
                className="relative w-full h-full rounded-full border-4 border-yellow-400/50 shadow-2xl overflow-hidden"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                }}
              >
                {wheelProducts.map((product, i) => {
                  const startAngle = i * segmentAngle
                  const midAngle = startAngle + segmentAngle / 2
                  
                  return (
                    <div
                      key={product.id}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)}%)`,
                        backgroundColor: product.color,
                      }}
                    >
                      <div
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                          left: `${50 + 30 * Math.cos((midAngle - 90) * Math.PI / 180)}%`,
                          top: `${50 + 30 * Math.sin((midAngle - 90) * Math.PI / 180)}%`,
                          transform: `translate(-50%, -50%) rotate(${midAngle}deg)`,
                        }}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 overflow-hidden shadow-md mb-1">
                          <Image
                            src={product.image}
                            alt={product.shortName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-white drop-shadow-lg">
                          -{product.discount}%
                        </span>
                      </div>
                    </div>
                  )
                })}
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-violet-950 border-4 border-yellow-400 flex items-center justify-center shadow-xl z-10">
                  <span className="text-[10px] sm:text-xs font-bold text-yellow-400">КРУТИ</span>
                </div>
              </div>
            </div>

            <Button 
              size="lg"
              onClick={spin}
              disabled={isSpinning}
              className="bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-bold px-10 py-6 text-lg rounded-xl disabled:opacity-70 shadow-lg shadow-yellow-400/30 transition-all hover:scale-105"
            >
              {isSpinning ? "Крутится..." : "Крутить колесо!"}
            </Button>
          </>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm mb-6">
              <Gift className="w-4 h-4" />
              Поздравляем!
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Вы выиграли скидку
            </h2>
            <div className="text-5xl sm:text-6xl font-bold text-yellow-400 mb-4">
              -{wonProduct?.discount}%
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white overflow-hidden flex-shrink-0">
                  <Image
                    src={wonProduct?.image || ""}
                    alt={wonProduct?.name || ""}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{wonProduct?.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-yellow-400">{wonProduct?.price} BYN</span>
                    <span className="text-sm text-white/50 line-through">{wonProduct?.oldPrice} BYN</span>
                  </div>
                  <p className="text-xs text-green-400 mt-1">+ бесплатная установка</p>
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-6">
              Чтобы получить скидку, заполните форму ниже. Менеджер свяжется с вами в течение 15 минут.
            </p>
            
            <div className="space-y-3">
              <Button 
                size="lg"
                onClick={() => setIsCallbackOpen(true)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-bold px-8 rounded-xl shadow-lg"
              >
                Забрать скидку
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Link href="/#products" className="block w-full">
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
            
            <p className="text-white/40 text-xs mt-4">
              Скидка действует 24 часа
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative py-6 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Тенёчек — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
        source={`promo_wheel_${wonProduct?.shortName}_-${wonProduct?.discount}%`} 
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Gift, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

const prizes = [
  { label: "100 BYN", color: "#8b5cf6" },
  { label: "Чистка", color: "#3b82f6" },
  { label: "50 BYN", color: "#10b981" },
  { label: "Выезд", color: "#f59e0b" },
  { label: "200 BYN", color: "#ec4899" },
  { label: "75 BYN", color: "#06b6d4" },
]

export function WheelPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [prize, setPrize] = useState("")
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const spin = () => {
    if (hasSpun || isSpinning) return
    
    setIsSpinning(true)
    const prizeIndex = Math.floor(Math.random() * prizes.length)
    const segmentAngle = 360 / prizes.length
    const extraSpins = 5 * 360
    const targetRotation = extraSpins + (360 - (prizeIndex * segmentAngle) - segmentAngle / 2)
    
    setRotation(targetRotation)
    
    setTimeout(() => {
      setPrize(prizes[prizeIndex].label)
      setHasSpun(true)
      setIsSpinning(false)
      setTimeout(() => setIsCallbackOpen(true), 500)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-violet-950/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">Tenechek</Link>
          <a href="tel:+375293989777" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="pt-20 pb-12 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm mb-4">
            <Gift className="w-4 h-4" />
            100% выигрыш
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Крутите колесо —
            <br />
            <span className="text-yellow-400">получите скидку!</span>
          </h1>
          
          <p className="text-white/60 max-w-md mx-auto">
            Скидка применяется к любому кондиционеру
          </p>
        </div>

        {/* Wheel */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-yellow-400" />
          </div>
          
          {/* Wheel SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {prizes.map((p, i) => {
              const angle = 360 / prizes.length
              const startAngle = i * angle - 90
              const endAngle = startAngle + angle
              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180
              
              const x1 = 50 + 48 * Math.cos(startRad)
              const y1 = 50 + 48 * Math.sin(startRad)
              const x2 = 50 + 48 * Math.cos(endRad)
              const y2 = 50 + 48 * Math.sin(endRad)
              
              const textAngle = startAngle + angle / 2
              const textRad = (textAngle * Math.PI) / 180
              const textX = 50 + 32 * Math.cos(textRad)
              const textY = 50 + 32 * Math.sin(textRad)
              
              return (
                <g key={i}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`}
                    fill={p.color}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="5"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                  >
                    {p.label}
                  </text>
                </g>
              )
            })}
            <circle cx="50" cy="50" r="10" fill="#1e1b4b" stroke="white" strokeWidth="1" />
            <text x="50" y="50" fill="white" fontSize="3.5" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
              КРУТИ
            </text>
          </svg>
        </div>

        {/* Button / Result */}
        {!hasSpun ? (
          <Button 
            size="lg"
            onClick={spin}
            disabled={isSpinning}
            className="bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-bold px-10 rounded-xl disabled:opacity-70"
          >
            {isSpinning ? "Крутится..." : "Крутить!"}
          </Button>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-sm text-white/60">Ваш приз:</div>
            <div className="text-3xl font-bold text-yellow-400">{prize}</div>
            <Button 
              size="lg"
              onClick={() => setIsCallbackOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-violet-900 font-bold px-8 rounded-xl"
            >
              Забрать приз
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 max-w-sm mx-auto">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <p className="text-white/50 text-sm">
              Крутите колесо, оставьте заявку — скидка применится к любому кондиционеру из каталога
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <Link href="/" className="hover:text-white">Tenechek — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source={`promo_wheel_${prize}`} />
    </div>
  )
}

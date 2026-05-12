"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Moon, Shield, Wind, Check, ArrowRight, Volume2, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function SleepPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [noiseLevel, setNoiseLevel] = useState(19)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowComparison(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Noise comparison data
  const noiseComparison = [
    { level: 10, label: "Дыхание", color: "bg-green-400" },
    { level: 19, label: "Наш кондиционер", color: "bg-indigo-400", highlight: true },
    { level: 30, label: "Шёпот", color: "bg-yellow-400" },
    { level: 40, label: "Обычный кондиционер", color: "bg-orange-400" },
    { level: 50, label: "Разговор", color: "bg-red-400" },
  ]

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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      </div>

      {/* Floating stars animation */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
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

        {/* Hero */}
        <section className="pt-24 pb-12 px-4 min-h-[70vh] flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-8 animate-fade-in">
              <Moon className="w-4 h-4" />
              Для детской и спальни
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Ребёнок спит крепко
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Вы — отдыхаете
              </span>
            </h1>
            
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Кондиционеры тише шёпота. Не разбудят даже в самую чуткую фазу сна.
            </p>

            {/* Noise meter */}
            <div className="max-w-md mx-auto mb-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Volume2 className="w-8 h-8 text-indigo-400" />
                  <div className="text-5xl font-bold text-indigo-400">19 <span className="text-2xl">дБ</span></div>
                </div>
                <p className="text-white/50 text-sm">Тише шёпота. Тише капающего крана.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => handleOrder()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl text-lg h-14"
              >
                Подобрать кондиционер
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Noise comparison */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Сравните уровень шума</h2>
            
            <div className="space-y-3">
              {noiseComparison.map((item, index) => (
                <div 
                  key={item.label}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-500 ${
                    item.highlight 
                      ? 'bg-indigo-500/20 border border-indigo-500/40 scale-105' 
                      : 'bg-white/5 border border-white/10'
                  }`}
                  style={{
                    opacity: showComparison ? 1 : 0,
                    transform: showComparison ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-12 text-right text-sm font-medium">{item.level} дБ</div>
                  <div className="flex-1">
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ 
                          width: showComparison ? `${(item.level / 60) * 100}%` : '0%',
                          transitionDelay: `${index * 100 + 300}ms`
                        }}
                      />
                    </div>
                  </div>
                  <div className={`text-sm w-40 ${item.highlight ? 'text-indigo-300 font-medium' : 'text-white/60'}`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Moon, title: "Ночной режим", desc: "Автоматически снижает обороты и яркость дисплея", color: "from-indigo-600 to-purple-600" },
                { icon: Shield, title: "УФ-фильтр", desc: "Убивает 99% бактерий и вирусов в воздухе", color: "from-green-600 to-emerald-600" },
                { icon: Wind, title: "3D AirFlow", desc: "Мягкий поток по потолку, без сквозняков на кроватку", color: "from-blue-600 to-cyan-600" },
              ].map((item) => (
                <div 
                  key={item.title} 
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg mb-2">{item.title}</div>
                  <div className="text-white/50 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-indigo-500/30 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
              
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-1 text-yellow-400 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-white/60 ml-2">4.9 (156 отзывов)</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Toshiba SEIYA NEW</h2>
                  <p className="text-indigo-300 text-sm mb-4">Лучший выбор для детской комнаты</p>
                  
                  <p className="text-white/60 mb-6">
                    Японское качество и надёжность. Самый тихий кондиционер в своём классе — всего 19 дБ.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      "19 дБ — тише шёпота", 
                      "Фильтр Ultra Fresh", 
                      "Установка бесплатно", 
                      "Гарантия 5 лет"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-4xl font-bold">1 350 BYN</span>
                    <span className="text-white/40 line-through text-lg">1 680 BYN</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-lg">-20%</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg"
                      onClick={() => handleOrder("Toshiba SEIYA NEW")}
                      className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-xl"
                    >
                      Заказать с установкой
                    </Button>
                    <Link href="/#products">
                      <Button 
                        size="lg"
                        variant="ghost"
                        className="w-full border border-white/20 text-white hover:bg-white/10 px-6 rounded-xl"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Весь ассортимент
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-2xl" />
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Image
                      src="/products/toshiba-seiya-07.png"
                      alt="Toshiba SEIYA NEW"
                      width={400}
                      height={300}
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/promo/sleep-bg.jpg')] opacity-10 bg-cover bg-center" />
              <div className="relative">
                <Moon className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Бесплатный выезд мастера
                </h2>
                <p className="text-indigo-100 mb-6 max-w-md mx-auto">
                  Подберём идеальное место без сквозняков на кроватку. Установим за 2-3 часа.
                </p>
                <Button 
                  size="lg"
                  onClick={() => handleOrder()}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 rounded-xl text-lg"
                >
                  Заказать выезд
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
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

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Moon, Shield, Wind, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

export function SleepPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">Tenechek</Link>
          <a href="tel:+375293989777" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm mb-6">
            <Moon className="w-4 h-4" />
            Для детской и спальни
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Ребёнок спит —
            <br />
            <span className="text-indigo-400">вы отдыхаете</span>
          </h1>
          
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Кондиционер тише шёпота. Не разбудит даже в чуткую фазу сна.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 mb-8">
            <span className="text-4xl font-bold text-indigo-400">19 дБ</span>
            <span className="text-white/60 text-left text-sm">тише<br/>шёпота</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg"
              onClick={() => setIsCallbackOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl"
            >
              Заказать консультацию
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a href="tel:+375293989777" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 rounded-xl w-full">
                Позвонить
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Moon, title: "19 дБ", desc: "Тише капающего крана" },
              { icon: Shield, title: "УФ-фильтр", desc: "Убивает 99% бактерий" },
              { icon: Wind, title: "Без сквозняков", desc: "3D-поток по потолку" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <div className="font-semibold text-lg mb-1">{item.title}</div>
                <div className="text-white/50 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-3xl p-6 sm:p-10 border border-indigo-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-indigo-400 text-sm font-medium mb-2">Рекомендуем</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Toshiba SEIYA NEW</h2>
                <p className="text-white/60 mb-6">
                  Японское качество. Самый тихий в своём классе — идеален для детской.
                </p>
                
                <div className="space-y-2 mb-6">
                  {["19 дБ — не разбудит", "Фильтр Ultra Fresh", "Установка бесплатно", "Гарантия 5 лет"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold">1 350 BYN</span>
                  <span className="text-white/40 line-through">1 680 BYN</span>
                </div>

                <Button 
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-xl"
                >
                  Заказать с установкой
                </Button>
              </div>

              <div className="bg-white/5 rounded-2xl p-6">
                <Image
                  src="/products/toshiba-seiya-07.png"
                  alt="Toshiba SEIYA NEW"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-indigo-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Бесплатный выезд мастера
          </h2>
          <p className="text-indigo-100 mb-6">
            Подберём место без сквозняков. Установим за 3 часа.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 rounded-xl"
          >
            <Phone className="w-4 h-4 mr-2" />
            Заказать выезд
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <Link href="/" className="hover:text-white">Tenechek — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_sleep" />
    </div>
  )
}

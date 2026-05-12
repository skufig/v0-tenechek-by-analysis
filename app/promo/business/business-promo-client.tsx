"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building2, Wifi, Zap, Clock, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function BusinessPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-7" primaryColor="#1e293b" secondaryColor="#64748b" />
            <span className="font-bold">Тенёчек</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            На главную
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm mb-6">
            <Building2 className="w-4 h-4" />
            Для бизнеса
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Клиенты уходят
            <br />
            <span className="text-slate-400">туда, где прохладно</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Кондиционер для офиса, салона, кабинета. Тихий, экономичный, с Wi-Fi.
          </p>

          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl"
          >
            Заказать расчёт
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Wifi, title: "Wi-Fi управление", desc: "Включите заранее с телефона" },
              { icon: Zap, title: "Класс A++", desc: "Экономия до 40% на счетах" },
              { icon: Clock, title: "Монтаж 3 часа", desc: "Без остановки работы" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl border border-slate-200">
                <item.icon className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <div className="font-semibold text-lg mb-1">{item.title}</div>
                <div className="text-slate-500 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-slate-500 text-sm font-medium mb-2">Для офиса и салона</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">LG EVO MAX</h2>
                <p className="text-slate-600 mb-6">
                  Премиальный дизайн. Wi-Fi управление. Класс A++ — не разорит на коммуналке.
                </p>
                
                <div className="space-y-2 mb-6">
                  {["19 дБ — не мешает работать", "Wi-Fi управление", "Установка бесплатно", "Гарантия 10 лет"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold">2 331 BYN</span>
                  <span className="text-slate-400 line-through">2 590 BYN</span>
                </div>

                <Button 
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 px-6 rounded-xl"
                >
                  Заказать для офиса
                </Button>
              </div>

              <div className="bg-slate-100 rounded-2xl p-6">
                <Image
                  src="/products/lg-evo-max-07-full.jpg"
                  alt="LG EVO MAX"
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
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Проект под ключ за 24 часа
          </h2>
          <p className="text-slate-400 mb-6">
            От замера до запуска. Бесплатный выезд специалиста.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-white text-slate-900 hover:bg-slate-100 px-8 rounded-xl"
          >
            Заказать проект
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">Тенёчек — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_business" />
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Home, Thermometer, Shield, Wrench, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

export function DachaPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-amber-50/90 backdrop-blur-lg border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">Tenechek</Link>
          <a href="tel:+375293989777" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+375 29 398-97-77</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600 text-white text-sm mb-6">
            <Home className="w-4 h-4" />
            Для дачи
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            На даче жарко?
            <br />
            <span className="text-amber-600">Решим за 1 день</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Привезём и установим кондиционер за город. Работаем по всей Минской области.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg"
              onClick={() => setIsCallbackOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 rounded-xl"
            >
              Заказать на дачу
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a href="tel:+375293989777">
              <Button size="lg" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 rounded-xl w-full">
                Позвонить
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Thermometer, title: "Обогрев -15C", desc: "Работает и зимой" },
              { icon: Shield, title: "Гарантия 5 лет", desc: "На оборудование и монтаж" },
              { icon: Wrench, title: "Выезд за город", desc: "По всей области" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-200">
                <item.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <div className="font-semibold text-lg mb-1">{item.title}</div>
                <div className="text-slate-500 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade-in */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 sm:p-10 border border-amber-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Trade-in: старый на новый</h2>
              <p className="text-slate-600">Сдайте старый кондиционер — получите скидку до 200 BYN</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { state: "Рабочий", discount: "200 BYN" },
                { state: "С дефектом", discount: "100 BYN" },
                { state: "Нерабочий", discount: "50 BYN" },
              ].map((item) => (
                <div key={item.state} className="bg-white rounded-xl p-4 text-center border border-amber-200">
                  <div className="text-slate-600 text-sm mb-1">{item.state}</div>
                  <div className="text-xl font-bold text-amber-600">{item.discount}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setIsCallbackOpen(true)}
                className="bg-amber-600 hover:bg-amber-500 px-6 rounded-xl"
              >
                Узнать свою скидку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 rounded-3xl p-6 sm:p-10 border border-amber-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-amber-600 text-sm font-medium mb-2">Хит для дачи</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">DAHATSU Onyx</h2>
                <p className="text-slate-600 mb-6">
                  Надёжный, простой, с обогревом до -15C. Идеален для дачного дома.
                </p>
                
                <div className="space-y-2 mb-6">
                  {["Обогрев до -15C", "Компрессор Toshiba", "Установка бесплатно", "Гарантия 5 лет"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold">900 BYN</span>
                  <span className="text-slate-400 line-through">1 149 BYN</span>
                </div>

                <Button 
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-amber-600 hover:bg-amber-500 px-6 rounded-xl"
                >
                  Заказать на дачу
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-amber-200">
                <Image
                  src="/products/dahatsu-onyx-07t-full.jpg"
                  alt="DAHATSU Onyx"
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
      <section className="py-16 px-4 bg-amber-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Выезд за город — бесплатно
          </h2>
          <p className="text-amber-100 mb-6">
            Работаем по всей Минской области. Установим за 1 день.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-white text-amber-600 hover:bg-amber-50 px-8 rounded-xl"
          >
            <Phone className="w-4 h-4 mr-2" />
            Заказать выезд
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-amber-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">Tenechek — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_dacha" />
    </div>
  )
}

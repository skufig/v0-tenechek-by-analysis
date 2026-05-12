"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Palette, Wifi, Volume2, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"
import { Logo } from "@/components/logo"

export function PremiumPromoClient() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-lg border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6 h-7" primaryColor="#44403c" secondaryColor="#a8a29e" />
            <span className="font-bold">Тенёчек</span>
          </Link>
          <Link href="/" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            На главную
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 text-white text-sm mb-6">
            <Palette className="w-4 h-4" />
            LG ArtCool Gallery
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-light mb-4 leading-tight">
            Кондиционер,
            <br />
            <span className="text-stone-400 italic">который примут за картину</span>
          </h1>
          
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
            Сменные панели с любым изображением. Премиальный дизайн для вашего интерьера.
          </p>

          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-stone-900 hover:bg-stone-800 text-white px-8 rounded-sm"
          >
            Заказать консультацию
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="aspect-[4/3] bg-white rounded-sm shadow-xl overflow-hidden border-8 border-stone-800 relative">
            <Image
              src="/products/lg-evo-max-07.jpg"
              alt="LG ArtCool Gallery"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center mt-4 text-stone-500 text-sm">
            Панель можно заменить на любое изображение
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Сменные панели", desc: "Любое изображение" },
              { icon: Wifi, title: "Wi-Fi управление", desc: "С телефона из любой точки" },
              { icon: Volume2, title: "21 дБ", desc: "Тише шёпота" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-sm border border-stone-200">
                <item.icon className="w-8 h-8 text-stone-700 mx-auto mb-3" />
                <div className="font-medium text-lg mb-1">{item.title}</div>
                <div className="text-stone-500 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-100 rounded-sm p-6 sm:p-10 border border-stone-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-stone-500 text-sm font-medium mb-2">Премиум комплект</div>
                <h2 className="text-2xl sm:text-3xl font-light mb-4">LG ArtCool Gallery</h2>
                <p className="text-stone-600 mb-6">
                  Кондиционер с панелью-картиной. Консультация дизайнера и профессиональный монтаж включены.
                </p>
                
                <div className="space-y-2 mb-6">
                  {["Сменная панель на выбор", "Wi-Fi управление", "Установка бесплатно", "Гарантия 5 лет"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-stone-700" />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-light">от 3 500 BYN</span>
                </div>

                <Button 
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-stone-900 hover:bg-stone-800 px-6 rounded-sm"
                >
                  Записаться на консультацию
                </Button>
              </div>

              <div className="bg-white rounded-sm p-6 border border-stone-200">
                <Image
                  src="/products/lg-evo-max-07-full.jpg"
                  alt="LG ArtCool Gallery"
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
      <section className="py-16 px-4 bg-stone-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Превратите технику в искусство
          </h2>
          <p className="text-stone-400 mb-6">
            Бесплатная консультация дизайнера. Подберём образ под ваш интерьер.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsCallbackOpen(true)}
            className="bg-white text-stone-900 hover:bg-stone-100 px-8 rounded-sm"
          >
            <Palette className="w-4 h-4 mr-2" />
            Заказать консультацию
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-stone-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition-colors">Тенёчек — кондиционеры с установкой</Link>
          <a href="https://netnext.site" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">
            Разработка netnext.site
          </a>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="promo_premium" />
    </div>
  )
}

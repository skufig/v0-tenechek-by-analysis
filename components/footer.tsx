"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "./callback-modal"

const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "Монтаж", href: "#portfolio" },
  { label: "Рассрочка", href: "#financing" },
  { label: "Контакты", href: "#contacts" },
]

export function Footer() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <>
      <footer className="bg-slate-50 border-t border-slate-200 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Logo className="w-6 h-8 sm:w-8 sm:h-10" />
                <span className="font-display font-bold text-lg sm:text-xl">Тенёчек</span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4">
                Продажа и установка кондиционеров по всей Беларуси. Работаем с 2023 года.
              </p>
              <Button 
                className="w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-sm"
                onClick={() => setIsCallbackOpen(true)}
              >
                Заказать звонок
              </Button>
            </div>

            {/* Nav */}
            <div>
              <h3 className="font-display font-semibold mb-3 sm:mb-4 text-slate-900 text-sm sm:text-base">Навигация</h3>
              <ul className="space-y-2 sm:space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-semibold mb-3 sm:mb-4 text-slate-900 text-sm sm:text-base">Контакты</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li>
                  <a 
                    href="tel:+375293989777" 
                    className="flex items-center gap-2 sm:gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                    +375 29 398-97-77
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:vtenechke@gmail.com" 
                    className="flex items-center gap-2 sm:gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                    <span className="truncate">vtenechke@gmail.com</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-slate-600">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                  Пн-Пт: 09:00 - 18:00
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-600">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">г. Минск, ул. Ивановская, 43А, каб. 101</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="font-display font-semibold mb-3 sm:mb-4 text-slate-900 text-sm sm:text-base">Реквизиты</h3>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 sm:space-y-2">
                <p>ООО "Тенёчек"</p>
                <p>УНП 193675961</p>
                <p className="text-[10px] sm:text-xs leading-relaxed">
                  Свидетельство о государственной регистрации No 193675961 от 02.03.2023, выдано Минским горисполкомом
                </p>
              </div>
              <div className="mt-3 sm:mt-4 space-y-1">
                <Link href="#" className="block text-[10px] sm:text-xs text-slate-500 hover:text-blue-600">
                  Политика конфиденциальности
                </Link>
                <Link href="#" className="block text-[10px] sm:text-xs text-slate-500 hover:text-blue-600">
                  Договор публичной оферты
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs text-slate-500 text-center sm:text-left">
              {new Date().getFullYear()} Тенёчек. Все права защищены.
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 text-center sm:text-left">
              Интернет-магазин зарегистрирован в Торговом реестре РБ 15.03.2023
            </p>
          </div>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}

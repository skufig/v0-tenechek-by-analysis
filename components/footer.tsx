"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="Тенёчек"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-display font-bold text-xl">Тенёчек</span>
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Продажа и установка кондиционеров по всей Беларуси. Работаем с 2023 года.
              </p>
              <Button 
                className="w-full sm:w-auto h-11 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsCallbackOpen(true)}
              >
                Заказать звонок
              </Button>
            </div>

            {/* Nav */}
            <div>
              <h3 className="font-display font-semibold mb-4 text-slate-900">Навигация</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display font-semibold mb-4 text-slate-900">Контакты</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="tel:+375293989777" 
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    +375 29 398-97-77
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:vtenechke@gmail.com" 
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    vtenechke@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Пн-Пт: 09:00 - 18:00
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  г. Минск, ул. Ивановская, 43А, каб. 101
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-display font-semibold mb-4 text-slate-900">Реквизиты</h3>
              <div className="text-sm text-slate-600 space-y-2">
                <p>ООО "Тенёчек"</p>
                <p>УНП 193675961</p>
                <p className="text-xs leading-relaxed">
                  Свидетельство о государственной регистрации No 193675961 от 02.03.2023, выдано Минским горисполкомом
                </p>
              </div>
              <div className="mt-4 space-y-1">
                <Link href="#" className="block text-xs text-slate-500 hover:text-blue-600">
                  Политика конфиденциальности
                </Link>
                <Link href="#" className="block text-xs text-slate-500 hover:text-blue-600">
                  Договор публичной оферты
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {new Date().getFullYear()} Тенёчек. Все права защищены.
            </p>
            <p className="text-xs text-slate-500">
              Интернет-магазин зарегистрирован в Торговом реестре РБ 15.03.2023
            </p>
          </div>
        </div>
      </footer>

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}

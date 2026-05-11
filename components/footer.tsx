"use client"

import { Phone, Mail, MapPin, MessageCircle, Clock, Instagram, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "Наши работы", href: "#portfolio" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Рассрочка", href: "#financing" },
  { label: "Контакты", href: "#contacts" },
]

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Telegram", href: "https://t.me", icon: Send },
  { label: "WhatsApp", href: "https://wa.me/375293989777", icon: MessageCircle },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border relative">
      <div className="absolute inset-0 noise" />
      
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Продажа и установка кондиционеров по всей Беларуси. Работаем с 2023 года.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-display font-semibold mb-4">Навигация</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:+375293989777" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +375 29 398-97-77
                </a>
              </li>
              <li>
                <a 
                  href="mailto:vtenechke@gmail.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  vtenechke@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Ежедневно: 09:00 - 21:00
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                г. Минск, ул. Ивановская, 43А, каб. 101
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold mb-4">Реквизиты</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>ООО «Тенёчек»</p>
              <p>УНП 193675961</p>
              <p className="text-xs leading-relaxed">
                Свидетельство о государственной регистрации No 193675961 от 02.03.2023, выдано Минским горисполкомом
              </p>
            </div>
            <div className="mt-4 space-y-1">
              <Link href="#" className="block text-xs text-muted-foreground hover:text-foreground">
                Политика конфиденциальности
              </Link>
              <Link href="#" className="block text-xs text-muted-foreground hover:text-foreground">
                Договор публичной оферты
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Тенёчек. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">
            Интернет-магазин зарегистрирован в Торговом реестре РБ 15.03.2023
          </p>
        </div>
      </div>
    </footer>
  )
}

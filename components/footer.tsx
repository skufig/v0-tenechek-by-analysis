"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Instagram, Send } from "lucide-react"
import Link from "next/link"

const navigation = {
  main: [
    { name: "Каталог", href: "#catalog" },
    { name: "Монтаж", href: "#installation" },
    { name: "Рассрочка", href: "#financing" },
    { name: "О нас", href: "#about" },
    { name: "Контакты", href: "#contacts" },
  ],
  legal: [
    { name: "Политика конфиденциальности", href: "#" },
    { name: "Договор публичной оферты", href: "#" },
    { name: "Правила онлайн-оплаты", href: "#" },
  ],
}

const contacts = [
  { icon: Phone, label: "+375 (29) 398-97-77", href: "tel:+375293989777" },
  { icon: Mail, label: "vtenechke@gmail.com", href: "mailto:vtenechke@gmail.com" },
  { icon: MapPin, label: "г. Минск, ул. Ивановская, 43А", href: "#" },
  { icon: Clock, label: "Пн-Пт: 09:00–18:00", href: null },
]

const socials = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/tenechek" },
  { name: "Telegram", icon: Send, href: "https://t.me/tenechek" },
]

export function Footer() {
  return (
    <footer id="contacts" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">Т</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-semibold">Тенёчек</span>
                  <p className="text-xs text-background/60 -mt-0.5">Прохлада в каждый дом</p>
                </div>
              </Link>
              <p className="text-sm text-background/70 mb-6">
                Продажа и профессиональная установка кондиционеров в Минске и по всей Беларуси. Гарантия качества до 10 лет.
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
                Навигация
              </h3>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
                Контакты
              </h3>
              <ul className="space-y-4">
                {contacts.map((contact) => (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors"
                      >
                        <contact.icon className="h-4 w-4 text-primary" />
                        {contact.label}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-background/70">
                        <contact.icon className="h-4 w-4 text-primary" />
                        {contact.label}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
                Документы
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-background/50">
              <p>ООО «Тенёчек», УНП 193675961</p>
              <p>220088, г. Минск, ул. Ивановская, д. 43А, каб.101</p>
            </div>
            <div className="text-xs text-background/50">
              © {new Date().getFullYear()} Тенёчек. Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

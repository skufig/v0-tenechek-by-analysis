"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CallbackModal } from "./callback-modal"

const navItems = [
  { label: "Каталог", href: "#catalog" },
  { label: "Монтаж", href: "#portfolio" },
  { label: "Рассрочка", href: "#financing" },
  { label: "Контакты", href: "#contacts" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Тенёчек"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl tracking-tight">Тенёчек</span>
                <p className="text-xs text-muted-foreground -mt-0.5">Климат под контролем</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a 
                href="tel:+375293989777" 
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden xl:block">
                  <span className="block font-semibold">+375 29 398-97-77</span>
                  <span className="block text-xs text-muted-foreground">Пн-Пт 9:00-18:00</span>
                </div>
              </a>
              
              <Button 
                className="hidden sm:flex h-11 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsCallbackOpen(true)}
              >
                Заказать звонок
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

          {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-[72px] sm:top-20 left-3 right-3 sm:left-4 sm:right-4 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 max-h-[calc(100dvh-90px)] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <a 
                href="tel:+375293989777" 
                className="flex items-center gap-3 px-4 py-3 text-blue-600 font-semibold"
              >
                <Phone className="h-5 w-5" />
                +375 29 398-97-77
              </a>
              <Button 
                className="w-full h-12 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsCallbackOpen(true)
                }}
              >
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      )}

      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}

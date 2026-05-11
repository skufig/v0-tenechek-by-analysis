"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Каталог", href: "#catalog" },
  { label: "Наши работы", href: "#portfolio" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Рассрочка", href: "#financing" },
  { label: "Контакты", href: "#contacts" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          isScrolled ? "glass py-3" : "bg-transparent py-5"
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
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/375293989777"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-10 h-10 rounded-xl bg-green-500/10 items-center justify-center hover:bg-green-500/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
              </a>
              
              <a 
                href="tel:+375293989777" 
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden xl:block">
                  <span className="block">+375 29 398-97-77</span>
                  <span className="block text-xs text-muted-foreground">Ежедневно 9-21</span>
                </div>
              </a>
              
              <Button className="hidden sm:flex h-11 px-6 rounded-xl font-semibold glow">
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
          <div className="fixed inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-24 left-4 right-4 glass rounded-2xl p-6 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium rounded-xl hover:bg-secondary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <a 
                href="tel:+375293989777" 
                className="flex items-center gap-3 px-4 py-3 text-primary font-semibold"
              >
                <Phone className="h-5 w-5" />
                +375 29 398-97-77
              </a>
              <Button className="w-full h-12 rounded-xl font-semibold glow">
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

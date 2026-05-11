"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Каталог", href: "#catalog" },
  { label: "Установка", href: "#installation" },
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-lg border-b border-border" 
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">Т</span>
              </div>
              <span className="font-semibold text-lg">Тенёчек</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a 
                href="tel:+375293989777" 
                className="hidden lg:flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                +375 29 398-97-77
              </a>
              
              <Button size="sm" className="hidden sm:flex">
                Консультация
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
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
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium rounded-lg hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <a 
                href="tel:+375293989777" 
                className="flex items-center gap-2 px-4 py-3 text-primary font-medium"
              >
                <Phone className="h-4 w-4" />
                +375 29 398-97-77
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

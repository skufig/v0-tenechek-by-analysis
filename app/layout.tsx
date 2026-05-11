import type { Metadata, Viewport } from 'next'
import { Outfit, Manrope } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Тенёчек — Кондиционеры с установкой по всей Беларуси',
  description: 'Кондиционеры Gree, LG, Haier с профессиональной установкой от 750 BYN. Гарантия до 10 лет, рассрочка 0%. Доставка по Минску день в день.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${outfit.variable} ${manrope.variable}`} style={{ backgroundColor: '#ffffff' }}>
      <body className="font-body antialiased bg-white text-foreground">
        {children}
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
  title: 'Тенёчек — Кондиционеры с установкой | Минск, Беларусь',
  description: 'Кондиционеры Gree, LG, Haier с профессиональной установкой. От 750 BYN с монтажом. Гарантия 3 года, рассрочка 0%.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

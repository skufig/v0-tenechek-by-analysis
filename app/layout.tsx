import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
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
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${dmSans.variable} bg-background`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}

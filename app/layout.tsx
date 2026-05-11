import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Тенёчек — Кондиционеры с установкой по всей Беларуси',
  description: 'Продажа и профессиональный монтаж кондиционеров в Минске и по всей Беларуси. Гарантия до 10 лет, рассрочка от 95 BYN/мес, доставка день в день.',
  keywords: ['кондиционеры', 'купить кондиционер', 'установка кондиционера', 'Минск', 'Беларусь', 'Тенёчек'],
  authors: [{ name: 'Тенёчек' }],
  openGraph: {
    title: 'Тенёчек — Кондиционеры с установкой по всей Беларуси',
    description: 'Лучшие цены на кондиционеры с профессиональным монтажом. Гарантия до 10 лет.',
    locale: 'ru_BY',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

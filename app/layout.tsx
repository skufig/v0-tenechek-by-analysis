import type { Metadata, Viewport } from 'next'
import { Outfit, Manrope } from 'next/font/google'
import './globals.css'
import { UTMTracker } from '@/components/utm-tracker'
import { YandexMetrika } from '@/components/analytics'
import { StructuredData } from '@/components/structured-data'
import { CookieConsent } from '@/components/cookie-consent'
import { StickyCTA } from '@/components/sticky-cta'
import { SocialProof } from '@/components/social-proof'
import { ExitIntent } from '@/components/exit-intent'
import { Suspense } from 'react'

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
  title: 'Кондиционеры в Минске с установкой | Купить кондиционер — Тенёчек',
  description: 'Купить кондиционер в Минске с установкой от 750 BYN. Кондиционеры LG, Haier, Gree с гарантией до 10 лет. Рассрочка 0%, доставка день в день. ☎ +375 29 398-97-77',
  keywords: ['кондиционеры минск', 'купить кондиционер', 'установка кондиционера', 'кондиционер с установкой', 'сплит система минск', 'кондиционеры беларусь', 'LG кондиционер', 'Haier кондиционер', 'Gree кондиционер'],
  authors: [{ name: 'Тенёчек' }],
  creator: 'Тенёчек',
  publisher: 'Тенёчек',
  formatDetection: {
    telephone: true,
    email: true,
  },
  metadataBase: new URL('https://teneck.top'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_BY',
    url: 'https://teneck.top',
    siteName: 'Тенёчек',
    title: 'Кондиционеры в Минске с установкой | Тенёчек',
    description: 'Купить кондиционер в Минске с установкой от 750 BYN. Гарантия до 10 лет, рассрочка 0%.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Тенёчек — Кондиционеры с установкой',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Кондиционеры в Минске с установкой | Тенёчек',
    description: 'Купить кондиционер в Минске с установкой от 750 BYN. Гарантия до 10 лет.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    yandex: 'подтверждение_яндекс',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${outfit.variable} ${manrope.variable}`} style={{ backgroundColor: '#ffffff' }}>
      <head>
        <StructuredData />
      </head>
      <body className="font-body antialiased bg-white text-foreground">
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        <UTMTracker />
        {children}
        <StickyCTA />
        <SocialProof />
        <ExitIntent />
        <CookieConsent />
      </body>
    </html>
  )
}

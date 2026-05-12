import type { Metadata } from 'next'
import { SleepPromoClient } from './sleep-promo-client'

export const metadata: Metadata = {
  title: 'Тихий кондиционер для детской и спальни | 19 дБ — Тенёчек',
  description: 'Кондиционер для детской комнаты с уровнем шума 19 дБ — тише шёпота. УФ-лампа убивает 99.9% вирусов. Дети не просыпаются и не болеют. Бесплатный расчёт места установки без сквозняков.',
  keywords: ['кондиционер для детской', 'тихий кондиционер', 'кондиционер для спальни', 'бесшумный кондиционер', 'кондиционер 19 дб', 'кондиционер без сквозняков'],
  openGraph: {
    title: 'Тихий кондиционер для детской — 19 дБ, тише шёпота',
    description: 'Дети не просыпаются и не болеют. УФ-лампа убивает 99.9% вирусов.',
    url: 'https://teneck.top/promo/sleep',
    images: [{ url: '/og-sleep.jpg', width: 1200, height: 630 }],
  },
}

export default function SleepPromoPage() {
  return <SleepPromoClient />
}

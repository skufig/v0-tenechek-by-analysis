import type { Metadata } from 'next'
import { BusinessPromoClient } from './business-promo-client'

export const metadata: Metadata = {
  title: 'Кондиционеры для офиса и бизнеса | ROI калькулятор — Тенёчек',
  description: 'Кондиционеры для офиса, салона красоты, кабинета врача. Калькулятор потерь от жары. Установка за 3 часа без остановки бизнеса. LG EVO MAX с Wi-Fi и A++ энергоклассом.',
  keywords: ['кондиционер для офиса', 'кондиционер для салона красоты', 'кондиционер для бизнеса', 'коммерческий кондиционер', 'кондиционер для кабинета'],
  openGraph: {
    title: 'Кондиционеры для бизнеса — посчитайте, сколько теряете',
    description: 'Клиенты уходят туда, где прохладно. Калькулятор потерь + установка за 3 часа.',
    url: 'https://teneck.top/promo/business',
    images: [{ url: '/og-business.jpg', width: 1200, height: 630 }],
  },
}

export default function BusinessPromoPage() {
  return <BusinessPromoClient />
}

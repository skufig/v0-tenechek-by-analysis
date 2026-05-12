import type { Metadata } from 'next'
import { DachaPromoClient } from './dacha-promo-client'

export const metadata: Metadata = {
  title: 'Кондиционер на дачу с установкой | Trade-in старого — Тенёчек',
  description: 'Приедем с кондиционером к вашему дому за 30 минут. Покажем, установим, уберём мусор. Старый кондиционер вывезем бесплатно. Скидка по Trade-in до 300 BYN.',
  keywords: ['кондиционер на дачу', 'кондиционер в частный дом', 'trade-in кондиционер', 'выездной шоурум', 'утилизация кондиционера'],
  openGraph: {
    title: 'Кондиционер на дачу — приедем, покажем, установим',
    description: 'Выездной шоурум. Старый хлам вывезем бесплатно.',
    url: 'https://teneck.top/promo/dacha',
    images: [{ url: '/og-dacha.jpg', width: 1200, height: 630 }],
  },
}

export default function DachaPromoPage() {
  return <DachaPromoClient />
}

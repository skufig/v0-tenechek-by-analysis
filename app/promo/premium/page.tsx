import type { Metadata } from 'next'
import { PremiumPromoClient } from './premium-promo-client'

export const metadata: Metadata = {
  title: 'LG ArtCool Gallery — кондиционер как картина | Тенёчек',
  description: 'Премиальный кондиционер LG ArtCool Gallery с рамкой под картину. Инверторный, Wi-Fi управление, сменные панели с любым изображением. Для дизайнерских интерьеров.',
  keywords: ['LG ArtCool Gallery', 'дизайнерский кондиционер', 'кондиционер картина', 'премиальный кондиционер', 'кондиционер для дизайнера'],
  openGraph: {
    title: 'LG ArtCool Gallery — искусство быть прохладным',
    description: 'Кондиционер, который гости примут за дорогую картину',
    url: 'https://teneck.top/promo/premium',
    images: [{ url: '/og-premium.jpg', width: 1200, height: 630 }],
  },
}

export default function PremiumPromoPage() {
  return <PremiumPromoClient />
}

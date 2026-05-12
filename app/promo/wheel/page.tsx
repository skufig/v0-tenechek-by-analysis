import type { Metadata } from 'next'
import { WheelPromoClient } from './wheel-promo-client'

export const metadata: Metadata = {
  title: 'Колесо фортуны — выиграй скидку до 500 BYN | Тенёчек',
  description: 'Крутите колесо — выигрывайте скидки на кондиционеры до 500 BYN, бесплатную установку или подарки. Каждый второй выигрывает!',
  keywords: ['акция кондиционеры', 'скидка на кондиционер', 'бесплатная установка', 'колесо фортуны', 'розыгрыш'],
  openGraph: {
    title: 'Крутите колесо — выиграйте скидку до 500 BYN',
    description: 'Каждый второй выигрывает! Скидки, бесплатная установка, подарки.',
    url: 'https://teneck.top/promo/wheel',
    images: [{ url: '/og-wheel.jpg', width: 1200, height: 630 }],
  },
}

export default function WheelPromoPage() {
  return <WheelPromoClient />
}

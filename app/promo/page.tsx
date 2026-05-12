import type { Metadata } from 'next'
import Link from "next/link"
import { Moon, Building2, Home, Gift, Frame, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: 'Промо-акции на кондиционеры | Тенёчек',
  description: 'Специальные предложения на кондиционеры: скидки до 32%, бесплатная установка, trade-in старого оборудования.',
}

const promoPages = [
  {
    href: "/promo/sleep",
    icon: Moon,
    title: "Детская и спальня",
    description: "Тихий кондиционер 19 дБ с УФ-лампой для здорового сна",
    color: "from-indigo-600 to-purple-600",
    tag: "Для семей с детьми"
  },
  {
    href: "/promo/business",
    icon: Building2,
    title: "Бизнес и офис",
    description: "Калькулятор потерь от жары. Установка за 3 часа без остановки работы",
    color: "from-slate-700 to-slate-900",
    tag: "Для бизнеса"
  },
  {
    href: "/promo/dacha",
    icon: Home,
    title: "Дача и частный дом",
    description: "Выездной шоурум. Trade-in старого кондиционера — скидка до 300 BYN",
    color: "from-amber-500 to-amber-700",
    tag: "Для 45+"
  },
  {
    href: "/promo/wheel",
    icon: Gift,
    title: "Колесо фортуны",
    description: "Крутите и выигрывайте скидки до 500 BYN или бесплатную установку",
    color: "from-purple-600 to-pink-600",
    tag: "Геймификация"
  },
  {
    href: "/promo/premium",
    icon: Frame,
    title: "LG ArtCool Gallery",
    description: "Премиум кондиционер как картина. Для дизайнерских интерьеров",
    color: "from-stone-600 to-stone-900",
    tag: "Премиум"
  },
]

export default function PromoIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4 inline-block">
            ← На главную
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Промо-страницы
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            Специальные предложения для разных аудиторий
          </p>
        </div>
      </header>

      {/* Promo cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoPages.map((promo) => (
            <Link
              key={promo.href}
              href={promo.href}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
            >
              <div className={`h-32 bg-gradient-to-br ${promo.color} p-6 flex items-end`}>
                <promo.icon className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-6">
                <div className="inline-flex px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-3">
                  {promo.tag}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {promo.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h2>
                <p className="text-slate-600 text-sm">
                  {promo.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

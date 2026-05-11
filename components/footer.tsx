import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">Т</span>
              </div>
              <span className="font-semibold text-lg">Тенёчек</span>
            </Link>
            <p className="text-sm text-background/70">
              Кондиционеры с установкой по всей Беларуси
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-medium mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#catalog" className="hover:text-background">Каталог</Link></li>
              <li><Link href="#installation" className="hover:text-background">Установка</Link></li>
              <li><Link href="#contacts" className="hover:text-background">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+375293989777">+375 29 398-97-77</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:vtenechke@gmail.com">vtenechke@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Минск, ул. Ивановская, 43А</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4">Реквизиты</h3>
            <p className="text-sm text-background/70">
              ООО «Тенёчек»<br />
              УНП 193675961<br />
              г. Минск
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Тенёчек. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

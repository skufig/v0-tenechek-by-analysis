import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl xs:text-3xl md:text-4xl font-bold text-slate-900 mb-6 sm:mb-8">
            Договор публичной оферты
          </h1>
          
          <div className="prose prose-slate max-w-none prose-sm sm:prose-base">
            <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6">
              Дата вступления в силу: 1 января 2025 года
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              1. Общие положения
            </h2>
            <p className="text-slate-600 mb-4">
              Настоящий договор является официальным предложением (публичной офертой) 
              ООО «Тенёчек» (далее — Исполнитель) и содержит все существенные условия 
              по продаже и установке климатического оборудования.
            </p>
            <p className="text-slate-600 mb-4">
              В соответствии с п. 2 ст. 407 Гражданского кодекса Республики Беларусь, 
              в случае принятия изложенных ниже условий, лицо, производящее акцепт 
              данной оферты, становится Заказчиком.
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              2. Предмет договора
            </h2>
            <p className="text-slate-600 mb-4">
              Исполнитель обязуется:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Осуществить продажу климатического оборудования (кондиционеры, сплит-системы)</li>
              <li>Выполнить монтажные работы по установке оборудования</li>
              <li>Предоставить гарантийное обслуживание</li>
            </ul>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              3. Порядок заключения договора
            </h2>
            <p className="text-slate-600 mb-4">
              Договор считается заключенным с момента:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Оформления заявки на сайте teneck.top или по телефону</li>
              <li>Подтверждения заказа менеджером</li>
              <li>Внесения предоплаты (при необходимости)</li>
            </ul>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              4. Цены и порядок оплаты
            </h2>
            <p className="text-slate-600 mb-4">
              Цены на товары и услуги указаны на сайте и могут быть изменены Исполнителем 
              в одностороннем порядке. Цена, действующая на момент оформления заказа, 
              является окончательной для данного заказа.
            </p>
            <p className="text-slate-600 mb-4">
              Способы оплаты:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Наличными при получении товара/после монтажа</li>
              <li>Безналичным расчетом (ЕРИП, банковский перевод)</li>
              <li>Банковской картой</li>
              <li>В рассрочку/кредит (при одобрении банком)</li>
            </ul>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              5. Доставка и монтаж
            </h2>
            <p className="text-slate-600 mb-4">
              Сроки доставки и монтажа согласовываются индивидуально и зависят от 
              наличия товара на складе и загруженности монтажных бригад. 
              Стандартный срок — 1-5 рабочих дней.
            </p>
            <p className="text-slate-600 mb-4">
              Монтаж выполняется квалифицированными специалистами с соблюдением 
              всех технических норм и требований производителя оборудования.
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              6. Гарантийные обязательства
            </h2>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Гарантия на оборудование — согласно условиям производителя (от 2 до 5 лет)</li>
              <li>Гарантия на монтажные работы — 2 года</li>
              <li>Бесплатный выезд специалиста при гарантийном случае</li>
            </ul>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              7. Возврат и обмен
            </h2>
            <p className="text-slate-600 mb-4">
              Возврат товара надлежащего качества возможен в течение 14 дней с момента 
              покупки при сохранении товарного вида, упаковки и документов. 
              Установленное оборудование возврату не подлежит.
            </p>
            <p className="text-slate-600 mb-4">
              Возврат товара ненадлежащего качества осуществляется в соответствии с 
              Законом Республики Беларусь «О защите прав потребителей».
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              8. Ответственность сторон
            </h2>
            <p className="text-slate-600 mb-4">
              Стороны несут ответственность за неисполнение или ненадлежащее исполнение 
              своих обязательств в соответствии с законодательством Республики Беларусь.
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              9. Форс-мажор
            </h2>
            <p className="text-slate-600 mb-4">
              Стороны освобождаются от ответственности за частичное или полное неисполнение 
              обязательств, если оно явилось следствием обстоятельств непреодолимой силы.
            </p>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              10. Реквизиты Исполнителя
            </h2>
            <div className="text-slate-600 mb-4 space-y-1">
              <p><strong>ООО «Тенёчек»</strong></p>
              <p>УНП: 193675961</p>
              <p>Юридический адрес: г. Минск, ул. Ивановская, 43А, каб. 101</p>
              <p>Телефон: +375 (29) 398-97-77</p>
              <p>Email: vtenechke@gmail.com</p>
            </div>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
              11. Заключительные положения
            </h2>
            <p className="text-slate-600 mb-4">
              Исполнитель оставляет за собой право вносить изменения в настоящий договор. 
              Изменения вступают в силу с момента их публикации на сайте. 
              Актуальная версия договора всегда доступна на данной странице.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Политика конфиденциальности
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Дата вступления в силу: 1 января 2025 года
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              1. Общие положения
            </h2>
            <p className="text-slate-600 mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
              персональных данных пользователей сайта tenechek.by (далее — «Сайт»), 
              принадлежащего ИП «Тенёчек» (далее — «Оператор»).
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              2. Какие данные мы собираем
            </h2>
            <p className="text-slate-600 mb-4">
              При использовании Сайта мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Имя и контактный телефон (при заполнении формы заявки)</li>
              <li>Данные о посещении сайта (IP-адрес, тип браузера, время посещения)</li>
              <li>Информация о переходах с рекламных источников (UTM-метки)</li>
              <li>Cookies и аналогичные технологии</li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              3. Цели обработки данных
            </h2>
            <p className="text-slate-600 mb-4">
              Мы используем собранные данные для:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Связи с вами по оставленной заявке</li>
              <li>Улучшения качества обслуживания</li>
              <li>Анализа эффективности рекламных кампаний</li>
              <li>Персонализации контента и рекламы</li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              4. Использование cookies
            </h2>
            <p className="text-slate-600 mb-4">
              Сайт использует cookies для:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Сохранения данных об источнике перехода (UTM-метки)</li>
              <li>Работы сервисов аналитики (Яндекс.Метрика)</li>
              <li>Показа персонализированной рекламы</li>
              <li>Запоминания ваших предпочтений</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Вы можете отключить cookies в настройках браузера, однако это может 
              повлиять на функциональность сайта.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              5. Передача данных третьим лицам
            </h2>
            <p className="text-slate-600 mb-4">
              Мы не продаем и не передаем ваши персональные данные третьим лицам, 
              за исключением случаев:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Получения вашего согласия</li>
              <li>Требований законодательства Республики Беларусь</li>
              <li>Использования сервисов аналитики (в обезличенном виде)</li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              6. Защита данных
            </h2>
            <p className="text-slate-600 mb-4">
              Мы принимаем необходимые организационные и технические меры для защиты 
              ваших персональных данных от несанкционированного доступа, изменения, 
              раскрытия или уничтожения.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              7. Ваши права
            </h2>
            <p className="text-slate-600 mb-4">
              Вы имеете право:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Получить информацию о хранимых данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              8. Контакты
            </h2>
            <p className="text-slate-600 mb-4">
              По всем вопросам, связанным с обработкой персональных данных, 
              вы можете обратиться:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Телефон: +375 (29) 398-97-77</li>
              <li>Email: info@tenechek.by</li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-8 mb-4">
              9. Изменения политики
            </h2>
            <p className="text-slate-600 mb-4">
              Мы оставляем за собой право вносить изменения в настоящую Политику. 
              Актуальная версия всегда доступна на данной странице.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

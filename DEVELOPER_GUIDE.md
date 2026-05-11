# Тенёчек - Полная документация проекта

## Общая информация

- **Название проекта:** Тенёчек
- **Домен:** teneck.top
- **Тип:** Landing page для продажи кондиционеров в Беларуси
- **Стек:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion
- **Деплой:** Vercel

---

## Структура проекта

```
├── app/
│   ├── page.tsx              # Главная страница (собирает все компоненты)
│   ├── layout.tsx            # Root layout с шрифтами и метаданными
│   ├── globals.css           # Глобальные стили + Tailwind
│   └── api/
│       └── leads/
│           └── route.ts      # API для обработки заявок
│
├── components/
│   ├── header.tsx            # Шапка сайта с навигацией
│   ├── hero.tsx              # Главный экран с квизом
│   ├── trust-block.tsx       # Блок доверия (гарантии, бренды)
│   ├── products.tsx          # Каталог кондиционеров
│   ├── calculator.tsx        # Калькулятор стоимости
│   ├── financing.tsx         # Блок рассрочки
│   ├── contact-form.tsx      # Форма обратной связи
│   ├── footer.tsx            # Подвал сайта
│   ├── sticky-cta.tsx        # Плавающая кнопка "Заказать звонок"
│   ├── callback-modal.tsx    # Модалка заказа звонка
│   ├── phone-input.tsx       # Компонент ввода телефона
│   └── logo.tsx              # SVG логотип
│
├── lib/
│   ├── integrations.ts       # Интеграции (amoCRM, Telegram)
│   └── types.ts              # TypeScript типы
│
└── public/
    └── products/             # Изображения кондиционеров
```

---

## Переменные окружения (Environment Variables)

Создай файл `.env.local` или добавь в Vercel Dashboard:

```env
# ===== amoCRM =====
AMOCRM_SUBDOMAIN=stepanovvo002
AMOCRM_ACCESS_TOKEN=<долгосрочный_токен>
AMOCRM_REFRESH_TOKEN=<refresh_токен>
AMOCRM_CLIENT_ID=814a390b-7fef-4efe-8549-5d1a863b64fd
AMOCRM_CLIENT_SECRET=ym4fnU0XLZGoHXmFVyKJPv7aBc5xIXejY8rpXzZcCzJtYztXEmfhVm7bvKHI6CF8
AMOCRM_PIPELINE_ID=6494726
AMOCRM_STATUS_ID=<id_статуса_в_воронке>

# ===== Telegram (опционально) =====
TELEGRAM_BOT_TOKEN=<токен_бота>
TELEGRAM_CHAT_ID=<id_чата_для_уведомлений>
```

---

## Настройка amoCRM (пошаговая инструкция)

### Шаг 1: Данные интеграции (уже есть)

- **Subdomain:** `stepanovvo002`
- **Client ID:** `814a390b-7fef-4efe-8549-5d1a863b64fd`
- **Client Secret:** `ym4fnU0XLZGoHXmFVyKJPv7aBc5xIXejY8rpXzZcCzJtYztXEmfhVm7bvKHI6CF8`
- **Pipeline ID:** `6494726`

### Шаг 2: Получение Access Token

1. Перейди в amoCRM → Настройки → Интеграции
2. Найди интеграцию "Сайт teneck.top"
3. Перейди во вкладку "Ключи и доступы"
4. Нажми "Обновить ключ" для получения нового кода авторизации
5. **В течение 20 минут** выполни запрос:

```bash
curl -X POST "https://stepanovvo002.amocrm.ru/oauth2/access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "814a390b-7fef-4efe-8549-5d1a863b64fd",
    "client_secret": "ym4fnU0XLZGoHXmFVyKJPv7aBc5xIXejY8rpXzZcCzJtYztXEmfhVm7bvKHI6CF8",
    "grant_type": "authorization_code",
    "code": "ВСТАВЬ_НОВЫЙ_КОД_СЮДА",
    "redirect_uri": "https://teneck.top/api/amocrm/callback"
  }'
```

6. В ответе получишь:
```json
{
  "token_type": "Bearer",
  "expires_in": 86400,
  "access_token": "xxxxx",    // ← сохрани в AMOCRM_ACCESS_TOKEN
  "refresh_token": "xxxxx"    // ← сохрани в AMOCRM_REFRESH_TOKEN
}
```

### Шаг 3: Получение Status ID (опционально)

Чтобы узнать ID статусов в воронке:

```bash
curl -X GET "https://stepanovvo002.amocrm.ru/api/v4/leads/pipelines/6494726" \
  -H "Authorization: Bearer ТВОЙ_ACCESS_TOKEN"
```

Ответ покажет все статусы воронки, выбери нужный `status_id`.

### Шаг 4: Обновление токенов

Access token истекает через 24 часа. Для обновления:

```bash
curl -X POST "https://stepanovvo002.amocrm.ru/oauth2/access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "814a390b-7fef-4efe-8549-5d1a863b64fd",
    "client_secret": "ym4fnU0XLZGoHXmFVyKJPv7aBc5xIXejY8rpXzZcCzJtYztXEmfhVm7bvKHI6CF8",
    "grant_type": "refresh_token",
    "refresh_token": "ТВОЙ_REFRESH_TOKEN",
    "redirect_uri": "https://teneck.top/api/amocrm/callback"
  }'
```

**ВАЖНО:** После каждого обновления сохраняй новый `refresh_token` - он одноразовый!

---

## Формы на сайте и что они отправляют

### 1. Hero Quiz (components/hero.tsx)

Квиз из 4 шагов:
- Тип помещения (квартира/дом/офис)
- Площадь (до 25м² / 25-50м² / 50+ м²)
- Важные функции (охлаждение/обогрев/WiFi/тихая работа)
- Контактные данные (имя + телефон)

**Отправляет в API:**
```json
{
  "name": "Имя",
  "phone": "+375291234567",
  "source": "hero_quiz",
  "quizData": {
    "roomType": "apartment",
    "area": "25-50",
    "features": ["cooling", "wifi"]
  }
}
```

### 2. Callback Modal (components/callback-modal.tsx)

Модальное окно "Заказать звонок" (открывается из sticky CTA и других мест)

**Отправляет:**
```json
{
  "name": "Имя",
  "phone": "+375291234567",
  "source": "callback_modal"
}
```

### 3. Calculator (components/calculator.tsx)

Калькулятор стоимости с выбором:
- Площадь (слайдер)
- Тип кондиционера
- Дополнительные услуги

**Отправляет:**
```json
{
  "name": "Имя",
  "phone": "+375291234567",
  "source": "calculator",
  "calculatorData": {
    "area": 45,
    "conditionerType": "inverter",
    "services": ["installation", "warranty"],
    "totalPrice": 2500
  }
}
```

### 4. Contact Form (components/contact-form.tsx)

Простая форма внизу страницы

**Отправляет:**
```json
{
  "name": "Имя",
  "phone": "+375291234567",
  "source": "contact_form"
}
```

### 5. Product Modal (внутри components/products.tsx)

Заявка на конкретный кондиционер

**Отправляет:**
```json
{
  "name": "Имя",
  "phone": "+375291234567",
  "source": "product_order",
  "productData": {
    "id": "hisense-as-09",
    "name": "Hisense AS-09HR4SYDDJ",
    "price": 1290
  }
}
```

---

## API Endpoint

### POST /api/leads

**Файл:** `app/api/leads/route.ts`

**Принимает:**
```typescript
{
  name: string;
  phone: string;
  source: string;
  quizData?: object;
  calculatorData?: object;
  productData?: object;
}
```

**Делает:**
1. Валидирует данные
2. Отправляет в amoCRM (создает лид + контакт)
3. Отправляет в Telegram (если настроен)
4. Возвращает `{ success: true }` или ошибку

---

## Телефоны и контакты на сайте

В коде используются:
- **Телефон:** +375 29 398-97-77
- **Email:** (не указан, добавь при необходимости)

Чтобы изменить телефон, найди и замени во всех файлах:
```bash
grep -r "398-97-77" --include="*.tsx"
```

---

## Деплой на Vercel

1. Подключи GitHub репозиторий к Vercel
2. Добавь все переменные окружения в Settings → Environment Variables
3. Деплой произойдет автоматически

---

## Чеклист перед запуском

- [ ] Получен и сохранен `AMOCRM_ACCESS_TOKEN`
- [ ] Получен и сохранен `AMOCRM_REFRESH_TOKEN`
- [ ] Указан правильный `AMOCRM_STATUS_ID` (или убрать из кода)
- [ ] Настроен Telegram бот (опционально)
- [ ] Проверены все телефоны на сайте
- [ ] Протестирована отправка форм
- [ ] Проверено создание лидов в amoCRM

---

## Чего НЕТ в проекте (возможные доработки)

### 1. Админ-панель
Админки нет. Все заявки идут напрямую в amoCRM. Если нужна админка:
- Можно добавить `/admin` роут с авторизацией
- Подключить базу данных (Supabase/Neon) для хранения заявок локально
- Сделать dashboard со статистикой

### 2. База данных
Сейчас нет БД - заявки только в amoCRM + Telegram. Для добавления:
- Рекомендую Supabase (бесплатный тариф)
- Создать таблицу `leads` для дублирования заявок
- Добавить таблицу `products` если нужно управлять каталогом

### 3. Авторизация
Нет системы авторизации. Если нужна (например, для админки):
- Supabase Auth (проще всего)
- Или NextAuth.js

### 4. Автообновление токенов amoCRM
Сейчас токены нужно обновлять вручную каждые 24 часа. Для автоматизации:
- Добавить cron job (Vercel Cron) для обновления токенов
- Хранить токены в БД вместо env переменных

### 5. Аналитика
Не подключены:
- Яндекс.Метрика
- Google Analytics
- Facebook Pixel

Для подключения добавить скрипты в `app/layout.tsx`

### 6. SEO
Базовые мета-теги есть. Можно улучшить:
- Добавить sitemap.xml
- Добавить robots.txt
- Разметка Schema.org для товаров

### 7. Управление товарами
Каталог захардкожен в `components/products.tsx`. Для динамического управления:
- Подключить CMS (Sanity, Strapi)
- Или хранить в Supabase

---

## Структура данных в amoCRM

При создании лида отправляется:
- **Название лида:** `Заявка с сайта: {source}`
- **Контакт:** имя + телефон
- **Примечание:** JSON со всеми данными (quizData, calculatorData, productData)

Кастомные поля в amoCRM не настроены. Если нужны - добавить их в amoCRM и обновить `lib/integrations.ts`.

---

## Полезные команды

```bash
# Запуск локально
pnpm dev

# Сборка
pnpm build

# Поиск телефона по всем файлам
grep -r "398-97-77" --include="*.tsx"

# Поиск всех форм
grep -r "handleSubmit" --include="*.tsx"
```

---

## Контакты разработки

Проект создан с помощью v0.dev (AI от Vercel).

При вопросах по коду - все компоненты хорошо структурированы и прокомментированы.

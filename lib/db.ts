import fs from "fs"
import path from "path"
import type { Lead, LeadInput, DashboardStats } from "./types"

// === FILE-BASED DATABASE (JSON) ===
// VPS-ready: no native dependencies, works everywhere

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const LEADS_FILE = path.join(DATA_DIR, "leads.json")
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json")
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  ensureDataDir()
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2))
      return defaultValue
    }
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    return defaultValue
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  ensureDataDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// === LEADS ===

interface LeadRecord extends Lead {
  id: number
}

function getLeadsData(): { leads: LeadRecord[]; nextId: number } {
  return readJsonFile(LEADS_FILE, { leads: [], nextId: 1 })
}

function saveLeadsData(data: { leads: LeadRecord[]; nextId: number }) {
  writeJsonFile(LEADS_FILE, data)
}

export function createLead(input: LeadInput & { ip?: string; user_agent?: string }): Lead {
  const data = getLeadsData()
  
  const lead: LeadRecord = {
    id: data.nextId,
    name: input.name,
    phone: input.phone,
    source: input.source,
    product: input.product || null,
    room_type: input.room_type || null,
    budget: input.budget || null,
    urgency: input.urgency || null,
    utm_source: input.utm_source || null,
    utm_medium: input.utm_medium || null,
    utm_campaign: input.utm_campaign || null,
    utm_term: input.utm_term || null,
    utm_content: input.utm_content || null,
    yclid: input.yclid || null,
    gclid: input.gclid || null,
    referrer: input.referrer || null,
    landing_page: input.landing_page || null,
    ip: input.ip || null,
    user_agent: input.user_agent || null,
    created_at: new Date().toISOString(),
    status: "new",
    comment: null,
    sent_to_amocrm: false,
    sent_to_telegram: false
  }
  
  data.leads.push(lead)
  data.nextId++
  saveLeadsData(data)
  
  return lead
}

export function getLeadById(id: number): Lead | null {
  const data = getLeadsData()
  return data.leads.find(l => l.id === id) || null
}

export function getLeads(options: {
  limit?: number
  offset?: number
  status?: string
  source?: string
  search?: string
  from_date?: string
  to_date?: string
}): { leads: Lead[]; total: number } {
  const data = getLeadsData()
  
  let filtered = data.leads
  
  if (options.status) {
    filtered = filtered.filter(l => l.status === options.status)
  }
  if (options.source) {
    filtered = filtered.filter(l => l.source === options.source)
  }
  if (options.search) {
    const s = options.search.toLowerCase()
    filtered = filtered.filter(l => 
      l.name.toLowerCase().includes(s) || 
      l.phone.toLowerCase().includes(s)
    )
  }
  if (options.from_date) {
    filtered = filtered.filter(l => l.created_at >= options.from_date!)
  }
  if (options.to_date) {
    filtered = filtered.filter(l => l.created_at <= options.to_date!)
  }
  
  // Sort by created_at desc
  filtered.sort((a, b) => b.created_at.localeCompare(a.created_at))
  
  const total = filtered.length
  const limit = options.limit || 50
  const offset = options.offset || 0
  
  return {
    leads: filtered.slice(offset, offset + limit),
    total
  }
}

export function updateLead(id: number, updates: Partial<Lead>): Lead | null {
  const data = getLeadsData()
  const index = data.leads.findIndex(l => l.id === id)
  
  if (index === -1) return null
  
  const allowedFields = ["status", "comment", "sent_to_amocrm", "sent_to_telegram"]
  
  for (const field of allowedFields) {
    if (field in updates) {
      (data.leads[index] as any)[field] = (updates as any)[field]
    }
  }
  
  saveLeadsData(data)
  return data.leads[index]
}

export function getDashboardStats(): DashboardStats {
  const data = getLeadsData()
  const leads = data.leads
  
  const today = new Date().toISOString().split("T")[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  
  const todayLeads = leads.filter(l => l.created_at.startsWith(today)).length
  const weekLeads = leads.filter(l => l.created_at >= weekAgo).length
  
  const bySource: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  const byUtmSource: Record<string, number> = {}
  
  leads.forEach(l => {
    bySource[l.source] = (bySource[l.source] || 0) + 1
    byStatus[l.status] = (byStatus[l.status] || 0) + 1
    const utm = l.utm_source || "direct"
    byUtmSource[utm] = (byUtmSource[utm] || 0) + 1
  })
  
  return {
    total_leads: leads.length,
    today_leads: todayLeads,
    week_leads: weekLeads,
    by_source: bySource,
    by_status: byStatus,
    by_utm_source: byUtmSource
  }
}

// === PRODUCTS ===

export interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  old_price: number | null
  image: string
  hoverImage: string | null
  description: string | null
  specs: Record<string, string> | null
  features: string[]
  areas: string[]
  energy_class: string
  warranty: number
  badge: string | null
  rating: number
  reviews: number
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductInput {
  name: string
  brand?: string
  category: string
  price: number
  old_price?: number | null
  image: string
  hoverImage?: string | null
  description?: string | null
  specs?: Record<string, string> | null
  features: string[]
  areas: string[]
  energy_class?: string
  warranty?: number
  badge?: string | null
  rating?: number
  reviews?: number
  is_active?: boolean
  sort_order?: number
}

function getProductsData(): { products: Product[]; nextId: number } {
  return readJsonFile(PRODUCTS_FILE, { products: [], nextId: 1 })
}

function saveProductsData(data: { products: Product[]; nextId: number }) {
  writeJsonFile(PRODUCTS_FILE, data)
}

export function getProducts(options?: { 
  category?: string
  active_only?: boolean 
}): Product[] {
  const data = getProductsData()
  
  let filtered = data.products
  
  if (options?.active_only) {
    filtered = filtered.filter(p => p.is_active)
  }
  if (options?.category && options.category !== "all") {
    filtered = filtered.filter(p => p.category === options.category)
  }
  
  return filtered.sort((a, b) => a.sort_order - b.sort_order || b.id - a.id)
}

export function getProductById(id: number): Product | null {
  const data = getProductsData()
  return data.products.find(p => p.id === id) || null
}

export function createProduct(input: ProductInput): Product {
  const data = getProductsData()
  
  const product: Product = {
    id: data.nextId,
    name: input.name,
    brand: input.brand || "AUX",
    category: input.category,
    price: input.price,
    old_price: input.old_price || null,
    image: input.image,
    hoverImage: input.hoverImage || null,
    description: input.description || null,
    specs: input.specs || null,
    features: input.features,
    areas: input.areas,
    energy_class: input.energy_class || "A+",
    warranty: input.warranty || 3,
    badge: input.badge || null,
    rating: input.rating || 4.5,
    reviews: input.reviews || 0,
    is_active: input.is_active !== false,
    sort_order: input.sort_order || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  data.products.push(product)
  data.nextId++
  saveProductsData(data)
  
  return product
}

export function updateProduct(id: number, input: Partial<ProductInput>): Product | null {
  const data = getProductsData()
  const index = data.products.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  const product = data.products[index]
  
  if (input.name !== undefined) product.name = input.name
  if (input.brand !== undefined) product.brand = input.brand
  if (input.category !== undefined) product.category = input.category
  if (input.price !== undefined) product.price = input.price
  if (input.old_price !== undefined) product.old_price = input.old_price
  if (input.image !== undefined) product.image = input.image
  if (input.hoverImage !== undefined) product.hoverImage = input.hoverImage
  if (input.description !== undefined) product.description = input.description
  if (input.specs !== undefined) product.specs = input.specs
  if (input.features !== undefined) product.features = input.features
  if (input.areas !== undefined) product.areas = input.areas
  if (input.energy_class !== undefined) product.energy_class = input.energy_class
  if (input.warranty !== undefined) product.warranty = input.warranty
  if (input.badge !== undefined) product.badge = input.badge
  if (input.rating !== undefined) product.rating = input.rating
  if (input.reviews !== undefined) product.reviews = input.reviews
  if (input.is_active !== undefined) product.is_active = input.is_active
  if (input.sort_order !== undefined) product.sort_order = input.sort_order
  
  product.updated_at = new Date().toISOString()
  
  saveProductsData(data)
  return product
}

export function deleteProduct(id: number): boolean {
  const data = getProductsData()
  const index = data.products.findIndex(p => p.id === id)
  
  if (index === -1) return false
  
  data.products.splice(index, 1)
  saveProductsData(data)
  return true
}

export function seedDefaultProducts(): void {
  const data = getProductsData()
  
  if (data.products.length > 0) return
  
  const defaultProducts: ProductInput[] = [
    {
      name: "AUX Classic Inverter R32",
      brand: "AUX",
      category: "optimal",
      price: 1485,
      old_price: 1655,
      image: "/products/aux-classic-07.jpg",
      hoverImage: "/products/aux-classic-07-full.jpg",
      description: "Инверторная сплит-система с фреоном R32. Идеально подходит для спальни и детских комнат благодаря ультратихой работе от 21 дБ.",
      specs: {
        "Модель": "ASW-H07A4/BA-R2DI",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,25 / 2,35 кВт",
        "Потребление": "700 / 650 Вт",
        "Уровень шума": "от 21 дБ",
        "Габариты внутр. (ВхШхГ)": "282×708×193 мм",
        "Габариты внешн. (ВхШхГ)": "455×650×233 мм",
        "Вес внутр./внешн.": "6,5 / 17,9 кг",
        "Диапазон напряжения": "130-270V",
        "Фреон": "R32"
      },
      features: ["Инвертор", "21 дБ", "Wi-Fi (опция)", "Обогрев", "Самоочистка +57°C", "4D обдув"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Хит продаж",
      rating: 4.9,
      reviews: 127,
      sort_order: 1
    },
    {
      name: "Haier CORAL on/off HSU-07HPL303/R3",
      brand: "Haier",
      category: "budget",
      price: 1100,
      old_price: null,
      image: "/products/haier-coral-07.jpg",
      hoverImage: "/products/haier-coral-07-full.jpg",
      description: "Надёжная сплит-система от мирового лидера. Супертихая работа 26 дБ, антибактериальный фильтр и Ag+ покрытие испарителя для чистого воздуха.",
      specs: {
        "Модель": "HSU-07HPL303/R3",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,1 / 2,2 кВт",
        "Потребление": "650 / 605 Вт",
        "Уровень шума": "26 дБ",
        "Габариты внутр. (ВхШхГ)": "265×700×190 мм",
        "Габариты внешн. (ВхШхГ)": "432×757×281 мм",
        "Вес внутр./внешн.": "7,1 / 20,9 кг",
        "Обогрев до": "-7°C",
        "Фреон": "R32"
      },
      features: ["26 дБ", "Обогрев -7°C", "I feel", "Турбо", "Ag+ фильтр", "Таймер 24ч"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Лучшая цена",
      rating: 4.7,
      reviews: 89,
      sort_order: 2
    },
    {
      name: "DENKO White Lotus DECH-07",
      brand: "Denko",
      category: "budget",
      price: 850,
      old_price: 1249,
      image: "/products/denko-white-lotus-07.jpg",
      hoverImage: "/products/denko-white-lotus-07-full.jpg",
      description: "Доступная сплит-система с золотым покрытием теплообменника Golden Fin. Режим комфортного сна, LED дисплей и 5 ско��остей вентилятора.",
      specs: {
        "Модель": "DECH-07",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,3 / 2,4 кВт",
        "Потребление": "720 / 640 Вт",
        "Габариты внутр. (ВхШхГ)": "252×680×206 мм",
        "Габариты внешн. (ВхШхГ)": "421×679×281 мм",
        "Вес внутр./внешн.": "7 / 19 кг",
        "Инверторный": "Нет",
        "Производитель": "Guangdong Chigo"
      },
      features: ["Турбо", "Golden Fin", "Самоочистка", "Comfort Sleep", "LED дисплей", "5 скоростей"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Скидка 32%",
      rating: 4.5,
      reviews: 64,
      sort_order: 3
    },
    {
      name: "DENKO White Lotus Inverter DECH-07i",
      brand: "Denko",
      category: "optimal",
      price: 1190,
      old_price: 1749,
      image: "/products/denko-white-lotus-07i.jpg",
      hoverImage: "/products/denko-white-lotus-07i-full.jpg",
      description: "Инверторная версия популярной модели White Lotus. Экономичный R32 фреон, Golden Fin покрытие и режим комфортного сна для идеального микроклимата.",
      specs: {
        "Модель": "DECH-07i",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,1 / 2,2 кВт",
        "Потребление": "660 / 610 Вт",
        "Габариты внутр. (ВхШхГ)": "252×680×206 мм",
        "Габариты внешн. (ВхШхГ)": "440×679×281 мм",
        "Вес внутр./внешн.": "7 / 19 кг",
        "Инверторный": "Да",
        "Фреон": "R32"
      },
      features: ["Инвертор", "R32", "Golden Fin", "Турбо", "Comfort Sleep", "Самоочистка"],
      areas: ["20 м²"],
      energy_class: "A+",
      warranty: 5,
      badge: "Скидка 32%",
      rating: 4.6,
      reviews: 78,
      sort_order: 4
    },
    {
      name: "Toshiba SEIYA NEW RAS-B07E2KVG-E",
      brand: "Toshiba",
      category: "premium",
      price: 2980,
      old_price: 3880,
      image: "/products/toshiba-seiya-07.png",
      hoverImage: "/products/toshiba-seiya-07-full.png",
      description: "Премиальный инверторный кондиционер от японского бренда. SEIYA — \"Тихая ночь\" с уровнем шума всего 19 дБ. Magic Coil покрытие и Ultra Fresh фильтр нейтрализуют 99,9% вирусов.",
      specs: {
        "Модель": "RAS-B07E2KVG-E",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,0 / 2,5 кВт",
        "Потребление": "530 / 530 Вт",
        "Уровень шума внутр.": "19 дБ",
        "Уровень шума внешн.": "42 дБ",
        "Габариты внутр. (ВхШхГ)": "350×862×280 мм",
        "Габариты внешн. (ВхШхГ)": "530×660×240 мм",
        "Вес внутр./внешн.": "9 / 22 кг",
        "Сертификация": "Eurovent"
      },
      features: ["Инвертор", "19 дБ", "Magic Coil", "Ultra Fresh 99,9%", "Режим +8°C", "7 скоростей"],
      areas: ["20 м²"],
      energy_class: "A++",
      warranty: 5,
      badge: "Премиум",
      rating: 5.0,
      reviews: 156,
      sort_order: 5
    },
    {
      name: "DENKO DU-07",
      brand: "Denko",
      category: "budget",
      price: 800,
      old_price: 1149,
      image: "/products/denko-du-07.jpg",
      hoverImage: "/products/denko-du-07-full.jpg",
      description: "Компактная сплит-система с компрессором GMCC Toshiba. Уровень шума всего 24 дБ, антикоррозийное покрытие теплообменника и функция I-feel.",
      specs: {
        "Модель": "DU-07",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,1 / 2,2 кВт",
        "Потребление": "650 / 610 Вт",
        "Уровень шума": "24 дБ",
        "Габариты внутр. (ВхШхГ)": "283×690×199 мм",
        "Габариты внешн. (ВхШхГ)": "420×665×280 мм",
        "Вес внутр./внешн.": "8 / 20 кг",
        "Компрессор": "GMCC Toshiba",
        "Фреон": "R32"
      },
      features: ["24 дБ", "I-feel", "Компрессор Toshiba", "Автоочистка", "Таймер", "Comfort Sleep"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Скидка 30%",
      rating: 4.6,
      reviews: 52,
      sort_order: 6
    },
    {
      name: "Eurohoff Astrid AVE-07M",
      brand: "Eurohoff",
      category: "optimal",
      price: 999,
      old_price: 1300,
      image: "/products/eurohoff-astrid-07.jpg",
      hoverImage: "/products/eurohoff-astrid-07-full.jpg",
      description: "Сплит-система с японским компрессором GMCC-Toshiba на заводе Midea. Уровень шума 22 дБ, антикоррозийное покрытие Blue Fin и функция I-feel.",
      specs: {
        "Модель": "AVE-07M",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,25 / 2,34 кВт",
        "Потребление": "640 / 700 Вт",
        "Уровень шума": "22 дБ",
        "Габариты внутр. (ВхШхГ)": "290×722×187 мм",
        "Габариты внешн. (ВхШхГ)": "540×835×300 мм",
        "Вес внутр./внешн.": "8,1 / 23,9 кг",
        "Компрессор": "GMCC Toshiba",
        "Фреон": "R32"
      },
      features: ["22 дБ", "I-feel", "Blue Fin", "Wi-Fi (опция)", "Компрессор Toshiba", "Завод Midea"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Скидка 23%",
      rating: 4.7,
      reviews: 93,
      sort_order: 7
    },
    {
      name: "DAHATSU Dragon DHP-07",
      brand: "Dahatsu",
      category: "budget",
      price: 940,
      old_price: 1250,
      image: "/products/dahatsu-dragon-07.png",
      hoverImage: "/products/dahatsu-dragon-07-full.png",
      description: "Надежная сплит-система с компрессором GMCC Toshiba на заводе Midea. Уровень шума 22 дБ, функция I-feel и антибактериальный фильтр Cold-Catalyst.",
      specs: {
        "Модель": "DHP-07",
        "Площадь": "до 20 м²",
        "Мощность охл./обогр.": "2,34 / 2,41 кВт",
        "Потребление": "730 / 670 Вт",
        "Уровень шума": "22 дБ",
        "Габариты внутр. (ВхШхГ)": "285×715×194 мм",
        "Габариты внешн. (ВхШхГ)": "434×681×285 мм",
        "Вес внутр./внешн.": "7,4 / 22,1 кг",
        "Компрессор": "GMCC Toshiba",
        "Фреон": "R32"
      },
      features: ["22 дБ", "I-feel", "Cold-Catalyst", "Автоочистка", "Comfort Sleep", "Завод Midea"],
      areas: ["20 м²"],
      energy_class: "A",
      warranty: 5,
      badge: "Скидка 25%",
      rating: 4.6,
      reviews: 71,
      sort_order: 8
    }
  ]
  
  defaultProducts.forEach(p => createProduct(p))
}

// === SESSIONS ===

interface Session {
  id: string
  user_id: number
  expires_at: string
}

function getSessionsData(): { sessions: Session[] } {
  return readJsonFile(SESSIONS_FILE, { sessions: [] })
}

function saveSessionsData(data: { sessions: Session[] }) {
  writeJsonFile(SESSIONS_FILE, data)
}

export function createSession(sessionId: string, userId: number, expiresAt: Date): void {
  const data = getSessionsData()
  data.sessions.push({
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt.toISOString()
  })
  saveSessionsData(data)
}

export function getSession(sessionId: string): { user_id: number; expires_at: string } | null {
  const data = getSessionsData()
  const session = data.sessions.find(s => s.id === sessionId)
  
  if (!session) return null
  
  if (new Date(session.expires_at) < new Date()) {
    deleteSession(sessionId)
    return null
  }
  
  return session
}

export function deleteSession(sessionId: string): void {
  const data = getSessionsData()
  data.sessions = data.sessions.filter(s => s.id !== sessionId)
  saveSessionsData(data)
}

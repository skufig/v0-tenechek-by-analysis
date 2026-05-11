"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Phone, Calendar, Filter, RefreshCw, LogOut, TrendingUp, 
  Users, Target, AlertCircle, CheckCircle, XCircle, Search,
  ChevronLeft, ChevronRight, Loader2, Package, Settings
} from "lucide-react"
import Link from "next/link"

interface Lead {
  id: number
  name: string
  phone: string
  source: string
  product?: string
  room_type?: string
  budget?: string
  urgency?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  yclid?: string
  gclid?: string
  referrer?: string
  ip?: string
  created_at: string
  status: "new" | "processing" | "completed" | "rejected"
  sent_to_amocrm: boolean
  sent_to_telegram: boolean
}

interface Stats {
  total_leads: number
  today_leads: number
  week_leads: number
  by_source: Record<string, number>
  by_status: Record<string, number>
  by_utm_source: Record<string, number>
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
}

const statusLabels: Record<string, string> = {
  new: "Новая",
  processing: "В работе",
  completed: "Завершена",
  rejected: "Отклонена",
}

const sourceLabels: Record<string, string> = {
  quiz: "Квиз",
  callback: "Заказ звонка",
  "contact-form": "Форма контактов",
  "product-order": "Заказ товара",
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const router = useRouter()
  
  const LIMIT = 20

  // Проверка авторизации при загрузке
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth")
      const data = await res.json()
      setIsAuthed(data.authenticated)
      if (data.authenticated) {
        fetchLeads()
        fetchStats()
      }
    } catch {
      setIsAuthed(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/leads?stats=true")
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error("Ошибка загрузки статистики:", err)
    }
  }

  const fetchLeads = async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams({
        limit: String(LIMIT),
        offset: String(page * LIMIT)
      })
      if (statusFilter !== "all") params.set("status", statusFilter)
      if (sourceFilter !== "all") params.set("source", sourceFilter)
      if (search) params.set("search", search)
      
      const res = await fetch(`/api/leads?${params}`)
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthed(false)
          return
        }
        throw new Error("Ошибка загрузки")
      }
      const data = await res.json()
      setLeads(data.leads || [])
      setTotal(data.total || 0)
    } catch {
      setError("Не удалось загрузить заявки")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthed) {
      fetchLeads()
    }
  }, [isAuthed, page, statusFilter, sourceFilter])

  useEffect(() => {
    if (isAuthed) {
      const interval = setInterval(() => {
        fetchLeads()
        fetchStats()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthed])

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      fetchLeads()
      fetchStats()
    } catch {
      setError("Ошибка обновления")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Неверный пароль")
        return
      }
      setIsAuthed(true)
      fetchLeads()
      fetchStats()
    } catch {
      setError("Ошибка соединения")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" })
    setIsAuthed(false)
    setPassword("")
    setLeads([])
    setStats(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    fetchLeads()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Экран загрузки
  if (isAuthed === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // Экран входа
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-2">Админ панель</h1>
            <p className="text-slate-500 text-center mb-6">teneck.top</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full h-12" disabled={!password}>
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">teneck.top</h1>
            <p className="text-sm text-slate-500">Панель управления заявками</p>
          </div>
<div className="flex items-center gap-3">
  <Link href="/admin/products">
    <Button variant="outline" size="sm">
      <Package className="h-4 w-4 mr-2" />
      Товары
    </Button>
  </Link>
  <Button variant="outline" size="sm" onClick={() => { fetchLeads(); fetchStats() }} disabled={loading}>
  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
  Обновить
  </Button>
  <Button variant="ghost" size="sm" onClick={handleLogout}>
  <LogOut className="h-4 w-4 mr-2" />
  Выйти
  </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total_leads}</p>
                  <p className="text-sm text-slate-500">Всего заявок</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.today_leads}</p>
                  <p className="text-sm text-slate-500">Сегодня</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.week_leads}</p>
                  <p className="text-sm text-slate-500">За неделю</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.by_status?.new || 0}</p>
                  <p className="text-sm text-slate-500">Новых</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UTM Sources */}
        {stats && Object.keys(stats.by_utm_source).length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Источники трафика (UTM)</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.by_utm_source).map(([source, count]) => (
                <div key={source} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm flex items-center gap-2">
                  <span className="font-medium">{source}</span>
                  <span className="bg-slate-200 px-2 py-0.5 rounded text-xs">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Поиск по имени или телефону..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </form>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0) }}
              className="h-10 px-3 rounded-md border text-sm bg-white"
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="processing">В работе</option>
              <option value="completed">Завершённые</option>
              <option value="rejected">Отклонённые</option>
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => { setSourceFilter(e.target.value); setPage(0) }}
              className="h-10 px-3 rounded-md border text-sm bg-white"
            >
              <option value="all">Все источники</option>
              <option value="quiz">Квиз</option>
              <option value="callback">Заказ звонка</option>
              <option value="contact-form">Форма контактов</option>
              <option value="product-order">Заказ товара</option>
            </select>
          </div>
        </div>

        {/* Leads list */}
        <div className="space-y-3">
          {loading && leads.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" />
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500">
              Заявок пока нет
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                      <span className="text-xs text-slate-500">
                        #{lead.id}
                      </span>
                    </div>
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="h-4 w-4" />
                      {lead.phone}
                    </a>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 justify-end text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(lead.created_at)}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <span title="Telegram" className="flex items-center">
                        {lead.sent_to_telegram ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300" />
                        )}
                      </span>
                      <span title="AmoCRM" className="flex items-center">
                        {lead.sent_to_amocrm ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-300" />
                        )}
                      </span>
                    </div>
                    {lead.utm_source && (
                      <div className="text-xs mt-1 text-orange-600">
                        {lead.utm_source}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {selectedLead?.id === lead.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Источник:</span>
                        <p className="font-medium">{sourceLabels[lead.source] || lead.source}</p>
                      </div>
                      {lead.product && (
                        <div>
                          <span className="text-slate-500">Товар:</span>
                          <p className="font-medium">{lead.product}</p>
                        </div>
                      )}
                      {lead.room_type && (
                        <div>
                          <span className="text-slate-500">Помещение:</span>
                          <p className="font-medium">{lead.room_type}</p>
                        </div>
                      )}
                      {lead.budget && (
                        <div>
                          <span className="text-slate-500">Бюджет:</span>
                          <p className="font-medium">{lead.budget}</p>
                        </div>
                      )}
                    </div>
                    
                    {(lead.utm_source || lead.yclid || lead.gclid) && (
                      <div className="text-sm">
                        <span className="text-slate-500">UTM метки: </span>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                          {lead.utm_source && `source: ${lead.utm_source}`}
                          {lead.utm_medium && ` / medium: ${lead.utm_medium}`}
                          {lead.utm_campaign && ` / campaign: ${lead.utm_campaign}`}
                        </span>
                        {lead.yclid && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            Яндекс: {lead.yclid.slice(0, 12)}...
                          </span>
                        )}
                        {lead.gclid && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Google: {lead.gclid.slice(0, 12)}...
                          </span>
                        )}
                      </div>
                    )}
                    
                    {lead.referrer && (
                      <div className="text-sm text-slate-500">
                        Referrer: {lead.referrer}
                      </div>
                    )}
                    
                    <div className="text-sm text-slate-500">
                      IP: {lead.ip || "Неизвестно"}
                    </div>
                    
                    {/* Status buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(["new", "processing", "completed", "rejected"] as const).map((status) => (
                        <Button
                          key={status}
                          variant={lead.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateStatus(lead.id, status)
                          }}
                        >
                          {statusLabels[status]}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">
              Показано {page * LIMIT + 1}-{Math.min((page + 1) * LIMIT, total)} из {total}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm px-2">
                {page + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

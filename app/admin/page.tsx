"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Calendar, MapPin, Monitor, Clock, Filter, RefreshCw, LogOut, TrendingUp, Users, Target, MousePointer } from "lucide-react"

interface Lead {
  id: string
  name: string
  phone: string
  comment?: string
  product?: string
  source: string
  utm: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
    yclid?: string
  }
  referrer: string
  page: string
  userAgent: string
  ip: string
  createdAt: string
  status: "new" | "processing" | "done" | "spam"
  notes: string
}

interface Stats {
  total: number
  today: number
  thisWeek: number
  bySource: Record<string, number>
  byUtmSource: Record<string, number>
  byStatus: Record<string, number>
}

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  spam: "bg-red-100 text-red-700",
}

const statusLabels = {
  new: "Новая",
  processing: "В работе",
  done: "Завершена",
  spam: "Спам",
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<string>("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthed(false)
          setError("Неверный пароль")
          return
        }
        throw new Error("Ошибка загрузки")
      }
      const data = await res.json()
      setLeads(data.leads)
      setStats(data.stats)
    } catch {
      setError("Не удалось загрузить заявки")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ id, status }),
      })
      fetchLeads()
    } catch {
      setError("Ошибка обновления")
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthed(true)
    fetchLeads()
  }

  const handleLogout = () => {
    setIsAuthed(false)
    setPassword("")
    setLeads([])
    setStats(null)
  }

  useEffect(() => {
    if (isAuthed) {
      const interval = setInterval(fetchLeads, 30000) // Обновление каждые 30 сек
      return () => clearInterval(interval)
    }
  }, [isAuthed, password])

  const filteredLeads = filter === "all" ? leads : leads.filter(l => l.status === filter)

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/[^\d+]/g, "")
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Панель управления</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full h-12">
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Заявки - teneck.top</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchLeads} disabled={loading}>
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

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
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
                  <p className="text-2xl font-bold">{stats.today}</p>
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
                  <p className="text-2xl font-bold">{stats.thisWeek}</p>
                  <p className="text-sm text-slate-500">За неделю</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <MousePointer className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.byStatus?.new || 0}</p>
                  <p className="text-sm text-slate-500">Новых</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UTM Stats */}
        {stats && Object.keys(stats.byUtmSource).length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Источники трафика</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byUtmSource).map(([source, count]) => (
                <div key={source} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm">
                  <span className="font-medium">{source}</span>
                  <span className="text-slate-500 ml-2">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
          {["all", "new", "processing", "done", "spam"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className="flex-shrink-0"
            >
              {status === "all" ? "Все" : statusLabels[status as keyof typeof statusLabels]}
              {stats && (
                <span className="ml-1.5 opacity-70">
                  {status === "all" ? stats.total : stats.byStatus?.[status] || 0}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Leads list */}
        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-slate-500">
              {loading ? "Загрузка..." : "Заявок пока нет"}
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                    </div>
                    <a
                      href={`tel:${formatPhone(lead.phone)}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="h-4 w-4" />
                      {lead.phone}
                    </a>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(lead.createdAt)}
                    </div>
                    {lead.utm.utm_source && (
                      <div className="text-xs mt-1 text-orange-600">
                        {lead.utm.utm_source}
                        {lead.utm.utm_campaign && ` / ${lead.utm.utm_campaign}`}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {selectedLead?.id === lead.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    {lead.comment && (
                      <div>
                        <span className="text-sm text-slate-500">Комментарий:</span>
                        <p className="text-sm">{lead.comment}</p>
                      </div>
                    )}
                    {lead.product && (
                      <div>
                        <span className="text-sm text-slate-500">Товар:</span>
                        <p className="text-sm">{lead.product}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Форма: {lead.source}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Monitor className="h-3.5 w-3.5" />
                        <span>IP: {lead.ip}</span>
                      </div>
                    </div>
                    {lead.utm.utm_source && (
                      <div className="text-sm">
                        <span className="text-slate-500">UTM: </span>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                          {lead.utm.utm_source}
                          {lead.utm.utm_medium && ` / ${lead.utm.utm_medium}`}
                          {lead.utm.utm_campaign && ` / ${lead.utm.utm_campaign}`}
                          {lead.utm.utm_term && ` / ${lead.utm.utm_term}`}
                        </span>
                        {lead.utm.yclid && (
                          <span className="ml-2 text-xs text-orange-600">yclid: {lead.utm.yclid}</span>
                        )}
                      </div>
                    )}
                    {lead.referrer && lead.referrer !== "direct" && (
                      <div className="text-sm text-slate-500">
                        Referrer: {lead.referrer}
                      </div>
                    )}
                    
                    {/* Status buttons */}
                    <div className="flex gap-2 pt-2">
                      {(["new", "processing", "done", "spam"] as const).map((status) => (
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
      </main>
    </div>
  )
}

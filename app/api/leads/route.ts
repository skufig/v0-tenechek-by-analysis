import { NextRequest, NextResponse } from "next/server"
import { createLead, getLeads, updateLead, getDashboardStats } from "@/lib/db"
import { sendToAmoCRM, sendToTelegram } from "@/lib/integrations"
import type { LeadInput } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadInput
    
    // Валидация
    if (!body.name || !body.phone || !body.source) {
      return NextResponse.json(
        { error: "Обязательные поля: name, phone, source" },
        { status: 400 }
      )
    }
    
    // Нормализация телефона
    const phone = body.phone.replace(/[^\d+]/g, "")
    if (phone.length < 9) {
      return NextResponse.json(
        { error: "Некорректный номер телефона" },
        { status: 400 }
      )
    }
    
    // IP и User Agent
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    
    // Создаём лид
    const lead = createLead({
      ...body,
      phone,
      ip,
      user_agent: userAgent
    })
    
    // Отправляем в интеграции асинхронно
    const [amoResult, tgResult] = await Promise.all([
      sendToAmoCRM(lead),
      sendToTelegram(lead)
    ])
    
    // Обновляем статус отправки
    updateLead(lead.id, {
      sent_to_amocrm: amoResult,
      sent_to_telegram: tgResult
    })
    
    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      integrations: {
        amocrm: amoResult,
        telegram: tgResult
      }
    })
  } catch (error) {
    console.error("[API] Ошибка создания лида:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Проверка авторизации
    const sessionId = request.cookies.get("admin_session")?.value
    const authHeader = request.headers.get("authorization")
    const adminPassword = process.env.ADMIN_PASSWORD || "tenechek2024"
    
    const isAuthorized = sessionId || authHeader === `Bearer ${adminPassword}`
    
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    
    // Если запрос статистики
    if (searchParams.get("stats") === "true") {
      const stats = getDashboardStats()
      return NextResponse.json(stats)
    }
    
    const result = getLeads({
      limit: parseInt(searchParams.get("limit") || "50"),
      offset: parseInt(searchParams.get("offset") || "0"),
      status: searchParams.get("status") || undefined,
      source: searchParams.get("source") || undefined,
      search: searchParams.get("search") || undefined,
      from_date: searchParams.get("from_date") || undefined,
      to_date: searchParams.get("to_date") || undefined
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("[API] Ошибка получения лидов:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("admin_session")?.value
    const authHeader = request.headers.get("authorization")
    const adminPassword = process.env.ADMIN_PASSWORD || "tenechek2024"
    
    const isAuthorized = sessionId || authHeader === `Bearer ${adminPassword}`
    
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: "ID обязателен" }, { status: 400 })
    }
    
    const lead = updateLead(id, updates)
    if (!lead) {
      return NextResponse.json({ error: "Лид не найден" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error("[API] Ошибка обновления лида:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}

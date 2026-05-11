import { NextRequest, NextResponse } from "next/server"
import { createSession, deleteSession, getSession } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body
    
    const adminPassword = process.env.ADMIN_PASSWORD || "tenechek2024"
    
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }
    
    // Создаём сессию
    const sessionId = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
    
    createSession(sessionId, 1, expiresAt)
    
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/"
    })
    
    return response
  } catch (error) {
    console.error("[Auth] Ошибка входа:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("admin_session")?.value
    
    if (!sessionId) {
      return NextResponse.json({ authenticated: false })
    }
    
    const session = getSession(sessionId)
    
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }
    
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("admin_session")?.value
    
    if (sessionId) {
      deleteSession(sessionId)
    }
    
    const response = NextResponse.json({ success: true })
    response.cookies.delete("admin_session")
    
    return response
  } catch (error) {
    return NextResponse.json({ success: true })
  }
}

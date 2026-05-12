"use client"

import { useEffect, useState } from "react"

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  yclid?: string
  gclid?: string
  referrer?: string
  landing_page?: string
}

const UTM_KEYS: (keyof UTMParams)[] = [
  "utm_source",
  "utm_medium", 
  "utm_campaign",
  "utm_term",
  "utm_content",
  "yclid",
  "gclid"
]

const COOKIE_EXPIRY_DAYS = 30

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift()
    return cookieValue ? decodeURIComponent(cookieValue) : null
  }
  return null
}

// Hook для инициализации UTM трекинга
export function useUTM() {
  const [utm, setUtm] = useState<UTMParams>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmParams: UTMParams = {}

    // Сохраняем UTM параметры из URL в cookies
    UTM_KEYS.forEach(key => {
      const value = params.get(key)
      if (value) {
        setCookie(key, value, COOKIE_EXPIRY_DAYS)
        utmParams[key] = value
      } else {
        // Проверяем есть ли в cookies
        const cookieValue = getCookie(key)
        if (cookieValue) {
          utmParams[key] = cookieValue
        }
      }
    })

    // Сохраняем referrer (только первый раз)
    if (!getCookie("first_referrer") && document.referrer && !document.referrer.includes(window.location.hostname)) {
      setCookie("first_referrer", document.referrer, COOKIE_EXPIRY_DAYS)
    }

    // Сохраняем landing page (только первый раз)
    if (!getCookie("landing_page")) {
      setCookie("landing_page", window.location.href, COOKIE_EXPIRY_DAYS)
    }

    // Сохраняем время первого визита
    if (!getCookie("first_visit")) {
      setCookie("first_visit", new Date().toISOString(), COOKIE_EXPIRY_DAYS)
    }

    setUtm(utmParams)
  }, [])

  return utm
}

// Получение UTM из cookies
export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {}
  
  const utm: UTMParams = {}
  
  UTM_KEYS.forEach(key => {
    const value = getCookie(key)
    if (value) utm[key] = value
  })
  
  const referrer = getCookie("first_referrer")
  const landingPage = getCookie("landing_page")
  
  if (referrer) utm.referrer = referrer
  if (landingPage) utm.landing_page = landingPage
  
  return utm
}

// Отправка заявки
export async function submitLead(data: {
  name: string
  phone: string
  source: string
  product?: string
  room_type?: string
  budget?: string
  urgency?: string
  comment?: string
}): Promise<{ success: boolean; lead_id?: number; error?: string }> {
  try {
    const utm = getStoredUTM()
    
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        ...utm,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return { 
        success: false, 
        error: result.error || "Ошибка сервера" 
      }
    }

    return { 
      success: true,
      lead_id: result.lead_id
    }
  } catch (error) {
    console.error("Lead submission error:", error)
    return { 
      success: false, 
      error: "Не удалось отправить заявку. Позвоните нам: +375 29 398-97-77" 
    }
  }
}

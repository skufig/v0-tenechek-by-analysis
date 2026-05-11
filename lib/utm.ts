"use client"

import { useEffect, useState } from "react"

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  yclid?: string // Яндекс Директ click id
  gclid?: string // Google Ads click id
}

export interface LeadData {
  id: string
  name: string
  phone: string
  comment?: string
  product?: string
  source: string // откуда форма (hero, header, footer, product, etc)
  utm: UTMParams
  referrer: string
  page: string
  userAgent: string
  createdAt: string
  ip?: string
}

// Получаем UTM параметры из URL и сохраняем в sessionStorage
export function useUTM() {
  const [utm, setUtm] = useState<UTMParams>({})

  useEffect(() => {
    // Проверяем есть ли уже сохраненные UTM
    const saved = sessionStorage.getItem("utm_params")
    if (saved) {
      setUtm(JSON.parse(saved))
      return
    }

    // Парсим URL
    const params = new URLSearchParams(window.location.search)
    const utmParams: UTMParams = {}

    const keys: (keyof UTMParams)[] = [
      "utm_source",
      "utm_medium", 
      "utm_campaign",
      "utm_term",
      "utm_content",
      "yclid",
      "gclid"
    ]

    keys.forEach(key => {
      const value = params.get(key)
      if (value) {
        utmParams[key] = value
      }
    })

    // Сохраняем в sessionStorage
    if (Object.keys(utmParams).length > 0) {
      sessionStorage.setItem("utm_params", JSON.stringify(utmParams))
    }

    setUtm(utmParams)
  }, [])

  return utm
}

// Получаем UTM из sessionStorage (для использования в формах)
export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {}
  const saved = sessionStorage.getItem("utm_params")
  return saved ? JSON.parse(saved) : {}
}

// Отправка заявки
export async function submitLead(data: {
  name: string
  phone: string
  comment?: string
  product?: string
  source: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const utm = getStoredUTM()
    
    const leadData = {
      ...data,
      utm,
      referrer: document.referrer || "direct",
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    })

    if (!response.ok) {
      throw new Error("Ошибка сервера")
    }

    return { success: true }
  } catch (error) {
    console.error("Lead submission error:", error)
    return { success: false, error: "Не удалось отправить заявку" }
  }
}

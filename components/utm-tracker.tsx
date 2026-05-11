"use client"

import { useEffect } from "react"

export function UTMTracker() {
  useEffect(() => {
    // Парсим UTM параметры из URL и сохраняем в sessionStorage
    const params = new URLSearchParams(window.location.search)
    const utmParams: Record<string, string> = {}

    const keys = [
      "utm_source",
      "utm_medium", 
      "utm_campaign",
      "utm_term",
      "utm_content",
      "yclid", // Яндекс Директ
      "gclid", // Google Ads
    ]

    keys.forEach(key => {
      const value = params.get(key)
      if (value) {
        utmParams[key] = value
      }
    })

    // Сохраняем только если есть параметры и еще не сохранены
    if (Object.keys(utmParams).length > 0) {
      const existing = sessionStorage.getItem("utm_params")
      if (!existing) {
        sessionStorage.setItem("utm_params", JSON.stringify(utmParams))
      }
    }

    // Сохраняем referrer если еще не сохранен
    if (document.referrer && !sessionStorage.getItem("referrer")) {
      sessionStorage.setItem("referrer", document.referrer)
    }

    // Сохраняем landing page
    if (!sessionStorage.getItem("landing_page")) {
      sessionStorage.setItem("landing_page", window.location.pathname + window.location.search)
    }
  }, [])

  return null
}

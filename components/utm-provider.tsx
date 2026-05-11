"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "yclid", "gclid"]
const COOKIE_EXPIRY_DAYS = 30

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift()
    return cookieValue ? decodeURIComponent(cookieValue) : null
  }
  return null
}

export function getUtmData(): Record<string, string> {
  if (typeof window === "undefined") return {}
  
  const data: Record<string, string> = {}
  UTM_PARAMS.forEach(param => {
    const value = getCookie(param)
    if (value) data[param] = value
  })
  
  // Также сохраняем referrer и landing page
  const referrer = getCookie("first_referrer")
  const landingPage = getCookie("landing_page")
  if (referrer) data.referrer = referrer
  if (landingPage) data.landing_page = landingPage
  
  return data
}

export function UtmProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Сохраняем UTM метки из URL
    UTM_PARAMS.forEach(param => {
      const value = searchParams.get(param)
      if (value) {
        setCookie(param, value, COOKIE_EXPIRY_DAYS)
      }
    })
    
    // Сохраняем первый referrer (только если ещё не сохранён)
    if (!getCookie("first_referrer") && document.referrer) {
      setCookie("first_referrer", document.referrer, COOKIE_EXPIRY_DAYS)
    }
    
    // Сохраняем landing page (только если ещё не сохранён)
    if (!getCookie("landing_page")) {
      setCookie("landing_page", window.location.href, COOKIE_EXPIRY_DAYS)
    }
    
    // Сохраняем время первого визита
    if (!getCookie("first_visit")) {
      setCookie("first_visit", new Date().toISOString(), COOKIE_EXPIRY_DAYS)
    }
  }, [searchParams])
  
  return <>{children}</>
}

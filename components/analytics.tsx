"use client"

import Script from "next/script"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Яндекс.Метрика ID
const YM_ID = 109147753

// Типы целей для Яндекс.Метрики
export const GOALS = {
  // Формы
  FORM_OPEN: "form_open",
  FORM_SUBMIT: "form_submit",
  FORM_SUCCESS: "form_success",
  
  // Квиз
  QUIZ_START: "quiz_start",
  QUIZ_STEP: "quiz_step",
  QUIZ_COMPLETE: "quiz_complete",
  
  // Калькулятор
  CALC_USE: "calculator_use",
  CALC_RESULT: "calculator_result",
  
  // Взаимодействие
  PHONE_CLICK: "phone_click",
  CATALOG_VIEW: "catalog_view",
  PRODUCT_VIEW: "product_view",
  PRODUCT_ORDER: "product_order",
  
  // Exit intent
  EXIT_POPUP_SHOW: "exit_popup_show",
  EXIT_POPUP_SUBMIT: "exit_popup_submit",
} as const

// Отправка цели в Яндекс.Метрику
export function reachGoal(goal: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).ym) {
    (window as any).ym(YM_ID, "reachGoal", goal, params)
  }
}

// Отправка события в dataLayer (для ecommerce)
export function pushDataLayer(data: Record<string, any>) {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(data)
  }
}

// Компонент Яндекс.Метрики
export function YandexMetrika() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Отслеживание переходов по страницам
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(YM_ID, "hit", url)
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

          ym(${YM_ID}, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div>
          <img 
            src={`https://mc.yandex.ru/watch/${YM_ID}`} 
            style={{ position: "absolute", left: "-9999px" }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  )
}

// VK Pixel
export function VKPixel() {
  return (
    <Script id="vk-pixel" strategy="afterInteractive">
      {`
        !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-XXXXXX-XXXXX"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
      `}
    </Script>
  )
}

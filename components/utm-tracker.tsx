"use client"

import { useUTM } from "@/lib/utm"

// Компонент для автоматического трекинга UTM параметров
// Сохраняет UTM метки в cookies на 30 дней для корректной атрибуции в Яндекс Директе
export function UTMTracker() {
  useUTM()
  return null
}

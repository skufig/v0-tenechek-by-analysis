"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Users, Clock, ShoppingBag } from "lucide-react"

// Города Беларуси
const cities = [
  "Минск", "Брест", "Гродно", "Гомель", "Витебск", "Могилев",
  "Барановичи", "Бобруйск", "Пинск", "Орша", "Мозырь", "Солигорск",
  "Молодечно", "Лида", "Полоцк", "Жлобин", "Светлогорск", "Слуцк"
]

// Имена
const names = [
  "Александр", "Сергей", "Андрей", "Дмитрий", "Владимир", "Михаил",
  "Евгений", "Олег", "Николай", "Павел", "Виктор", "Алексей",
  "Елена", "Ольга", "Наталья", "Анна", "Марина", "Ирина", "Татьяна"
]

// Продукты
const products = [
  "LG EVO MAX", "Haier Flexis", "Gree G-Tech", "Eurohoff EVA", "Dahatsu Comfort"
]

// Типы уведомлений
type NotificationType = "lead" | "viewing" | "recent"

interface Notification {
  id: number
  type: NotificationType
  name?: string
  city?: string
  product?: string
  viewers?: number
  time?: string
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateNotification(): Notification {
  const types: NotificationType[] = ["lead", "viewing", "recent"]
  const type = getRandomItem(types)
  
  switch (type) {
    case "lead":
      return {
        id: Date.now(),
        type,
        name: getRandomItem(names),
        city: getRandomItem(cities),
      }
    case "viewing":
      return {
        id: Date.now(),
        type,
        product: getRandomItem(products),
        viewers: Math.floor(Math.random() * 5) + 2,
      }
    case "recent":
      return {
        id: Date.now(),
        type,
        product: getRandomItem(products),
        city: getRandomItem(cities),
        time: `${Math.floor(Math.random() * 30) + 5} мин назад`,
      }
    default:
      return { id: Date.now(), type: "lead" }
  }
}

export function SocialProof() {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Первое уведомление через 15-30 секунд
    const initialDelay = Math.random() * 15000 + 15000
    
    let timeout: NodeJS.Timeout
    let interval: NodeJS.Timeout

    timeout = setTimeout(() => {
      showNotification()
      
      // Затем каждые 30-60 секунд
      interval = setInterval(() => {
        showNotification()
      }, Math.random() * 30000 + 30000)
    }, initialDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  const showNotification = () => {
    const newNotification = generateNotification()
    setNotification(newNotification)
    setIsVisible(true)

    // Скрываем через 5 секунд
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  const getIcon = () => {
    switch (notification?.type) {
      case "lead":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
      case "viewing":
        return <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
      case "recent":
        return <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
      default:
        return null
    }
  }

  const getContent = () => {
    switch (notification?.type) {
      case "lead":
        return (
          <>
            <div className="font-medium text-slate-900 text-sm sm:text-base truncate">
              {notification.name} из г. {notification.city}
            </div>
            <div className="text-xs sm:text-sm text-slate-500">
              только что оставил заявку
            </div>
          </>
        )
      case "viewing":
        return (
          <>
            <div className="font-medium text-slate-900 text-sm sm:text-base truncate">
              {notification.product}
            </div>
            <div className="text-xs sm:text-sm text-slate-500">
              сейчас смотрят {notification.viewers} человек
            </div>
          </>
        )
      case "recent":
        return (
          <>
            <div className="font-medium text-slate-900 text-sm sm:text-base truncate">
              Заказ в г. {notification.city}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 truncate">
              {notification.product} - {notification.time}
            </div>
          </>
        )
      default:
        return null
    }
  }

  const getBgColor = () => {
    switch (notification?.type) {
      case "lead":
        return "bg-green-100"
      case "viewing":
        return "bg-blue-100"
      case "recent":
        return "bg-purple-100"
      default:
        return "bg-slate-100"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 md:bottom-6 left-3 sm:left-4 z-30"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-3 sm:p-4 max-w-[280px] sm:max-w-xs">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${getBgColor()} flex items-center justify-center`}>
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                {getContent()}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

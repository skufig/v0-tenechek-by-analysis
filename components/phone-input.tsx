"use client"

import { useState, forwardRef, InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Форматирование телефона в формат +375 (XX) XXX-XX-XX
export function formatPhone(value: string): string {
  // Убираем всё кроме цифр
  const digits = value.replace(/\D/g, "")
  
  // Если начинается с 8, заменяем на 375
  let normalized = digits
  if (digits.startsWith("8") && digits.length > 1) {
    normalized = "375" + digits.slice(1)
  }
  
  // Форматируем
  let formatted = ""
  
  if (normalized.length > 0) {
    formatted = "+"
  }
  if (normalized.length > 0) {
    formatted += normalized.slice(0, 3) // 375
  }
  if (normalized.length > 3) {
    formatted += " (" + normalized.slice(3, 5) // (29)
  }
  if (normalized.length > 5) {
    formatted += ") " + normalized.slice(5, 8) // 123
  }
  if (normalized.length > 8) {
    formatted += "-" + normalized.slice(8, 10) // 45
  }
  if (normalized.length > 10) {
    formatted += "-" + normalized.slice(10, 12) // 67
  }
  
  return formatted
}

// Валидация телефона
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "")
  return digits.length === 12 && digits.startsWith("375")
}

// Получение только цифр
export function getPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "")
}

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string
  onChange: (value: string) => void
  onValidChange?: (isValid: boolean) => void
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onValidChange, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value)
      onChange(formatted)
      
      if (onValidChange) {
        onValidChange(validatePhone(formatted))
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
      // Автоподстановка +375 если поле пустое
      if (!value) {
        onChange("+375 (")
      }
    }

    const handleBlur = () => {
      setIsFocused(false)
      // Убираем +375 ( если больше ничего не ввели
      if (value === "+375 (" || value === "+375") {
        onChange("")
      }
    }

    const isValid = validatePhone(value)
    const hasValue = value.length > 0

    return (
      <div className="relative">
        <input
          ref={ref}
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="+375 (XX) XXX-XX-XX"
          className={cn(
            "w-full h-12 sm:h-14 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-50 border-2 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-base",
            isFocused ? "border-blue-500 bg-white" : "border-slate-200",
            hasValue && !isFocused && (isValid ? "border-green-500" : "border-slate-200"),
            className
          )}
          {...props}
        />
        {hasValue && !isFocused && (
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
            {isValid ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })
      
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Ошибка входа")
        return
      }
      
      router.push("/admin")
    } catch {
      setError("Ошибка соединения")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2">Админ панель</h1>
          <p className="text-slate-500 text-center mb-4 sm:mb-6 text-sm sm:text-base">teneck.top</p>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12"
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            
            <Button
              type="submit"
              className="w-full h-11 sm:h-12"
              disabled={loading || !password}
            >
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

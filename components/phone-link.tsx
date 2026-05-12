"use client"

import { useState, ReactNode } from "react"
import { Phone, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CallbackModal } from "@/components/callback-modal"

interface PhoneLinkProps {
  children: ReactNode
  className?: string
  phone?: string
}

export function PhoneLink({ children, className, phone = "+375293989777" }: PhoneLinkProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handleCall = () => {
    setIsOpen(false)
    window.location.href = `tel:${phone}`
  }

  const handleCallback = () => {
    setIsOpen(false)
    setIsCallbackOpen(true)
  }

  return (
    <>
      <span onClick={handleClick} className={`cursor-pointer ${className || ''}`}>
        {children}
      </span>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Связаться с нами
              </h3>
              <p className="text-sm text-slate-500">
                Вы на сайте <span className="font-medium text-blue-600">teneck.top</span>
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCallback}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Заказать обратный звонок
              </Button>
              
              <Button
                onClick={handleCall}
                variant="outline"
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl h-12"
              >
                <Phone className="w-4 h-4 mr-2" />
                Позвонить сейчас
              </Button>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4">
              Мы перезвоним в течение 15 минут
            </p>
          </div>
        </div>
      )}

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />
    </>
  )
}

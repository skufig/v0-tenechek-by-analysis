export interface Lead {
  id: number
  name: string
  phone: string
  source: string // quiz, callback, contact-form, product-order
  product?: string
  room_type?: string
  budget?: string
  urgency?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  yclid?: string
  gclid?: string
  referrer?: string
  landing_page?: string
  ip?: string
  user_agent?: string
  created_at: string
  status: "new" | "processing" | "completed" | "rejected"
  comment?: string
  sent_to_amocrm: boolean
  sent_to_telegram: boolean
}

export interface LeadInput {
  name: string
  phone: string
  source: string
  product?: string
  room_type?: string
  budget?: string
  urgency?: string
  comment?: string
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

export interface DashboardStats {
  total_leads: number
  today_leads: number
  week_leads: number
  by_source: Record<string, number>
  by_status: Record<string, number>
  by_utm_source: Record<string, number>
  conversion_rate?: number
}

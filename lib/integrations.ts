import type { Lead } from "./types"

// AmoCRM Integration
export async function sendToAmoCRM(lead: Lead): Promise<boolean> {
  const subdomain = process.env.AMOCRM_SUBDOMAIN
  const accessToken = process.env.AMOCRM_ACCESS_TOKEN
  const pipelineId = process.env.AMOCRM_PIPELINE_ID
  const statusId = process.env.AMOCRM_STATUS_ID
  
  if (!subdomain || !accessToken) {
    console.log("[AmoCRM] Не настроены переменные окружения")
    return false
  }
  
  try {
    const leadData = {
      name: `Заявка с сайта: ${lead.name}`,
      pipeline_id: pipelineId ? parseInt(pipelineId) : undefined,
      status_id: statusId ? parseInt(statusId) : undefined,
      _embedded: {
        contacts: [{
          first_name: lead.name,
          custom_fields_values: [{
            field_code: "PHONE",
            values: [{ value: lead.phone }]
          }]
        }]
      },
      custom_fields_values: [
        lead.utm_source && { field_code: "UTM_SOURCE", values: [{ value: lead.utm_source }] },
        lead.utm_medium && { field_code: "UTM_MEDIUM", values: [{ value: lead.utm_medium }] },
        lead.utm_campaign && { field_code: "UTM_CAMPAIGN", values: [{ value: lead.utm_campaign }] },
        lead.source && { field_code: "LEAD_SOURCE", values: [{ value: lead.source }] },
        lead.product && { field_code: "PRODUCT", values: [{ value: lead.product }] },
      ].filter(Boolean)
    }
    
    const response = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads/complex`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([leadData])
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error("[AmoCRM] Ошибка:", error)
      return false
    }
    
    console.log("[AmoCRM] Лид успешно создан")
    return true
  } catch (error) {
    console.error("[AmoCRM] Ошибка отправки:", error)
    return false
  }
}

// Telegram Bot Integration
export async function sendToTelegram(lead: Lead): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    console.log("[Telegram] Не настроены переменные окружения")
    return false
  }
  
  try {
    const sourceLabels: Record<string, string> = {
      "quiz": "Квиз",
      "callback": "Заказ звонка",
      "contact-form": "Форма контактов",
      "product-order": "Заказ товара"
    }
    
    const statusLabels: Record<string, string> = {
      "new": "Новая",
      "processing": "В работе",
      "completed": "Завершена",
      "rejected": "Отклонена"
    }
    
    let message = `<b>Новая заявка #${lead.id}</b>\n\n`
    message += `<b>Имя:</b> ${lead.name}\n`
    message += `<b>Телефон:</b> <code>${lead.phone}</code>\n`
    message += `<b>Источник:</b> ${sourceLabels[lead.source] || lead.source}\n`
    
    if (lead.product) {
      message += `<b>Товар:</b> ${lead.product}\n`
    }
    if (lead.room_type) {
      message += `<b>Помещение:</b> ${lead.room_type}\n`
    }
    if (lead.budget) {
      message += `<b>Бюджет:</b> ${lead.budget}\n`
    }
    if (lead.urgency) {
      message += `<b>Срочность:</b> ${lead.urgency}\n`
    }
    
    message += `\n<b>UTM метки:</b>\n`
    if (lead.utm_source) message += `- source: ${lead.utm_source}\n`
    if (lead.utm_medium) message += `- medium: ${lead.utm_medium}\n`
    if (lead.utm_campaign) message += `- campaign: ${lead.utm_campaign}\n`
    if (lead.utm_term) message += `- term: ${lead.utm_term}\n`
    if (lead.yclid) message += `- yclid: ${lead.yclid}\n`
    if (lead.gclid) message += `- gclid: ${lead.gclid}\n`
    
    if (!lead.utm_source && !lead.yclid && !lead.gclid) {
      message += `- Прямой заход\n`
    }
    
    if (lead.referrer) {
      message += `\n<b>Referrer:</b> ${lead.referrer}\n`
    }
    
    message += `\n<i>${new Date(lead.created_at).toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}</i>`
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error("[Telegram] Ошибка:", error)
      return false
    }
    
    console.log("[Telegram] Сообщение отправлено")
    return true
  } catch (error) {
    console.error("[Telegram] Ошибка отправки:", error)
    return false
  }
}

import Database from "better-sqlite3"
import path from "path"
import type { Lead, LeadInput, DashboardStats } from "./types"

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "leads.db")

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    // Создаём директорию если не существует
    const dir = path.dirname(DB_PATH)
    const fs = require("fs")
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    db = new Database(DB_PATH)
    db.pragma("journal_mode = WAL")
    
    // Создаём таблицы
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        source TEXT NOT NULL,
        product TEXT,
        room_type TEXT,
        budget TEXT,
        urgency TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_term TEXT,
        utm_content TEXT,
        yclid TEXT,
        gclid TEXT,
        referrer TEXT,
        landing_page TEXT,
        ip TEXT,
        user_agent TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        status TEXT DEFAULT 'new',
        comment TEXT,
        sent_to_amocrm INTEGER DEFAULT 0,
        sent_to_telegram INTEGER DEFAULT 0
      );
      
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
      CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
      CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
      
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
      
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES admin_users(id)
      );
    `)
  }
  return db
}

export function createLead(input: LeadInput & { ip?: string; user_agent?: string }): Lead {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO leads (
      name, phone, source, product, room_type, budget, urgency,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      yclid, gclid, referrer, landing_page, ip, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    input.name,
    input.phone,
    input.source,
    input.product || null,
    input.room_type || null,
    input.budget || null,
    input.urgency || null,
    input.utm_source || null,
    input.utm_medium || null,
    input.utm_campaign || null,
    input.utm_term || null,
    input.utm_content || null,
    input.yclid || null,
    input.gclid || null,
    input.referrer || null,
    input.landing_page || null,
    input.ip || null,
    input.user_agent || null
  )
  
  return getLeadById(result.lastInsertRowid as number)!
}

export function getLeadById(id: number): Lead | null {
  const db = getDb()
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as any
  if (!row) return null
  return {
    ...row,
    sent_to_amocrm: Boolean(row.sent_to_amocrm),
    sent_to_telegram: Boolean(row.sent_to_telegram)
  }
}

export function getLeads(options: {
  limit?: number
  offset?: number
  status?: string
  source?: string
  search?: string
  from_date?: string
  to_date?: string
}): { leads: Lead[]; total: number } {
  const db = getDb()
  
  let whereClause = "WHERE 1=1"
  const params: any[] = []
  
  if (options.status) {
    whereClause += " AND status = ?"
    params.push(options.status)
  }
  if (options.source) {
    whereClause += " AND source = ?"
    params.push(options.source)
  }
  if (options.search) {
    whereClause += " AND (name LIKE ? OR phone LIKE ?)"
    params.push(`%${options.search}%`, `%${options.search}%`)
  }
  if (options.from_date) {
    whereClause += " AND created_at >= ?"
    params.push(options.from_date)
  }
  if (options.to_date) {
    whereClause += " AND created_at <= ?"
    params.push(options.to_date)
  }
  
  const countRow = db.prepare(`SELECT COUNT(*) as count FROM leads ${whereClause}`).get(...params) as any
  const total = countRow.count
  
  const limit = options.limit || 50
  const offset = options.offset || 0
  
  const rows = db.prepare(`
    SELECT * FROM leads ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset) as any[]
  
  const leads = rows.map(row => ({
    ...row,
    sent_to_amocrm: Boolean(row.sent_to_amocrm),
    sent_to_telegram: Boolean(row.sent_to_telegram)
  }))
  
  return { leads, total }
}

export function updateLead(id: number, updates: Partial<Lead>): Lead | null {
  const db = getDb()
  
  const allowedFields = ["status", "comment", "sent_to_amocrm", "sent_to_telegram"]
  const fieldsToUpdate = Object.keys(updates).filter(k => allowedFields.includes(k))
  
  if (fieldsToUpdate.length === 0) return getLeadById(id)
  
  const setClause = fieldsToUpdate.map(f => `${f} = ?`).join(", ")
  const values = fieldsToUpdate.map(f => (updates as any)[f])
  
  db.prepare(`UPDATE leads SET ${setClause} WHERE id = ?`).run(...values, id)
  
  return getLeadById(id)
}

export function getDashboardStats(): DashboardStats {
  const db = getDb()
  
  const total = (db.prepare("SELECT COUNT(*) as count FROM leads").get() as any).count
  
  const today = new Date().toISOString().split("T")[0]
  const todayLeads = (db.prepare(
    "SELECT COUNT(*) as count FROM leads WHERE date(created_at) = date(?)"
  ).get(today) as any).count
  
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const weekLeads = (db.prepare(
    "SELECT COUNT(*) as count FROM leads WHERE created_at >= ?"
  ).get(weekAgo) as any).count
  
  const bySource: Record<string, number> = {}
  const sourceRows = db.prepare("SELECT source, COUNT(*) as count FROM leads GROUP BY source").all() as any[]
  sourceRows.forEach(row => { bySource[row.source] = row.count })
  
  const byStatus: Record<string, number> = {}
  const statusRows = db.prepare("SELECT status, COUNT(*) as count FROM leads GROUP BY status").all() as any[]
  statusRows.forEach(row => { byStatus[row.status] = row.count })
  
  const byUtmSource: Record<string, number> = {}
  const utmRows = db.prepare(
    "SELECT COALESCE(utm_source, 'direct') as utm, COUNT(*) as count FROM leads GROUP BY utm"
  ).all() as any[]
  utmRows.forEach(row => { byUtmSource[row.utm] = row.count })
  
  return {
    total_leads: total,
    today_leads: todayLeads,
    week_leads: weekLeads,
    by_source: bySource,
    by_status: byStatus,
    by_utm_source: byUtmSource
  }
}

// Авторизация
export function createAdminUser(username: string, passwordHash: string): void {
  const db = getDb()
  db.prepare("INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)").run(username, passwordHash)
}

export function getAdminUser(username: string): { id: number; username: string; password_hash: string } | null {
  const db = getDb()
  return db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username) as any
}

export function createSession(sessionId: string, userId: number, expiresAt: Date): void {
  const db = getDb()
  db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(
    sessionId,
    userId,
    expiresAt.toISOString()
  )
}

export function getSession(sessionId: string): { user_id: number; expires_at: string } | null {
  const db = getDb()
  const session = db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId) as any
  if (!session) return null
  if (new Date(session.expires_at) < new Date()) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId)
    return null
  }
  return session
}

export function deleteSession(sessionId: string): void {
  const db = getDb()
  db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId)
}

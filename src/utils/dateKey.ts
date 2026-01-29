// utils/dateKey.ts

const DAY_MS = 24 * 60 * 60 * 1000 // 1 day in ms
const RE_DATEKEY = /^(\d{4})-(\d{2})-(\d{2})$/ // YYYY-MM-DD

export const toDateKey = (d = new Date()) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}` // local 기준
}

const parseDateKey = (dateKey: string) => {
  const m = RE_DATEKEY.exec(dateKey)
  if (!m) return null

  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return null
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null

  // 달력 검증
  const ms = Date.UTC(y, mo - 1, d)
  const check = new Date(ms)
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d)
    return null

  return { y, mo, d }
}

const dayIndexFromYMD = (y: number, mo: number, d: number) => {
  const ms = Date.UTC(y, mo - 1, d)
  return Math.floor(ms / DAY_MS)
}

export const dayIndexFromDateKey = (dateKey: string) => {
  const parsed = parseDateKey(dateKey)

  if (!parsed) {
    // DEV: fail fast
    if (import.meta.env.DEV) throw new Error(`[dateKey] invalid: ${dateKey}`)

    // PROD: fail safe
    const today = parseDateKey(toDateKey())
    return today ? dayIndexFromYMD(today.y, today.mo, today.d) : 0
  }

  return dayIndexFromYMD(parsed.y, parsed.mo, parsed.d)
}

export const colorIndexFromDateKey = (dateKey: string, cycle = 24) => {
  const idx = dayIndexFromDateKey(dateKey)
  // 음수 방어
  return ((idx % cycle) + cycle) % cycle
}

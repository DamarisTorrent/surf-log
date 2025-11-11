import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWaveHeight(meters: number | string): string {
  const m = typeof meters === 'string' ? parseFloat(meters) : meters
  if (isNaN(m)) return 'N/A'
  const feet = m * 3.28084
  return `${feet.toFixed(1)} ft`
}

export function formatWindSpeed(knots: number | string): string {
  const kts = typeof knots === 'string' ? parseFloat(knots) : knots
  if (isNaN(kts)) return 'N/A'
  return `${kts.toFixed(0)} kts`
}

export function formatPeriod(seconds: number | string): string {
  const s = typeof seconds === 'string' ? parseFloat(seconds) : seconds
  if (isNaN(s)) return 'N/A'
  return `${s.toFixed(0)}s`
}

export function degreesToDirection(degrees: number | string): string {
  const deg = typeof degrees === 'string' ? parseFloat(degrees) : degrees
  if (isNaN(deg)) return 'N/A'

  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(deg / 22.5) % 16
  return directions[index]
}

/**
 * Convert UTC time to Eastern Time (12-hour format with AM/PM)
 * NOAA data is in UTC, so we need to convert to ET (UTC-5 or UTC-4 depending on DST)
 */
export function formatTimeET(dateStr: string, timeStr: string): string {
  try {
    // Parse the date and time (NOAA format: YYYY-MM-DD and HH:MM)
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hour, minute] = timeStr.split(':').map(Number)

    // Create UTC date
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute))

    // Convert to Eastern Time
    const etDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }))

    // Format as 12-hour time
    const hours12 = etDate.getHours() % 12 || 12
    const mins = etDate.getMinutes().toString().padStart(2, '0')
    const ampm = etDate.getHours() >= 12 ? 'PM' : 'AM'

    return `${hours12}:${mins} ${ampm}`
  } catch (error) {
    return timeStr // Return original if conversion fails
  }
}

/**
 * Convert UTC date/time to Eastern Time date string
 */
export function formatDateET(dateStr: string, timeStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const [hour, minute] = timeStr.split(':').map(Number)

    // Create UTC date
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute))

    // Convert to Eastern Time
    const etDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }))

    // Format as MM/DD/YYYY
    const etMonth = (etDate.getMonth() + 1).toString().padStart(2, '0')
    const etDay = etDate.getDate().toString().padStart(2, '0')
    const etYear = etDate.getFullYear()

    return `${etMonth}/${etDay}/${etYear}`
  } catch (error) {
    return dateStr // Return original if conversion fails
  }
}

/**
 * Format date for display in header (e.g., "Monday, November 11, 2025")
 */
export function formatDateHeader(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateStr
  }
}

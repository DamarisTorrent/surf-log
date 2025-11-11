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

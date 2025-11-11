import { format } from 'date-fns'
import type { BuoyReading } from '../types/buoy'

// Use Vite proxy in development, CORS proxy in production
const isDev = import.meta.env.DEV
const CORS_PROXY = 'https://corsproxy.io/?'

const NOAA_BASE_URL = isDev
  ? '/api/noaa/data/realtime2'
  : `${CORS_PROXY}https://www.ndbc.noaa.gov/data/realtime2`

const NOAA_HISTORICAL_URL = isDev
  ? '/api/noaa/view_text_file.php'
  : `${CORS_PROXY}https://www.ndbc.noaa.gov/view_text_file.php`

console.log(`[NOAA API] Environment: ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`)
console.log(`[NOAA API] Base URL: ${NOAA_BASE_URL}`)

/**
 * Parse NOAA text data format into structured readings
 */
function parseNOAAData(text: string, buoyId: string): BuoyReading[] {
  const lines = text.trim().split('\n')

  // Skip first two lines (headers)
  if (lines.length < 3) return []

  const dataLines = lines.slice(2)
  const readings: BuoyReading[] = []

  for (const line of dataLines) {
    const parts = line.trim().split(/\s+/)

    if (parts.length < 9) continue

    // Format: #YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES ...
    const [year, month, day, hour, minute, wdir, wspd, gst, wvht, dpd, apd, mwd, pres] = parts

    // Skip invalid data (MM means missing)
    if (wvht === 'MM' || wvht === '99.00') continue

    readings.push({
      buoyId,
      date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      time: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      wdir: wdir === 'MM' ? '' : wdir,
      wspd: wspd === 'MM' ? '' : wspd,
      gst: gst === 'MM' ? '' : gst,
      wvht: wvht === 'MM' ? '' : wvht,
      dpd: dpd === 'MM' ? '' : dpd,
      apd: apd === 'MM' ? '' : apd,
      mwd: mwd === 'MM' ? '' : mwd,
      pres: pres === 'MM' ? '' : pres
    })
  }

  return readings
}

/**
 * Fetch real-time data (last 45 days) from a buoy
 */
export async function fetchRealtimeBuoyData(buoyId: string): Promise<BuoyReading[]> {
  try {
    const url = `${NOAA_BASE_URL}/${buoyId}.txt`
    console.log(`[NOAA API] Fetching real-time data from: ${url}`)

    const response = await fetch(url)
    console.log(`[NOAA API] Response status: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch buoy data: ${response.statusText}`)
    }

    const text = await response.text()
    console.log(`[NOAA API] Response length: ${text.length} characters`)
    console.log(`[NOAA API] First 200 chars:`, text.substring(0, 200))

    const data = parseNOAAData(text, buoyId)
    console.log(`[NOAA API] Parsed ${data.length} readings`)

    return data
  } catch (error) {
    console.error(`Error fetching realtime data for buoy ${buoyId}:`, error)
    return []
  }
}

/**
 * Fetch historical data for a specific date
 */
export async function fetchHistoricalBuoyData(
  buoyId: string,
  date: Date
): Promise<BuoyReading[]> {
  try {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    // NOAA historical data format: filename=BUOYID+h+YEAR+MONTH.txt.gz
    const filename = `${buoyId}h${year}${month}.txt.gz`
    const url = `${NOAA_HISTORICAL_URL}?filename=${filename}&dir=data/historical/stdmet/`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`)
    }

    const text = await response.text()
    return parseNOAAData(text, buoyId)
  } catch (error) {
    console.error(`Error fetching historical data for buoy ${buoyId}:`, error)
    return []
  }
}

/**
 * Fetch data for a specific date (automatically chooses realtime or historical)
 */
export async function fetchBuoyDataForDate(
  buoyId: string,
  date: Date
): Promise<BuoyReading[]> {
  const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))

  // Use realtime data for dates within 45 days
  if (daysAgo <= 45) {
    const allData = await fetchRealtimeBuoyData(buoyId)
    const targetDateStr = format(date, 'yyyy-MM-dd')
    return allData.filter(reading => reading.date === targetDateStr)
  }

  // Use historical data for older dates
  return fetchHistoricalBuoyData(buoyId, date)
}

/**
 * Get the latest reading from a buoy
 */
export async function fetchLatestBuoyReading(buoyId: string): Promise<BuoyReading | null> {
  const readings = await fetchRealtimeBuoyData(buoyId)
  return readings.length > 0 ? readings[0] : null
}

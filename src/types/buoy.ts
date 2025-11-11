export interface Buoy {
  id: string
  name: string
  location: string
  lat: number
  lon: number
  region: 'atlantic' | 'pacific' | 'caribbean'
}

export interface WaveData {
  timestamp: Date
  waveHeight: number // meters
  dominantPeriod: number // seconds
  averagePeriod: number // seconds
  waveDirection: number // degrees
  windSpeed: number // knots
  windDirection: number // degrees
  windGust: number // knots
  pressure: number // hPa
}

export interface BuoyReading {
  buoyId: string
  date: string
  time: string
  wdir: string // Wind direction (degrees)
  wspd: string // Wind speed (m/s)
  gst: string // Wind gust (m/s)
  wvht: string // Wave height (m)
  dpd: string // Dominant wave period (s)
  apd: string // Average wave period (s)
  mwd: string // Mean wave direction (degrees)
  pres: string // Pressure (hPa)
}

export const BUOYS: Buoy[] = [
  // Atlantic Coast
  {
    id: '44008',
    name: 'Nantucket',
    location: 'Nantucket, MA',
    lat: 40.5,
    lon: -69.25,
    region: 'atlantic'
  },
  {
    id: '41002',
    name: 'South Hatteras',
    location: 'Hatteras, NC',
    lat: 32.38,
    lon: -75.35,
    region: 'atlantic'
  },
  {
    id: '41013',
    name: 'Frying Pan Shoals',
    location: 'Cape Fear, NC',
    lat: 33.44,
    lon: -77.74,
    region: 'atlantic'
  },
  {
    id: '41004',
    name: 'Edisto',
    location: 'Charleston, SC',
    lat: 32.5,
    lon: -79.09,
    region: 'atlantic'
  },
  {
    id: '41008',
    name: 'Grays Reef',
    location: 'Jacksonville, FL',
    lat: 31.4,
    lon: -80.87,
    region: 'atlantic'
  },
  {
    id: '41009',
    name: 'Canaveral',
    location: 'Cocoa Beach, FL',
    lat: 28.5,
    lon: -80.19,
    region: 'atlantic'
  },
  // Caribbean
  {
    id: '41047',
    name: 'NE Bahamas',
    location: 'Northeast Bahamas',
    lat: 27.54,
    lon: -71.49,
    region: 'caribbean'
  },
  {
    id: '41046',
    name: 'East Bahamas',
    location: 'East Bahamas',
    lat: 23.82,
    lon: -68.39,
    region: 'caribbean'
  },
  // Pacific Coast
  {
    id: '46053',
    name: 'Santa Barbara',
    location: 'Santa Barbara, CA',
    lat: 34.25,
    lon: -119.85,
    region: 'pacific'
  },
  {
    id: '46086',
    name: 'San Clemente',
    location: 'San Clemente, CA',
    lat: 32.49,
    lon: -118.03,
    region: 'pacific'
  }
]

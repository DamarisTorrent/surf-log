export interface Buoy {
  id: string
  name: string
  location: string
  lat: number
  lon: number
  region: 'northeast' | 'mid-atlantic' | 'southeast' | 'gulf' | 'caribbean' | 'pacific-north' | 'pacific-central' | 'pacific-south' | 'hawaii'
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
  // Northeast Atlantic
  {
    id: '44008',
    name: 'Nantucket',
    location: 'SE of Nantucket, MA',
    lat: 40.5,
    lon: -69.25,
    region: 'northeast'
  },
  {
    id: '44009',
    name: 'Delaware Bay',
    location: 'SE of Cape May, NJ',
    lat: 38.46,
    lon: -74.69,
    region: 'northeast'
  },
  {
    id: '44017',
    name: 'Montauk Point',
    location: 'SSW of Montauk, NY',
    lat: 40.69,
    lon: -72.05,
    region: 'northeast'
  },
  {
    id: '44011',
    name: 'Georges Bank',
    location: 'E of Hyannis, MA',
    lat: 41.09,
    lon: -66.55,
    region: 'northeast'
  },
  {
    id: '44027',
    name: 'Jonesport',
    location: 'SE of Jonesport, ME',
    lat: 44.28,
    lon: -67.30,
    region: 'northeast'
  },
  {
    id: '44060',
    name: 'New York Harbor',
    location: 'New York, NY',
    lat: 40.69,
    lon: -73.77,
    region: 'northeast'
  },

  // Mid-Atlantic
  {
    id: '41002',
    name: 'South Hatteras',
    location: 'S of Hatteras, NC',
    lat: 32.38,
    lon: -75.35,
    region: 'mid-atlantic'
  },
  {
    id: '41013',
    name: 'Frying Pan Shoals',
    location: 'Cape Fear, NC',
    lat: 33.44,
    lon: -77.74,
    region: 'mid-atlantic'
  },
  {
    id: '41025',
    name: 'Diamond Shoals',
    location: 'Diamond Shoals, NC',
    lat: 35.01,
    lon: -75.40,
    region: 'mid-atlantic'
  },

  // Southeast Atlantic
  {
    id: '41004',
    name: 'Edisto',
    location: 'SE of Charleston, SC',
    lat: 32.5,
    lon: -79.09,
    region: 'southeast'
  },
  {
    id: '41008',
    name: 'Grays Reef',
    location: 'Savannah, GA',
    lat: 31.4,
    lon: -80.87,
    region: 'southeast'
  },
  {
    id: '41009',
    name: 'Canaveral',
    location: 'Cocoa Beach, FL',
    lat: 28.5,
    lon: -80.19,
    region: 'southeast'
  },
  {
    id: '41010',
    name: 'Canaveral East',
    location: 'E of Jacksonville, FL',
    lat: 28.88,
    lon: -78.47,
    region: 'southeast'
  },
  {
    id: '41012',
    name: 'St. Augustine',
    location: 'NE of St. Augustine, FL',
    lat: 30.04,
    lon: -80.53,
    region: 'southeast'
  },

  // Gulf of Mexico
  {
    id: '42001',
    name: 'Mid Gulf',
    location: 'Central Gulf of Mexico',
    lat: 25.93,
    lon: -89.66,
    region: 'gulf'
  },
  {
    id: '42020',
    name: 'Corpus Christi',
    location: 'S of Corpus Christi, TX',
    lat: 26.97,
    lon: -96.68,
    region: 'gulf'
  },
  {
    id: '42023',
    name: 'W Tampa',
    location: 'W of Tampa, FL',
    lat: 26.01,
    lon: -83.09,
    region: 'gulf'
  },
  {
    id: '42039',
    name: 'Pensacola',
    location: 'NE Gulf of Mexico',
    lat: 28.79,
    lon: -86.01,
    region: 'gulf'
  },
  {
    id: '42040',
    name: 'Luke Offshore',
    location: 'S of Dauphin Island, AL',
    lat: 29.21,
    lon: -88.21,
    region: 'gulf'
  },
  {
    id: '42036',
    name: 'W Tampa',
    location: 'W of Tampa, FL',
    lat: 28.50,
    lon: -84.51,
    region: 'gulf'
  },

  // Caribbean
  {
    id: '41046',
    name: 'East Bahamas',
    location: 'E Bahamas',
    lat: 23.82,
    lon: -68.39,
    region: 'caribbean'
  },
  {
    id: '41047',
    name: 'NE Bahamas',
    location: 'NE Bahamas',
    lat: 27.54,
    lon: -71.49,
    region: 'caribbean'
  },
  {
    id: '41043',
    name: 'NE Puerto Rico',
    location: 'NE of San Juan, PR',
    lat: 21.03,
    lon: -64.79,
    region: 'caribbean'
  },
  {
    id: '42058',
    name: 'Virgin Islands',
    location: 'S of St. John, USVI',
    lat: 17.87,
    lon: -64.73,
    region: 'caribbean'
  },
  {
    id: '42059',
    name: 'E Caribbean',
    location: 'E of Martinique',
    lat: 15.30,
    lon: -67.48,
    region: 'caribbean'
  },

  // Pacific Northwest
  {
    id: '46002',
    name: 'Oregon Offshore',
    location: 'W of Coos Bay, OR',
    lat: 42.59,
    lon: -130.47,
    region: 'pacific-north'
  },
  {
    id: '46015',
    name: 'Port Orford',
    location: 'W of Port Orford, OR',
    lat: 42.76,
    lon: -124.53,
    region: 'pacific-north'
  },
  {
    id: '46029',
    name: 'Columbia River Bar',
    location: 'Columbia River Mouth',
    lat: 46.12,
    lon: -124.51,
    region: 'pacific-north'
  },
  {
    id: '46041',
    name: 'Cape Elizabeth',
    location: 'NW of Aberdeen, WA',
    lat: 47.35,
    lon: -124.73,
    region: 'pacific-north'
  },
  {
    id: '46050',
    name: 'Stonewall Bank',
    location: 'W of Newport, OR',
    lat: 44.66,
    lon: -124.52,
    region: 'pacific-north'
  },
  {
    id: '46089',
    name: 'Tillamook',
    location: 'WNW of Tillamook, OR',
    lat: 45.87,
    lon: -125.76,
    region: 'pacific-north'
  },

  // Pacific Central California
  {
    id: '46013',
    name: 'Bodega Bay',
    location: 'NW of Bodega Bay, CA',
    lat: 38.24,
    lon: -123.30,
    region: 'pacific-central'
  },
  {
    id: '46026',
    name: 'San Francisco',
    location: 'W of San Francisco, CA',
    lat: 37.75,
    lon: -122.84,
    region: 'pacific-central'
  },
  {
    id: '46012',
    name: 'Half Moon Bay',
    location: 'Half Moon Bay, CA',
    lat: 37.36,
    lon: -122.88,
    region: 'pacific-central'
  },
  {
    id: '46042',
    name: 'Monterey Bay',
    location: 'NW of Monterey, CA',
    lat: 36.75,
    lon: -122.42,
    region: 'pacific-central'
  },
  {
    id: '46028',
    name: 'Cape San Martin',
    location: 'SW of San Simeon, CA',
    lat: 35.74,
    lon: -121.88,
    region: 'pacific-central'
  },

  // Pacific Southern California
  {
    id: '46023',
    name: 'Point Arguello',
    location: 'SW of Point Arguello, CA',
    lat: 34.45,
    lon: -120.78,
    region: 'pacific-south'
  },
  {
    id: '46053',
    name: 'Santa Barbara',
    location: 'W of Santa Barbara, CA',
    lat: 34.25,
    lon: -119.85,
    region: 'pacific-south'
  },
  {
    id: '46025',
    name: 'Santa Monica Basin',
    location: 'SW of Santa Monica, CA',
    lat: 33.75,
    lon: -119.05,
    region: 'pacific-south'
  },
  {
    id: '46222',
    name: 'San Pedro',
    location: 'San Pedro, CA',
    lat: 33.62,
    lon: -118.32,
    region: 'pacific-south'
  },
  {
    id: '46224',
    name: 'Long Beach',
    location: 'Long Beach, CA',
    lat: 33.55,
    lon: -118.03,
    region: 'pacific-south'
  },
  {
    id: '46086',
    name: 'San Clemente',
    location: 'W of San Clemente, CA',
    lat: 32.49,
    lon: -118.03,
    region: 'pacific-south'
  },
  {
    id: '46225',
    name: 'Torrey Pines',
    location: 'Torrey Pines, CA',
    lat: 33.00,
    lon: -117.39,
    region: 'pacific-south'
  },
  {
    id: '46232',
    name: 'Point Loma',
    location: 'Point Loma, CA',
    lat: 32.57,
    lon: -117.47,
    region: 'pacific-south'
  },
  {
    id: '46235',
    name: 'Mission Bay',
    location: 'Mission Bay, CA',
    lat: 32.93,
    lon: -117.39,
    region: 'pacific-south'
  },

  // Hawaii
  {
    id: '51000',
    name: 'NW Hawaii',
    location: 'NE of Kauai, HI',
    lat: 23.45,
    lon: -153.86,
    region: 'hawaii'
  },
  {
    id: '51001',
    name: 'NW Hawaii #1',
    location: 'NW of Kauai, HI',
    lat: 23.43,
    lon: -162.18,
    region: 'hawaii'
  },
  {
    id: '51101',
    name: 'NW Hawaii #2',
    location: 'NW of Kauai, HI',
    lat: 24.36,
    lon: -162.07,
    region: 'hawaii'
  },
  {
    id: '51003',
    name: 'Mokapu Point',
    location: 'NE of Oahu, HI',
    lat: 19.18,
    lon: -160.64,
    region: 'hawaii'
  },
  {
    id: '51004',
    name: 'SE Hawaii',
    location: 'SE of Hilo, HI',
    lat: 17.48,
    lon: -152.37,
    region: 'hawaii'
  },
  {
    id: '51201',
    name: 'Waimea Bay',
    location: 'Off Oahu, HI',
    lat: 21.67,
    lon: -158.12,
    region: 'hawaii'
  }
]

import { Waves, Wind, Compass, Gauge, Calendar } from 'lucide-react'
import type { BuoyReading } from '../types/buoy'
import { formatWaveHeight, formatWindSpeed, formatPeriod, degreesToDirection, formatTimeET, formatDateET, formatDateHeader } from '../lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface WaveDataDisplayProps {
  readings: BuoyReading[]
  isLoading?: boolean
  selectedDate?: Date | null
}

export function WaveDataDisplay({ readings, isLoading, selectedDate }: WaveDataDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-500 border-t-transparent"></div>
      </div>
    )
  }

  if (readings.length === 0) {
    return (
      <div className="text-center py-12">
        <Waves className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
        <p className="text-slate-600 dark:text-slate-400">No data available for this date</p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Try selecting a different date or buoy</p>
      </div>
    )
  }

  const latestReading = readings[0]

  // Determine the date to display
  const displayDate = selectedDate
    ? formatDateHeader(selectedDate.toISOString().split('T')[0])
    : 'Current Conditions'

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="p-2 bg-ocean-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {selectedDate ? 'Historical Data' : 'Real-time Data'}
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {displayDate}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              All times shown in Eastern Time (ET)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Conditions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Waves className="w-6 h-6" />}
          label="Wave Height"
          value={formatWaveHeight(latestReading.wvht)}
          color="ocean"
        />
        <StatCard
          icon={<Compass className="w-6 h-6" />}
          label="Wave Period"
          value={formatPeriod(latestReading.dpd)}
          color="cyan"
        />
        <StatCard
          icon={<Wind className="w-6 h-6" />}
          label="Wind Speed"
          value={formatWindSpeed(latestReading.wspd)}
          color="sky"
        />
        <StatCard
          icon={<Gauge className="w-6 h-6" />}
          label="Direction"
          value={degreesToDirection(latestReading.mwd)}
          color="blue"
        />
      </div>

      {/* Detailed Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Time (ET)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Wave Height</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Period</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Wind</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {readings.map((reading, index) => (
                  <tr
                    key={`${reading.date}-${reading.time}-${index}`}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-mono">
                      {formatDateET(reading.date, reading.time)}
                    </td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-mono">
                      {formatTimeET(reading.date, reading.time)}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {formatWaveHeight(reading.wvht)}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {formatPeriod(reading.dpd)}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {formatWindSpeed(reading.wspd)}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {degreesToDirection(reading.mwd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  color: 'ocean' | 'cyan' | 'sky' | 'blue'
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    ocean: 'bg-ocean-500 text-white',
    cyan: 'bg-cyan-500 text-white',
    sky: 'bg-sky-500 text-white',
    blue: 'bg-blue-500 text-white'
  }

  return (
    <Card className="hover:scale-105 transition-transform duration-200">
      <CardContent className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

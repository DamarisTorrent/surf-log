import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { BuoyReading } from '../types/buoy'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface WaveChartProps {
  readings: BuoyReading[]
}

export function WaveChart({ readings }: WaveChartProps) {
  if (readings.length === 0) {
    return null
  }

  // Convert readings to chart data
  const chartData = readings
    .slice(0, 48) // Last 48 readings (typically 24-48 hours)
    .reverse() // Show chronologically
    .map(reading => ({
      time: reading.time,
      waveHeight: parseFloat(reading.wvht) * 3.28084 || 0, // Convert to feet
      period: parseFloat(reading.dpd) || 0,
      windSpeed: parseFloat(reading.wspd) * 1.94384 || 0 // Convert m/s to knots
    }))

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {payload[0].payload.time}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)} {entry.name === 'Wave Height' ? 'ft' : entry.name === 'Period' ? 's' : 'kts'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wave Trends (Last 48 Hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="#94a3b8"
              tickFormatter={(value) => value.split(':')[0] + 'h'}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              stroke="#0ea5e9"
              label={{ value: 'Wave Height (ft)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke="#06b6d4"
              label={{ value: 'Period (s)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="waveHeight"
              name="Wave Height"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="period"
              name="Period"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

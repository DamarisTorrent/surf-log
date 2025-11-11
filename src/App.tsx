import { useState, useEffect } from 'react'
import { Waves } from 'lucide-react'
import { BuoySelector } from './components/BuoySelector'
import { DatePicker } from './components/DatePicker'
import { WaveDataDisplay } from './components/WaveDataDisplay'
import { WaveChart } from './components/WaveChart'
import { Card, CardContent, CardHeader, CardTitle } from './components/Card'
import { fetchRealtimeBuoyData, fetchBuoyDataForDate } from './lib/noaa-api'
import type { BuoyReading } from './types/buoy'
import { BUOYS } from './types/buoy'

function App() {
  const [selectedBuoyId, setSelectedBuoyId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [waveData, setWaveData] = useState<BuoyReading[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load data when buoy or date changes
  useEffect(() => {
    if (!selectedBuoyId) return

    const loadData = async () => {
      setIsLoading(true)
      try {
        // If no date selected, show real-time data (last 45 days)
        // If date selected, show data for that specific date
        const data = selectedDate
          ? await fetchBuoyDataForDate(selectedBuoyId, selectedDate)
          : await fetchRealtimeBuoyData(selectedBuoyId)
        setWaveData(data)
      } catch (error) {
        console.error('Error loading wave data:', error)
        setWaveData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedBuoyId, selectedDate])

  const selectedBuoy = BUOYS.find(b => b.id === selectedBuoyId)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-ocean-500 rounded-xl">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                SurfLog
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                NOAA Buoy Wave Data Viewer
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Buoy Selection */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <Card className="sticky top-4 max-h-[calc(100vh-2rem)] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl">Select Buoy</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto flex-1">
                <BuoySelector
                  selectedBuoyId={selectedBuoyId}
                  onSelectBuoy={setSelectedBuoyId}
                />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            {!selectedBuoyId ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Waves className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Welcome to SurfLog
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Select a buoy from the sidebar to view wave data
                  </p>
                  <div className="max-w-md mx-auto text-left bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                      Available Features:
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-ocean-500">•</span>
                        <span>Real-time wave data from 70+ NOAA buoys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-ocean-500">•</span>
                        <span>Historical data up to 15 years back</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-ocean-500">•</span>
                        <span>Wave height, period, and wind conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-ocean-500">•</span>
                        <span>Visual charts and detailed data tables</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Date Picker */}
                <Card>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedBuoy?.name}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {selectedBuoy?.location} • Buoy {selectedBuoy?.id}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto">
                        <DatePicker
                          selectedDate={selectedDate}
                          onSelectDate={setSelectedDate}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Wave Data */}
                <WaveDataDisplay readings={waveData} isLoading={isLoading} />

                {/* Wave Chart */}
                {waveData.length > 0 && <WaveChart readings={waveData} />}
              </>
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>Data provided by NOAA National Data Buoy Center</p>
          <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App

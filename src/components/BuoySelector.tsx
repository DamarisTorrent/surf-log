import { Waves } from 'lucide-react'
import { BUOYS, type Buoy } from '../types/buoy'
import { cn } from '../lib/utils'

interface BuoySelectorProps {
  selectedBuoyId: string | null
  onSelectBuoy: (buoyId: string) => void
}

export function BuoySelector({ selectedBuoyId, onSelectBuoy }: BuoySelectorProps) {
  const groupedBuoys = BUOYS.reduce((acc, buoy) => {
    if (!acc[buoy.region]) {
      acc[buoy.region] = []
    }
    acc[buoy.region].push(buoy)
    return acc
  }, {} as Record<string, Buoy[]>)

  const regionNames = {
    atlantic: '🌊 Atlantic Coast',
    caribbean: '🏝️ Caribbean',
    pacific: '🌅 Pacific Coast'
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedBuoys).map(([region, buoys]) => (
        <div key={region}>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider">
            {regionNames[region as keyof typeof regionNames]}
          </h3>
          <div className="space-y-2">
            {buoys.map((buoy) => (
              <button
                key={buoy.id}
                onClick={() => onSelectBuoy(buoy.id)}
                className={cn(
                  'w-full text-left p-4 rounded-lg transition-all duration-200',
                  'border-2 hover:scale-[1.02] hover:shadow-lg',
                  selectedBuoyId === buoy.id
                    ? 'bg-ocean-500 border-ocean-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    selectedBuoyId === buoy.id
                      ? 'bg-white/20'
                      : 'bg-ocean-100 dark:bg-ocean-900/30'
                  )}>
                    <Waves className={cn(
                      'w-5 h-5',
                      selectedBuoyId === buoy.id
                        ? 'text-white'
                        : 'text-ocean-600 dark:text-ocean-400'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      'font-semibold text-sm mb-1',
                      selectedBuoyId === buoy.id
                        ? 'text-white'
                        : 'text-slate-900 dark:text-white'
                    )}>
                      {buoy.name}
                    </div>
                    <div className={cn(
                      'text-xs',
                      selectedBuoyId === buoy.id
                        ? 'text-white/80'
                        : 'text-slate-600 dark:text-slate-400'
                    )}>
                      {buoy.location}
                    </div>
                    <div className={cn(
                      'text-xs mt-1 font-mono',
                      selectedBuoyId === buoy.id
                        ? 'text-white/60'
                        : 'text-slate-500 dark:text-slate-500'
                    )}>
                      ID: {buoy.id}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

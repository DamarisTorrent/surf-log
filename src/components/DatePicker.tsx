import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface DatePickerProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value + 'T00:00:00')
    onSelectDate(date)
  }

  const formatDateForInput = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
  }

  // Maximum date is today
  const maxDate = format(new Date(), 'yyyy-MM-dd')
  // Minimum date is 15 years ago (NOAA historical data availability)
  const minDate = format(new Date(new Date().setFullYear(new Date().getFullYear() - 15)), 'yyyy-MM-dd')

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Select Date
      </label>
      <div className="relative">
        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent
                     transition-all duration-200"
        />
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Historical data available from the last 15 years
      </p>
    </div>
  )
}

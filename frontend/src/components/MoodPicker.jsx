import { Moon, ShieldCheck, Zap, Sparkles, Flame, Gift, Leaf, Coffee } from 'lucide-react'

/**
 * Mood Picker with Light and Dark theme support
 */

const MOODS = [
  { id: 'tired',       icon: <Moon size={15} />, label: 'Low Energy' },
  { id: 'stressed',    icon: <ShieldCheck size={15} />, label: 'Comfort Food' },
  { id: 'happy',       icon: <Sparkles size={15} />, label: 'Good Mood' },
  { id: 'energetic',   icon: <Zap size={15} />, label: 'High Energy' },
  { id: 'hungry',      icon: <Flame size={15} />, label: 'Very Hungry' },
  { id: 'celebratory', icon: <Gift size={15} />, label: 'Treat' },
  { id: 'healthy',     icon: <Leaf size={15} />, label: 'Clean & Health' },
  { id: 'light',       icon: <Coffee size={15} />, label: 'Light Snack' },
]

export default function MoodPicker({ selected, onSelect }) {
  return (
    <div className="bg-white dark:bg-[#181a1f] rounded-3xl border border-gray-200 dark:border-white/10 p-5 shadow-sm">
      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-400 mb-3 text-center">
        Select Dining State / Preference:
      </p>
      <div className="grid grid-cols-4 gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-150
              ${selected?.id === mood.id
                ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm scale-105 font-bold'
                : 'border-gray-100 dark:border-white/5 bg-gray-50/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100/80 dark:hover:bg-white/10'
              }
            `}
          >
            <span className="shrink-0">{mood.icon}</span>
            <span className="text-[10px] font-medium text-center leading-tight">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

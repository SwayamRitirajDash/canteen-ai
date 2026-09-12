import { SlidersHorizontal } from 'lucide-react'

/**
 * BudgetSlider component supporting Light and Dark theme modes.
 */

export default function BudgetSlider({ value, onChange }) {
  const MIN = 20
  const MAX = 200

  const percentage = ((value - MIN) / (MAX - MIN)) * 100

  return (
    <div className="bg-white dark:bg-[#181a1f] rounded-3xl border border-gray-200 dark:border-white/10 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <SlidersHorizontal size={12} /> Target Budget
        </span>
        <div className="bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold px-3 py-1 rounded-full">
          ₹{value}
        </div>
      </div>

      <div className="relative my-2">
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none bg-gray-200 dark:bg-white/10 rounded-full outline-none cursor-pointer accent-black dark:accent-white"
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-gray-400 dark:text-gray-500 mt-1">
        <span>₹{MIN}</span>
        <span>₹{MAX}</span>
      </div>

      {/* Budget Tier Buttons */}
      <div className="flex justify-around mt-3 pt-3 border-t border-gray-100 dark:border-white/10">
        {[
          { max: 40, label: 'Snack (₹40)' },
          { max: 80, label: 'Meal (₹80)' },
          { max: 150, label: 'Feast (₹150)' },
        ].map(({ max, label }) => (
          <button
            key={label}
            onClick={() => onChange(max)}
            className="text-[11px] font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

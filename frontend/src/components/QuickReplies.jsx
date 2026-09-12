/**
 * Quick-Reply Pills supporting Light and Dark themes
 */
export default function QuickReplies({ replies, onSelect }) {
  if (!replies || replies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-1 px-1">
      {replies.map((reply, i) => (
        <button
          key={i}
          onClick={() => onSelect(reply)}
          className="
            px-3.5 py-1.5 bg-white dark:bg-[#181a1f] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300
            rounded-full text-xs font-medium shadow-sm
            hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white
            transition-all duration-150 cursor-pointer whitespace-nowrap
          "
        >
          {reply}
        </button>
      ))}
    </div>
  )
}

export const INITIAL_CHIPS = [
  'Under ₹50 Vegetarian',
  'Low Energy & Need Comfort',
  'Spicy & Flavorful',
  'Clean & High Protein',
  'Quick Bite (<5 mins)',
  'Cheapest Available Options',
  'Full Meal Combo Under ₹100',
  'Special Treats',
]

export const POST_REC_CHIPS = [
  'Show different options',
  'Cheaper alternatives',
  'Faster preparation (<5 min)',
  'Add a beverage pairing',
  'Suggest a combo',
  'Vegan options only',
]

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Flame, AlertCircle, Plus, Check } from 'lucide-react'
import FoodAnimation from './FoodAnimation'
import ProteinBadge from './ProteinBadge'

/**
 * Animated FoodCard with Framer Motion physics, Protein Badge, and tailored dish animations.
 */
export default function FoodCard({ 
  item, 
  rank = null, 
  isOverBudget = false, 
  onAddToTray = null,
  isAdded = false 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isOver = Boolean(isOverBudget || item?.over_budget || (item?.exceed_amount && item.exceed_amount > 0))
  const exceedAmount = item?.exceed_amount || 0

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white dark:bg-[#16181b] rounded-3xl p-5 border transition-colors duration-200
        flex flex-col justify-between shadow-sm hover:shadow-xl
        ${isOver ? 'border-amber-300 dark:border-amber-500/40 bg-amber-50/20 dark:bg-amber-500/5' : 'border-gray-200/80 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'}
      `}
    >
      {/* Rank badge */}
      {rank && (
        <div className="absolute top-4 left-4 z-10 bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
          {rank}
        </div>
      )}

      {/* Over-budget notice */}
      {isOver && (
        <div className="bg-amber-500/10 border border-amber-500/30 dark:border-amber-500/40 rounded-2xl px-3 py-2 flex items-center justify-between gap-2 text-amber-900 dark:text-amber-300 text-xs mb-3 shadow-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <AlertCircle size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-medium truncate">
              {exceedAmount > 0 ? (
                <>Exceeds budget by <strong className="font-mono font-bold text-amber-950 dark:text-amber-100">₹{exceedAmount}</strong></>
              ) : (
                'Exceeds budget (Stretch Pick)'
              )}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md shrink-0">
            {exceedAmount > 0 ? `+₹${exceedAmount}` : 'Stretch'}
          </span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header with Tailored Food Animation */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-3">
            {/* Animated Food Icon Visualizer */}
            <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 flex items-center justify-center shrink-0 shadow-inner">
              <FoodAnimation category={item.category} name={item.name} isHovered={isHovered} />
            </div>
            
            <div>
              <h3 className="font-bold text-gray-950 dark:text-white text-sm sm:text-base leading-tight">
                {item.name}
              </h3>
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-400 mt-0.5 uppercase tracking-wider">
                {item.category}
              </p>
            </div>
          </div>
          
          <div className="text-right shrink-0">
            <div className="text-base sm:text-lg font-black text-gray-950 dark:text-white font-mono">
              ₹{item.price}
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs justify-end font-semibold">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="font-mono text-[11px]">{item.rating}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Meta row with Protein Badge */}
        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
          {/* Protein Badge */}
          <ProteinBadge item={item} size="sm" />

          <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 px-2 py-0.5 rounded-lg font-mono text-[10px]">
            <Flame size={10} className="text-emerald-600 dark:text-emerald-400" />
            <span>{item.calories} kcal</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 px-2 py-0.5 rounded-lg font-mono text-[10px]">
            <Clock size={10} className="text-gray-400" />
            <span>{item.prep_time_mins}m</span>
          </div>
          
          {item.dietary_tags && (
            <>
              {item.dietary_tags.includes('vegan') ? (
                <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-lg font-mono font-medium text-[10px]">
                  VEGAN
                </span>
              ) : item.dietary_tags.includes('vegetarian') ? (
                <span className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded-lg font-mono font-medium text-[10px]">
                  VEG
                </span>
              ) : (
                <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-lg font-mono font-medium text-[10px]">
                  NON-VEG
                </span>
              )}
            </>
          )}
        </div>

        {/* Distinct Prominent WHY Rationale Callout */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-800/80 rounded-2xl p-3 text-xs leading-relaxed mb-3.5 shadow-sm transition-colors">
          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-[10px] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-black">WHY:</span>
            <span>{item.reason ? 'Tailored AI Match' : 'Nutritional Highlight'}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-200 text-xs font-normal leading-relaxed">
            {item.reason || `${item.name} provides a balanced profile with ${item.calories} kcal and ${item.protein_g || 10}g protein at ₹${item.price}, prepared in ~${item.prep_time_mins || 5} mins.`}
          </p>
        </div>

        {/* Action button with Framer Motion tap animation */}
        {onAddToTray && (
          <div className="pt-2 border-t border-gray-100 dark:border-white/10">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onAddToTray(item)}
              className={`w-full py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isAdded 
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={12} strokeWidth={2.5} /> On Tray
                </>
              ) : (
                <>
                  <Plus size={12} strokeWidth={2.5} /> Add to Tray (₹{item.price})
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

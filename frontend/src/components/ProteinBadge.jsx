import React from 'react'
import { Zap, ShieldCheck } from 'lucide-react'

/**
 * Calculates protein in grams if not present or formats it.
 */
export function getProteinAmount(item) {
  if (item?.protein_g !== undefined && item?.protein_g !== null) {
    return item.protein_g
  }
  if (item?.protein !== undefined && item?.protein !== null) {
    return item.protein
  }

  // Smart fallback estimate based on name / category / calories
  const name = (item?.name || '').toLowerCase()
  const desc = (item?.description || '').toLowerCase()
  const cal = item?.calories || 250

  if (name.includes('paneer') || desc.includes('paneer')) return 22
  if (name.includes('chicken') || desc.includes('chicken')) return 28
  if (name.includes('egg') || desc.includes('egg')) return 16
  if (name.includes('chole') || name.includes('rajma') || name.includes('sprout')) return 15
  if (name.includes('dal') || desc.includes('lentil')) return 13
  if (name.includes('thali') || name.includes('combo')) return 20
  if (name.includes('idli') || name.includes('dosa')) return 9
  if (name.includes('biryani') || name.includes('rice')) return 11
  return Math.max(4, Math.round(cal * 0.035))
}

export default function ProteinBadge({ item, protein = null, size = 'sm', className = '' }) {
  const proteinVal = protein !== null ? protein : getProteinAmount(item)
  const isHighProtein = proteinVal >= 14

  if (size === 'xs') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border ${
          isHighProtein
            ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300'
            : 'bg-emerald-50/50 dark:bg-white/5 border-emerald-200/80 dark:border-white/10 text-emerald-700 dark:text-emerald-300'
        } ${className}`}
      >
        <Zap size={9} className="text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
        <span>{proteinVal}g Protein</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-extrabold text-[11px] px-2.5 py-1 rounded-lg border shadow-sm transition-all ${
        isHighProtein
          ? 'bg-gradient-to-r from-emerald-100/90 to-teal-100/90 dark:from-emerald-950/90 dark:to-teal-950/90 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-emerald-600/10'
          : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
      } ${className}`}
      title={`${proteinVal}g of dietary protein per serving`}
    >
      <Zap size={11} className="text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
      <span>{proteinVal}g Protein</span>
      {isHighProtein && (
        <span className="text-[9px] uppercase tracking-wider font-sans font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded ml-0.5">
          High
        </span>
      )}
    </span>
  )
}

import { useState } from 'react'
import { Sparkles, ArrowRight, Plus } from 'lucide-react'
import ProteinBadge from './ProteinBadge'

export default function ComboOptimizer({ onAddToTray }) {
  const [budget, setBudget] = useState(80)

  const combos = [
    {
      id: 'CB-STUDENT',
      name: 'Classic Campus Quick Snack',
      price: 30,
      prep_time: 5,
      calories: 380,
      protein_g: 8,
      tags: ['Vegetarian', 'Quick'],
      items: ['Samosa (2 pcs)', 'Masala Chai'],
      reason: 'Perfect energy recharge between two back-to-back lectures.'
    },
    {
      id: 'CB-LIGHT',
      name: 'Fresh & Light Refreshment',
      price: 55,
      prep_time: 4,
      calories: 350,
      protein_g: 11,
      tags: ['Vegetarian', 'Healthy'],
      items: ['Bread Sandwich (Grilled)', 'Fresh Lime Soda'],
      reason: 'Crispy grilled sandwich with cooling zesty lime soda.'
    },
    {
      id: 'CB-VALUE',
      name: 'Daily Power Lunch Box',
      price: 65,
      prep_time: 5,
      calories: 700,
      protein_g: 22,
      tags: ['Vegetarian', 'High Protein'],
      items: ['Meal Combo (Rice + Dal + Sabzi)', 'Buttermilk (Chaas)'],
      reason: 'Wholesome balanced lunch with digestive chaas and high protein dal.'
    },
    {
      id: 'CB-FEAST',
      name: 'Student Royal Thali Special',
      price: 90,
      prep_time: 6,
      calories: 900,
      protein_g: 26,
      tags: ['Vegetarian', 'Full Meal'],
      items: ['Thali (Full Veg)', 'Gulab Jamun (2 pcs)'],
      reason: 'Complete royal feast with dal, 2 sabzi, 3 rotis, rice, and sweet.'
    },
    {
      id: 'CB-CHINESE',
      name: 'Indo-Chinese Party Combo',
      price: 85,
      prep_time: 8,
      calories: 600,
      protein_g: 14,
      tags: ['Vegetarian', 'Celebratory'],
      items: ['Veg Noodles (Hakka)', 'Cold Coffee'],
      reason: 'Tangy Hakka noodles coupled with thick chilled cold coffee.'
    }
  ]

  const filteredCombos = combos.filter(c => c.price <= budget + 10)

  return (
    <section id="combos" className="py-6 scroll-mt-24">
      <div className="bg-white dark:bg-[#121417] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-200">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-mono font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              <span>003 • SMART PAIRING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Combo Meal Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your budget limit and let the algorithm pair main dishes with beverages for optimal value.
            </p>
          </div>

          {/* Budget Selector */}
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 min-w-[260px]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-mono font-medium text-gray-600 dark:text-gray-400">Budget Limit:</span>
              <span className="text-sm font-mono font-bold text-black dark:text-white">₹{budget}</span>
            </div>
            <input
              type="range"
              min={30}
              max={120}
              step={5}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1">
              <span>₹30 (Snack)</span>
              <span>₹70 (Lunch)</span>
              <span>₹120 (Feast)</span>
            </div>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCombos.map((combo) => (
            <div
              key={combo.id}
              className="border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 hover:border-black dark:hover:border-white/30 hover:shadow-lg transition-all flex flex-col justify-between bg-white dark:bg-[#16181b]"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-950 dark:text-white text-base leading-tight">
                    {combo.name}
                  </h3>
                  <span className="text-base font-black text-gray-950 dark:text-white ml-2 font-mono">
                    ₹{combo.price}
                  </span>
                </div>

                <div className="space-y-1.5 my-3.5">
                  {combo.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4 leading-relaxed">
                  "{combo.reason}"
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-4 pt-3 border-t border-gray-100 dark:border-white/10 flex-wrap">
                  <ProteinBadge protein={combo.protein_g} size="xs" />
                  <span className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-md font-mono text-[10px]">
                    ⏱ {combo.prep_time}m
                  </span>
                  <span className="bg-gray-100 dark:bg-white/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-mono text-[10px]">
                    🔥 {combo.calories} kcal
                  </span>
                  {combo.tags.map(t => (
                    <span key={t} className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onAddToTray({
                      id: combo.id,
                      name: combo.name,
                      price: combo.price,
                      prep_time_mins: combo.prep_time,
                      calories: combo.calories,
                      category: 'Combos',
                      description: combo.items.join(' + ')
                    })
                  }}
                  className="w-full py-2.5 px-3 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus size={13} /> Add Combo (₹{combo.price})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

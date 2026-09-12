import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Flame, Plus, Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import FoodAnimation from './FoodAnimation'
import ProteinBadge from './ProteinBadge'

const FEATURED_ANIMATED_DISHES = [
  {
    id: 'SP001',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 45,
    rating: 4.8,
    prep_time: 8,
    calories: 320,
    protein_g: 8,
    tags: ['Crispy Skillet', 'Fermented Batter', 'Chutney Trio'],
    description: 'Stone-ground fermented rice & lentil crepe with tempered spiced potato filling and fresh coconut chutney.',
    flavorProfile: { spicy: 40, crunch: 95, comfort: 85 }
  },
  {
    id: 'SP002',
    name: 'Chole Bhature',
    category: 'North Indian',
    price: 65,
    rating: 4.7,
    prep_time: 7,
    calories: 620,
    protein_g: 18,
    tags: ['Slow-simmered', 'Puffed Bread', 'Punjabi Spices'],
    description: 'Puffed golden bhature served with overnight slow-simmered chickpeas in dark aromatic spices.',
    flavorProfile: { spicy: 75, crunch: 60, comfort: 98 }
  },
  {
    id: 'SP003',
    name: 'Hakka Noodles',
    category: 'Chinese',
    price: 55,
    rating: 4.6,
    prep_time: 6,
    calories: 410,
    protein_g: 9,
    tags: ['High-heat Wok', 'Julienne Veggies', 'Savory Soy'],
    description: 'Wok-tossed noodles with shredded bell peppers, cabbage, scallions, and signature Indo-Chinese spices.',
    flavorProfile: { spicy: 65, crunch: 70, comfort: 80 }
  },
  {
    id: 'SP004',
    name: 'Sprouts Protein Salad',
    category: 'Healthy',
    price: 40,
    rating: 4.9,
    prep_time: 3,
    calories: 180,
    protein_g: 16,
    tags: ['Raw & Fresh', 'High Fiber', 'Cold Pressed Lemon'],
    description: 'Moong sprouts, diced cucumbers, tomatoes, pomegranates tossed in cold-pressed lime dressing.',
    flavorProfile: { spicy: 20, crunch: 90, comfort: 75 }
  },
  {
    id: 'SP005',
    name: 'Masala Chai',
    category: 'Beverages',
    price: 15,
    rating: 4.9,
    prep_time: 2,
    calories: 85,
    protein_g: 3,
    tags: ['Fresh Ginger', 'Cardamom Pods', 'Brewed Fresh'],
    description: 'Freshly brewed Assam tea leaves with crushed ginger, cardamom, and whole milk.',
    flavorProfile: { spicy: 35, crunch: 0, comfort: 100 }
  }
]

export default function InteractiveFoodShowcase({ onAddToTray, trayItemIds = [] }) {
  const [selectedDish, setSelectedDish] = useState(FEATURED_ANIMATED_DISHES[0])

  const isAdded = trayItemIds.includes(selectedDish.id)

  return (
    <section className="py-6 scroll-mt-24">
      <div className="bg-white dark:bg-[#121417] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-200">
        
        {/* Header pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-mono font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              <span>002 • ANIMATED CULINARY LAB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Interactive Dish Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select any campus specialty to inspect its live animation, preparation speed, and nutritional profile.
            </p>
          </div>
        </div>

        {/* Dish Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FEATURED_ANIMATED_DISHES.map((dish) => {
            const isSelected = selectedDish.id === dish.id
            return (
              <button
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-sm font-bold'
                    : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'
                }`}
              >
                <FoodAnimation category={dish.category} name={dish.name} isHovered={isSelected} />
                <span>{dish.name}</span>
                <span className="font-mono text-[11px] opacity-70">₹{dish.price}</span>
              </button>
            )
          })}
        </div>

        {/* Animated Presentation Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDish.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50/70 dark:bg-[#16181b] rounded-3xl p-6 sm:p-10 border border-gray-200/80 dark:border-white/10"
          >
            {/* Left Big Animated Visual Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#121417] rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute w-40 h-40 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

              {/* Large Animation Canvas */}
              <div className="scale-150 my-6">
                <FoodAnimation category={selectedDish.category} name={selectedDish.name} isHovered={true} />
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-400 block mb-1">
                  {selectedDish.category}
                </span>
                <h3 className="text-xl font-black text-gray-950 dark:text-white">
                  {selectedDish.name}
                </h3>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {selectedDish.tags.map((t, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Information & Flavor Dynamics */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    Culinary Breakdown
                  </span>
                  <span className="text-2xl font-black text-gray-950 dark:text-white font-mono">
                    ₹{selectedDish.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedDish.description}
                </p>
              </div>

              {/* Metrics Grid with Protein */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-[#121417] p-3 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Prep Time</div>
                  <div className="text-sm sm:text-base font-bold text-gray-950 dark:text-white mt-0.5 font-mono">
                    ~{selectedDish.prep_time}m
                  </div>
                </div>

                <div className="bg-white dark:bg-[#121417] p-3 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Energy</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
                    {selectedDish.calories} kcal
                  </div>
                </div>

                <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 text-center shadow-sm">
                  <div className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-bold uppercase">Protein</div>
                  <div className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 mt-0.5 font-mono">
                    {selectedDish.protein_g}g
                  </div>
                </div>

                <div className="bg-white dark:bg-[#121417] p-3 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Rating</div>
                  <div className="text-sm sm:text-base font-bold text-amber-500 mt-0.5 font-mono">
                    ⭐ {selectedDish.rating}
                  </div>
                </div>
              </div>

              {/* Flavor Profile Bars */}
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                  Taste Profile:
                </span>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Spice Intensity</span>
                    <span className="font-mono text-[10px]">{selectedDish.flavorProfile.spicy}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDish.flavorProfile.spicy}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-red-500 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 pt-1">
                    <span>Crisp & Texture</span>
                    <span className="font-mono text-[10px]">{selectedDish.flavorProfile.crunch}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDish.flavorProfile.crunch}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 pt-1">
                    <span>Comfort Index</span>
                    <span className="font-mono text-[10px]">{selectedDish.flavorProfile.comfort}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDish.flavorProfile.comfort}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddToTray({
                    id: selectedDish.id,
                    name: selectedDish.name,
                    category: selectedDish.category,
                    price: selectedDish.price,
                    calories: selectedDish.calories,
                    prep_time_mins: selectedDish.prep_time,
                    description: selectedDish.description
                  })}
                  className={`w-full py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                    isAdded
                      ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                      : 'bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={14} strokeWidth={2.5} /> Added to Active Tray
                    </>
                  ) : (
                    <>
                      <Plus size={14} strokeWidth={2.5} /> Add {selectedDish.name} to Tray (₹{selectedDish.price})
                    </>
                  )}
                </motion.button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

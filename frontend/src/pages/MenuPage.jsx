import { useState, useEffect } from 'react'
import { Search, Star, Clock, Flame, Plus, Check } from 'lucide-react'
import ProteinBadge from '../components/ProteinBadge'
import { fetchMenu, fetchCategories } from '../api'

const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' }
]

export default function MenuPage({ onAddToTray = null, trayItemIds = [] }) {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDietary, setSelectedDietary] = useState('')
  const [maxPrice, setMaxPrice] = useState(100)

  useEffect(() => {
    Promise.all([fetchMenu(), fetchCategories()])
      .then(([menuItems, cats]) => {
        setItems(menuItems)
        setCategories(cats)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = items.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !selectedCategory || item.category === selectedCategory
    const matchDiet = !selectedDietary || item.dietary_tags.includes(selectedDietary)
    const matchPrice = item.price <= maxPrice
    return matchSearch && matchCat && matchDiet && matchPrice
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-200 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-3 font-semibold">Loading live canteen menu...</p>
      </div>
    )
  }

  return (
    <section id="menu" className="py-6 scroll-mt-24">
      <div className="bg-white dark:bg-[#121417] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-200">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-mono font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
              <span>004 • LIVE CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Live College Menu Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Browse all 55+ campus dishes with live pricing, prep times, and calorie metrics.
            </p>
          </div>

          <div className="text-[11px] font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3.5 py-1.5 rounded-full self-start md:self-auto">
            {filtered.length} OF {items.length} ITEMS MATCHING
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Search Box */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-black dark:focus:border-white bg-gray-50/50 dark:bg-white/5 text-gray-900 dark:text-white shadow-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-200 dark:border-white/10 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-black dark:focus:border-white bg-gray-50/50 dark:bg-[#181a1f] shadow-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <option value="">All Categories ({items.length})</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Dietary Filter */}
          <div>
            <select
              value={selectedDietary}
              onChange={e => setSelectedDietary(e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-200 dark:border-white/10 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-black dark:focus:border-white bg-gray-50/50 dark:bg-[#181a1f] shadow-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <option value="">All Dietary Types</option>
              {DIETARY_OPTIONS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-2 flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs font-mono text-gray-600 dark:text-gray-400 mb-1">
              <span>Max Budget:</span>
              <span className="text-black dark:text-white font-bold">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={20}
              max={120}
              step={5}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              !selectedCategory 
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm font-bold' 
                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm font-bold' 
                  : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items Responsive Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <span className="text-2xl block mb-2">🔍</span>
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">No matching items found</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try raising the max budget or clearing filters.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedDietary(''); setMaxPrice(120); }}
              className="mt-3 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-full shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(item => {
              const isAdded = trayItemIds.includes(item.id)
              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-[#16181b] rounded-3xl p-5 border shadow-sm transition-all duration-150 flex flex-col justify-between ${
                    item.available 
                      ? 'border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white/30 hover:shadow-md' 
                      : 'border-gray-100 dark:border-white/5 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div>
                        <h3 className="font-bold text-gray-950 dark:text-white text-sm sm:text-base leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[11px] text-gray-400 font-mono">{item.category}</p>
                          <ProteinBadge item={item} size="xs" />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-gray-950 dark:text-white font-mono">₹{item.price}</span>
                        <div className="flex items-center gap-0.5 text-gray-700 dark:text-gray-300 text-[10px] font-bold justify-end">
                          <Star size={10} className="fill-amber-400 text-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    {/* WHY Callout */}
                    <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-gray-700 dark:text-gray-300">
                      <span className="font-mono font-bold text-[10px] text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mr-1.5">
                        WHY:
                      </span>
                      <span>
                        {item.calories <= 300 ? 'Low calorie deficit friendly' : 'High energy filling meal'} • {item.protein_g && item.protein_g >= 14 ? 'High protein' : 'Balanced macros'} • ~{item.prep_time_mins}m prep
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Clock size={10} /> {item.prep_time_mins}m
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                        <Flame size={10} /> {item.calories} kcal
                      </span>
                      <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-medium px-2 py-0.5 rounded text-[10px]">
                        {item.dietary_tags[0] || 'Veg'}
                      </span>
                    </div>

                    {item.available ? (
                      <button
                        onClick={() => onAddToTray && onAddToTray(item)}
                        className={`w-full py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                            : 'bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={13} strokeWidth={2.5} /> On Tray
                          </>
                        ) : (
                          <>
                            <Plus size={13} strokeWidth={2.5} /> Add (₹{item.price})
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-2 text-center text-xs font-medium text-red-500 bg-red-50 dark:bg-red-500/10 rounded-full">
                        Unavailable
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}

import { X, Trash2, CheckCircle, ArrowRight, ShoppingBag, Zap } from 'lucide-react'
import { useState } from 'react'
import { getProteinAmount } from './ProteinBadge'

export default function TrayModal({ isOpen, onClose, items, onRemoveItem, onClearTray }) {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [tokenNumber, setTokenNumber] = useState(null)

  if (!isOpen) return null

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
  const totalCalories = items.reduce((sum, item) => sum + (item.calories || 0), 0)
  const totalProtein = items.reduce((sum, item) => sum + getProteinAmount(item), 0)
  const maxPrepTime = items.length > 0 ? Math.max(...items.map(i => i.prep_time_mins || 5)) : 0

  const handlePlaceOrder = () => {
    setTokenNumber(Math.floor(100 + Math.random() * 900))
    setOrderPlaced(true)
  }

  const handleReset = () => {
    setOrderPlaced(false)
    setTokenNumber(null)
    onClearTray()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#121417] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 max-h-[90vh] flex flex-col transition-colors duration-200">
        
        {/* Modal Header */}
        <div className="bg-white dark:bg-[#121417] border-b border-gray-100 dark:border-white/10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-bold shadow-md shadow-emerald-600/20">
              <ShoppingBag size={14} />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-950 dark:text-white">Active Diet Plate & Tray</h3>
              <p className="text-[11px] text-gray-400 font-mono">{items.length} ITEMS • {totalProtein}g PROTEIN</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-gray-400 hover:text-black dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {orderPlaced ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/20">
                <CheckCircle size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-950 dark:text-white">Order Sent to Canteen Counter</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Present your token at the service counter to collect your meal.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-5 inline-block">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  Order Token
                </span>
                <span className="text-4xl font-black text-black dark:text-white font-mono">
                  #{tokenNumber}
                </span>
              </div>

              <div className="flex justify-center gap-4 text-xs text-gray-600 dark:text-gray-400 font-mono pt-2">
                <div>Protein: {totalProtein}g</div>
                <div>•</div>
                <div>Est. Wait: ~{maxPrepTime} mins</div>
                <div>•</div>
                <div>Total: ₹{totalPrice}</div>
              </div>

              <button
                onClick={handleReset}
                className="w-full mt-4 py-3 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full font-semibold shadow-sm transition-all text-xs"
              >
                Return to Menu
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 flex items-center justify-center mx-auto">
                <ShoppingBag size={20} />
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Your meal tray is empty</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mx-auto">
                Consult CnteenAI for meal recommendations or browse the menu to add dishes.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-gray-200 transition-all"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Item List */}
              <div className="divide-y divide-gray-100 dark:divide-white/10">
                {items.map((item, idx) => {
                  const protein = getProteinAmount(item)
                  return (
                    <div key={idx} className="py-3 flex justify-between items-center gap-3">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-950 dark:text-white">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <p className="text-[11px] text-gray-400 font-mono">{item.calories || 0} kcal</p>
                          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                            {protein}g protein
                          </span>
                          {(item.over_budget || item.exceed_amount > 0) && (
                            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                              +₹{item.exceed_amount || 0} over budget
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-black dark:text-white font-mono">₹{item.price}</span>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Nutrition & Timing Summary */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 grid grid-cols-4 gap-2 text-center">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold block">Wait</span>
                  <span className="text-xs font-bold text-gray-950 dark:text-white mt-0.5 block font-mono">
                    ~{maxPrepTime}m
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold block">Calories</span>
                  <span className="text-xs font-bold text-gray-950 dark:text-white mt-0.5 block font-mono">
                    {totalCalories} kcal
                  </span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-1 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 uppercase font-bold block">Protein</span>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 mt-0.5 block font-mono">
                    {totalProtein}g
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold block">Total</span>
                  <span className="text-sm font-black text-black dark:text-white font-mono mt-0.5 block">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  onClick={onClearTray}
                  className="px-4 py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Confirm Order (₹{totalPrice})</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

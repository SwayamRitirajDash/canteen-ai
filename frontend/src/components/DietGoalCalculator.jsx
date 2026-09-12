import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Dumbbell, Zap, Sparkles, ArrowRight, HeartPulse, Check } from 'lucide-react'

const DIET_GOALS = [
  {
    id: 'muscle',
    title: 'Muscle Build',
    icon: <Dumbbell size={18} />,
    tag: 'High Protein',
    targetCalories: '550 - 750 kcal',
    protein: '32g',
    carbs: '65g',
    fats: '18g',
    prompt: 'I want a high protein meal plan for muscle recovery with at least 25g protein within ₹80'
  },
  {
    id: 'fatloss',
    title: 'Fat Loss & Cut',
    icon: <Flame size={18} />,
    tag: 'Calorie Deficit',
    targetCalories: '250 - 380 kcal',
    protein: '18g',
    carbs: '30g',
    fats: '8g',
    prompt: 'I want a low calorie, high fiber meal under 350 calories to stay in a deficit'
  },
  {
    id: 'focus',
    title: 'Energy & Focus',
    icon: <Zap size={18} />,
    tag: 'Clean Fuel',
    targetCalories: '400 - 500 kcal',
    protein: '20g',
    carbs: '50g',
    fats: '12g',
    prompt: 'Recommend a clean energy meal that will not make me sleepy during my afternoon labs'
  },
  {
    id: 'budget_health',
    title: 'Budget Healthy',
    icon: <HeartPulse size={18} />,
    tag: 'Under ₹50',
    targetCalories: '300 - 450 kcal',
    protein: '15g',
    carbs: '45g',
    fats: '10g',
    prompt: 'Find me the healthiest pure vegetarian dishes under ₹50 with good nutritional balance'
  }
]

export default function DietGoalCalculator({ onSelectDietGoal }) {
  const [selectedGoal, setSelectedGoal] = useState(DIET_GOALS[0])

  return (
    <section className="py-6 scroll-mt-24">
      <div className="bg-white dark:bg-[#0c1810] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-emerald-100 dark:border-emerald-900/40 shadow-sm transition-colors duration-200">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>002 • MACRO GOAL SELECTOR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight font-outfit">
              Select Your Campus Diet Goal
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose your fitness target to customize your recommended macros and calorie budget.
            </p>
          </div>
        </div>

        {/* 4 Goal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DIET_GOALS.map((goal) => {
            const isSelected = selectedGoal.id === goal.id
            return (
              <motion.div
                key={goal.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedGoal(goal)}
                className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 shadow-md'
                    : 'bg-gray-50/60 dark:bg-white/5 border-gray-200/80 dark:border-white/10 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                      isSelected 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                    }`}>
                      {goal.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {goal.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-gray-950 dark:text-white text-base">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold mt-1">
                    {goal.targetCalories}
                  </p>
                </div>

                {/* Macro pill summary */}
                <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-white/10 flex justify-between text-[11px] font-mono text-gray-600 dark:text-gray-400">
                  <div><strong>P:</strong> {goal.protein}</div>
                  <div><strong>C:</strong> {goal.carbs}</div>
                  <div><strong>F:</strong> {goal.fats}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Selected Goal Action Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-700/20">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-200 uppercase mb-1">
              <Sparkles size={13} /> Active Target: {selectedGoal.title} ({selectedGoal.tag})
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold">
              Ready to find canteen meals with {selectedGoal.protein} protein under {selectedGoal.targetCalories}?
            </h4>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectDietGoal(selectedGoal.prompt)}
            className="bg-white text-emerald-800 hover:bg-emerald-50 font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <span>Consult CnteenAI For This Goal</span>
            <ArrowRight size={15} />
          </motion.button>
        </div>

      </div>
    </section>
  )
}

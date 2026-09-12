import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Flame, HeartPulse, Leaf, ShieldCheck, Star } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function HeroDiet({ onStartConsultation, onExploreMenu }) {
  return (
    <div className="relative bg-white dark:bg-[#0c1810] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-14 lg:p-16 border border-emerald-100 dark:border-emerald-900/40 shadow-sm overflow-hidden my-4 transition-colors duration-200">
      
      {/* Background Soft Green Glow & Ambient Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-green-50/70 dark:bg-emerald-950/20 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Animated Organic Leaves */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-12 left-10 text-emerald-500/30 dark:text-emerald-400/20 pointer-events-none select-none hidden sm:block"
      >
        <Leaf size={32} />
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute bottom-20 right-1/2 text-emerald-500/20 dark:text-emerald-400/15 pointer-events-none select-none hidden lg:block"
      >
        <Leaf size={28} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* Left 7 Columns: Headline & Diet Philosophy (Direct match to reference image) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Green Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>AI-Powered Campus Nutrition & Diet Platform</span>
          </div>

          {/* Main Organic Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-gray-950 dark:text-white tracking-tight leading-[1.1] font-outfit">
            Eat Better. <br />
            <span className="text-emerald-600 dark:text-emerald-400">Live Healthier.</span> <br />
            Every Campus Day.
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-normal">
            Whether you want to build lean muscle, cut calories, or stay energized for lectures — CnteenAI calculates your exact macros and curates fresh canteen meals under your budget.
          </p>

          {/* CTA Buttons with SpecularButton */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <SpecularButton
              size="lg"
              radius={9999}
              baseColor="#059669"
              lineColor="#a7f3d0"
              textColor="#ffffff"
              intensity={1.3}
              shineSize={12}
              shineFade={45}
              thickness={1.5}
              speed={0.4}
              followMouse={true}
              proximity={300}
              onClick={onStartConsultation}
              className="shadow-xl shadow-emerald-600/30"
            >
              <span>Get Diet Plan</span>
              <ArrowRight size={18} />
            </SpecularButton>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onExploreMenu}
              className="bg-gray-100 dark:bg-white/10 hover:bg-emerald-50 dark:hover:bg-white/15 text-gray-800 dark:text-gray-100 font-semibold text-xs sm:text-sm px-7 py-4 rounded-full transition-all border border-gray-200/60 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-700"
            >
              Explore Healthy Menu
            </motion.button>
          </div>

          {/* Social Proof Avatars (Direct match to reference image bottom left) */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-gray-900 shadow-sm">
                AK
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-gray-900 shadow-sm">
                SP
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-gray-900 shadow-sm">
                RJ
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={12} fill="currentColor" />
                <span className="text-gray-900 dark:text-white font-mono">4.9/5</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                Trusted by 1,400+ campus students & fitness athletes
              </p>
            </div>
          </div>

        </div>

        {/* Right 5 Columns: Vibrant Healthy Bowl & Floating Macro Badges (Exact match to screenshot) */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          {/* Main Visual Bowl Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-white to-green-100/60 dark:from-[#112418] dark:to-[#07130b] border-2 border-emerald-200 dark:border-emerald-800/60 shadow-2xl p-6 flex flex-col items-center justify-center"
          >
            {/* Animated Center Healthy Plate */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white dark:bg-[#152e1f] border-4 border-emerald-100 dark:border-emerald-800 shadow-xl flex items-center justify-center relative overflow-hidden"
            >
              {/* Healthy Bowl Graphic */}
              <div className="text-center">
                <span className="text-6xl sm:text-7xl block filter drop-shadow-md select-none">
                  🥗
                </span>
              </div>
            </motion.div>

            {/* Floating Live Macro Card 1: Protein & Calories (Top Left) */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-3 -left-4 sm:-left-6 bg-white dark:bg-[#122217] rounded-2xl p-3 shadow-xl border border-emerald-100 dark:border-emerald-800/80 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Flame size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">Calorie Target</div>
                <div className="text-xs font-black text-gray-900 dark:text-white font-mono">320-450 kcal</div>
              </div>
            </motion.div>

            {/* Floating Live Macro Card 2: Macros Balance (Bottom Right) */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-3 -right-4 sm:-right-6 bg-white dark:bg-[#122217] rounded-2xl p-3 shadow-xl border border-emerald-100 dark:border-emerald-800/80 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
                <HeartPulse size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-gray-400 uppercase">High Protein</div>
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">24g / Meal</div>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* 4 Bottom Metric Highlights (Direct match to reference image feature ribbon) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-white/10">
        <div className="bg-emerald-50/50 dark:bg-white/5 rounded-2xl p-4 border border-emerald-100/80 dark:border-white/5">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Leaf size={14} /> Diet Goals
          </div>
          <p className="text-base font-black text-gray-900 dark:text-white mt-1">4 Meal Plans</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Keto, Muscle, Low-Cal, Veg</p>
        </div>

        <div className="bg-emerald-50/50 dark:bg-white/5 rounded-2xl p-4 border border-emerald-100/80 dark:border-white/5">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Flame size={14} /> Macro Tracking
          </div>
          <p className="text-base font-black text-gray-900 dark:text-white mt-1">100% Calorie Log</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Protein, Carbs & Fats counted</p>
        </div>

        <div className="bg-emerald-50/50 dark:bg-white/5 rounded-2xl p-4 border border-emerald-100/80 dark:border-white/5">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <ShieldCheck size={14} /> Student Budget
          </div>
          <p className="text-base font-black text-gray-900 dark:text-white mt-1">From ₹30</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Nutritious meals for every budget</p>
        </div>

        <div className="bg-emerald-50/50 dark:bg-white/5 rounded-2xl p-4 border border-emerald-100/80 dark:border-white/5">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Sparkles size={14} /> Sourced Daily
          </div>
          <p className="text-base font-black text-gray-900 dark:text-white mt-1">Fresh Campus Kitchen</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Zero artificial additives</p>
        </div>
      </div>

    </div>
  )
}

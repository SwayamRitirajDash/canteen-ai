import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function HeroAxial({ onStartJourney, onExploreMenu }) {
  return (
    <div className="relative bg-white dark:bg-[#121417] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-14 lg:p-20 shadow-sm border border-gray-200/70 dark:border-white/10 overflow-hidden my-4 min-h-[580px] sm:min-h-[640px] flex flex-col justify-between transition-colors duration-200">
      
      {/* Decorative Dotted Pointillism / Halftone Particle Art */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 sm:w-96 h-80 pointer-events-none opacity-25 dark:opacity-20 select-none">
        <svg viewBox="0 0 300 240" fill="none" className="w-full h-full text-gray-400 dark:text-gray-600">
          <pattern id="dotPatternLeft" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </pattern>
          <path d="M0,80 Q80,20 160,70 T280,120 Q200,180 120,160 T0,220 Z" fill="url(#dotPatternLeft)" />
          <path d="M40,100 Q120,40 200,90 T290,140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-96 h-80 pointer-events-none opacity-25 dark:opacity-20 select-none">
        <svg viewBox="0 0 300 240" fill="none" className="w-full h-full text-gray-400 dark:text-gray-600">
          <pattern id="dotPatternRight" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </pattern>
          <path d="M300,80 Q220,20 140,70 T20,120 Q100,180 180,160 T300,220 Z" fill="url(#dotPatternRight)" />
          <path d="M260,100 Q180,40 100,90 T10,140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      </div>

      {/* Subtle Top Indicator */}
      <div className="flex justify-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-[11px] font-mono font-medium text-gray-600 dark:text-gray-300 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CNTEENAI • REAL-TIME CANTEEN INTELLIGENCE</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-3xl mx-auto relative z-10 my-auto py-10 sm:py-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-gray-400 dark:text-gray-500 tracking-tight leading-tight">
          Discover New Flavors <br />
          <span className="text-gray-950 dark:text-white font-black">and Nourish Your Day</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed font-normal">
          From budget limits to specific dietary needs, CnteenAI gives you instant meal recommendations, nutrition metrics, and smart budget combos in seconds.
        </p>

        {/* Center Pill Button */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <button
            onClick={onStartJourney}
            className="bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <span>Consult CnteenAI</span>
            <ArrowRight size={14} />
          </button>
          
          <button
            onClick={onExploreMenu}
            className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-200 border border-transparent dark:border-white/5"
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* Bottom 3-Column Captions */}
      <div className="relative z-10 pt-6 border-t border-gray-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 items-center">
        
        {/* Left */}
        <div className="text-left font-mono">
          Precision dining for campus life.
        </div>

        {/* Center */}
        <div className="text-center text-gray-400 dark:text-gray-400 leading-snug">
          Zero guesswork. Explainable AI food recommendations tailored to budget, time, and mood.
        </div>

        {/* Right */}
        <div className="text-right">
          <button
            onClick={onExploreMenu}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-mono transition-colors inline-flex items-center gap-1"
          >
            [Scroll to Explore ↓]
          </button>
        </div>

      </div>

    </div>
  )
}

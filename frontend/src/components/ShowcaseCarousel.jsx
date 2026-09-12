import { useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle, Clock, Zap } from 'lucide-react'

export default function ShowcaseCarousel({ onTryAI, onExploreMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      id: '001',
      badge: '001 • AI CANTEEN INTELLIGENCE',
      brand: 'CAMPUSBITE AI',
      title: 'Conversational Meal Recommendation Engine',
      description: 'Understands student budget constraints, acute mood states, dietary allergies, and class schedules with explainable reasoning.',
      linkText: 'Test Live Prompt',
      action: onTryAI,
      iconEmoji: '🥞',
      iconSub: 'Dosa & Combos',
      stats: [
        { value: '5-8m', label: 'Avg Prep Time' },
        { value: '₹45', label: 'Student Price' },
        { value: '4.8/5', label: 'Satisfaction' }
      ]
    },
    {
      id: '002',
      badge: '002 • VALUE MAXIMIZATION',
      brand: 'SMART COMBOS',
      title: 'Budget Pairing & Nutrition Balancer',
      description: 'Greedy algorithm pairs nutritious mains with refreshing beverages while adhering to strict pocket limits (₹30–₹90).',
      linkText: 'View Smart Combos',
      action: onExploreMenu,
      iconEmoji: '🍱',
      iconSub: 'Thali & Combos',
      stats: [
        { value: '100%', label: 'Budget Fit' },
        { value: '900', label: 'Kcal Full Energy' },
        { value: '3x', label: 'More Value' }
      ]
    },
    {
      id: '003',
      badge: '003 • SEMANTIC SEARCH',
      brand: 'FAISS VECTOR EMBEDDINGS',
      title: 'Natural Language Craving Matcher',
      description: 'Translates vague queries like "exhausted after lab, want comfort warmth" into exact dishes with zero keyword misses.',
      linkText: 'Ask CanteenBot',
      action: onTryAI,
      iconEmoji: '⚡',
      iconSub: 'Instant Match',
      stats: [
        { value: '<50ms', label: 'Vector Latency' },
        { value: '55+', label: 'Verified Items' },
        { value: '0', label: 'Empty Results' }
      ]
    }
  ]

  const current = slides[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-2xl border border-gray-100 relative overflow-hidden my-6">
      
      {/* Top Pill Tag */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100/90 border border-gray-200/80 text-[11px] font-mono font-semibold text-gray-700 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          <span>{current.badge}</span>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-black text-center text-gray-950 tracking-tight mb-10 sm:mb-14">
        What We’ve Built
      </h2>

      {/* Main Carousel Deck */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Card Box (Matches the exact rounded style from the image) */}
        <div className="bg-[#f7f8f9] border border-gray-200/70 rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Glossy Dark Container (from reference image) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-[2rem] bg-gradient-to-b from-[#2a2d34] via-[#1a1c22] to-[#0d0e12] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border border-gray-700/50 group">
                
                {/* Glossy fluid reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                {/* 3D Focal Element */}
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-gray-700 to-black p-0.5 shadow-inner mx-auto flex items-center justify-center mb-3">
                    <span className="text-4xl filter drop-shadow-lg">{current.iconEmoji}</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-gray-300 uppercase tracking-widest block">
                    {current.iconSub}
                  </span>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 font-mono">
                  <Sparkles size={10} className="text-amber-400" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>

            {/* Right Information Container */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-[10px] font-bold">
                  ▲
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-gray-900 uppercase">
                  {current.brand}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-950 leading-tight">
                {current.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Read More Link */}
              <div className="pt-1">
                <button
                  onClick={current.action}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-blue-600 group transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-gray-300 group-hover:decoration-blue-600">
                    {current.linkText}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-gray-200 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-[10px] transition-colors">
                    ➔
                  </span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/80">
                {current.stats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-lg sm:text-2xl font-black text-gray-950 tracking-tight">
                      {st.value}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-7 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 shadow-sm'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Black Pill Button (Direct match to image) */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onTryAI}
            className="bg-black hover:bg-gray-900 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 border border-white/10"
          >
            <span>Launch Canteen Assistant</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </div>
  )
}

import { Clock, TrendingUp, Sparkles, ShieldCheck, Zap } from 'lucide-react'

export default function HeroStats({ onQuickPrompt }) {
  const popularPresets = [
    { label: '💰 Budget Under ₹50', prompt: 'Show me the best delicious meals under ₹50' },
    { label: '😴 Exhausted / Warm Meal', prompt: 'I feel exhausted after classes, want something warm and comforting within ₹70' },
    { label: '⚡ Rush Hour (<5 min)', prompt: 'I only have 10 minutes before my next lecture. Give me ready-to-serve items' },
    { label: '🍱 Full Thali / Combo', prompt: 'Suggest a complete meal combo under ₹100' },
    { label: '🥗 Healthy & High Protein', prompt: 'I want a high protein, healthy option under ₹60' },
  ]

  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden mb-8">
      {/* Background Decorative Rings */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Main Headline */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3">
              <Sparkles size={14} className="text-yellow-200" />
              <span>Next-Gen AI Canteen Experience</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Can't decide what to eat? <br className="hidden sm:inline" />
              Let <span className="underline decoration-yellow-300 decoration-wavy">AI personalize your plate</span>.
            </h1>
            <p className="mt-2 text-orange-100 text-sm sm:text-base leading-relaxed">
              Match your exact budget, current mood, dietary restrictions, and time crunch in seconds.
            </p>
          </div>

          {/* Live Canteen Pulse Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-orange-100 font-medium">
                <Clock size={13} /> Avg. Wait
              </div>
              <p className="text-xl font-black mt-0.5">5-8 Min</p>
              <span className="text-[10px] text-green-200 font-medium">Fast Service</span>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-orange-100 font-medium">
                <TrendingUp size={13} /> Today's Hit
              </div>
              <p className="text-xl font-black mt-0.5">₹45</p>
              <span className="text-[10px] text-yellow-200 font-medium">Masala Dosa</span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-orange-100 font-medium">
                <ShieldCheck size={13} /> Menu Freshness
              </div>
              <p className="text-xl font-black mt-0.5">55+ Items</p>
              <span className="text-[10px] text-orange-100 font-medium">100% Verified</span>
            </div>
          </div>

        </div>

        {/* Quick Click Prompts */}
        <div className="mt-6 pt-5 border-t border-white/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-100 mb-2.5">
            <Zap size={14} className="text-yellow-300" />
            <span>Popular Student Queries (Click to ask CanteenBot):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onQuickPrompt(preset.prompt)}
                className="bg-white/15 hover:bg-white text-white hover:text-orange-700 border border-white/25 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 backdrop-blur-sm shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

import { Clock, MapPin, ShieldAlert, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="about" className="bg-white dark:bg-[#0c0d0e] text-gray-700 dark:text-gray-300 pt-16 pb-12 border-t border-gray-200/80 dark:border-white/10 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black text-xs font-mono font-bold tracking-tighter">
                C
              </div>
              <span className="font-extrabold text-gray-950 dark:text-white text-lg tracking-tight">
                Cnteen<span className="font-light text-gray-400 dark:text-gray-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              An intelligent, conversational dietary recommendation platform designed for college students and campus dining.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 font-medium">
              <Sparkles size={11} /> TCS HACKATHON 2026 • UC-15
            </div>
          </div>

          {/* Col 2: Canteen Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-950 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} /> Operating Timings
            </h4>
            <ul className="text-xs space-y-2 text-gray-500 dark:text-gray-400 font-mono">
              <li><strong className="text-gray-800 dark:text-gray-200">Breakfast:</strong> 7:30 AM – 10:30 AM</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Lunch Thali:</strong> 12:00 PM – 3:30 PM</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Snacks:</strong> 4:00 PM – 7:30 PM</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Dinner:</strong> 8:00 PM – 10:30 PM</li>
            </ul>
          </div>

          {/* Col 3: Campus Block Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-950 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <MapPin size={12} /> Campus Location
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Student Activity Centre (SAC), Ground Floor<br />
              Central Campus Canteen Block<br />
              <span className="text-gray-900 dark:text-gray-100 font-medium font-mono text-[11px]">Counters 1, 2 & 3</span>
            </p>
          </div>

          {/* Col 4: Allergen & Dietary Disclosures */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-950 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert size={12} /> Dietary Standards
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              All dishes identify ingredients and common allergens. State any acute allergies directly to CnteenAI for automatic filtering.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 dark:text-gray-500 gap-3 font-mono">
          <p>© 2026 CnteenAI • College Canteen Recommendation Platform.</p>
          <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            Powered by Gemini 1.5 Flash, FAISS & React
          </p>
        </div>
      </div>
    </footer>
  )
}

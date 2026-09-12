import { Utensils, Sparkles, Clock, ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ activeSection, setActiveSection, trayCount, onOpenTray }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <span className="font-mono text-xs">01</span> },
    { id: 'assistant', label: 'AI Concierge', icon: <Sparkles size={14} /> },
    { id: 'menu', label: 'Live Menu', icon: <Utensils size={14} /> },
    { id: 'combos', label: 'Smart Combos', icon: <span className="text-xs">🍱</span> },
    { id: 'about', label: 'Canteen Hours', icon: <Clock size={14} /> },
  ]

  const handleNav = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-full px-5 py-3 transition-all">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('overview')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-base font-bold shadow-md group-hover:scale-105 transition-transform">
                🍽️
              </div>
              <div>
                <span className="font-extrabold text-gray-950 text-base tracking-tight flex items-center gap-1.5">
                  CampusBite <span className="text-xs font-mono font-bold bg-black text-white px-1.5 py-0.5 rounded">AI</span>
                </span>
              </div>
            </button>

            {/* Live Campus Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-gray-100/90 border border-gray-200 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CANTEEN ACTIVE</span>
              <span className="text-gray-400">•</span>
              <span>WAIT: ~6 MIN</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-gray-200/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-600 hover:text-black hover:bg-white/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Action: Meal Tray Cart */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenTray}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all font-semibold text-xs shadow-md"
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline">Active Tray</span>
              {trayCount > 0 && (
                <span className="bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-800 hover:text-black focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 space-y-1 border-t border-gray-100 mt-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold ${
                  activeSection === item.id
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

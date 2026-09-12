import { ShoppingBag, Menu, X, ArrowUpRight, Sun, Moon, Leaf } from 'lucide-react'
import { useState } from 'react'

export default function NavbarAxial({ 
  activeSection, 
  setActiveSection, 
  trayCount, 
  onOpenTray, 
  onOpenChat,
  theme = 'light', 
  toggleTheme 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Diet Overview' },
    { id: 'goals', label: 'Macro Calculator' },
    { id: 'combos', label: 'Balanced Meal Plans' },
    { id: 'menu', label: 'Nutrition Menu' },
    { id: 'assistant', label: 'Diet AI Concierge', isChatAction: true },
  ]

  const handleNav = (id, isChatAction) => {
    setMobileMenuOpen(false)
    if (isChatAction || id === 'assistant') {
      if (onOpenChat) onOpenChat()
      return
    }
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#07130b]/90 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo: CnteenAI with fresh green leaf badge */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Leaf size={16} strokeWidth={2.5} />
            </div>
            
            <span className="font-black text-gray-950 dark:text-white text-xl tracking-tight font-outfit">
              Cnteen<span className="text-emerald-600 dark:text-emerald-400">AI</span>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 ml-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                DIET
              </span>
            </span>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id, item.isChatAction)}
                  className={`relative py-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-600 dark:bg-emerald-400 rounded-full"></span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Meal Tray + Launch Assistant */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={17} strokeWidth={1.8} className="text-amber-400" />
              ) : (
                <Moon size={17} strokeWidth={1.8} className="text-emerald-800" />
              )}
            </button>

            {/* Active Tray Button */}
            <button
              onClick={onOpenTray}
              className="relative p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              title="View Meal Tray"
            >
              <ShoppingBag size={17} strokeWidth={1.8} />
              {trayCount > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Launch Assistant Pill */}
            <button
              onClick={() => handleNav('assistant', true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Diet Concierge</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0c1810] border-b border-emerald-100 dark:border-emerald-900 px-6 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id, item.isChatAction)}
              className={`w-full text-left py-2 text-sm font-semibold ${
                activeSection === item.id
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

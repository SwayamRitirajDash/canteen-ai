import { useState, useEffect } from 'react'
import NavbarAxial from './components/NavbarAxial'
import HeroDiet from './components/HeroDiet'
import DietGoalCalculator from './components/DietGoalCalculator'
import InteractiveFoodShowcase from './components/InteractiveFoodShowcase'
import ComboOptimizer from './components/ComboOptimizer'
import MenuPage from './pages/MenuPage'
import TrayModal from './components/TrayModal'
import FloatingChatBot from './components/FloatingChatBot'
import Footer from './components/Footer'

const THEME_KEY = 'cnteenai_theme_preference'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [trayItems, setTrayItems] = useState([])
  const [isTrayOpen, setIsTrayOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [externalPrompt, setExternalPrompt] = useState(null)
  
  // Theme state: default to localStorage or light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Apply dark class to html tag whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Add item to Tray
  const handleAddToTray = (item) => {
    setTrayItems((prev) => {
      const exists = prev.some((i) => (i.id || i.item_id) === (item.id || item.item_id))
      if (exists) {
        return prev.filter((i) => (i.id || i.item_id) !== (item.id || item.item_id))
      }
      return [...prev, item]
    })
  }

  // Remove item from Tray
  const handleRemoveItem = (index) => {
    setTrayItems((prev) => prev.filter((_, idx) => idx !== index))
  }

  // Clear Tray
  const handleClearTray = () => {
    setTrayItems([])
  }

  // Trigger quick prompt into CnteenAI & open floating chatbot
  const handleQuickPrompt = (promptText) => {
    setExternalPrompt(promptText)
    setIsChatOpen(true)
  }

  const trayItemIds = trayItems.map((i) => i.id || i.item_id)

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#07130b] text-gray-900 dark:text-white flex flex-col font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-200">
      
      {/* 1. Diet Minimalist Navbar with Theme Toggle */}
      <NavbarAxial
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        trayCount={trayItems.length}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main Web Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section 0: Healthy Meal Delivery / Diet Hero Section */}
        <section id="home" className="scroll-mt-24">
          <HeroDiet
            onStartConsultation={() => setIsChatOpen(true)}
            onExploreMenu={() => {
              const el = document.getElementById('menu')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </section>

        {/* Section 1: Campus Diet & Macro Goal Calculator */}
        <section id="goals" className="scroll-mt-24">
          <DietGoalCalculator 
            onSelectDietGoal={handleQuickPrompt} 
          />
        </section>

        {/* Section 2: Animated Interactive Culinary Studio */}
        <InteractiveFoodShowcase 
          onAddToTray={handleAddToTray} 
          trayItemIds={trayItemIds} 
        />

        {/* Section 3: Balanced Diet Combos */}
        <section id="combos" className="scroll-mt-24">
          <ComboOptimizer onAddToTray={handleAddToTray} />
        </section>

        {/* Section 4: Nutritional Live Menu Explorer */}
        <section id="menu" className="scroll-mt-24">
          <MenuPage onAddToTray={handleAddToTray} trayItemIds={trayItemIds} />
        </section>

      </main>

      {/* 3. Floating AI Chatbot Action Button & Animated Modal at Side Bottom */}
      <FloatingChatBot
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        onAddToTray={handleAddToTray}
        trayItemIds={trayItemIds}
        externalPrompt={externalPrompt}
        onClearExternalPrompt={() => setExternalPrompt(null)}
      />

      {/* 4. Tray Modal Checkout */}
      <TrayModal
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

      {/* 5. Fresh Diet Footer */}
      <Footer />

    </div>
  )
}

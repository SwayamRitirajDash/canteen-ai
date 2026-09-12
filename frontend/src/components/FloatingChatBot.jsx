import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Sparkles, Bot, Maximize2, Minimize2, Leaf, HeartPulse } from 'lucide-react'
import ChatWindow from './ChatWindow'

export default function FloatingChatBot({
  isOpen,
  setIsOpen,
  onAddToTray,
  trayItemIds,
  externalPrompt,
  onClearExternalPrompt
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true)

  // Auto-open when external prompt arrives (e.g. from Hero, Calculator, or Dietitian cards)
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true)
      setHasUnreadNotification(false)
    }
  }, [externalPrompt, setIsOpen])

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
    setHasUnreadNotification(false)
  }

  return (
    <>
      {/* ── Fixed Floating Action Button (Side Bottom Right) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Helper Tooltip Badge (visible when closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={toggleOpen}
              className="hidden sm:flex items-center gap-2 bg-white dark:bg-[#102417] px-4 py-2.5 rounded-full shadow-lg shadow-emerald-950/10 border border-emerald-200 dark:border-emerald-800/80 cursor-pointer hover:border-emerald-500 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Ask Diet AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">
                Macros & Budget
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleOpen}
          aria-label={isOpen ? "Close AI Diet Chatbot" : "Open AI Diet Chatbot"}
          className={`relative p-4 sm:p-4.5 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-950 shadow-gray-900/30'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/40 ring-4 ring-emerald-500/20'
          }`}
        >
          {/* Ambient Glow */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-emerald-500 blur-lg opacity-40 animate-pulse pointer-events-none" />
          )}

          {/* Icon state with rotation */}
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={24} strokeWidth={2.5} />
            ) : (
              <div className="relative">
                <Bot size={26} strokeWidth={2.2} />
                {hasUnreadNotification && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-600 animate-bounce" />
                )}
              </div>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* ── Animated Chatbot Window Popup (Side Bottom Dock) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-end sm:items-auto justify-center sm:justify-end pointer-events-none p-2 sm:p-0">
            
            {/* Mobile Backdrop (tap outside to close on mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto z-40"
            />

            {/* Chat Container Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 35, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 35 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className={`pointer-events-auto relative w-full ${
                isExpanded
                  ? 'sm:w-[680px] h-[88vh] sm:h-[750px]'
                  : 'sm:w-[480px] md:w-[520px] h-[82vh] sm:h-[630px]'
              } bg-white dark:bg-[#0d1c12] rounded-[2rem] shadow-2xl border border-emerald-200 dark:border-emerald-800/80 flex flex-col overflow-hidden transition-[width,height] duration-300 z-50`}
            >
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-inner">
                      <Sparkles size={18} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm tracking-tight font-outfit">CnteenAI Concierge</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                        DIET BOT
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Live Nutrition & Canteen Assistant
                    </p>
                  </div>
                </div>

                {/* Header Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsExpanded(prev => !prev)}
                    title={isExpanded ? 'Standard view' : 'Expand window'}
                    className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all hidden sm:flex items-center justify-center"
                  >
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Chatbot"
                    className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Window Embed */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-[#09150e]">
                <ChatWindow
                  onAddToTray={onAddToTray}
                  trayItemIds={trayItemIds}
                  externalPrompt={externalPrompt}
                  onClearExternalPrompt={onClearExternalPrompt}
                  isWidget={true}
                />
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  )
}

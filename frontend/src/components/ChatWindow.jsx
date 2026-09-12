import { useState, useEffect, useRef } from 'react'
import { Send, RotateCcw, ChevronDown, Sparkles, SlidersHorizontal, Leaf, Mic, Volume2 } from 'lucide-react'
import MessageBubble from './MessageBubble'
import QuickReplies, { INITIAL_CHIPS, POST_REC_CHIPS } from './QuickReplies'
import MoodPicker from './MoodPicker'
import BudgetSlider from './BudgetSlider'
import VoiceAssistantBar from './VoiceAssistantBar'
import { useVoiceAssistant } from '../hooks/useVoiceAssistant'
import { sendMessage } from '../api'

const SESSION_KEY = 'cnteenai_session_id'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm **CnteenAI**, your campus dining assistant.\n\nTell me your **budget limit**, **dietary preference**, **mood**, or **available break time**, or click the 🎤 **Microphone** to speak with me directly!",
  recommendations: [],
  timestamp: formatTime(new Date()),
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatWindow({ 
  onAddToTray = null, 
  trayItemIds = [], 
  externalPrompt = null, 
  onClearExternalPrompt = null,
  isWidget = false 
}) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY)
    if (saved) return saved
    const newId = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, newId)
    return newId
  })
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [showBudget, setShowBudget] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)
  const [budget, setBudget] = useState(80)
  const [showScrollDown, setShowScrollDown] = useState(false)

  // Voice Assistant Hook
  const {
    isListening,
    transcript,
    isSpeaking,
    voiceEnabled,
    speechError,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoiceOutput,
  } = useVoiceAssistant()

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)

  // Update input text while user speaks
  useEffect(() => {
    if (isListening && transcript) {
      setInputText(transcript)
    }
  }, [isListening, transcript])

  // Handle external quick prompt from hero banner
  useEffect(() => {
    if (externalPrompt) {
      handleSend(externalPrompt)
      if (onClearExternalPrompt) onClearExternalPrompt()
    }
  }, [externalPrompt])

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => { scrollToBottom() }, [messages])

  // Show/hide scroll-down button
  useEffect(() => {
    const el = chatContainerRef.current
    if (!el) return
    const handleScroll = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      setShowScrollDown(distFromBottom > 200)
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const addTypingIndicator = () => {
    const typingMsg = { id: 'typing', type: 'typing', role: 'assistant', content: '' }
    setMessages(prev => [...prev, typingMsg])
    return typingMsg
  }

  const removeTypingIndicator = () => {
    setMessages(prev => prev.filter(m => m.id !== 'typing'))
  }

  const handleSend = async (text = inputText) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    // Stop listening/speaking
    stopListening()
    stopSpeaking()

    // Build history
    const history = messages
      .filter(m => m.id !== 'welcome' && m.type !== 'typing')
      .slice(-8)
      .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }))

    // Add user message
    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: formatTime(new Date()),
    }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsLoading(true)
    setShowMoodPicker(false)
    setShowBudget(false)

    // Add typing indicator
    addTypingIndicator()

    try {
      const res = await sendMessage(sessionId, trimmed, history)
      removeTypingIndicator()

      const botMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: res.reply,
        recommendations: res.recommendations || [],
        timestamp: formatTime(new Date()),
      }
      setMessages(prev => [...prev, botMsg])

      // Auto Voice TTS response
      if (voiceEnabled && res.reply) {
        speak(res.reply)
      }
    } catch (err) {
      removeTypingIndicator()
      const errorMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm having a slight connection issue. Here is a curated selection from our canteen menu!",
        recommendations: [],
        timestamp: formatTime(new Date()),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening((finalTranscript) => {
        handleSend(finalTranscript)
      })
    }
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setShowMoodPicker(false)
    handleSend(`I'm feeling ${mood.label.toLowerCase()} today, what do you suggest?`)
  }

  const handleBudgetConfirm = () => {
    setShowBudget(false)
    handleSend(`My budget is ₹${budget}`)
  }

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE])
    setSelectedMood(null)
    setInputText('')
    localStorage.removeItem(SESSION_KEY)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const hasRecs = messages.some(m => m.recommendations?.length > 0)
  const chips = hasRecs ? POST_REC_CHIPS : INITIAL_CHIPS

  return (
    <div className={`flex flex-col ${isWidget ? 'h-full bg-transparent border-0 rounded-none shadow-none' : 'h-[640px] lg:h-[700px] bg-white dark:bg-[#121417] rounded-[2.5rem] shadow-sm border border-gray-200/80 dark:border-white/10'} overflow-hidden transition-colors duration-200`}>
      
      {/* ── Header (Hidden when used in Floating Widget) ── */}
      {!isWidget && (
        <div className="bg-white dark:bg-[#121417] border-b border-gray-100 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-mono font-bold shadow-sm">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-gray-950 dark:text-white font-bold text-sm sm:text-base">CnteenAI</h3>
                <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full">
                  GEMINI 1.5
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-gray-400 dark:text-gray-400 text-xs font-normal">Active & Ready</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            title="Restart Conversation"
            className="text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-1.5 text-xs font-medium"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      )}

      {/* ── Messages Area ── */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5 bg-[#fafafa] dark:bg-[#0c0d0e]/60"
      >
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            onAddToTray={onAddToTray}
            trayItemIds={trayItemIds}
            onSpeak={(text) => speak(text, true)}
          />
        ))}

        {/* Quick reply chips */}
        {!isLoading && (
          <div className="pt-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-400 mb-2 px-1">
              Suggested Prompts:
            </p>
            <QuickReplies
              replies={chips}
              onSelect={(chip) => handleSend(chip)}
            />
          </div>
        )}

        {/* Mood picker panel */}
        {showMoodPicker && (
          <div className="message-appear my-3">
            <MoodPicker selected={selectedMood} onSelect={handleMoodSelect} />
          </div>
        )}

        {/* Budget panel */}
        {showBudget && (
          <div className="message-appear my-3">
            <BudgetSlider value={budget} onChange={setBudget} />
            <button
              onClick={handleBudgetConfirm}
              className="mt-3 w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-semibold
                hover:bg-neutral-800 dark:hover:bg-gray-200 transition-colors shadow-sm text-xs"
            >
              Recommend dishes under ₹{budget} →
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-xl p-2.5 my-2">
            ⚠️ {speechError}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll-to-bottom button */}
      {showScrollDown && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-8 bg-black dark:bg-white text-white dark:text-black rounded-full p-2.5 shadow-xl hover:scale-105 transition-all z-20"
        >
          <ChevronDown size={16} />
        </button>
      )}

      {/* ── Quick Interactive Filter Toolbar ── */}
      <div className="px-4 sm:px-6 py-2.5 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#121417] flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-400 uppercase shrink-0">Filters:</span>
        <button
          onClick={() => { setShowMoodPicker(!showMoodPicker); setShowBudget(false) }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all shrink-0
            ${showMoodPicker 
              ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
              : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-white/30 bg-gray-50 dark:bg-white/5'
            }`}
        >
          <SlidersHorizontal size={12} />
          <span>{selectedMood ? selectedMood.label : 'Mood Picker'}</span>
        </button>

        <button
          onClick={() => { setShowBudget(!showBudget); setShowMoodPicker(false) }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all shrink-0 font-mono
            ${showBudget 
              ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
              : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-white/30 bg-gray-50 dark:bg-white/5'
            }`}
        >
          <span>Budget: ₹{budget}</span>
        </button>

        <button
          onClick={() => handleSend('Recommend the highest rated dish on campus today')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-white/30 bg-gray-50 dark:bg-white/5 transition-all shrink-0"
        >
          <Sparkles size={12} /> Top Rated
        </button>

        <button
          onClick={() => handleSend('Show me only 100% vegetarian options under ₹60')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all shrink-0 font-mono"
        >
          <Leaf size={11} /> Pure Veg
        </button>
      </div>

      {/* ── Input Area with Voice Assistant Bar ── */}
      <div className="p-3 sm:px-6 bg-white dark:bg-[#121417] border-t border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-white/5 rounded-full border border-gray-200/80 dark:border-white/10
          focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-[#181a1f] transition-all px-3 sm:px-4 py-1.5">
          
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening to your voice... Speak now" : "Type meal request or click 🎤..."}
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-xs sm:text-sm text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-400 py-1 max-h-20 overflow-y-auto leading-relaxed"
          />

          {/* Voice Assistant Controls (Mic + Audio Mute/Unmute + Waveform) */}
          <VoiceAssistantBar
            isListening={isListening}
            transcript={transcript}
            isSpeaking={isSpeaking}
            voiceEnabled={voiceEnabled}
            onToggleListening={handleToggleListening}
            onStopSpeaking={stopSpeaking}
            onToggleVoiceOutput={toggleVoiceOutput}
            isSupported={isVoiceSupported}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center shadow-sm
              transition-all duration-150 shrink-0
              ${inputText.trim() && !isLoading
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white scale-100 hover:scale-105 shadow-emerald-600/20'
                : 'bg-gray-300 dark:bg-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Send size={12} />
          </button>
        </div>
      </div>

    </div>
  )
}

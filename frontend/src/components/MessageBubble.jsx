import FoodCard from './FoodCard'
import { User, Volume2 } from 'lucide-react'

/**
 * MessageBubble supporting Light and Dark theme modes with Voice TTS playback.
 */
export default function MessageBubble({ message, onAddToTray = null, trayItemIds = [], onSpeak = null }) {
  const isUser = message.role === 'user'
  const isTyping = message.type === 'typing'

  if (isTyping) {
    return (
      <div className="flex items-end gap-2.5 message-appear">
        <div className="w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
          C
        </div>
        <div className="bg-white dark:bg-[#181a1f] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200/80 dark:border-white/10">
          <div className="flex gap-1.5 items-center h-3.5">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-2.5 message-appear ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Bot Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 self-end shadow-sm">
          C
        </div>
      )}

      {/* User Avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 flex items-center justify-center shrink-0 self-end">
          <User size={12} strokeWidth={2} />
        </div>
      )}

      <div className={`max-w-[92%] sm:max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}>
        {/* Text bubble */}
        <div className={`
          relative group px-5 py-3.5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm
          ${isUser
            ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm font-medium'
            : 'bg-white dark:bg-[#181a1f] text-gray-900 dark:text-gray-100 rounded-bl-sm border border-gray-200/90 dark:border-white/10'
          }
        `}>
          <MessageText text={message.content} />
          
          {/* Audio Playback Button on Bot Messages */}
          {!isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.content)}
              title="Listen to this recommendation"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 p-1 rounded-full shadow-md hover:scale-110 transition-all text-xs"
            >
              <Volume2 size={12} />
            </button>
          )}
        </div>

        {/* Food recommendation cards */}
        {!isUser && message.recommendations && message.recommendations.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {message.recommendations.map((item, i) => (
              <FoodCard
                key={item.item_id || item.id || i}
                item={item}
                rank={i + 1}
                isOverBudget={item.over_budget}
                onAddToTray={onAddToTray}
                isAdded={trayItemIds.includes(item.item_id || item.id)}
              />
            ))}
          </div>
        )}

        {/* Timestamp & Read Aloud hint */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
            {message.timestamp}
          </span>
          {!isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.content)}
              className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono hover:underline flex items-center gap-1 opacity-70 hover:opacity-100"
            >
              <Volume2 size={10} />
              <span>Read aloud</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/** Helper function to parse bold markdown and newlines */
function MessageText({ text }) {
  if (!text) return null
  const lines = text.split('\n')

  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={lIdx} className="leading-relaxed">
            {parts.map((part, pIdx) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={pIdx} className="font-bold text-inherit opacity-95">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={pIdx}>{part}</span>
              )
            )}
          </p>
        )
      })}
    </div>
  )
}

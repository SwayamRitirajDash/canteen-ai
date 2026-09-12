import { motion } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Square, Sparkles } from 'lucide-react'

export default function VoiceAssistantBar({
  isListening,
  transcript,
  isSpeaking,
  voiceEnabled,
  onToggleListening,
  onStopSpeaking,
  onToggleVoiceOutput,
  isSupported
}) {
  if (!isSupported) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Active Listening Animated Pill */}
      {isListening ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center gap-2.5 bg-red-500/10 dark:bg-red-500/20 border border-red-500/40 text-red-600 dark:text-red-400 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm"
        >
          {/* Pulsing Audio Waveform Bars */}
          <div className="flex items-center gap-1 h-3.5">
            {[0.1, 0.4, 0.2, 0.5, 0.3].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{ height: ['4px', '14px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.8, delay, ease: 'easeInOut' }}
                className="w-1 bg-red-500 rounded-full inline-block"
              />
            ))}
          </div>

          <span className="truncate max-w-[140px] sm:max-w-[200px] text-[11px] font-mono">
            {transcript ? `"${transcript}"` : 'Listening to voice...'}
          </span>

          <button
            onClick={onToggleListening}
            className="p-1 hover:bg-red-500/20 rounded-full text-red-700 dark:text-red-300 transition-colors"
            title="Stop listening"
          >
            <Square size={10} fill="currentColor" />
          </button>
        </motion.div>
      ) : isSpeaking ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
        >
          {/* Speaking Waveform */}
          <div className="flex items-center gap-0.5 h-3">
            {[0.2, 0.5, 0.1, 0.4].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{ height: ['3px', '12px', '3px'] }}
                transition={{ repeat: Infinity, duration: 0.7, delay, ease: 'easeInOut' }}
                className="w-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full inline-block"
              />
            ))}
          </div>
          <span className="text-[10px] font-mono">Speaking response...</span>
          <button
            onClick={onStopSpeaking}
            className="p-1 hover:bg-emerald-500/20 rounded-full text-emerald-800 dark:text-emerald-200 transition-colors"
            title="Stop audio readout"
          >
            <Square size={10} fill="currentColor" />
          </button>
        </motion.div>
      ) : null}

      {/* TTS Auto-Voice Output Mute / Unmute Toggle */}
      <button
        type="button"
        onClick={onToggleVoiceOutput}
        title={voiceEnabled ? 'Voice responses enabled (Click to mute)' : 'Voice responses muted (Click to enable)'}
        className={`p-2 rounded-full transition-all text-xs flex items-center justify-center ${
          voiceEnabled
            ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-100 dark:bg-white/5 border border-transparent'
        }`}
      >
        {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>

      {/* Microphone Start/Stop Button */}
      <button
        type="button"
        onClick={onToggleListening}
        title={isListening ? 'Stop listening' : 'Start voice input (Speak your meal or diet request)'}
        className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center relative shadow-sm ${
          isListening
            ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-400/30'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-105'
        }`}
      >
        {isListening ? <MicOff size={15} /> : <Mic size={15} />}
      </button>
    </div>
  )
}

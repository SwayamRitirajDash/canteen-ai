import { useState, useEffect, useRef, useCallback } from 'react'

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [speechError, setSpeechError] = useState(null)
  
  const recognitionRef = useRef(null)
  const onResultCallbackRef = useRef(null)

  // Check Web Speech API Support
  const SpeechRecognition = typeof window !== 'undefined' 
    ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
    : null
  
  const isSupported = Boolean(SpeechRecognition)
  const isTtsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Initialize SpeechRecognition instance
  useEffect(() => {
    if (!SpeechRecognition) return

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-IN' // Standard Indian English for campus canteen context

      recognition.onstart = () => {
        setIsListening(true)
        setSpeechError(null)
      }

      recognition.onresult = (event) => {
        let currentTranscript = ''
        let isFinal = false

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript
          currentTranscript += piece
          if (event.results[i].isFinal) {
            isFinal = true
          }
        }

        setTranscript(currentTranscript)

        if (isFinal && currentTranscript.trim()) {
          if (onResultCallbackRef.current) {
            onResultCallbackRef.current(currentTranscript.trim())
          }
        }
      }

      recognition.onerror = (event) => {
        console.warn('[VoiceAssistant] Speech recognition error:', event.error)
        setIsListening(false)
        if (event.error !== 'no-speech') {
          setSpeechError(`Voice input: ${event.error}`)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } catch (err) {
      console.warn('[VoiceAssistant] Error initializing SpeechRecognition:', err)
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch (_) {}
      }
    }
  }, [SpeechRecognition])

  // Start Voice Listening
  const startListening = useCallback((onFinalResult) => {
    if (!recognitionRef.current) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    // Stop active speech synthesis when user begins speaking
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }

    onResultCallbackRef.current = onFinalResult
    setTranscript('')
    setSpeechError(null)

    try {
      recognitionRef.current.start()
    } catch (err) {
      // If already started, restart
      try {
        recognitionRef.current.stop()
        setTimeout(() => recognitionRef.current?.start(), 150)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Stop Voice Listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (_) {}
    }
    setIsListening(false)
  }, [])

  // Clean text from markdown formatting before reading aloud
  const cleanMarkdownForSpeech = (rawText) => {
    if (!rawText) return ''
    return rawText
      .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold
      .replace(/\*(.*?)\*/g, '$1')     // remove italic
      .replace(/₹/g, ' rupees ')      // pronounce rupee
      .replace(/•/g, ', ')             // bullet points to pauses
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // clean links
      .replace(/[#>`~]/g, '')          // clean headers, quotes
      .replace(/\s+/g, ' ')            // normalize whitespace
      .trim()
  }

  // Text-To-Speech (TTS) Speak Function
  const speak = useCallback((text, force = false) => {
    if (!isTtsSupported || (!voiceEnabled && !force)) return
    if (!text) return

    try {
      window.speechSynthesis.cancel() // Stop any previous speech

      const cleanText = cleanMarkdownForSpeech(text)
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'en-IN'
      utterance.rate = 1.05 // Natural brisk conversational pace
      utterance.pitch = 1.0

      // Try selecting a natural English voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(v => 
        (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) && 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural'))
      ) || voices.find(v => v.lang.startsWith('en'))
      
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    } catch (err) {
      console.warn('[VoiceAssistant] TTS error:', err)
      setIsSpeaking(false)
    }
  }, [isTtsSupported, voiceEnabled])

  // Stop Text-To-Speech
  const stopSpeaking = useCallback(() => {
    if (isTtsSupported) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [isTtsSupported])

  const toggleVoiceOutput = useCallback(() => {
    setVoiceEnabled(prev => {
      const next = !prev
      if (!next && isTtsSupported) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      }
      return next
    })
  }, [isTtsSupported])

  return {
    isListening,
    transcript,
    isSpeaking,
    voiceEnabled,
    speechError,
    isSupported,
    isTtsSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoiceOutput,
  }
}

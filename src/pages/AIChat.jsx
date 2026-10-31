import { useState, useRef, useEffect } from 'react'
import { Send, Trash2, Bot, User, AlertTriangle, RefreshCw } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getMockResponse } from '../data/mockChatEngine'

const QUICK_PROMPTS = [
  'I have a headache',
  'I have a cough',
  'I feel tired',
  'I have a fever',
  'I feel dizzy',
  'I have back pain',
]

// Simple markdown-ish renderer
function renderMessage(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold mb-1">{line.slice(2, -2)}</p>
    }
    if (line.match(/^\*\*(.+?)\*\*/)) {
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      return (
        <p key={i} className="mb-1">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      )
    }
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return <li key={i} className="ml-4 list-disc text-sm">{line.slice(2)}</li>
    }
    if (line.startsWith('> ')) {
      return (
        <div key={i} className="mt-2 p-2 bg-amber-50 border-l-2 border-amber-400 rounded-r text-xs text-amber-800">
          {line.slice(2)}
        </div>
      )
    }
    if (line.match(/^\d+\. /)) {
      return <li key={i} className="ml-4 list-decimal text-sm">{line.replace(/^\d+\. /, '')}</li>
    }
    if (line === '') return <br key={i} />
    return <p key={i} className="text-sm mb-1">{line}</p>
  })
}

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'assistant',
    text: `Hello! I'm MediMind AI, your health information assistant. I can help you understand common symptoms and provide general health education.\n\n**I can help with:**\n• Common symptoms (headache, cough, fever, fatigue, and more)\n• General self-care information\n• When to seek professional medical care\n\n> ⚕️ **Important:** This is a simulated demo assistant. I do not diagnose conditions or replace professional medical advice. Always consult a qualified healthcare professional.`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
]

export default function AIChat() {
  const { t } = useApp()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [followUpSuggestions, setFollowUpSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setFollowUpSuggestions([])
    setIsTyping(true)

    // Simulate AI response delay
    const delay = 1200 + Math.random() * 800
    setTimeout(() => {
      const { text: responseText, followUp } = getMockResponse(text)
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
      setFollowUpSuggestions(followUp || [])
      setIsTyping(false)
    }, delay)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function clearChat() {
    setMessages(INITIAL_MESSAGES)
    setFollowUpSuggestions([])
    setShowClearConfirm(false)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{t.chatTitle}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{t.chatDisclaimer}</p>
        </div>
        <button
          onClick={() => setShowClearConfirm(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
          id="clear-chat-btn"
          aria-label="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">{t.clearChat}</span>
        </button>
      </div>

      {/* Clear confirm modal */}
      {showClearConfirm && (
        <div className="overlay flex items-center justify-center p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Clear Chat?</h3>
                <p className="text-sm text-slate-500">This will remove all messages.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 px-4 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={clearChat} className="flex-1 py-2 px-4 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors" id="confirm-clear-btn">Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Chat container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '480px' }}>
        {/* Disclaimer banner */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border-b border-blue-100">
          <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-xs text-blue-700">Simulated AI demo — for educational purposes only. Not a real medical AI.</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-teal-400' : 'bg-gradient-to-br from-slate-700 to-slate-900'}`}>
                {msg.role === 'user'
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-4 h-4 text-white" />
                }
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-3 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                  <div className="leading-relaxed">
                    {renderMessage(msg.text)}
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up suggestions */}
        {followUpSuggestions.length > 0 && !isTyping && (
          <div className="px-4 py-2 border-t border-slate-100 flex gap-2 flex-wrap">
            {followUpSuggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Quick prompts */}
        <div className="px-4 py-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-2">{t.quickPrompts}</p>
          <div className="flex gap-2 flex-wrap">
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="px-3 py-1.5 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors border border-slate-200"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.typeMessage}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            disabled={isTyping}
            aria-label="Chat message input"
            id="chat-input"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Send message"
            id="send-message-btn"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

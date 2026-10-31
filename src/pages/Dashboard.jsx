import { useState } from 'react'
import {
  Stethoscope, MessageCircle, Lightbulb, UserSearch,
  ArrowRight, Heart, Activity, CheckCircle2, Clock,
  Sparkles, ChevronRight, TrendingUp, Shield
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { recentConsultations } from '../data/mockData'

const STATUS_COLORS = {
  'Reviewed': 'bg-green-100 text-green-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
}

export default function Dashboard() {
  const { t, setActivePage } = useApp()
  const [chatInput, setChatInput] = useState('')

  function handleStartChat(e) {
    e.preventDefault()
    setActivePage('aiChat')
  }

  const quickActions = [
    {
      key: 'symptomChecker',
      label: t.checkSymptoms,
      desc: 'Multi-step symptom assessment',
      icon: Stethoscope,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      key: 'aiChat',
      label: t.chatWithAI,
      desc: 'Conversational health assistant',
      icon: MessageCircle,
      color: 'from-teal-500 to-teal-600',
      bg: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      key: 'healthInsights',
      label: t.healthInsights,
      desc: 'Educational health articles',
      icon: Lightbulb,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      key: 'findDoctor',
      label: t.findDoctor,
      desc: 'Browse specialist profiles',
      icon: UserSearch,
      color: 'from-rose-500 to-rose-600',
      bg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ]

  const overviewCards = [
    {
      title: 'Recent Health Check',
      value: '25 Oct',
      label: 'Last symptom check',
      icon: Stethoscope,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      note: 'Mild headache & fatigue',
    },
    {
      title: 'Health Tips Viewed',
      value: '6',
      label: 'Articles read this week',
      icon: Lightbulb,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      note: 'Hydration, Sleep, Nutrition',
    },
    {
      title: 'Activity Summary',
      value: 'Demo',
      label: 'Simulated wellness data',
      icon: Activity,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      note: 'Stay active — 30 min/day',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 p-8 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span className="text-blue-200 text-sm font-medium">AI-Powered Health Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{t.welcomeTitle}</h2>
          <p className="text-blue-100 mb-6 max-w-xl text-sm sm:text-base">{t.welcomeSubtitle}</p>

          <form onSubmit={handleStartChat} className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm backdrop-blur-sm"
              aria-label="Describe your symptoms"
              id="hero-chat-input"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
              id="start-health-check-btn"
            >
              <span className="hidden sm:inline">{t.startHealthCheck}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="quick-actions-heading" className="text-lg font-semibold text-slate-800">{t.quickActions}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(action => {
            const Icon = action.icon
            return (
              <button
                key={action.key}
                onClick={() => setActivePage(action.key)}
                className="group bg-white rounded-2xl p-5 border border-slate-200 text-left hover:border-blue-200 hover:shadow-md transition-all duration-200 card-hover"
                id={`quick-action-${action.key}`}
              >
                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <div className="font-semibold text-slate-800 text-sm">{action.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{action.desc}</div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Health Overview + Recent Consultations */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overview cards */}
        <section className="lg:col-span-2" aria-labelledby="health-overview-heading">
          <h2 id="health-overview-heading" className="text-lg font-semibold text-slate-800 mb-4">{t.healthOverview}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {overviewCards.map(card => {
              const Icon = card.icon
              return (
                <div key={card.title} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4.5 h-4.5 ${card.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{card.value}</div>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">{card.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{card.note}</div>
                </div>
              )
            })}
          </div>

          {/* AI Project Overview */}
          <div className="mt-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-sm font-semibold text-slate-200">How MediMind AI Works</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              MediMind AI uses Natural Language Processing (NLP) and machine learning techniques to analyse symptom descriptions and provide educational health information. This frontend demonstrates the planned user experience — the ML backend is part of the planned future scope.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {['NLP Analysis', 'Symptom Matching', 'Health Education'].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Consultations */}
        <section aria-labelledby="recent-consultations-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="recent-consultations-heading" className="text-lg font-semibold text-slate-800">{t.recentConsultations}</h2>
            <button
              onClick={() => setActivePage('healthHistory')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {t.viewAll} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentConsultations.map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{c.date}</span>
                  </div>
                  <span className={`badge ${STATUS_COLORS[c.status] || 'bg-slate-100 text-slate-600'}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {c.symptoms.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 leading-snug">{c.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Stats Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-label="Application statistics">
        {[
          { label: 'Symptoms Tracked', value: '20+', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Health Articles', value: '6', icon: Lightbulb, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Demo Doctors', value: '6', icon: UserSearch, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'AI Responses', value: '∞', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

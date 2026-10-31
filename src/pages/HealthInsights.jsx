import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Clock, Droplets, Moon, Apple, Brain, AlertCircle, HandMetal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { HEALTH_INSIGHTS, INSIGHT_CATEGORIES } from '../data/mockData'

const ICON_MAP = {
  Droplets, Moon, Apple, Brain, AlertCircle, HandMetal,
}

const COLOR_MAP = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100', badge: 'bg-blue-100 text-blue-700' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100', badge: 'bg-indigo-100 text-indigo-700' },
  teal: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100', badge: 'bg-teal-100 text-teal-700' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100', badge: 'bg-green-100 text-green-700' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100', badge: 'bg-purple-100 text-purple-700' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100', badge: 'bg-red-100 text-red-700' },
}

function InsightCard({ insight }) {
  const [expanded, setExpanded] = useState(false)
  const c = COLOR_MAP[insight.color] || COLOR_MAP.blue
  const Icon = ICON_MAP[insight.icon] || AlertCircle

  const lines = insight.content.split('\n')

  function renderContent(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    )
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`badge ${c.badge} text-xs`}>{INSIGHT_CATEGORIES.find(cat => cat.id === insight.category)?.label || insight.category}</span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {insight.readTime}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{insight.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{insight.summary}</p>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 animate-fade-in">
            {lines.map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold text-slate-800 text-sm mt-2">{line.slice(2, -2)}</p>
              }
              if (line.startsWith('• ') || line.startsWith('- ')) {
                return <li key={i} className="ml-4 list-disc text-sm text-slate-600">{renderContent(line.slice(2))}</li>
              }
              if (line.match(/^\d+\. /)) {
                return <li key={i} className="ml-4 list-decimal text-sm text-slate-600">{renderContent(line.replace(/^\d+\. /, ''))}</li>
              }
              if (line === '') return <div key={i} className="h-1" />
              return <p key={i} className="text-sm text-slate-600 leading-relaxed">{renderContent(line)}</p>
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => setExpanded(prev => !prev)}
        className={`w-full px-5 py-3 ${c.bg} border-t ${c.border} text-xs font-medium ${c.icon} flex items-center justify-center gap-1.5 hover:opacity-90 transition-all`}
        aria-expanded={expanded}
        id={`insight-expand-${insight.id}`}
      >
        {expanded ? (
          <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
        ) : (
          <><ChevronDown className="w-3.5 h-3.5" /> Read More</>
        )}
      </button>
    </article>
  )
}

export default function HealthInsights() {
  const { t } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = HEALTH_INSIGHTS.filter(insight => {
    const matchesCategory = activeCategory === 'all' || insight.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t.insightsTitle}</h2>
        <p className="text-sm text-slate-500 mt-1">{t.insightsSubtitle}</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchInsights}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            id="insights-search"
            aria-label="Search health articles"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {INSIGHT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all
                ${activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              id={`category-filter-${cat.id}`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No articles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(insight => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 text-center mt-8">
        All content is for educational purposes only. Consult a healthcare professional for medical advice.
      </p>
    </div>
  )
}

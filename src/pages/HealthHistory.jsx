import { useState } from 'react'
import {
  Search, Trash2, ChevronDown, ChevronUp, Clock,
  ClipboardList, Filter, AlertTriangle, X
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { INITIAL_HISTORY } from '../data/mockData'

const STATUS_COLORS = {
  'Completed': 'bg-green-100 text-green-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
}

const CATEGORIES = ['All', 'General', 'Respiratory', 'Digestive', 'Musculoskeletal', 'Dermatology']
const RECORD_TYPES = ['All Types', 'Symptom Check', 'AI Chat Consultation']

export default function HealthHistory() {
  const { t } = useApp()
  const [records, setRecords] = useState(INITIAL_HISTORY)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All Types')
  const [expandedId, setExpandedId] = useState(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const filtered = records.filter(r => {
    const matchSearch = searchQuery === '' ||
      r.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = activeCategory === 'All' || r.category === activeCategory
    const matchType = activeType === 'All Types' || r.type === activeType
    return matchSearch && matchCategory && matchType
  })

  function clearHistory() {
    setRecords([])
    setShowClearConfirm(false)
  }

  function toggleExpand(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="overlay flex items-center justify-center p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Clear History?</h3>
                <p className="text-sm text-slate-500">This will remove all demo records.</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">Only demo data will be cleared. No real medical data is affected.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 px-4 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={clearHistory} className="flex-1 py-2 px-4 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors" id="confirm-clear-history-btn">Clear All</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{t.historyTitle}</h2>
          <p className="text-sm text-slate-500 mt-1">{t.historySubtitle}</p>
        </div>
        {records.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
            id="clear-history-btn"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.clearHistory}</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by symptom or summary…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            id="history-search"
            aria-label="Search history"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1"><Filter className="w-3 h-3" /> Category</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all
                    ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  id={`hist-cat-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Type</p>
            <div className="flex flex-wrap gap-1.5">
              {RECORD_TYPES.map(rt => (
                <button
                  key={rt}
                  onClick={() => setActiveType(rt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all
                    ${activeType === rt ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  id={`hist-type-${rt.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {rt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Records list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-600 mb-1">{t.noHistory}</h3>
          <p className="text-sm text-slate-400">
            {records.length === 0
              ? 'History has been cleared. Use the Symptom Checker or AI Chat to create new records.'
              : 'No records match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(record => (
            <div key={record.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
              <button
                className="w-full p-4 flex items-start justify-between text-left hover:bg-slate-50 transition-colors"
                onClick={() => toggleExpand(record.id)}
                aria-expanded={expandedId === record.id}
                id={`history-record-${record.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ClipboardList className="w-4.5 h-4.5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">{record.type}</span>
                      <span className={`badge ${STATUS_COLORS[record.status] || 'bg-slate-100 text-slate-600'} text-xs`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                      <Clock className="w-3 h-3" />
                      {record.date} at {record.time}
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{record.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {record.symptoms.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {expandedId === record.id ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />}
              </button>

              {expandedId === record.id && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <p className="text-slate-500 mb-0.5">Duration</p>
                        <p className="font-medium text-slate-700">{record.duration}</p>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <p className="text-slate-500 mb-0.5">Severity</p>
                        <p className="font-medium text-slate-700 capitalize">{record.severity}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-medium text-slate-500 mb-1">Summary</p>
                      <p className="text-sm text-slate-700">{record.summary}</p>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">This is demo data only and not a real medical record.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 text-center mt-6">
        Demo data only — no real medical information is stored or processed.
      </p>
    </div>
  )
}

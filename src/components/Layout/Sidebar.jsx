import {
  LayoutDashboard,
  MessageCircle,
  Stethoscope,
  Lightbulb,
  UserSearch,
  ClipboardList,
  Info,
  ChevronRight,
  X,
  Globe,
  Heart,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard },
  { key: 'aiChat', icon: MessageCircle },
  { key: 'symptomChecker', icon: Stethoscope },
  { key: 'healthInsights', icon: Lightbulb },
  { key: 'findDoctor', icon: UserSearch },
  { key: 'healthHistory', icon: ClipboardList },
  { key: 'aboutProject', icon: Info },
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'hinglish', label: 'Hinglish' },
]

export default function Sidebar({ collapsed, onToggleCollapse }) {
  const { t, activePage, setActivePage, sidebarOpen, setSidebarOpen, language, setLanguage } = useApp()

  function navigate(key) {
    setActivePage(key)
    setSidebarOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-slate-800 text-sm leading-tight">{t.appName}</div>
              <div className="text-xs text-slate-500">Health Assistant</div>
            </div>
          )}
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Desktop collapse button */}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full justify-center p-2 mb-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <ul className="space-y-1 px-2">
          {NAV_ITEMS.map(({ key, icon: Icon }) => {
            const isActive = activePage === key
            const label = t.nav[key]
            return (
              <li key={key}>
                <button
                  onClick={() => navigate(key)}
                  title={collapsed ? label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Language Selector */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t.language}</span>
          </div>
          <div className="flex gap-1">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  language === lang.code
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Profile card */}
      <div className={`px-4 py-3 border-t border-slate-100 ${collapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            D
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-700 truncate">{t.demoUser}</div>
              <div className="text-xs text-slate-400 truncate">demo@medimind.ai</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="overlay lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 shadow-xl lg:hidden
          transform transition-transform duration-250 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Mobile navigation"
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-white border-r border-slate-200 sticky top-0 sidebar-transition overflow-hidden
          ${collapsed ? 'w-16' : 'w-60'}`}
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>
    </>
  )
}

import { Menu, Bell, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Topbar({ onMenuClick }) {
  const { t, activePage } = useApp()

  const pageTitle = t.nav[activePage] || 'MediMind AI'

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
          id="mobile-menu-btn"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
          <p className="text-xs text-slate-400 hidden sm:block">MediMind AI · Educational Demo</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search…"
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-48"
            aria-label="Search"
          />
        </div>
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
          id="notifications-btn"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}

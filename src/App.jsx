import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import DisclaimerBar from './components/Layout/DisclaimerBar'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import SymptomChecker from './pages/SymptomChecker'
import HealthInsights from './pages/HealthInsights'
import FindDoctor from './pages/FindDoctor'
import HealthHistory from './pages/HealthHistory'
import AboutProject from './pages/AboutProject'

function AppContent() {
  const { activePage, setSidebarOpen } = useApp()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const PAGE_MAP = {
    dashboard: Dashboard,
    aiChat: AIChat,
    symptomChecker: SymptomChecker,
    healthInsights: HealthInsights,
    findDoctor: FindDoctor,
    healthHistory: HealthHistory,
    aboutProject: AboutProject,
  }

  const ActivePage = PAGE_MAP[activePage] || Dashboard

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <DisclaimerBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" id="main-content">
          <ActivePage />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

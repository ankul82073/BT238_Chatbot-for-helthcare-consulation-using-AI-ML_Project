import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false) // mobile sidebar

  const t = translations[language] || translations.en

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      activePage,
      setActivePage,
      sidebarOpen,
      setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

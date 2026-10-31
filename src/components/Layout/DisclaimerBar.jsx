import { AlertTriangle } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function DisclaimerBar() {
  const { t } = useApp()
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-snug">
        <strong>Important: </strong>{t.disclaimer}
      </p>
    </div>
  )
}

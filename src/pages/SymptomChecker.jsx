import { useState } from 'react'
import {
  Search, Check, ChevronRight, ChevronLeft,
  AlertTriangle, CheckCircle2, AlertCircle, Info,
  RotateCcw, Stethoscope
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { SYMPTOMS_LIST, DURATIONS, SEVERITIES, AGE_RANGES, SYMPTOM_ASSESSMENT_RESULTS } from '../data/mockData'

const STEPS = ['step1', 'step2', 'step3', 'step4']

export default function SymptomChecker() {
  const { t } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [symptomSearch, setSymptomSearch] = useState('')
  const [duration, setDuration] = useState('')
  const [severity, setSeverity] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [result, setResult] = useState(null)
  const [validationError, setValidationError] = useState('')

  const filteredSymptoms = SYMPTOMS_LIST.filter(s =>
    s.toLowerCase().includes(symptomSearch.toLowerCase())
  )

  function toggleSymptom(s) {
    setSelectedSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
    setValidationError('')
  }

  function validate() {
    if (currentStep === 0 && selectedSymptoms.length === 0) {
      setValidationError('Please select at least one symptom.')
      return false
    }
    if (currentStep === 1 && !duration) {
      setValidationError('Please select the symptom duration.')
      return false
    }
    if (currentStep === 1 && !severity) {
      setValidationError('Please select a severity level.')
      return false
    }
    setValidationError('')
    return true
  }

  function nextStep() {
    if (!validate()) return
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  function prevStep() {
    setValidationError('')
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  function analyzeSymptoms() {
    const assessment = SYMPTOM_ASSESSMENT_RESULTS[severity] || SYMPTOM_ASSESSMENT_RESULTS.mild
    setResult({ ...assessment, symptoms: selectedSymptoms, duration, severity, ageRange })
  }

  function resetForm() {
    setCurrentStep(0)
    setSelectedSymptoms([])
    setSymptomSearch('')
    setDuration('')
    setSeverity('')
    setAgeRange('')
    setAdditionalNotes('')
    setResult(null)
    setValidationError('')
  }

  const stepLabels = [t.step1, t.step2, t.step3, t.step4]

  if (result) {
    const colorMap = {
      green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', icon: CheckCircle2, iconColor: 'text-green-600', heading: 'text-green-800' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', icon: AlertCircle, iconColor: 'text-yellow-600', heading: 'text-yellow-800' },
      red: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: AlertTriangle, iconColor: 'text-red-600', heading: 'text-red-800' },
    }
    const c = colorMap[result.color]
    const ResultIcon = c.icon

    return (
      <div className="max-w-2xl mx-auto animate-fade-in space-y-4">
        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800 mb-1">Emergency Notice</p>
            <p className="text-xs text-red-700">If you are experiencing severe, rapidly worsening, or life-threatening symptoms — including chest pain, difficulty breathing, loss of consciousness, or signs of stroke — call your local emergency services immediately (112 in India).</p>
          </div>
        </div>

        {/* Result card */}
        <div className={`${c.bg} ${c.border} border rounded-2xl p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm`}>
              <ResultIcon className={`w-6 h-6 ${c.iconColor}`} />
            </div>
            <div>
              <span className={`badge ${c.badge} text-xs`}>Illustrative Result · Not a Diagnosis</span>
              <h3 className={`text-lg font-bold ${c.heading} mt-1`}>{result.level}</h3>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">{result.summary}</p>

          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Reported Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {result.symptoms.map(s => (
                <span key={s} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-lg font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-white/60 rounded-xl p-3 mb-4">
            <div><span className="font-medium">Duration:</span> {result.duration}</div>
            <div><span className="font-medium">Severity:</span> <span className="capitalize">{result.severity}</span></div>
            {result.ageRange && <div><span className="font-medium">Age Range:</span> {result.ageRange}</div>}
          </div>
        </div>

        {/* Self-care */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-slate-800 text-sm">General Self-Care Information</h4>
          </div>
          <ul className="space-y-2">
            {result.selfCare.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Professional advice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">Consult a Healthcare Professional</p>
              <p className="text-xs text-blue-700">This is an illustrative informational result generated for demo purposes only and is not a medical diagnosis. Please consult a qualified doctor for accurate diagnosis and appropriate treatment.</p>
            </div>
          </div>
        </div>

        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          id="reset-symptom-form-btn"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t.symptomCheckerTitle}</h2>
        <p className="text-sm text-slate-500 mt-1">{t.symptomCheckerSubtitle}</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${i < currentStep ? 'bg-teal-500 text-white' : i === currentStep ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400'}`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === currentStep ? 'text-blue-700' : i < currentStep ? 'text-teal-600' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`step-line flex-1 ${i < currentStep ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {/* Validation error */}
        {validationError && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">{validationError}</span>
          </div>
        )}

        {/* Step 1: Select Symptoms */}
        {currentStep === 0 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Select Your Symptoms</h3>
            <p className="text-sm text-slate-500 mb-4">Choose all symptoms that apply. You can search to filter.</p>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={symptomSearch}
                onChange={e => setSymptomSearch(e.target.value)}
                placeholder="Search symptoms…"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                id="symptom-search-input"
                aria-label="Search symptoms"
              />
            </div>
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {filteredSymptoms.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-3 py-1.5 rounded-xl text-sm border transition-all font-medium
                    ${selectedSymptoms.includes(s)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  aria-pressed={selectedSymptoms.includes(s)}
                >
                  {selectedSymptoms.includes(s) && <Check className="w-3 h-3 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>
            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-700 font-medium mb-1">Selected ({selectedSymptoms.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSymptoms.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Duration & Severity */}
        {currentStep === 1 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Duration & Severity</h3>
            <p className="text-sm text-slate-500 mb-4">How long have you had these symptoms, and how severe are they?</p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
              <div className="space-y-2">
                {DURATIONS.map(d => (
                  <label key={d} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                    ${duration === d ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={d}
                      checked={duration === d}
                      onChange={() => { setDuration(d); setValidationError('') }}
                      className="accent-blue-600"
                    />
                    <span className="text-sm text-slate-700">{d}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Severity Level</label>
              <div className="grid grid-cols-3 gap-3">
                {SEVERITIES.map(sv => (
                  <button
                    key={sv.value}
                    onClick={() => { setSeverity(sv.value); setValidationError('') }}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all
                      ${severity === sv.value ? sv.color + ' border-current' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    aria-pressed={severity === sv.value}
                  >
                    {sv.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Context */}
        {currentStep === 2 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Optional Context</h3>
            <p className="text-sm text-slate-500 mb-4">This information is optional and helps provide more relevant information. No data is stored or transmitted.</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Age Range (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {AGE_RANGES.map(age => (
                  <button
                    key={age}
                    onClick={() => setAgeRange(prev => prev === age ? '' : age)}
                    className={`px-4 py-2 rounded-xl border text-sm transition-all
                      ${ageRange === age ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    aria-pressed={ageRange === age}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="additional-notes" className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
              <textarea
                id="additional-notes"
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder="Any other relevant information… (e.g. recent travel, known allergies)"
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              />
              <p className="text-xs text-slate-400 mt-1">No personal data is stored by this demo application.</p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Review Your Selections</h3>
            <p className="text-sm text-slate-500 mb-4">Confirm your details before generating an informational overview.</p>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Symptoms ({selectedSymptoms.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Duration</p>
                  <p className="text-sm text-slate-800 font-medium">{duration}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Severity</p>
                  <p className="text-sm text-slate-800 font-medium capitalize">{severity}</p>
                </div>
              </div>
              {ageRange && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Age Range</p>
                  <p className="text-sm text-slate-800 font-medium">{ageRange}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  The result will be an <strong>illustrative educational overview</strong> — not a medical diagnosis, not a prediction from a real ML model. Always consult a qualified healthcare professional.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            id="step-back-btn"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.back}
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              id="step-next-btn"
            >
              {t.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={analyzeSymptoms}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm"
              id="analyze-symptoms-btn"
            >
              <Stethoscope className="w-4 h-4" />
              {t.analyzeSymptoms}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

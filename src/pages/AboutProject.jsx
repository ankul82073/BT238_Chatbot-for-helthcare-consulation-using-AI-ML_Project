import { ArrowRight, CheckCircle2, Clock, Target, Zap, Globe, Database, Code2, Brain, Layers, ChevronRight } from 'lucide-react'

const TECH_STACK = [
  { name: 'React.js', desc: 'Frontend UI library', status: 'Implemented', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', status: 'Implemented', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500' },
  { name: 'Vite', desc: 'Fast build tool', status: 'Implemented', color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  { name: 'React Router', desc: 'Client-side navigation', status: 'Implemented', color: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  { name: 'Python / FastAPI', desc: 'Planned REST backend', status: 'Planned', color: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  { name: 'NLP / Transformers', desc: 'Symptom text processing', status: 'Planned', color: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  { name: 'Scikit-learn', desc: 'ML classification model', status: 'Planned', color: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  { name: 'MongoDB', desc: 'Optional data store', status: 'Planned', color: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
]

const WORKFLOW_STEPS = [
  { step: '01', label: 'User Input', desc: 'User describes symptoms or queries via the chat interface or symptom form', icon: '💬', color: 'from-blue-500 to-blue-600' },
  { step: '02', label: 'Symptom Processing', desc: 'Text is pre-processed: tokenisation, normalisation, stop-word removal', icon: '⚙️', color: 'from-indigo-500 to-indigo-600' },
  { step: '03', label: 'AI/ML Analysis', desc: 'NLP model extracts symptom entities; classifier maps to condition categories (Planned Backend)', icon: '🧠', color: 'from-purple-500 to-purple-600' },
  { step: '04', label: 'Informational Result', desc: 'Educational health information and self-care guidance is returned', icon: '📋', color: 'from-teal-500 to-teal-600' },
  { step: '05', label: 'Professional Guidance', desc: 'User is directed to consult a qualified healthcare professional for diagnosis', icon: '🩺', color: 'from-green-500 to-green-600' },
]

const FEATURES = [
  { icon: CheckCircle2, label: 'Interactive AI Chat', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: CheckCircle2, label: 'Multi-Step Symptom Checker', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: CheckCircle2, label: 'Health Insights Library', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: CheckCircle2, label: 'Doctor Discovery Interface', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: CheckCircle2, label: 'Consultation History', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: CheckCircle2, label: 'Multi-Language Support (EN / HI / Hinglish)', status: 'Frontend Demo', color: 'text-green-600' },
  { icon: Clock, label: 'NLP-Based Symptom Extraction', status: 'Planned Backend', color: 'text-slate-400' },
  { icon: Clock, label: 'ML Disease Classification Model', status: 'Planned Backend', color: 'text-slate-400' },
  { icon: Clock, label: 'FastAPI REST Backend', status: 'Planned Backend', color: 'text-slate-400' },
  { icon: Clock, label: 'User Authentication & Profiles', status: 'Planned Backend', color: 'text-slate-400' },
]

export default function AboutProject() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">B.Tech CS Final Year Project</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">MediMind AI</h2>
        <p className="text-slate-300 text-lg font-medium mb-4">AI/ML-Based Healthcare Consultation Chatbot</p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          A frontend prototype demonstrating an AI-powered healthcare consultation interface designed to provide
          preliminary symptom information and educational health guidance using Natural Language Processing (NLP)
          and Machine Learning (ML) techniques.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['React.js', 'Tailwind CSS', 'NLP (Planned)', 'Python FastAPI (Planned)', 'Scikit-learn (Planned)'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/10 text-slate-300 text-xs rounded-lg">{tag}</span>
          ))}
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Problem Statement</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            People often face difficulty accessing timely health information and understanding their symptoms,
            especially in areas with limited access to healthcare. This can lead to delayed consultation,
            unnecessary anxiety, or self-medication without adequate knowledge.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Proposed Solution</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            MediMind AI proposes an NLP and ML-powered conversational interface that assists users in understanding
            common symptoms, accessing educational health information, and receiving guidance on when to seek
            professional medical consultation — available 24/7 and accessible via browser.
          </p>
        </div>
      </div>

      {/* System Workflow */}
      <section aria-labelledby="workflow-heading">
        <h3 id="workflow-heading" className="text-lg font-semibold text-slate-800 mb-4">System Workflow</h3>
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-3">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.step} className="flex sm:flex-col items-start sm:items-center gap-3 flex-1">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                  {step.icon}
                </div>
                <div className="sm:text-center flex-1">
                  <div className="text-xs font-bold text-slate-400 mb-0.5">Step {step.step}</div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">{step.label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{step.desc}</div>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ChevronRight className="hidden sm:block w-5 h-5 text-slate-300 flex-shrink-0 self-start mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4">
          ⚠️ Steps 3 (AI/ML Analysis) and beyond represent the planned backend integration. The current prototype demonstrates the frontend user experience only.
        </p>
      </section>

      {/* Features grid */}
      <section aria-labelledby="features-heading">
        <h3 id="features-heading" className="text-lg font-semibold text-slate-800 mb-4">Features & Implementation Status</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {FEATURES.map(f => {
            const Icon = f.icon
            return (
              <div key={f.label} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <Icon className={`w-4 h-4 flex-shrink-0 ${f.color}`} />
                <div>
                  <p className="text-sm font-medium text-slate-700">{f.label}</p>
                  <p className={`text-xs ${f.status === 'Frontend Demo' ? 'text-green-600' : 'text-slate-400'}`}>{f.status}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section aria-labelledby="tech-stack-heading">
        <h3 id="tech-stack-heading" className="text-lg font-semibold text-slate-800 mb-4">Technology Stack</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TECH_STACK.map(tech => (
            <div key={tech.name} className={`rounded-xl border p-4 ${tech.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${tech.dot}`}></div>
                <span className="text-xs font-semibold uppercase tracking-wide">{tech.status}</span>
              </div>
              <p className="font-semibold text-sm mb-0.5">{tech.name}</p>
              <p className="text-xs opacity-80">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5" aria-labelledby="objectives-heading">
        <h3 id="objectives-heading" className="font-semibold text-slate-800 mb-3">Project Objectives</h3>
        <ul className="space-y-2">
          {[
            'Design and implement a user-friendly conversational interface for preliminary symptom information',
            'Integrate NLP-based symptom extraction and entity recognition (planned backend)',
            'Develop or utilise an ML classification model for mapping symptoms to condition categories (planned)',
            'Provide evidence-based health education and self-care information within the interface',
            'Guide users towards professional healthcare consultation appropriately',
            'Demonstrate a responsive, accessible, and production-quality frontend prototype',
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
              {obj}
            </li>
          ))}
        </ul>
      </section>

      {/* Future Scope */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-5" aria-labelledby="future-scope-heading">
        <h3 id="future-scope-heading" className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          Future Scope
        </h3>
        <ul className="space-y-1.5">
          {[
            'Integration with Python/FastAPI backend and trained NLP/ML models',
            'Real-time symptom entity extraction using spaCy or Hugging Face Transformers',
            'Multi-class disease risk stratification using Scikit-learn classifiers',
            'Secure user authentication and persistent health record management',
            'Telemedicine integration for real doctor consultation booking',
            'Voice input and accessibility features for broader user reach',
            'Regional Indian language support expansion beyond Hindi and Hinglish',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <ArrowRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-sm font-semibold text-amber-800 mb-1">Academic Project Disclaimer</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          MediMind AI is an academic project submitted as part of a B.Tech Computer Science final year requirement.
          The current version is a frontend prototype only. No real ML model, medical database, or backend service
          is connected. All doctor profiles, consultation records, and health assessments are fictional demo data.
          This application does not store, transmit, or process any real personal or medical information.
          It should not be used for actual medical diagnosis or treatment decisions.
        </p>
      </div>
    </div>
  )
}

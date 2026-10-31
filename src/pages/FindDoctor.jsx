import { useState } from 'react'
import {
  Search, Star, MapPin, Clock, Video, Building2,
  ChevronDown, ChevronUp, X, CheckCircle2, Calendar, Phone, User
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DOCTORS, SPECIALTIES } from '../data/mockData'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
      <span className="text-xs text-slate-600 ml-0.5 font-medium">{rating}</span>
    </div>
  )
}

function AppointmentModal({ doctor, onClose }) {
  const [form, setForm] = useState({ date: '', time: '', name: '', phone: '', reason: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  function validate() {
    const errs = {}
    if (!form.date) errs.date = 'Please select a date'
    if (!form.time) errs.time = 'Please select a time slot'
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit mobile number'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="overlay flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Request Appointment</h3>
            <p className="text-sm text-slate-500">{doctor.name} · {doctor.specialtyLabel}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Request Sent!</h3>
            <p className="text-sm text-slate-500 mb-1">
              Your appointment request for <strong>{form.date}</strong> at <strong>{form.time}</strong> has been submitted.
            </p>
            <p className="text-xs text-slate-400 mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              ⚠️ This is a demo. No real appointment has been booked and no real data has been transmitted.
            </p>
            <button onClick={onClose} className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label htmlFor="appt-date" className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date *</label>
              <input
                id="appt-date"
                type="date"
                min={today}
                value={form.date}
                onChange={e => { setForm(prev => ({ ...prev, date: e.target.value })); setErrors(prev => ({ ...prev, date: '' })) }}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Time *</label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => { setForm(prev => ({ ...prev, time: slot })); setErrors(prev => ({ ...prev, time: '' })) }}
                    className={`px-3 py-1.5 rounded-xl text-sm border transition-all ${form.time === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label htmlFor="appt-name" className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
              <input
                id="appt-name"
                type="text"
                value={form.name}
                onChange={e => { setForm(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, name: '' })) }}
                placeholder="Enter your full name"
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="appt-phone" className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number *</label>
              <input
                id="appt-phone"
                type="tel"
                value={form.phone}
                onChange={e => { setForm(prev => ({ ...prev, phone: e.target.value })); setErrors(prev => ({ ...prev, phone: '' })) }}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="appt-reason" className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Visit (Optional)</label>
              <textarea
                id="appt-reason"
                value={form.reason}
                onChange={e => setForm(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Brief description…"
                rows={2}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
              ℹ️ All doctor profiles and appointment information are fictional demo data. No real appointments are being booked.
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-sm"
              id="submit-appointment-btn"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function DoctorCard({ doctor, onRequestAppointment }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {doctor.name.split(' ').slice(-1)[0][0]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
            <p className="text-sm text-blue-600 font-medium">{doctor.specialtyLabel}</p>
            <div className="mt-1">
              <StarRating rating={doctor.rating} />
              <span className="text-xs text-slate-400 ml-0.5">({doctor.reviews} reviews · demo)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            {doctor.experience} exp.
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {doctor.location}
          </div>
          <div className="flex items-center gap-1.5">
            {doctor.consultationType.includes('Online') ? <Video className="w-3.5 h-3.5 text-slate-400" /> : <Building2 className="w-3.5 h-3.5 text-slate-400" />}
            {doctor.consultationType}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {doctor.availability}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
            <p className="text-xs font-medium text-slate-500 mb-1">Qualification</p>
            <p className="text-sm text-slate-700 mb-3">{doctor.qualification}</p>
            <p className="text-xs font-medium text-slate-500 mb-1">About</p>
            <p className="text-sm text-slate-700">{doctor.about}</p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            aria-expanded={expanded}
            id={`view-profile-${doctor.id}`}
          >
            {expanded ? <><ChevronUp className="w-4 h-4" />Hide Profile</> : <><ChevronDown className="w-4 h-4" />View Profile</>}
          </button>
          <button
            onClick={() => onRequestAppointment(doctor)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-sm"
            id={`request-appt-${doctor.id}`}
          >
            <Calendar className="w-4 h-4" />
            Request Appointment
          </button>
        </div>
      </div>
    </article>
  )
}

export default function FindDoctor() {
  const { t } = useApp()
  const [activeSpecialty, setActiveSpecialty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [appointmentDoctor, setAppointmentDoctor] = useState(null)

  const filtered = DOCTORS.filter(d => {
    const matchSpecialty = activeSpecialty === 'all' || d.specialty === activeSpecialty
    const matchSearch = searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialtyLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchSpecialty && matchSearch
  })

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {appointmentDoctor && (
        <AppointmentModal
          doctor={appointmentDoctor}
          onClose={() => setAppointmentDoctor(null)}
        />
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t.findDoctorTitle}</h2>
        <p className="text-sm text-slate-500 mt-1">{t.findDoctorSubtitle}</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchDoctors}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            id="doctor-search-input"
            aria-label="Search doctors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSpecialty(s.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5
                ${activeSpecialty === s.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              id={`specialty-filter-${s.id}`}
              aria-pressed={activeSpecialty === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found (fictional demo profiles)</p>

      {/* Doctor Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No doctors found</p>
          <p className="text-sm mt-1">Try a different search or specialty</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onRequestAppointment={setAppointmentDoctor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

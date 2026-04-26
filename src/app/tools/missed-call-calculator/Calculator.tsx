'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'


const TRADES = [
  'Plumber',
  'Electrician',
  'Builder',
  'Roofer',
  'Carpenter',
  'Painter & Decorator',
  'Gas Engineer',
  'HVAC Engineer',
  'Landscaper',
  'Other',
]

interface Results {
  weekly: number
  monthly: number
  annual: number
}

function fmt(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

export function MissedCallCalculator() {

  const router = useRouter()

  const [trade, setTrade] = useState('')
  const [jobValue, setJobValue] = useState('')
  const [missedCalls, setMissedCalls] = useState(3)
  const [results, setResults] = useState<Results | null>(null)
  const [error, setError] = useState('')

  function calculate() {
    const job = parseFloat(jobValue)
    if (!job || job <= 0) {
      setError('Please enter a valid job value.')
      return
    }
    setError('')
    const weekly = job * missedCalls
    setResults({
      weekly,
      monthly: Math.round(weekly * 4.33),
      annual: Math.round(weekly * 52),
    })
  }

  const annual = results?.annual ?? 0
  const vans = Math.floor(annual / 25000)
  const holidays = Math.floor(annual / 1500)
  const apprentice = Math.floor(annual / 22000)

  return (
    <main className="min-h-screen bg-(--color-bg) text-white px-4 py-16">
      <div className="max-w-xl mx-auto">

        <button
            onClick={() => router.push('/')}
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
            ← Go back home
        </button>

        {/* Header */}
        <p className="text-(--color-accent) text-xs font-medium tracking-widest uppercase mb-3">
          Free Tool
        </p>
        <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-semibold leading-tight mb-4">
          How Much Are Missed Calls<br />Costing Your Business?
        </h1>
        <p className="text-white/50 text-sm mb-10 max-w-md">
          Enter your trade and average job value below. See the real number — most tradespeople are shocked.
        </p>

        {/* Form */}
        <div className="space-y-6">

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
              Your trade
            </label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-(--color-accent) transition-colors"
            >
              <option value="" className="text-black">Select your trade</option>
              {TRADES.map((t) => (
                <option key={t} value={t} className="text-black">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
              Average job value (£)
            </label>
            <input
              type="number"
              value={jobValue}
              onChange={(e) => setJobValue(e.target.value)}
              placeholder="e.g. 350"
              min="1"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-(--color-accent) transition-colors"
            />
            {error && (
              <p className="text-red-400 text-xs mt-2">{error}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
              Missed calls per week —{' '}
              <span className="text-(--color-accent) font-semibold">{missedCalls}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={missedCalls}
              onChange={(e) => setMissedCalls(parseInt(e.target.value))}
              className="w-full accent-(--color-accent)"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-(--color-accent) hover:opacity-90 active:scale-[0.99] transition-all text-white font-medium py-4 rounded-lg text-sm tracking-wide"
          >
            Calculate my losses
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="mt-10 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Big number */}
            <div className="border-l-4 border-(--color-accent) bg-white/5 rounded-lg p-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                You are losing every year
              </p>
              <p className="font-['Barlow_Condensed'] text-5xl font-semibold text-(--color-accent) leading-none">
                {fmt(results.annual)}
              </p>
              <p className="text-white/40 text-sm mt-3">
                That's {fmt(results.monthly)} every single month sitting unanswered.
              </p>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Per week', value: fmt(results.weekly) },
                { label: 'Per month', value: fmt(results.monthly) },
                { label: 'Per year', value: fmt(results.annual) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-base font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Contextual equivalents */}
            <div className="space-y-1 px-1">
              {vans >= 1 && (
                <p className="text-white/50 text-sm">
                  That's{' '}
                  <span className="text-white font-medium">
                    {vans} new van{vans > 1 ? 's' : ''}
                  </span>{' '}
                  per year.
                </p>
              )}
              {holidays >= 1 && (
                <p className="text-white/50 text-sm">
                  That's{' '}
                  <span className="text-white font-medium">
                    {holidays} family holiday{holidays > 1 ? 's' : ''}
                  </span>{' '}
                  per year.
                </p>
              )}
              {apprentice >= 1 && (
                <p className="text-white/50 text-sm">
                  That's{' '}
                  <span className="text-white font-medium">
                    {apprentice} apprentice wage{apprentice > 1 ? 's' : ''}
                  </span>{' '}
                  per year.
                </p>
              )}
              {vans < 1 && holidays < 1 && apprentice < 1 && (
                <p className="text-white/50 text-sm">
                  Every missed call is money left on the table.
                </p>
              )}
            </div>

            {/* Upsell banner */}
            <div className="bg-(--color-accent) rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white text-base mb-1 font-['Barlow_Condensed']">
                  MissedCallAI answers every call you miss — 24/7.
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  At your miss rate, it pays for itself the moment it books one job. No contracts.
                </p>
              </div>
              <a
                href="/signup"
                className="shrink-0 bg-white text-black font-semibold px-5 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity whitespace-nowrap text-center"
              >
                Start for £49/month
              </a>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}
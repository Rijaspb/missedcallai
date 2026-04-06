'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  defaultPhone: string
}

export default function OnboardingForm({ defaultPhone }: Props) {
  const [form, setForm] = useState({
    business_name: '',
    owner_name: '',
    email: '',
    notification_phone: defaultPhone,
    services: '',
    custom_greeting: '',
    terms_accepted: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const isValid =
    form.business_name &&
    form.owner_name &&
    form.email &&
    form.notification_phone &&
    form.services &&
    form.terms_accepted

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        setLoading(false)
        return
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url
    }

  const inputClass = "w-full px-4 py-3 text-sm border bg-transparent outline-none"
  const inputStyle = { borderColor: 'var(--color-border-2)', color: 'var(--color-text)' }
  const labelClass = "text-xs font-semibold uppercase tracking-widest block mb-1.5"
  const labelStyle = { color: 'var(--color-muted)' }

  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass} style={labelStyle}>Business name *</label>
        <input
          name="business_name"
          value={form.business_name}
          onChange={handleChange}
          placeholder="e.g. Rijas Plumbing"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Your name *</label>
        <input
          name="owner_name"
          value={form.owner_name}
          onChange={handleChange}
          placeholder="e.g. Rijas"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Notification number *</label>
        <input
          type="tel"
          name="notification_phone"
          value={form.notification_phone}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
        />
        <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>
          We'll send missed call alerts to this number.
        </p>
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Services you offer *</label>
        <textarea
          name="services"
          value={form.services}
          onChange={handleChange}
          placeholder="e.g. Boiler repairs, bathroom installations, emergency callouts"
          rows={3}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          name="terms_accepted"
          id="terms_accepted"
          checked={form.terms_accepted}
          onChange={handleChange}
          className="mt-0.5 accent-orange-500"
        />
        <label htmlFor="terms_accepted" className="text-sm" style={{ color: 'var(--color-muted)' }}>
          I agree to the{' '}
          <Link href="/terms" target="_blank" className="underline" style={{ color: 'var(--color-text)' }}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" target="_blank" className="underline" style={{ color: 'var(--color-text)' }}>
            Privacy Policy
          </Link>
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || !isValid}
        className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-80 disabled:opacity-40"
        style={{ background: 'var(--color-accent)', color: '#0D0D0D' }}
      >
        {loading ? 'Saving…' : 'Continue to payment'}
      </button>
    </div>
  )
}
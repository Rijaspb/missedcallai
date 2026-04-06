'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSendOTP() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({ phone })
    if (error) setError(error.message)
    else setStep('otp')
    setLoading(false)
  }

  async function handleVerifyOTP() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    })
    if (error) setError(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <h1 className="font-display font-black uppercase text-4xl mb-2">
            {step === 'phone' ? (
                <>
                Welcome{' '}
                <span style={{ color: 'var(--color-accent)' }}>back</span>
                {' '}or{' '}
                <span style={{ color: 'var(--color-accent)' }}>aboard</span>
                </>
            ) : (
                <>
                Check your{' '}
                <span style={{ color: 'var(--color-accent)' }}>phone</span>
                </>
            )}
            </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
            {step === 'phone'
                ? 'Enter your number to sign in or start your 14-day free trial.'
                : `Code sent to ${phone}. Check your messages.`}
            </p>

        <div className="space-y-4">
          {step === 'phone' ? (
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-widest block mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                Mobile number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none"
                style={{ borderColor: 'var(--color-border-2)', color: 'var(--color-text)' }}
              />
            </div>
          ) : (
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-widest block mb-1.5"
                style={{ color: 'var(--color-muted)' }}
              >
                6-digit code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none tracking-widest"
                style={{ borderColor: 'var(--color-border-2)', color: 'var(--color-text)' }}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            onClick={step === 'phone' ? handleSendOTP : handleVerifyOTP}
            disabled={loading || (step === 'phone' ? !phone : otp.length !== 6)}
            className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: 'var(--color-accent)', color: '#0D0D0D' }}
          >
            {loading
              ? 'Please wait…'
              : step === 'phone'
              ? 'Send code'
              : 'Verify & start trial'}
          </button>

          {step === 'otp' && (
            <button
              onClick={() => { setStep('phone'); setError(null); setOtp('') }}
              className="w-full text-xs text-center"
              style={{ color: 'var(--color-muted)' }}
            >
              Wrong number? Go back
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
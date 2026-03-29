'use client'

import { useState, useId } from 'react'
import { clsx } from 'clsx'
import { CONTACT } from '@/constants/contact'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  phone: string
  email: string
  topic: string
  message: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  email: '',
  topic: '',
  message: '',
}

// ---------------------------------------------------------------------------
// Shared primitive classes
// ---------------------------------------------------------------------------

const labelCn =
  'block text-[11px] font-semibold uppercase tracking-widest text-(--color-muted) mb-2 font-body'

const inputBaseCn =
  'w-full bg-(--color-surface) border text-(--color-text) font-body text-[15px] px-[14px] py-3 outline-none rounded-none appearance-none transition-colors duration-150 placeholder:text-[#555] disabled:opacity-50 disabled:cursor-not-allowed'

const inputIdleCn = 'border-(--color-border-2) focus:border-(--color-accent)'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactForm() {
  const uid = useId()
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState<FormData>(INITIAL)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.topic || !form.message.trim()) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = (await res.json()) as { success: boolean; error?: string }

      if (data.success) {
        setState('success')
        setForm(INITIAL)
      } else {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------

  if (state === 'success') {
    return (
      <div className="bg-(--color-surface) border border-(--color-border-2) px-8 py-12 text-center">
        <div className="w-12 h-12 bg-(--color-accent) flex items-center justify-center mx-auto mb-5 text-[#0D0D0D] font-bold text-xl">
          ✓
        </div>
        <h3 className="font-display text-[28px] font-black uppercase mb-2.5">
          Message received!
        </h3>
        <p className="text-(--color-muted) text-[15px] leading-relaxed">
          Thanks for reaching out. Rijas will get back to you as soon as possible — usually within a day.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-6 bg-transparent border border-(--color-border-2) text-(--color-muted) font-body text-xs font-semibold uppercase tracking-widest px-5 py-2.5 cursor-pointer transition-colors hover:border-(--color-muted)"
        >
          Send another message
        </button>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Form
  // -----------------------------------------------------------------------

  const isLoading = state === 'loading'

  return (
    <div>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${uid}-name`} className={labelCn}>
            Name <span className="text-(--color-accent)">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John McGill"
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
            className={clsx(inputBaseCn, inputIdleCn)}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelCn}>
            Phone{' '}
            <span className="normal-case tracking-normal font-normal text-[#444]">
              (optional)
            </span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07700 900000"
            value={form.phone}
            onChange={handleChange}
            disabled={isLoading}
            className={clsx(inputBaseCn, inputIdleCn)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor={`${uid}-email`} className={labelCn}>
          Email <span className="text-(--color-accent)">*</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@mcgillsplumbing.co.uk"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading}
          className={clsx(inputBaseCn, inputIdleCn)}
        />
      </div>

      {/* Topic select */}
      <div className="mb-4 relative">
        <label htmlFor={`${uid}-topic`} className={labelCn}>
          Topic <span className="text-(--color-accent)">*</span>
        </label>
        <div className="relative">
          <select
            id={`${uid}-topic`}
            name="topic"
            value={form.topic}
            onChange={handleChange}
            disabled={isLoading}
            className={clsx(
              inputBaseCn,
              inputIdleCn,
              'pr-9 cursor-pointer',
              !form.topic && 'text-[#555]'
            )}
          >
            {CONTACT.topics.map(t => (
              <option
                key={t.value}
                value={t.value}
                disabled={t.value === ''}
                className="bg-[#111] text-(--color-text)"
              >
                {t.label}
              </option>
            ))}
          </select>
          {/* Custom chevron — sits over the native arrow */}
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] text-xs pointer-events-none">
            ▾
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor={`${uid}-message`} className={labelCn}>
          Message <span className="text-(--color-accent)">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          placeholder="Tell me a bit about your business and what you need..."
          value={form.message}
          onChange={handleChange}
          disabled={isLoading}
          className={clsx(inputBaseCn, inputIdleCn, 'resize-y min-h-30')}
        />
        <p className="text-xs text-[#444] mt-1.5">{form.message.length} / 3000</p>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="bg-[#1a0000] border border-[#5a1a1a] text-[#ff7777] text-[13px] px-3.5 py-2.5 mb-4 leading-relaxed">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={clsx(
          'w-full font-body text-[13px] font-bold uppercase tracking-widest py-4 border-none cursor-pointer transition-opacity',
          isLoading
            ? 'bg-[#7c3910] text-[#0D0D0D] opacity-70 cursor-not-allowed'
            : 'bg-(--color-accent) text-[#0D0D0D] hover:opacity-80'
        )}
      >
        {isLoading ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-xs text-[#444] mt-3 text-center">
        Your message goes straight to Rijas — no support tickets, no bots.
      </p>
    </div>
  )
}
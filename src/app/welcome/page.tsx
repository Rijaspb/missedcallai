import 'server-only'
import { redirect } from 'next/navigation'
import { createSSRClient } from '@/lib/supabase/ssr'
import Link from 'next/link'

export default async function WelcomePage() {
  const supabase = await createSSRClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signup')

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, twilio_number, trial_ends_at')
    .eq('auth_user_id', user.id)
    .single()

  if (!customer?.twilio_number) redirect('/dashboard')

  const trialEnd = customer.trial_ends_at
    ? new Date(customer.trial_ends_at).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-sm w-full">
        <h1 className="font-display font-black uppercase text-4xl mb-2">
          You&apos;re{' '}
          <span style={{ color: 'var(--color-accent)' }}>live!</span>
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
          {trialEnd
            ? `Your free trial runs until ${trialEnd}. We've also sent these instructions to your email.`
            : `Your free trial has started. We've also sent these instructions to your email.`}
        </p>

        <div
          className="p-5 border rounded-xl mb-8"
          style={{ borderColor: 'var(--color-border-2)', background: 'var(--color-surface)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
            Your MissedCallAI number
          </p>
          <p className="font-display font-black text-3xl" style={{ color: 'var(--color-accent)' }}>
            {customer.twilio_number}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
            Set up call forwarding
          </p>
          <ol className="space-y-3">
            {[
              'Open your phone settings',
              'Find "Call Forwarding" or "Diverts"',
              'Select "Forward when unanswered"',
              `Enter your MissedCallAI number: ${customer.twilio_number}`,
              'Save — then test by calling your number and not answering',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                <span
                  className="font-bold shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/dashboard"
          className="w-full py-4 text-sm font-bold uppercase tracking-widest text-center block transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-accent)', color: '#0D0D0D' }}
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  )
}
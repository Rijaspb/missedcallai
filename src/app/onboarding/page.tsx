import 'server-only'
import { redirect } from 'next/navigation'
import { createSSRClient } from '@/lib/supabase/ssr'
import OnboardingForm from './OnboardingForm'

export default async function OnboardingPage() {
  const supabase = await createSSRClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signup')

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, real_phone')
    .eq('auth_user_id', user.id)
    .single()

  // Already completed onboarding
  if (customer?.business_name) redirect('/dashboard')

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-sm w-full">
        <h1 className="font-display font-black uppercase text-4xl mb-2">
          Set up your{' '}
          <span style={{ color: 'var(--color-accent)' }}>account</span>
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
          Tell us about your business so we can set everything up.
        </p>

        <OnboardingForm defaultPhone={customer?.real_phone ?? ''} />
      </div>
    </main>
  )
}
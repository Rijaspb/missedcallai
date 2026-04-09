import 'server-only'
import { redirect } from 'next/navigation'
import { createSSRClient } from '@/lib/supabase/ssr'
import SignOutButton from './SignOutButton'

export default async function DashboardPage() {
  const supabase = await createSSRClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signup')

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name')
    .eq('auth_user_id', user.id)
    .single()

  if (!customer?.business_name) redirect('/onboarding')

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-black uppercase text-4xl mb-4">
          Your <span style={{ color: 'var(--color-accent)' }}>dashboard</span>
        </h1>
        <p className="mb-8" style={{ color: 'var(--color-muted)' }}>
          Coming soon. You're signed in.
        </p>
        <SignOutButton />
      </div>
    </main>
  )
}
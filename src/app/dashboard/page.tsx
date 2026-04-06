import 'server-only'
import { redirect } from 'next/navigation'
import { createSSRClient } from '@/lib/supabase/ssr'

export default async function DashboardPage() {
  const supabase = await createSSRClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signup')

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-black uppercase text-4xl mb-4">
          Your <span style={{ color: 'var(--color-accent)' }}>dashboard</span>
        </h1>
        <p style={{ color: 'var(--color-muted)' }}>
          Coming soon. You're signed in.
        </p>
      </div>
    </main>
  )
}
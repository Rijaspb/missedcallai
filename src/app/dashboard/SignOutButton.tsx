'use client'

import { signOut } from '@/lib/supabase/client'

export default function SignOutButton() {
  return (
    <button
      onClick={signOut}
      className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 border transition-opacity hover:opacity-80"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
    >
      Sign out
    </button>
  )
}
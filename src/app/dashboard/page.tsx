import 'server-only'
import { redirect } from 'next/navigation'
import { createSSRClient } from '@/lib/supabase/ssr'
import SignOutButton from './SignOutButton'
import SummaryCell from './SummaryCell'

export default async function DashboardPage() {
  const supabase = await createSSRClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/signup')

  const { data: customer } = await supabase
    .from('customers')
    .select('id, business_name, subscription_status, trial_ends_at')
    .eq('auth_user_id', user.id)
    .single()

  if (!customer?.business_name) redirect('/onboarding')

  const [{ data: callLogs }, { count }] = await Promise.all([
    supabase
      .from('call_logs')
      .select('id, created_at, caller_number, caller_number_anonymised, summary, duration_seconds, notification_sent, recording_url')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('call_logs')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customer.id),
  ])

  const logs = callLogs ?? []
  const totalCalls = count ?? 0

  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="font-display font-black uppercase text-3xl">
            {customer.business_name}
          </h1>
          <p className="text-[var(--color-muted)] text-sm mt-1 capitalize">
            {customer.subscription_status ?? 'trial'}
            {customer.trial_ends_at && customer.subscription_status === 'trial' && (
              <> · trial ends {new Date(customer.trial_ends_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</>
            )}
          </p>
        </div>
        <SignOutButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="border border-white/10 rounded-lg p-5">
          <p className="text-[var(--color-muted)] text-xs uppercase tracking-widest mb-2">
            Total Calls Handled
          </p>
          <p className="font-display font-black text-4xl text-[var(--color-accent)]">
            {totalCalls}
          </p>
        </div>
        <div className="border border-white/10 rounded-lg p-5">
          <p className="text-[var(--color-muted)] text-xs uppercase tracking-widest mb-2">
            Status
          </p>
          <p className="font-display font-black text-2xl capitalize">
            {customer.subscription_status ?? '—'}
          </p>
        </div>
      </div>

      {/* Call Logs */}
      <div>
        <h2 className="font-display font-black uppercase text-xl mb-4">
          Recent <span className="text-[var(--color-accent)]">Calls</span>
        </h2>

        {logs.length === 0 ? (
          <div className="border border-white/10 rounded-lg p-10 text-center text-[var(--color-muted)]">
            No calls yet. Once your AI answers a missed call, it'll appear here.
          </div>
        ) : (
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[var(--color-muted)] text-xs uppercase tracking-widest">
                  <th className="text-left px-4 py-3">Date / Time</th>
                  <th className="text-left px-4 py-3">Caller</th>
                  <th className="text-left px-4 py-3">Duration</th>
                  <th className="text-left px-4 py-3">Summary</th>
                  <th className="text-left px-4 py-3">Recording</th>
                  <th className="text-left px-4 py-3">SMS Sent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={log.id}
                    className={`border-b border-white/5 ${i % 2 !== 0 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="px-4 py-3 text-[var(--color-muted)] whitespace-nowrap">
                      {log.created_at ? new Date(log.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {log.caller_number_anonymised
                        ? <span className="text-[var(--color-muted)]">Anonymised</span>
                        : (log.caller_number ?? '—')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {log.duration_seconds != null
                        ? `${Math.floor(log.duration_seconds / 60)}m ${log.duration_seconds % 60}s`
                        : '—'}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <SummaryCell summary={log.summary} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {log.recording_url
                        ? <a href={log.recording_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline text-xs font-medium">▶ Play</a>
                        : <span className="text-[var(--color-muted)]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {log.notification_sent
                        ? <span className="text-[var(--color-accent)] font-bold">✓</span>
                        : <span className="text-[var(--color-muted)]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalCalls > 20 && (
              <p className="px-4 py-3 text-xs text-[var(--color-muted)] border-t border-white/5">
                Showing most recent 20 of {totalCalls} calls
              </p>
            )}
          </div>
        )}
      </div>

    </main>
  )
}
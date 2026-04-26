import type { Metadata } from 'next'
import { MissedCallCalculator } from './Calculator'

export const metadata: Metadata = {
  title: 'Missed Call Revenue Calculator — How Much Are You Losing? | MissedCallAI',
  description:
    'Free calculator for UK tradespeople. See exactly how much revenue you lose each year from missed calls. Works for plumbers, electricians, builders and more.',
  alternates: {
    canonical: 'https://missedcallai.co.uk/tools/missed-call-calculator',
  },
  openGraph: {
    title: 'How Much Are Missed Calls Costing You? (Free Calculator)',
    description:
      'Enter your trade and average job value to see the real annual cost of unanswered calls.',
    url: 'https://missedcallai.co.uk/tools/missed-call-calculator',
    siteName: 'MissedCallAI',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function Page() {
  return <MissedCallCalculator />
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MissedCall AI — Never Miss a Job Again',
  description: 'AI answers your missed calls and texts you the details. Built for UK tradespeople.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
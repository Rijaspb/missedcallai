import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'MissedCall AI — Never Miss a Job Again | UK Tradespeople',
  description: 'AI answers your missed calls and texts you the details instantly. Built for UK plumbers, electricians, and tradespeople. 14-day free trial.',
  keywords: 'missed call ai, ai answering service, tradespeople, plumbers, electricians, UK, Glasgow',
  openGraph: {
    title: 'MissedCall AI — Never Miss a Job Again',
    description: 'AI answers your missed calls and texts you the details instantly. Built for UK tradespeople.',
    url: 'https://missedcallai.co.uk',
    siteName: 'MissedCall AI',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MissedCall AI — Never Miss a Job Again',
    description: 'AI answers your missed calls and texts you the details instantly.',
  },
  alternates: {
    canonical: 'https://missedcallai.co.uk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'MissedCall AI',
              description: 'AI missed call answering service for UK tradespeople',
              url: 'https://missedcallai.co.uk',
              applicationCategory: 'BusinessApplication',
              offers: {
                '@type': 'Offer',
                price: '49',
                priceCurrency: 'GBP',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  billingDuration: 'P1M',
                },
              },
              areaServed: {
                '@type': 'Country',
                name: 'United Kingdom',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/landing/Hero'
import { TrustBar } from '@/components/landing/TrustBar'
import { ProblemSolution } from '@/components/landing/ProblemSolution'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Stats } from '@/components/landing/Stats'
import { Pricing } from '@/components/landing/Pricing'
import { Faq } from '@/components/landing/Faq'
import { FinalCta } from '@/components/landing/FinalCta'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
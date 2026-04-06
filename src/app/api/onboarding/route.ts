import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '@/lib/supabase/ssr'
import { z } from 'zod'

const OnboardingSchema = z.object({
  business_name: z.string().min(1),
  owner_name: z.string().min(1),
  email: z.string().email(),
  notification_phone: z.string().min(1),
  services: z.string().min(1),
  terms_accepted: z.boolean().refine(val => val === true),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSSRClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = OnboardingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const { business_name, owner_name, email, notification_phone, services } = parsed.data
    const now = new Date().toISOString()

    const { error } = await supabase
      .from('customers')
      .update({
        business_name,
        owner_name,
        email,
        real_phone: notification_phone,
        services,
        terms_accepted_at: now,
        privacy_policy_accepted_at: now,
        gdpr_consent_given: true,
      })
      .eq('auth_user_id', user.id)

    if (error) {
      console.error('Onboarding save error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Onboarding error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
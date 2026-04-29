import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '@/lib/supabase/ssr'
import { z } from 'zod'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      payment_method_collection: 'if_required',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          auth_user_id: user.id,
        },
      },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`,
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    console.error('Onboarding error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
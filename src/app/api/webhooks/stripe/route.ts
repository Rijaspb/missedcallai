import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import twilio from 'twilio'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendWelcomeEmail, sendOwnerNotification } from '@/lib/resend/welcome'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

async function buyUKTwilioNumber(): Promise<string> {
  const mobile = await twilioClient.availablePhoneNumbers('GB')
    .mobile.list({ voiceEnabled: true, limit: 5 })

  if (!mobile.length) throw new Error('No UK mobile numbers available')

  const purchased = await twilioClient.incomingPhoneNumbers.create({
    phoneNumber: mobile[0].phoneNumber,
    addressSid: process.env.TWILIO_ADDRESS_SID!,
    bundleSid: process.env.TWILIO_BUNDLE_SID!,
  })
  return purchased.phoneNumber
}

async function importNumberToVapi(twilioNumber: string, businessName: string, services: string): Promise<string> {
  const res = await fetch('https://api.vapi.ai/phone-number', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VAPI_API_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: 'twilio',
      number: twilioNumber,
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID!,
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN!,
      assistantId: process.env.VAPI_ASSISTANT_ID!,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Vapi import failed: ${err}`)
  }

  const data = await res.json()
  return data.id
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (!session.subscription) {
    console.error('No subscription in session')
    return
  }

  const subscriptionId = session.subscription as string

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const authUserId = subscription.metadata?.auth_user_id

  if (!authUserId) {
    console.error('No auth_user_id in metadata')
    return
  }

  const { data: customer, error } = await supabaseAdmin
    .from('customers')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single()

  if (error || !customer) {
    console.error('No customer found for auth_user_id:', authUserId)
    return
  }

  const twilioNumber = await buyUKTwilioNumber()

  const vapiPhoneNumberId = await importNumberToVapi(
    twilioNumber,
    customer.business_name ?? 'this business',
    customer.services ?? 'general trade services'
    )

  const trialEnd = subscription.trial_end
    ? new Date(subscription.trial_end * 1000).toISOString()
    : null

  await supabaseAdmin
    .from('customers')
    .update({
      twilio_number: twilioNumber,
      vapi_assistant_id: vapiPhoneNumberId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      subscription_status: 'trial',
      trial_ends_at: trialEnd,
      active: true,
    })
    .eq('auth_user_id', authUserId)

    // Send welcome email (best-effort)
  try {
    await sendWelcomeEmail({
      email: customer.email,
      businessName: customer.business_name ?? 'your business',
      ownerName: customer.owner_name ?? 'there',
      twilioNumber,
      trialEndsAt: trialEnd,
    })
  } catch (err) {
    console.error('Welcome email failed (non-fatal):', err)
  }

  try {
    await sendOwnerNotification({
      businessName: customer.business_name ?? 'Unknown',
      ownerName: customer.owner_name ?? 'Unknown',
      email: customer.email ?? 'Unknown',
      phone: customer.real_phone ?? 'Unknown',
      twilioNumber,
    })
  } catch (err) {
    console.error('Owner notification failed (non-fatal):', err)
  }

  console.log('Provisioned customer:', authUserId, twilioNumber)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await supabaseAdmin
    .from('customers')
    .update({ active: false, subscription_status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id)

  console.log('Subscription cancelled:', subscription.id)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  await supabaseAdmin
    .from('customers')
    .update({ active: false, subscription_status: 'payment_failed' })
    .eq('stripe_customer_id', invoice.customer as string)

  console.log('Payment failed for customer:', invoice.customer)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
      default:
        break
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
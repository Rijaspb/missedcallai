import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendLeadSMS } from '@/lib/twilio/sms'
import { sendLeadWhatsApp } from '@/lib/twilio/whatsapp'

const VapiPayloadSchema = z.object({
  message: z.object({
    type: z.string(),
    summary: z.string().optional(),
    durationSeconds: z.number().optional(),
    recordingUrl: z.string().optional(),
    customer: z.object({
      number: z.string().optional(),
    }).optional(),
    phoneNumber: z.object({
      number: z.string(),
    }).optional(),
    call: z.object({
      id: z.string(),
    }).optional(),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body?.message?.type !== 'end-of-call-report') {
      return NextResponse.json({ received: true })
    }

    const parsed = VapiPayloadSchema.safeParse(body)
    if (!parsed.success) {
      console.error('Invalid Vapi payload:', parsed.error)
      return NextResponse.json({ received: true })
    }

    const { message } = parsed.data
    const callerNumber = message.customer?.number ?? 'Unknown'
    const twilioNumberCalled = message.phoneNumber?.number
    const summary = message.summary ?? 'No summary provided'
    const duration = message.durationSeconds ?? 0
    const recordingUrl = message.recordingUrl ?? null
    const vapiCallId = message.call?.id

    if (!twilioNumberCalled || !vapiCallId) {
      console.error('Missing required fields in payload')
      return NextResponse.json({ received: true })
    }

    const { data: customer, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('twilio_number', twilioNumberCalled)
      .eq('active', true)
      .single()

    if (error || !customer) {
      console.error('No customer found for number:', twilioNumberCalled)
      return NextResponse.json({ received: true })
    }

    await supabaseAdmin.from('call_logs').insert({
      customer_id: customer.id,
      caller_number: callerNumber,
      summary,
      duration_seconds: Math.round(duration),
      recording_url: recordingUrl,
      vapi_call_id: vapiCallId,
      notification_channel: customer.notification_channel,
    })

    const notificationMessage = [
      `🔔 Missed Call — ${customer.business_name}`,
      `From: ${callerNumber}`,
      ``,
      summary,
      ``,
      `— MissedCallAI`
    ].join('\n')

    if (customer.notification_channel === 'whatsapp') {
      await sendLeadWhatsApp(customer.real_phone, notificationMessage)
    } else {
      await sendLeadSMS(customer.real_phone, notificationMessage)
    }

    await supabaseAdmin
      .from('call_logs')
      .update({ notification_sent: true })
      .eq('vapi_call_id', vapiCallId)

    console.log('Success — SMS sent to:', customer.real_phone)
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ received: true })
  }
}
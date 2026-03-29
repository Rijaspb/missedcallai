import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

// Schema

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .trim(),
  phone: z
    .string()
    .max(25, 'Phone number too long')
    .trim()
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z.string().email({ message: 'Please enter a valid email address' })
    ),
  topic: z.enum(['trial', 'setup', 'support', 'partnership', 'general'], {
    message: 'Please select a topic',
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message too long')
    .trim(),
})

type ContactPayload = z.infer<typeof ContactSchema>

// Supabase (service role — bypasses RLS, never exposed to client)

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

// Rate limit: max 3 submissions from same email in last 60 minutes
// Done in the DB layer — no external dependency needed

async function isRateLimited(email: string): Promise<boolean> {
  try {
    const supabase = getSupabase()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count, error } = await supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if (error) return false 
    return (count ?? 0) >= 3
  } catch {
    return false
  }
}

// Email via Resend (soft dependency — form still works without RESEND_API_KEY)

const TOPIC_LABELS: Record<string, string> = {
  trial: 'Free trial / Pricing',
  setup: 'Setting up call forwarding',
  support: 'Technical support',
  partnership: 'Partnership / Press',
  general: 'General enquiry',
}

async function sendNotificationEmail(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not set — skipping email notification')
    return
  }

  const topicLabel = TOPIC_LABELS[data.topic] ?? data.topic

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">New contact form submission</h2>
      <p style="color: #666; margin-top: 0; font-size: 14px;">MissedCall AI — missedcallai.co.uk</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 100px; vertical-align: top;">Name</td>
          <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${escapeHtml(data.email)}" style="color: #F97316;">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td>
          <td style="padding: 8px 0;">${data.phone ? escapeHtml(data.phone) : '<span style="color:#aaa">Not provided</span>'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Topic</td>
          <td style="padding: 8px 0;">${escapeHtml(topicLabel)}</td>
        </tr>
      </table>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

      <p style="font-size: 13px; color: #666; margin-bottom: 8px;">Message</p>
      <p style="background: #f5f5f5; padding: 16px; border-radius: 6px; margin: 0; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${escapeHtml(data.message)}</p>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
      <p style="font-size: 12px; color: #aaa;">Submitted at ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} (London time)</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MissedCall AI <noreply@missedcallai.co.uk>',
      to: ['rijas@missedcallai.co.uk'],
      reply_to: data.email,
      subject: `[MissedCall AI] ${topicLabel} — ${data.name}`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error ${res.status}: ${body}`)
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Handler

export async function POST(req: NextRequest) {
  // Parse JSON safely
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }

  // Validate
  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return NextResponse.json(
      { success: false, error: firstIssue?.message ?? 'Validation failed' },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Rate limit
  const limited = await isRateLimited(data.email)
  if (limited) {
    return NextResponse.json(
      { success: false, error: "You've sent a few messages recently — please wait an hour before trying again." },
      { status: 429 }
    )
  }

  // Save to Supabase
  const supabase = getSupabase()
  const { error: dbError } = await supabase.from('contact_submissions').insert({
    name: data.name,
    phone: data.phone || null,
    email: data.email,
    topic: data.topic,
    message: data.message,
  })

  if (dbError) {
    console.error('[contact] Supabase insert error:', dbError)
    return NextResponse.json(
      { success: false, error: 'Failed to save your message. Please try again.' },
      { status: 500 }
    )
  }

  // Send email (best-effort — DB is source of truth)
  try {
    await sendNotificationEmail(data)
  } catch (emailErr) {
    console.error('[contact] Email notification failed (non-fatal):', emailErr)
  }

  return NextResponse.json({ success: true })
}
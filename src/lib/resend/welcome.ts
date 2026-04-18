import 'server-only'

export async function sendWelcomeEmail({
  email,
  businessName,
  ownerName,
  twilioNumber,
  trialEndsAt,
}: {
  email: string
  businessName: string
  ownerName: string
  twilioNumber: string
  trialEndsAt: string | null
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[welcome] RESEND_API_KEY not set — skipping welcome email')
    return
  }

  const trialEnd = trialEndsAt
    ? new Date(trialEndsAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '14 days from today'

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">You're live, ${ownerName}! 🎉</h2>
      <p style="color: #666; margin-top: 0; font-size: 14px;">MissedCallAI — missedcallai.co.uk</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

      <p style="font-size: 15px; line-height: 1.6;">
        Your MissedCallAI account for <strong>${businessName}</strong> is ready. 
        Here's everything you need to get set up.
      </p>

      <div style="background: #0D0D0D; border: 1px solid #333; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="color: #888; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Your MissedCallAI number</p>
        <p style="color: #F97316; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: 0.05em;">${twilioNumber}</p>
      </div>

      <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 16px;">
        Set up call forwarding
      </h3>

      <table style="width: 100%; font-size: 14px; line-height: 1.6; border-collapse: collapse;">
        ${[
          'Open your phone settings',
          'Find "Call Forwarding" or "Diverts"',
          'Select "Forward when unanswered"',
          `Enter your MissedCallAI number: <strong>${twilioNumber}</strong>`,
          'Save — then test by calling your number and not answering',
        ].map((step, i) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #F97316; font-weight: 900; vertical-align: top; width: 24px;">${i + 1}</td>
            <td style="padding: 8px 0; color: #444;">${step}</td>
          </tr>
        `).join('')}
      </table>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

      <p style="font-size: 13px; color: #888;">
        Your free trial runs until <strong style="color: #1a1a1a;">${trialEnd}</strong>. 
        No charge until then — and you can cancel anytime.
      </p>

      <p style="font-size: 13px; color: #888;">
        Any questions? Just reply to this email or message me on WhatsApp — I reply fast.
      </p>

      <p style="font-size: 14px; margin-top: 24px;">
        — Rijas<br/>
        <span style="color: #888; font-size: 13px;">Founder, MissedCallAI</span>
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Rijas at MissedCallAI <noreply@missedcallai.co.uk>',
      to: [email],
      reply_to: 'rijas@missedcallai.co.uk',
      subject: `You're live — here's your MissedCallAI number`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`[welcome] Resend error ${res.status}: ${body}`)
  }
}

export async function sendOwnerNotification({
  businessName,
  ownerName,
  email,
  phone,
  twilioNumber,
}: {
  businessName: string
  ownerName: string
  email: string
  phone: string
  twilioNumber: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MissedCallAI <noreply@missedcallai.co.uk>',
      to: ['rijas@missedcallai.co.uk'],
      subject: `🎉 New customer — ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #1a1a1a;">
          <h2>New customer signed up!</h2>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Business</td>
              <td style="padding: 8px 0; font-weight: 600;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Owner</td>
              <td style="padding: 8px 0;">${ownerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Phone</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Twilio number</td>
              <td style="padding: 8px 0; color: #F97316; font-weight: 600;">${twilioNumber}</td>
            </tr>
          </table>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`[owner notification] Resend error ${res.status}: ${body}`)
  }
}
// /api/vapi/patch-number/route.ts
import 'server-only'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://api.vapi.ai/phone-number/4f34dd76-7e1b-4830-a397-5fecf3ce4618', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assistantId: null,
      serverUrl: 'https://missedcallai.co.uk/api/vapi/assistant',
    }),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
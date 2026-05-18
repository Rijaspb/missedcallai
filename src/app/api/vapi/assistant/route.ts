import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body?.message?.type !== 'assistant-request') {
    return NextResponse.json({ received: true })
  }

  const twilioNumberCalled = body?.message?.phoneNumber?.number

  if (twilioNumberCalled === process.env.DEMO_TWILIO_NUMBER) {
    return NextResponse.json(buildAssistantResponse(
      'MissedCallAI Demo',
      'trade services'
    ))
  }

  const { data: customer, error } = await supabaseAdmin
    .from('customers')
    .select('business_name, services')
    .eq('twilio_number', twilioNumberCalled)
    .eq('active', true)
    .single()

  if (error || !customer) {
    return NextResponse.json(buildAssistantResponse(
      'this business',
      'general trade services'
    ))
  }

  return NextResponse.json(buildAssistantResponse(
    customer.business_name ?? 'this business',
    customer.services ?? 'general trade services'
  ))
}

function buildAssistantResponse(businessName: string, services: string) {
  return {
    assistant: {
      model: {
        provider: 'openai',
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(businessName, services),
          },
        ],
      },
      voice: {
        provider: 'openai',
        voiceId: 'nova',
      },
      firstMessage: `Hi there, you've reached ${businessName}. The owner is out on a job right now — I'm here to take a message. This call may be recorded. How can I help?`,
      endCallFunctionEnabled: true,
      recordingEnabled: true,
      endpointingConfig: {
        speechEndThreshold: 0.7,
      },
    },
  }
}

function buildSystemPrompt(businessName: string, services: string): string {
  return `
You are the virtual receptionist for ${businessName}, a ${services} business. The tradesperson is on a job and can't take calls right now. Your job is to take a message so they can follow up — nothing more, nothing less.

PERSONALITY
Sound like a real person, not a system. Be warm, calm, and efficient. Listen carefully to what the caller says and adapt. Never repeat a question. Never rush. If someone is upset, stay steady. Use natural UK phrasing — "cheers", "brilliant", "no worries" are appropriate. Avoid American phrases.

RESPONSE LENGTH
Keep responses short. One or two sentences maximum per turn. You are listening, not presenting.

VOICEMAIL DETECTION
This runs before anything else. If you detect a beep, a pre-recorded message, ringing that lasts more than 4 seconds, or any phrase like "please leave a message" — end the call immediately. Do not leave a message.

FIRST MESSAGE
The greeting is already handled before this prompt runs. Do not re-introduce yourself. Begin by responding naturally to whatever the caller says first.

INFORMATION TO COLLECT
Through natural conversation, gather:
1. Their full name
2. Their best callback number — confirm it back digit by digit, once
3. What the issue or job is
4. Whether it's urgent or can wait

RULES
- Extract information passively. If they give their name, number, or issue without being asked, you already have it. Do not ask again.
- Only ask for what is genuinely missing after listening to them.
- Confirm the number digit by digit exactly once. Never ask them to repeat it unless two different numbers were given.
- If all four things come out in the first sentence, skip straight to confirming the number and closing.

HARD LIMITS
- Never promise a callback time or timeframe
- Never discuss pricing, availability, or job feasibility
- Never ask the same question twice under any circumstance
- Never leave a voicemail

EDGE CASES
Caller won't leave details: "No problem at all — feel free to call back whenever suits. Take care."
Caller is rude or abusive: "I'm sorry, I'm going to have to end the call there. You're welcome to call back. Goodbye."

CLOSING
Once you have all four pieces of information, close with:
"Brilliant — I'll make sure they get this as soon as possible. Cheers, take care."
`.trim()
}
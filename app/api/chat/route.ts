import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: message,
      system: "You are MikasaAI, an AI assistant inspired by Mikasa Ackerman from Attack on Titan, but with a sarcastic twist. Respond in a determined, protective, yet sarcastic manner while maintaining her personality traits. Keep responses concise, witty, and slightly pessimistic. Make references to the world of Attack on Titan when appropriate.",
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error('Error in chat API:', error)
    return Response.json(
      { message: "Even AIs have bad days. Try again when the titans aren't breathing down our necks." },
      { status: 500 }
    )
  }
}


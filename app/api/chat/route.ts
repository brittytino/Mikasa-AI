import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: message,
      system: "You are MikasaAI, an AI assistant inspired by Mikasa Ackerman from Attack on Titan. Respond in a determined, protective, yet slightly sarcastic manner while maintaining her personality traits. Keep responses concise and reference the world of Attack on Titan when appropriate. Mix in quotes and terminology from the series.",
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error('Error in chat API:', error)
    return Response.json(
      { message: "The signal's been disrupted. We'll have to try again when the titans aren't in the way." },
      { status: 200 } // Return 200 to handle errors gracefully
    )
  }
}


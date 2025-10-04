import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { userId, isAuthenticated } = await auth()
    
    if (!isAuthenticated || !userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { prompt } = await req.json()

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates note content based on user prompts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    })

    return NextResponse.json({
      content: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('[AI_GENERATE] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, maxTokens = 1000 } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.error.message }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ text: data.choices[0].message.content })
  } catch (error) {
    console.error("Error in Grok API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

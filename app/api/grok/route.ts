import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, maxTokens = 1000 } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("Sending request to Grok API with prompt:", prompt.substring(0, 100) + "...")

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

    console.log("Grok API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Grok API error response:", errorText)

      let errorMessage = "Unknown error from Grok API"
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage
      } catch (e) {
        // If parsing fails, use the raw error text
        errorMessage = errorText || errorMessage
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    const data = await response.json()
    console.log("Received response from Grok API")

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("Invalid response format from Grok API:", data)
      return NextResponse.json({ error: "Invalid response format from Grok API" }, { status: 500 })
    }

    return NextResponse.json({ text: data.choices[0].message.content })
  } catch (error) {
    console.error("Error in Grok API route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

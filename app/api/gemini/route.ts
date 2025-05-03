import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, maxTokens = 1024, model = "gemini-pro" } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY environment variable is not set" }, { status: 500 })
    }

    console.log("Sending request to Gemini API with prompt:", prompt.substring(0, 100) + "...")

    // Corrected API URL format based on Google's documentation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
          },
        }),
      },
    )

    console.log("Gemini API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error response:", errorText)

      let errorMessage = "Unknown error from Gemini API"
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
    console.log("Received response from Gemini API")

    // Extract text from Gemini response format
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Invalid response format from Gemini API:", data)
      return NextResponse.json({ error: "Invalid response format from Gemini API" }, { status: 500 })
    }

    return NextResponse.json({ text: data.candidates[0].content.parts[0].text })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

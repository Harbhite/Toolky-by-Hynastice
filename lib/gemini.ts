export function getGeminiApiKey(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("gemini-api-key")
}

export function getGeminiModel(): string {
  if (typeof window === "undefined") return "gemini-pro"
  return localStorage.getItem("gemini-model") || "gemini-pro"
}

export async function callGeminiApi(prompt: string, maxTokens = 1024): Promise<string> {
  const apiKey = getGeminiApiKey()
  const model = getGeminiModel()

  if (!apiKey) {
    throw new Error("Gemini API key not found. Please add your API key in the settings.")
  }

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

  if (!response.ok) {
    const errorText = await response.text()
    let errorMessage = "Unknown error from Gemini API"
    try {
      const errorJson = JSON.parse(errorText)
      errorMessage = errorJson.error?.message || errorJson.message || errorMessage
    } catch (e) {
      errorMessage = errorText || errorMessage
    }
    throw new Error(errorMessage)
  }

  const data = await response.json()

  if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
    throw new Error("Invalid response format from Gemini API")
  }

  return data.candidates[0].content.parts[0].text
}

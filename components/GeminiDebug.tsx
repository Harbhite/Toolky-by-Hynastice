"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { getGeminiApiKey } from "@/lib/gemini"

export default function GeminiDebug() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [availableModels, setAvailableModels] = useState<string[]>([])

  const testConnection = async () => {
    setLoading(true)
    setResult(null)
    setError(null)
    setAvailableModels([])

    try {
      const apiKey = getGeminiApiKey()

      if (!apiKey) {
        setError("No API key found. Please add your Google Gemini API key in settings.")
        setLoading(false)
        return
      }

      // First, try to list available models
      try {
        const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (modelsResponse.ok) {
          const modelsData = await modelsResponse.json()
          if (modelsData.models && Array.isArray(modelsData.models)) {
            const modelNames = modelsData.models.map((model: any) => model.name).filter(Boolean)
            setAvailableModels(modelNames)
            console.log("Available models:", modelNames)
          }
        }
      } catch (modelError) {
        console.error("Error fetching models:", modelError)
      }

      // Test the API with a simple prompt
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
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
                    text: "Say hello and confirm that the API connection is working.",
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 100,
              temperature: 0.7,
              topP: 0.95,
              topK: 40,
            },
          }),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error (${response.status}): ${errorText}`)
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini API")
      }

      setResult(data.candidates[0].content.parts[0].text)
    } catch (err) {
      console.error("API test error:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-300 rounded-lg shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Gemini API Connection Test</h2>

      <Button
        onClick={testConnection}
        disabled={loading}
        className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Test API Connection
      </Button>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded">
          <h3 className="font-bold mb-2">Error:</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-60">{error}</pre>
        </div>
      )}

      {availableModels.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2 dark:text-white">Available Models:</h3>
          <ul className="list-disc list-inside text-sm dark:text-white">
            {availableModels.map((model, index) => (
              <li key={index}>{model}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="mb-4">
          <h3 className="font-bold mb-2 dark:text-white">API Response:</h3>
          <Textarea
            value={result}
            readOnly
            rows={4}
            className="w-full border-2 border-black dark:border-gray-300 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>If you're experiencing issues:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>Verify your API key is correct</li>
          <li>Ensure you have access to the Gemini API</li>
          <li>Check if your API key has the necessary permissions</li>
          <li>Make sure you're using a supported browser</li>
          <li>The API version should be v1 (not v1beta)</li>
        </ol>
      </div>
    </div>
  )
}

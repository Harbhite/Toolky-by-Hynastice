"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateImage = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError("")
    setImageUrl(null)

    try {
      // First, enhance the prompt using Grok
      const enhanceResponse = await fetch("/api/grok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `I want to generate an image with the following description: "${prompt}".
          Please enhance this prompt to make it more detailed and suitable for an image generation AI.
          Add details about lighting, perspective, style, mood, and composition.
          Make it ${style} style.
          Keep your response under 100 words and focus only on the enhanced prompt.`,
          maxTokens: 300,
        }),
      })

      if (!enhanceResponse.ok) {
        throw new Error("Failed to enhance prompt")
      }

      const enhanceData = await enhanceResponse.json()
      const enhancedPrompt = enhanceData.text

      // Now use the enhanced prompt with the image generation API
      const imageResponse = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
        }),
      })

      if (!imageResponse.ok) {
        throw new Error("Failed to generate image")
      }

      const imageData = await imageResponse.json()

      // Poll for the image until it's ready
      if (imageData.id) {
        let attempts = 0
        const maxAttempts = 30
        const pollInterval = setInterval(async () => {
          attempts++
          if (attempts > maxAttempts) {
            clearInterval(pollInterval)
            setError("Image generation timed out. Please try again.")
            setLoading(false)
            return
          }

          const statusResponse = await fetch(`/api/check-image-status?id=${imageData.id}`)
          if (!statusResponse.ok) {
            clearInterval(pollInterval)
            setError("Failed to check image status")
            setLoading(false)
            return
          }

          const statusData = await statusResponse.json()

          if (statusData.status === "succeeded") {
            clearInterval(pollInterval)
            setImageUrl(statusData.output?.[0] || null)
            setLoading(false)
          } else if (statusData.status === "failed") {
            clearInterval(pollInterval)
            setError("Image generation failed. Please try again.")
            setLoading(false)
          }
        }, 2000)
      }
    } catch (err) {
      console.error("Error generating image:", err)
      setError("Failed to generate image. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-blue-200 dark:bg-blue-900 border-4 border-black dark:border-blue-300 shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-2xl font-bold dark:text-white">AI Image Generator</h2>
      <div className="space-y-2">
        <Label htmlFor="prompt" className="dark:text-white">
          Image Description
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border-2 border-black dark:border-blue-300 dark:bg-gray-700 dark:text-white"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="style" className="dark:text-white">
          Image Style
        </Label>
        <Select onValueChange={setStyle} defaultValue={style}>
          <SelectTrigger className="border-2 border-black dark:border-blue-300 dark:bg-gray-700 dark:text-white">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realistic">Realistic</SelectItem>
            <SelectItem value="cartoon">Cartoon</SelectItem>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="digital art">Digital Art</SelectItem>
            <SelectItem value="oil painting">Oil Painting</SelectItem>
            <SelectItem value="watercolor">Watercolor</SelectItem>
            <SelectItem value="sketch">Sketch</SelectItem>
            <SelectItem value="3D render">3D Render</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Generate Image
      </Button>

      {error && <div className="p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded">{error}</div>}

      {loading && (
        <div className="p-4 flex justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-300 mx-auto mb-2" />
            <p className="dark:text-white">Generating your image... This may take up to a minute.</p>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-blue-300 shadow-brutal dark:shadow-brutal-dark">
          <h3 className="text-xl font-bold mb-2 dark:text-white">Generated Image</h3>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-black dark:border-blue-300">
            <img src={imageUrl || "/placeholder.svg"} alt="AI generated image" className="w-full h-full object-cover" />
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              onClick={() => window.open(imageUrl, "_blank")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 border-b-2 border-green-700 hover:border-green-800 active:border-t-2 active:border-b-0 transition-all duration-100"
            >
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function ResearchPaperOutlineGenerator() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [outline, setOutline] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateOutline = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setError("")
    setOutline(null)

    try {
      console.log("Sending request to Grok API...")
      const response = await fetch("/api/grok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a detailed research paper outline for the following topic: "${topic}".
        ${keywords ? `Include these keywords or concepts: ${keywords}.` : ""}
        The outline should include:
        1. Introduction with background information and thesis statement
        2. Literature Review section
        3. Methodology section
        4. Results section
        5. Discussion section
        6. Conclusion
        7. References section
        
        Format the outline with Roman numerals for main sections (I, II, III), capital letters for subsections (A, B, C), 
        and numbers for points under subsections (1, 2, 3).
        Make it detailed enough for a college-level research paper.`,
          maxTokens: 1000,
        }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("API error response:", errorData)
        throw new Error(`API returned ${response.status}: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      console.log("Received data from API")

      if (!data.text) {
        console.error("Invalid response format:", data)
        throw new Error("Invalid response format from API")
      }

      setOutline(data.text)
    } catch (err) {
      console.error("Error generating outline:", err)
      setError(`Failed to generate outline: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-green-200 dark:bg-green-900 border-4 border-black dark:border-green-300 shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-2xl font-bold dark:text-white">Research Paper Outline Generator</h2>
      <div className="space-y-2">
        <Label htmlFor="topic" className="dark:text-white">
          Research Topic
        </Label>
        <Input
          id="topic"
          placeholder="Enter your research topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border-2 border-black dark:border-green-300"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="keywords" className="dark:text-white">
          Keywords (comma-separated)
        </Label>
        <Input
          id="keywords"
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border-2 border-black dark:border-green-300"
        />
      </div>
      <Button
        onClick={generateOutline}
        disabled={loading || !topic.trim()}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Generate Outline
      </Button>

      {error && <div className="p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded">{error}</div>}

      {loading && (
        <div className="p-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-300" />
        </div>
      )}

      {outline && (
        <div className="p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-green-300 shadow-brutal dark:shadow-brutal-dark">
          <h3 className="text-xl font-bold mb-2 dark:text-white">Generated Outline</h3>
          <Textarea
            value={outline}
            readOnly
            rows={20}
            className="w-full font-mono text-sm border-2 border-black dark:border-green-300 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}
    </div>
  )
}

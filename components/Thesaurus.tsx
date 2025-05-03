"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { callGeminiApi, getGeminiApiKey } from "@/lib/gemini"
import GeminiApiKeyForm from "./GeminiApiKeyForm"

export default function Thesaurus() {
  const [word, setWord] = useState("")
  const [synonyms, setSynonyms] = useState<string[]>([])
  const [antonyms, setAntonyms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const findSynonymsAndAntonyms = async () => {
    if (!word.trim()) return

    setLoading(true)
    setError("")
    setSynonyms([])
    setAntonyms([])

    try {
      const apiKey = getGeminiApiKey()

      if (!apiKey) {
        setError("Please add your Google Gemini API key first")
        setLoading(false)
        return
      }

      const prompt = `I need synonyms and antonyms for the word "${word}". 
      Please provide exactly 10 synonyms and 5 antonyms if possible.
      Format your response as a JSON object with two arrays: "synonyms" and "antonyms".
      Example: {"synonyms": ["word1", "word2", ...], "antonyms": ["word1", "word2", ...]}`

      const result = await callGeminiApi(prompt, 500)

      try {
        // Parse the JSON from the AI response
        const parsedData = JSON.parse(result)
        setSynonyms(parsedData.synonyms || [])
        setAntonyms(parsedData.antonyms || [])
      } catch (parseError) {
        // If parsing fails, try to extract words using regex
        const synonymMatches = result.match(/synonyms"?\s*:?\s*\[([^\]]+)\]/i)
        const antonymMatches = result.match(/antonyms"?\s*:?\s*\[([^\]]+)\]/i)

        if (synonymMatches && synonymMatches[1]) {
          setSynonyms(synonymMatches[1].split(/,\s*/).map((w) => w.replace(/"/g, "").trim()))
        }

        if (antonymMatches && antonymMatches[1]) {
          setAntonyms(antonymMatches[1].split(/,\s*/).map((w) => w.replace(/"/g, "").trim()))
        }
      }
    } catch (err) {
      console.error("Error fetching synonyms and antonyms:", err)
      setError(`Failed to fetch synonyms and antonyms: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const apiKey = typeof window !== "undefined" ? localStorage.getItem("gemini-api-key") : null

  if (!apiKey) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 bg-purple-200 dark:bg-purple-900 border-4 border-black dark:border-purple-300 shadow-brutal dark:shadow-brutal-dark">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Thesaurus</h2>
        <p className="mb-4 dark:text-white">To use the Thesaurus, you need to add your Google Gemini API key.</p>
        <GeminiApiKeyForm />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-purple-200 dark:bg-purple-900 border-4 border-black dark:border-purple-300 shadow-brutal dark:shadow-brutal-dark">
      <div className="mb-4">
        <Label htmlFor="word" className="text-lg font-bold dark:text-white">
          Enter a word:
        </Label>
        <div className="flex mt-2 gap-2">
          <Input
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full border-2 border-black dark:border-purple-300 shadow-brutal dark:shadow-brutal-dark"
            placeholder="Type a word..."
            onKeyDown={(e) => e.key === "Enter" && findSynonymsAndAntonyms()}
          />
          <Button
            onClick={findSynonymsAndAntonyms}
            disabled={loading}
            className="w-32 h-12 text-xl font-bold border-2 border-black dark:border-purple-300 bg-blue-400 hover:bg-blue-500 text-black shadow-brutal dark:shadow-brutal-dark transform hover:rotate-1 transition-all duration-100"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find"}
          </Button>
        </div>
      </div>

      {error && <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {synonyms.length > 0 && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-purple-300 shadow-brutal dark:shadow-brutal-dark">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Synonyms:</h3>
            <ul className="list-disc pl-5 dark:text-white">
              {synonyms.map((synonym, index) => (
                <li key={index} className="mb-1">
                  {synonym}
                </li>
              ))}
            </ul>
          </div>
        )}

        {antonyms.length > 0 && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-purple-300 shadow-brutal dark:shadow-brutal-dark">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Antonyms:</h3>
            <ul className="list-disc pl-5 dark:text-white">
              {antonyms.map((antonym, index) => (
                <li key={index} className="mb-1">
                  {antonym}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-4 p-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-300" />
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const mockThesaurus: { [key: string]: string[] } = {
  "happy": ["joyful", "elated", "delighted", "cheerful", "jubilant"],
  "sad": ["melancholy", "gloomy", "depressed", "sorrowful", "downcast"],
  "big": ["large", "enormous", "gigantic", "colossal", "massive"],
  "small": ["tiny", "miniature", "petite", "diminutive", "little"],
}

export default function Thesaurus() {
  const [word, setWord] = useState('')
  const [synonyms, setSynonyms] = useState<string[]>([])

  const findSynonyms = () => {
    const results = mockThesaurus[word.toLowerCase()] || []
    setSynonyms(results)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-purple-200 border-4 border-black shadow-brutal">
      <div className="mb-4">
        <Label htmlFor="word" className="text-lg font-bold">Enter a word:</Label>
        <Input
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full mt-2 border-2 border-black shadow-brutal"
          placeholder="Type a word..."
        />
      </div>
      <Button
        onClick={findSynonyms}
        className="w-full h-12 text-xl font-bold border-2 border-black bg-blue-400 hover:bg-blue-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
      >
        Find Synonyms
      </Button>
      {synonyms.length > 0 && (
        <div className="mt-4 p-4 bg-white border-2 border-black shadow-brutal">
          <h3 className="text-xl font-bold mb-2">Synonyms:</h3>
          <ul className="list-disc pl-5">
            {synonyms.map((synonym, index) => (
              <li key={index} className="mb-1">{synonym}</li>
            ))}
          </ul>
        </div>
      )}
      {synonyms.length === 0 && word && (
        <div className="mt-4 p-4 bg-white border-2 border-black shadow-brutal">
          <p>No synonyms found for "{word}".</p>
        </div>
      )}
    </div>
  )
}


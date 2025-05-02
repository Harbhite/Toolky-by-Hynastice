"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function WordCounter() {
  const [text, setText] = useState("")

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const charCount = text.length

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Word Counter</h2>
      <div className="space-y-2">
        <Label htmlFor="text">Enter your text:</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Type or paste your text here..."
        />
      </div>
      <div className="space-y-2">
        <p>Word count: {wordCount}</p>
        <p>Character count: {charCount}</p>
      </div>
    </div>
  )
}

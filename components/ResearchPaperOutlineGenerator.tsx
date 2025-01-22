"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ResearchPaperOutlineGenerator() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [outline, setOutline] = useState<string | null>(null)

  const generateOutline = () => {
    const outlineStructure = `
I. Introduction
   A. Background information on ${topic}
   B. Thesis statement

II. Literature Review
    A. Current state of research on ${topic}
    B. Key theories and concepts related to ${keywords}

III. Methodology
     A. Research design
     B. Data collection methods
     C. Data analysis techniques

IV. Results
    A. Presentation of findings
    B. Analysis of data

V. Discussion
   A. Interpretation of results
   B. Comparison with existing literature
   C. Implications of the findings

VI. Conclusion
    A. Summary of key points
    B. Limitations of the study
    C. Suggestions for future research

VII. References
`
    setOutline(outlineStructure)
  }

  return (
    <div className="space-y-4 p-4 bg-green-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold">Research Paper Outline Generator</h2>
      <div className="space-y-2">
        <Label htmlFor="topic">Research Topic</Label>
        <Input
          id="topic"
          placeholder="Enter your research topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <Button onClick={generateOutline} className="w-full">Generate Outline</Button>
      {outline && (
        <div className="p-4 bg-white border-2 border-black shadow-brutal">
          <h3 className="text-xl font-bold mb-2">Generated Outline</h3>
          <Textarea
            value={outline}
            readOnly
            rows={20}
            className="w-full font-mono text-sm"
          />
        </div>
      )}
    </div>
  )
}


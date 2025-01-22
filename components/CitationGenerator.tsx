"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CitationGenerator() {
  const [citation, setCitation] = useState({
    authors: "",
    title: "",
    year: "",
    source: "",
    url: "",
  })
  const [citationStyle, setCitationStyle] = useState("apa")
  const [generatedCitation, setGeneratedCitation] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCitation({ ...citation, [name]: value })
  }

  const generateCitation = () => {
    let result = ""
    switch (citationStyle) {
      case "apa":
        result = `${citation.authors}. (${citation.year}). ${citation.title}. ${citation.source}. ${citation.url}`
        break
      case "mla":
        result = `${citation.authors}. "${citation.title}." ${citation.source}, ${citation.year}, ${citation.url}.`
        break
      case "chicago":
        result = `${citation.authors}. "${citation.title}." ${citation.source} (${citation.year}). ${citation.url}.`
        break
    }
    setGeneratedCitation(result)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Citation Generator</h2>
      <div className="space-y-2">
        <Label htmlFor="authors">Authors</Label>
        <Input
          id="authors"
          name="authors"
          value={citation.authors}
          onChange={handleInputChange}
          placeholder="e.g. Smith, J., & Doe, A."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={citation.title}
          onChange={handleInputChange}
          placeholder="Title of the work"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          name="year"
          value={citation.year}
          onChange={handleInputChange}
          placeholder="Publication year"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="source">Source</Label>
        <Input
          id="source"
          name="source"
          value={citation.source}
          onChange={handleInputChange}
          placeholder="Journal, Website, etc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={citation.url}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="citationStyle">Citation Style</Label>
        <Select onValueChange={(value) => setCitationStyle(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select citation style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apa">APA</SelectItem>
            <SelectItem value="mla">MLA</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={generateCitation}>Generate Citation</Button>
      {generatedCitation && (
        <div className="space-y-2">
          <Label htmlFor="generatedCitation">Generated Citation</Label>
          <Textarea
            id="generatedCitation"
            value={generatedCitation}
            readOnly
            rows={4}
          />
        </div>
      )}
    </div>
  )
}


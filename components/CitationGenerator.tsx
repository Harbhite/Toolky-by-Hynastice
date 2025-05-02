"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const citationStyles = [
  { value: "apa", label: "APA (American Psychological Association)" },
  { value: "mla", label: "MLA (Modern Language Association)" },
  { value: "chicago", label: "Chicago/Turabian" },
  { value: "harvard", label: "Harvard" },
  { value: "ieee", label: "IEEE" },
  { value: "ama", label: "AMA (American Medical Association)" },
  { value: "asa", label: "ASA (American Sociological Association)" },
  { value: "bluebook", label: "Bluebook" },
  { value: "oscola", label: "OSCOLA (Oxford Standard for Citation of Legal Authorities)" },
  { value: "vancouver", label: "Vancouver" },
  { value: "apa-7", label: "APA 7th Edition" },
  { value: "mla-9", label: "MLA 9th Edition" },
  { value: "chicago-notes", label: "Chicago Notes and Bibliography" },
  { value: "chicago-author-date", label: "Chicago Author-Date" },
  { value: "harvard-anglia", label: "Harvard - Anglia Ruskin University" },
  { value: "harvard-uwe", label: "Harvard - UWE Bristol" },
  { value: "apa-6", label: "APA 6th Edition" },
  { value: "mla-8", label: "MLA 8th Edition" },
  { value: "acs", label: "ACS (American Chemical Society)" },
  { value: "cse", label: "CSE (Council of Science Editors)" },
  { value: "nlm", label: "NLM (National Library of Medicine)" },
  { value: "aaa", label: "AAA (American Anthropological Association)" },
  { value: "apsa", label: "APSA (American Political Science Association)" },
  { value: "apa-legal", label: "APA Legal" },
  { value: "uni-ibadan", label: "University of Ibadan" },
  { value: "acm", label: "ACM (Association for Computing Machinery)" },
  { value: "apa-psychology", label: "APA for Psychology" },
  { value: "biomed", label: "BioMed Central" },
]

const fieldsByStyle: { [key: string]: string[] } = {
  apa: ["authors", "year", "title", "source", "url", "doi"],
  mla: ["authors", "title", "source", "year", "url"],
  chicago: ["authors", "title", "source", "year", "url"],
  harvard: ["authors", "year", "title", "source", "url", "accessDate"],
  ieee: ["authors", "title", "source", "volume", "issue", "pages", "year"],
  oscola: ["authors", "title", "publisher", "year"],
  "uni-ibadan": ["authors", "year", "title", "source", "volume", "issue", "pages", "doi"],
  // Add more styles and their required fields here
}

export default function CitationGenerator() {
  const [citationStyle, setCitationStyle] = useState("apa")
  const [citation, setCitation] = useState<{ [key: string]: string }>({})
  const [generatedCitation, setGeneratedCitation] = useState("")

  useEffect(() => {
    // Reset citation data when style changes
    setCitation({})
  }, [citationStyle])

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
      case "harvard":
        result = `${citation.authors} (${citation.year}). ${citation.title}. ${citation.source}. Available at: ${citation.url} (Accessed: ${citation.accessDate}).`
        break
      case "ieee":
        result = `${citation.authors}, "${citation.title}," ${citation.source}, vol. ${citation.volume}, no. ${citation.issue}, pp. ${citation.pages}, ${citation.year}.`
        break
      case "oscola":
        result = `${citation.authors}, ${citation.title} (${citation.publisher} ${citation.year}).`
        break
      case "uni-ibadan":
        result = `${citation.authors} (${citation.year}). ${citation.title}. ${citation.source}, ${citation.volume}(${citation.issue}), ${citation.pages}. https://doi.org/${citation.doi}`
        break
      // Add more citation style generators here
      default:
        result = "Selected citation style is not implemented yet."
    }
    setGeneratedCitation(result)
  }

  return (
    <div className="space-y-4 p-4 bg-yellow-100 dark:bg-gray-800 border-4 border-black dark:border-gray-300 shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-2xl font-bold text-black dark:text-white">Citation Generator</h2>

      <div className="space-y-2">
        <Label htmlFor="citationStyle" className="text-black dark:text-white">
          Citation Style
        </Label>
        <Select onValueChange={(value) => setCitationStyle(value)} value={citationStyle}>
          <SelectTrigger className="border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-black dark:text-white">
            <SelectValue placeholder="Select citation style" />
          </SelectTrigger>
          <SelectContent>
            {citationStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {fieldsByStyle[citationStyle]?.map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field} className="text-black dark:text-white capitalize">
            {field.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <Input
            id={field}
            name={field}
            value={citation[field] || ""}
            onChange={handleInputChange}
            placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
            className="border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>
      ))}

      <Button
        onClick={generateCitation}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
      >
        Generate Citation
      </Button>

      {generatedCitation && (
        <div className="space-y-2">
          <Label htmlFor="generatedCitation" className="text-black dark:text-white">
            Generated Citation
          </Label>
          <Textarea
            id="generatedCitation"
            value={generatedCitation}
            readOnly
            rows={4}
            className="w-full border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </div>
      )}
    </div>
  )
}

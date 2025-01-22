"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
]

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quote Generator</h2>
      <Card>
        <CardContent className="p-6">
          <blockquote className="text-lg italic">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-right mt-2">- {currentQuote.author}</p>
        </CardContent>
      </Card>
      <Button onClick={generateQuote}>Generate New Quote</Button>
    </div>
  )
}


"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
}

export default function WhatsAppBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your Student Tools WhatsApp Bot. How can I help you today?", isUser: false },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message
      const userMessage = { text: input, isUser: true }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        // Get AI response
        const response = await fetch("/api/grok", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `You are a helpful student assistant bot. Respond to the following message in a friendly, concise way. 
            Focus on providing academic help and study tips. Keep your response under 150 words.
            
            User message: "${input}"
            
            Previous conversation context:
            ${messages
              .slice(-5)
              .map((m) => `${m.isUser ? "User" : "Bot"}: ${m.text}`)
              .join("\n")}`,
            maxTokens: 500,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response")
        }

        const data = await response.json()

        // Add bot response
        setMessages((prev) => [...prev, { text: data.text, isUser: false }])
      } catch (error) {
        console.error("Error getting bot response:", error)
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I'm having trouble connecting right now. Please try again later.",
            isUser: false,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border-4 border-black dark:border-green-300 bg-green-200 dark:bg-green-900 shadow-brutal dark:shadow-brutal-dark">
      <div className="bg-green-500 dark:bg-green-700 p-4 border-b-4 border-black dark:border-green-300">
        <h2 className="text-2xl font-bold text-white">Student Tools WhatsApp Bot</h2>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700 border-2 border-black dark:border-green-300 dark:text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 text-left">
            <div className="inline-block p-2 rounded-lg bg-white dark:bg-gray-700 border-2 border-black dark:border-green-300">
              <Loader2 className="h-5 w-5 animate-spin text-green-500 dark:text-green-300" />
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t-4 border-black dark:border-green-300 bg-gray-100 dark:bg-gray-800">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-grow border-2 border-black dark:border-green-300 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-800 active:border-t-4 active:border-b-0 transition-all duration-100"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}

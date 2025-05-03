"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GeminiApiKeyForm() {
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("gemini-pro")
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini-api-key")
    if (savedKey) {
      setApiKey(savedKey)
      setStatus("success")
      setMessage("API key loaded from browser storage")
    }

    const savedModel = localStorage.getItem("gemini-model")
    if (savedModel) {
      setModel(savedModel)
    }
  }, [])

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setStatus("error")
      setMessage("Please enter a valid API key")
      return
    }

    setStatus("saving")
    setMessage("Saving API key...")

    try {
      localStorage.setItem("gemini-api-key", apiKey)
      localStorage.setItem("gemini-model", model)
      setStatus("success")
      setMessage("API key and model saved successfully")
    } catch (error) {
      console.error("Error saving API key:", error)
      setStatus("error")
      setMessage("Failed to save API key")
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-300 rounded-lg shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Google Gemini API Key</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key" className="dark:text-white">
            Enter your Google Gemini API Key
          </Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="border-2 border-black dark:border-gray-300"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your API key is stored locally in your browser and is never sent to our servers.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model" className="dark:text-white">
            Gemini Model
          </Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="border-2 border-black dark:border-gray-300">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-pro">gemini-pro</SelectItem>
              <SelectItem value="gemini-1.0-pro">gemini-1.0-pro</SelectItem>
              <SelectItem value="gemini-1.5-pro">gemini-1.5-pro</SelectItem>
              <SelectItem value="gemini-1.5-flash">gemini-1.5-flash</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select the Gemini model you want to use. Different models have different capabilities.
          </p>
        </div>

        <Button
          onClick={saveApiKey}
          disabled={status === "saving"}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
        >
          {status === "saving" ? "Saving..." : "Save Settings"}
        </Button>
        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

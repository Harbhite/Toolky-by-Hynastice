"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AIImageGenerator() {
  return (
    <div className="space-y-4 p-4 bg-blue-200 dark:bg-blue-900 border-4 border-black dark:border-blue-300 shadow-brutal dark:shadow-brutal-dark">
      <h2 className="text-2xl font-bold dark:text-white">AI Image Generator</h2>
      <p className="mb-4 dark:text-white">The AI Image Generator feature has been temporarily disabled.</p>
      <Link href="/">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Return to Home</Button>
      </Link>
    </div>
  )
}

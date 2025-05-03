import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AIImageGeneratorPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>
      <div className="p-8 bg-yellow-100 dark:bg-gray-800 border-4 border-black dark:border-yellow-300 rounded-lg shadow-brutal dark:shadow-brutal-dark">
        <p className="text-lg mb-4">The AI Image Generator feature has been temporarily disabled.</p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}

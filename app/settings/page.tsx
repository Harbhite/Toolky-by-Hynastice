import GeminiApiKeyForm from "@/components/GeminiApiKeyForm"
import GeminiDebug from "@/components/GeminiDebug"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="max-w-md mx-auto space-y-6">
        <GeminiApiKeyForm />
        <GeminiDebug />
      </div>
    </div>
  )
}

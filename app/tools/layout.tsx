import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <Button variant="outline" className="mb-4">
          Back to Tools
        </Button>
      </Link>
      {children}
    </div>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

// Make sure the tools array doesn't include the AI Image Generator
// Remove the AI Image Generator from the tools array if it's still there
const tools = [
  { name: "CGPA Calculator", slug: "cgpa-calculator" },
  { name: "Note Taker", slug: "note-taker" },
  { name: "Study Timer", slug: "study-timer" },
  { name: "To-Do List", slug: "todo-list" },
  { name: "Citation Generator", slug: "citation-generator" },
  { name: "Word Counter", slug: "word-counter" },
  { name: "Pomodoro Timer", slug: "pomodoro-timer" },
  { name: "Quote Generator", slug: "quote-generator" },
  { name: "Unit Converter", slug: "unit-converter" },
  { name: "Study Scheduler", slug: "study-scheduler" },
  { name: "Student Info Lookup", slug: "student-info-lookup" },
  { name: "Exam Countdown", slug: "exam-countdown" },
  { name: "Mini Games", slug: "mini-games" },
  { name: "Study Planner", slug: "study-planner" },
  { name: "Calculator", slug: "calculator" },
  { name: "Color Code Generator", slug: "color-code-generator" },
  { name: "Thesaurus", slug: "thesaurus" },
  { name: "Equation Solver", slug: "equation-solver" },
  { name: "Periodic Table", slug: "periodic-table" },
  { name: "Molecular Weight Calculator", slug: "molecular-weight-calculator" },
  { name: "Demography Formulas", slug: "demography-formulas" },
  { name: "Research Paper Outline Generator", slug: "research-paper-outline-generator" },
  { name: "WhatsApp Bot", slug: "whatsapp-bot" },
]

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex justify-end mb-4">
        <Link href="/settings">
          <Button
            variant="outline"
            className="border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 text-black dark:text-white shadow-brutal dark:shadow-brutal-dark"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 flex-grow">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Button
              variant="outline"
              className="w-full h-24 text-xl font-bold border-4 border-black dark:border-white bg-white dark:bg-gray-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 text-black dark:text-white shadow-brutal dark:shadow-brutal-dark transform hover:rotate-1 transition-all duration-100 active:translate-y-1 active:shadow-none"
            >
              {tool.name}
            </Button>
          </Link>
        ))}
      </div>
      <footer className="mt-auto py-4 text-center">
        <p className="text-xl font-bold">Made with ❤️ by Hynastice</p>
      </footer>
    </main>
  )
}

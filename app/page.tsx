import Link from 'next/link'
import { Button } from "@/components/ui/button"

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
]

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-5xl font-bold mb-6 text-center bg-blue-500 text-white p-4 border-4 border-black shadow-brutal">Student Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 flex-grow">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Button variant="outline" className="w-full h-24 text-xl font-bold border-4 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100 active:translate-y-1 active:shadow-none">
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


import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { DarkModeToggle } from "@/components/DarkModeToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Student Tools",
  description: "A collection of useful tools for students",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-yellow-100 dark:bg-gray-900 text-black dark:text-white min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen p-4">
            <header className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Student Tools</h1>
              <DarkModeToggle />
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

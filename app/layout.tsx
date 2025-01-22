import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Tools',
  description: 'A collection of useful tools for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-yellow-100 text-black`}>
        <div className="min-h-screen p-4">
          {children}
        </div>
      </body>
    </html>
  )
}


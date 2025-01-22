"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const elements = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2 },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5 },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6 },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7 },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8 },
  // Add more elements as needed
]

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<typeof elements[0] | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold mb-4">Periodic Table of Elements</h2>
      <div className="grid grid-cols-8 gap-2 mb-4">
        {elements.map((element) => (
          <Button
            key={element.symbol}
            onClick={() => setSelectedElement(element)}
            className="h-16 text-xl font-bold border-2 border-black bg-white hover:bg-blue-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {element.symbol}
          </Button>
        ))}
      </div>
      {selectedElement && (
        <div className="p-4 bg-white border-2 border-black shadow-brutal">
          <h3 className="text-xl font-bold mb-2">{selectedElement.name}</h3>
          <p>Symbol: {selectedElement.symbol}</p>
          <p>Atomic Number: {selectedElement.atomicNumber}</p>
        </div>
      )}
    </div>
  )
}


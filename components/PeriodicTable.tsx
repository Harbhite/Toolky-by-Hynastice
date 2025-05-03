"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const elements = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, group: 1, period: 1 },
  { symbol: "He", name: "Helium", atomicNumber: 2, group: 18, period: 1 },
  { symbol: "Li", name: "Lithium", atomicNumber: 3, group: 1, period: 2 },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4, group: 2, period: 2 },
  { symbol: "B", name: "Boron", atomicNumber: 5, group: 13, period: 2 },
  { symbol: "C", name: "Carbon", atomicNumber: 6, group: 14, period: 2 },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, group: 15, period: 2 },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, group: 16, period: 2 },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, group: 17, period: 2 },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, group: 18, period: 2 },
  // Add more elements as needed
]

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<(typeof elements)[0] | null>(null)

  const renderElement = (element: (typeof elements)[0]) => (
    <Button
      key={element.symbol}
      onClick={() => setSelectedElement(element)}
      className={`h-16 w-16 text-xs font-bold border-2 border-black bg-white hover:bg-blue-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100`}
      style={{
        gridColumn: element.group,
        gridRow: element.period,
      }}
    >
      <div>{element.symbol}</div>
      <div>{element.atomicNumber}</div>
    </Button>
  )

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold mb-4">Periodic Table of Elements</h2>
      <div className="grid grid-cols-18 gap-1 mb-4" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
        {elements.map(renderElement)}
      </div>
      {selectedElement && (
        <div className="p-4 bg-white border-2 border-black shadow-brutal">
          <h3 className="text-xl font-bold mb-2">{selectedElement.name}</h3>
          <p>Symbol: {selectedElement.symbol}</p>
          <p>Atomic Number: {selectedElement.atomicNumber}</p>
          <p>Group: {selectedElement.group}</p>
          <p>Period: {selectedElement.period}</p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0')
  const [currentOperation, setCurrentOperation] = useState<string | null>(null)
  const [previousValue, setPreviousValue] = useState<number | null>(null)

  const handleNumberClick = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num)
  }

  const handleOperationClick = (operation: string) => {
    setCurrentOperation(operation)
    setPreviousValue(parseFloat(display))
    setDisplay('0')
  }

  const handleEquals = () => {
    if (currentOperation && previousValue !== null) {
      const current = parseFloat(display)
      let result: number
      switch (currentOperation) {
        case '+':
          result = previousValue + current
          break
        case '-':
          result = previousValue - current
          break
        case '*':
          result = previousValue * current
          break
        case '/':
          result = previousValue / current
          break
        default:
          return
      }
      setDisplay(result.toString())
      setCurrentOperation(null)
      setPreviousValue(null)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentOperation(null)
    setPreviousValue(null)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <div className="mb-4 p-2 bg-white border-2 border-black text-right text-2xl font-bold">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((btn) => (
          <Button
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? handleOperationClick(btn) : handleNumberClick(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <Button
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? handleOperationClick(btn) : handleNumberClick(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <Button
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? handleOperationClick(btn) : handleNumberClick(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        <Button
          onClick={() => handleNumberClick('0')}
          className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          0
        </Button>
        <Button
          onClick={() => handleNumberClick('.')}
          className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="h-12 text-xl font-bold border-2 border-black bg-blue-500 hover:bg-blue-600 text-white shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          =
        </Button>
        <Button
          onClick={() => handleOperationClick('+')}
          className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          +
        </Button>
        <Button
          onClick={handleClear}
          className="h-12 text-xl font-bold border-2 border-black bg-red-500 hover:bg-red-600 text-white shadow-brutal transform hover:rotate-1 transition-all duration-100 col-span-4"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}


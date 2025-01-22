"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function ScientificCalculator() {
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
        case '^':
          result = Math.pow(previousValue, current)
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

  const handleScientificOperation = (operation: string) => {
    const current = parseFloat(display)
    let result: number
    switch (operation) {
      case 'sin':
        result = Math.sin(current)
        break
      case 'cos':
        result = Math.cos(current)
        break
      case 'tan':
        result = Math.tan(current)
        break
      case 'log':
        result = Math.log10(current)
        break
      case 'ln':
        result = Math.log(current)
        break
      case 'sqrt':
        result = Math.sqrt(current)
        break
      default:
        return
    }
    setDisplay(result.toString())
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-purple-200 border-4 border-black shadow-brutal">
      <div className="mb-4 p-2 bg-white border-2 border-black text-right text-2xl font-bold">
        {display}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {['sin', 'cos', 'tan', 'log', 'ln'].map((btn) => (
          <Button
            key={btn}
            onClick={() => handleScientificOperation(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-green-400 hover:bg-green-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        {['7', '8', '9', '/', 'sqrt'].map((btn) => (
          <Button
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? (btn === 'sqrt' ? handleScientificOperation(btn) : handleOperationClick(btn)) : handleNumberClick(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '*', '^'].map((btn) => (
          <Button
            key={btn}
            onClick={() => isNaN(parseInt(btn)) ? handleOperationClick(btn) : handleNumberClick(btn)}
            className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-', 'π'].map((btn) => (
          <Button
            key={btn}
            onClick={() => btn === 'π' ? handleNumberClick(Math.PI.toString()) : (isNaN(parseInt(btn)) ? handleOperationClick(btn) : handleNumberClick(btn))}
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
          onClick={() => handleNumberClick(Math.E.toString())}
          className="h-12 text-xl font-bold border-2 border-black bg-white hover:bg-yellow-300 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          e
        </Button>
        <Button
          onClick={handleClear}
          className="h-12 text-xl font-bold border-2 border-black bg-red-500 hover:bg-red-600 text-white shadow-brutal transform hover:rotate-1 transition-all duration-100 col-span-5"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}


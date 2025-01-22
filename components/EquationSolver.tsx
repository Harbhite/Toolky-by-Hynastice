"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { evaluate } from 'mathjs'

export default function EquationSolver() {
  const [equation, setEquation] = useState('')
  const [solution, setSolution] = useState('')

  const solveEquation = () => {
    try {
      const result = evaluate(equation)
      setSolution(`Solution: ${result}`)
    } catch (error) {
      setSolution('Invalid equation. Please check your input.')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-blue-200 border-4 border-black shadow-brutal">
      <div className="mb-4">
        <Label htmlFor="equation" className="text-lg font-bold">Enter an equation:</Label>
        <Input
          id="equation"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="w-full mt-2 border-2 border-black shadow-brutal"
          placeholder="e.g., 2x + 5 = 15"
        />
      </div>
      <Button
        onClick={solveEquation}
        className="w-full h-12 text-xl font-bold border-2 border-black bg-green-400 hover:bg-green-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
      >
        Solve Equation
      </Button>
      {solution && (
        <div className="mt-4 p-4 bg-white border-2 border-black shadow-brutal">
          <p className="text-xl font-bold">{solution}</p>
        </div>
      )}
    </div>
  )
}


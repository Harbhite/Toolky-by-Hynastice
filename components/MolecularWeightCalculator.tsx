"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const atomicWeights: { [key: string]: number } = {
  H: 1.008,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Na: 22.990,
  Mg: 24.305,
  P: 30.974,
  S: 32.065,
  Cl: 35.453,
  K: 39.098,
  Ca: 40.078,
  // Add more elements as needed
}

export default function MolecularWeightCalculator() {
  const [formula, setFormula] = useState('')
  const [molecularWeight, setMolecularWeight] = useState(0)

  const calculateMolecularWeight = () => {
    const elementRegex = /([A-Z][a-z]?)(\d*)/g
    let totalWeight = 0
    let match

    while ((match = elementRegex.exec(formula)) !== null) {
      const [, element, count] = match
      const weight = atomicWeights[element] || 0
      const quantity = count ? parseInt(count) : 1
      totalWeight += weight * quantity
    }

    setMolecularWeight(parseFloat(totalWeight.toFixed(3)))
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-green-200 border-4 border-black shadow-brutal">
      <div className="mb-4">
        <Label htmlFor="formula" className="text-lg font-bold">Enter molecular formula:</Label>
        <Input
          id="formula"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className="w-full mt-2 border-2 border-black shadow-brutal"
          placeholder="e.g., H2O, C6H12O6"
        />
      </div>
      <Button
        onClick={calculateMolecularWeight}
        className="w-full h-12 text-xl font-bold border-2 border-black bg-blue-400 hover:bg-blue-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
      >
        Calculate Molecular Weight
      </Button>
      {molecularWeight > 0 && (
        <div className="mt-4 p-4 bg-white border-2 border-black shadow-brutal">
          <p className="text-xl font-bold">Molecular Weight: {molecularWeight} g/mol</p>
        </div>
      )}
    </div>
  )
}


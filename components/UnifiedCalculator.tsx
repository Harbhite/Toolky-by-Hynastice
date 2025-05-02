"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BasicCalculator from './BasicCalculator'
import ScientificCalculator from './ScientificCalculator'
import GraphingCalculator from './GraphingCalculator'
import StatisticalPowerCalculator from './StatisticalPowerCalculator'
import EffectSizeCalculator from './EffectSizeCalculator'
import ConfidenceIntervalCalculator from './ConfidenceIntervalCalculator'
import PValueCalculator from './PValueCalculator'
import ANOVACalculator from './ANOVACalculator'

const calculatorTypes = [
  { value: 'basic', label: 'Basic Calculator' },
  { value: 'scientific', label: 'Scientific Calculator' },
  { value: 'graphing', label: 'Graphing Calculator' },
  { value: 'statistical-power', label: 'Statistical Power Calculator' },
  { value: 'effect-size', label: 'Effect Size Calculator' },
  { value: 'confidence-interval', label: 'Confidence Interval Calculator' },
  { value: 'p-value', label: 'P-value Calculator' },
  { value: 'anova', label: 'ANOVA Calculator' },
]

export default function UnifiedCalculator() {
  const [calculatorType, setCalculatorType] = useState('basic')

  const renderCalculator = () => {
    switch (calculatorType) {
      case 'basic':
        return <BasicCalculator />
      case 'scientific':
        return <ScientificCalculator />
      case 'graphing':
        return <GraphingCalculator />
      case 'statistical-power':
        return <StatisticalPowerCalculator />
      case 'effect-size':
        return <EffectSizeCalculator />
      case 'confidence-interval':
        return <ConfidenceIntervalCalculator />
      case 'p-value':
        return <PValueCalculator />
      case 'anova':
        return <ANOVACalculator />
      default:
        return <BasicCalculator />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <div className="mb-4">
        <Select onValueChange={setCalculatorType} value={calculatorType}>
          <SelectTrigger className="w-full border-2 border-black shadow-brutal">
            <SelectValue placeholder="Select calculator type" />
          </SelectTrigger>
          <SelectContent>
            {calculatorTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {renderCalculator()}
    </div>
  )
}

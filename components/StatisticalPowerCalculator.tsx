"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StatisticalPowerCalculator() {
  const [alpha, setAlpha] = useState('0.05')
  const [effectSize, setEffectSize] = useState('0.5')
  const [sampleSize, setSampleSize] = useState('100')
  const [power, setPower] = useState('')

  const calculatePower = () => {
    // This is a simplified calculation and not accurate for all scenarios
    const z = Math.abs(Number(effectSize)) * Math.sqrt(Number(sampleSize))
    const calculatedPower = 1 - normalCDF(-z + 1.96)
    setPower(calculatedPower.toFixed(4))
  }

  // Helper function for normal cumulative distribution
  const normalCDF = (x: number) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x))
    const d = 0.3989423 * Math.exp(-x * x / 2)
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    if (x > 0) prob = 1 - prob
    return prob
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="alpha">Significance Level (α)</Label>
        <Input id="alpha" value={alpha} onChange={(e) => setAlpha(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="effectSize">Effect Size</Label>
        <Input id="effectSize" value={effectSize} onChange={(e) => setEffectSize(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sampleSize">Sample Size</Label>
        <Input id="sampleSize" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} />
      </div>
      <Button onClick={calculatePower}>Calculate Power</Button>
      {power && (
        <div>
          <Label>Statistical Power</Label>
          <Input value={power} readOnly />
        </div>
      )}
    </div>
  )
}


"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EffectSizeCalculator() {
  const [mean1, setMean1] = useState('')
  const [mean2, setMean2] = useState('')
  const [sd1, setSd1] = useState('')
  const [sd2, setSd2] = useState('')
  const [effectSize, setEffectSize] = useState('')

  const calculateEffectSize = () => {
    const m1 = parseFloat(mean1)
    const m2 = parseFloat(mean2)
    const s1 = parseFloat(sd1)
    const s2 = parseFloat(sd2)

    if (isNaN(m1) || isNaN(m2) || isNaN(s1) || isNaN(s2)) {
      setEffectSize('Invalid input')
      return
    }

    const pooledSD = Math.sqrt(((s1 * s1 + s2 * s2) / 2))
    const cohensD = Math.abs(m1 - m2) / pooledSD
    setEffectSize(cohensD.toFixed(4))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mean1">Mean of Group 1</Label>
        <Input id="mean1" value={mean1} onChange={(e) => setMean1(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="mean2">Mean of Group 2</Label>
        <Input id="mean2" value={mean2} onChange={(e) => setMean2(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sd1">Standard Deviation of Group 1</Label>
        <Input id="sd1" value={sd1} onChange={(e) => setSd1(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sd2">Standard Deviation of Group 2</Label>
        <Input id="sd2" value={sd2} onChange={(e) => setSd2(e.target.value)} />
      </div>
      <Button onClick={calculateEffectSize}>Calculate Effect Size</Button>
      {effectSize && (
        <div>
          <Label>Effect Size (Cohen's d)</Label>
          <Input value={effectSize} readOnly />
        </div>
      )}
    </div>
  )
}


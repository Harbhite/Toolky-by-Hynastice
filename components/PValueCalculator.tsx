"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PValueCalculator() {
  const [testType, setTestType] = useState('two-tailed')
  const [statistic, setStatistic] = useState('')
  const [degreesOfFreedom, setDegreesOfFreedom] = useState('')
  const [pValue, setPValue] = useState('')

  const calculatePValue = () => {
    const t = parseFloat(statistic)
    const df = parseFloat(degreesOfFreedom)

    if (isNaN(t) || isNaN(df)) {
      setPValue('Invalid input')
      return
    }

    const twoTailedP = 2 * (1 - studentT(Math.abs(t), df))
    let p
    if (testType === 'two-tailed') {
      p = twoTailedP
    } else if (testType === 'one-tailed-right') {
      p = twoTailedP / 2
    } else { // one-tailed-left
      p = 1 - (twoTailedP / 2)
    }

    setPValue(p.toFixed(4))
  }

  // Helper function for Student's t-distribution
  const studentT = (t: number, df: number) => {
    const a = (df + 1) / 2
    const b = Math.sqrt(df * Math.PI)
    const x = df / (df + t * t)
    let betaFunction = Math.exp(
      gammaLn(a) + 0.5 * Math.log(x) - gammaLn(0.5) - 
      gammaLn(df / 2) - 0.5 * Math.log(Math.PI * df)
    )
    betaFunction *= hypergeometric(a, 0.5, df / 2, x)
    return 1 - betaFunction
  }

  // Helper function for gamma function
  const gammaLn = (x: number) => {
    const c = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ]
    let sum = 1.000000000190015
    for (let i = 0; i < 6; i++) {
      sum += c[i] / (x + i + 1)
    }
    return (Math.log(2.5066282746310005 * sum / x) - 5.5 + x - (x - 0.5) * Math.log(x + 5.5))
  }

  // Helper function for hypergeometric function
  const hypergeometric = (a: number, b: number, c: number, x: number) => {
    let term = 1
    let sum = 1
    for (let n = 1; n < 100; n++) {
      term *= (a + n - 1) * (b + n - 1) * x / ((c + n - 1) * n)
      sum += term
      if (Math.abs(term) < 1e-10) break
    }
    return sum
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="testType">Test Type</Label>
        <Select onValueChange={setTestType} value={testType}>
          <SelectTrigger id="testType">
            <SelectValue placeholder="Select test type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="two-tailed">Two-tailed</SelectItem>
            <SelectItem value="one-tailed-right">One-tailed (right)</SelectItem>
            <SelectItem value="one-tailed-left">One-tailed (left)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="statistic">Test Statistic (t)</Label>
        <Input id="statistic" value={statistic} onChange={(e) => setStatistic(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="degreesOfFreedom">Degrees of Freedom</Label>
        <Input id="degreesOfFreedom" value={degreesOfFreedom} onChange={(e) => setDegreesOfFreedom(e.target.value)} />
      </div>
      <Button onClick={calculatePValue}>Calculate P-Value</Button>
      {pValue && (
        <div>
          <Label>P-Value</Label>
          <Input value={pValue} readOnly />
        </div>
      )}
    </div>
  )
}


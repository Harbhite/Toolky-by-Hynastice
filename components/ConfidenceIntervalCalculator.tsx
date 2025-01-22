"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ConfidenceIntervalCalculator() {
  const [mean, setMean] = useState('')
  const [sd, setSd] = useState('')
  const [sampleSize, setSampleSize] = useState('')
  const [confidenceLevel, setConfidenceLevel] = useState('0.95')
  const [confidenceInterval, setConfidenceInterval] = useState('')

  const calculateConfidenceInterval = () => {
    const m = parseFloat(mean)
    const s = parseFloat(sd)
    const n = parseFloat(sampleSize)
    const cl = parseFloat(confidenceLevel)

    if (isNaN(m) || isNaN(s) || isNaN(n) || isNaN(cl)) {
      setConfidenceInterval('Invalid input')
      return
    }

    const zScore = Math.abs(normalInverse((1 - cl) / 2))
    const marginOfError = zScore * (s / Math.sqrt(n))
    const lowerBound = m - marginOfError
    const upperBound = m + marginOfError

    setConfidenceInterval(`${lowerBound.toFixed(4)} - ${upperBound.toFixed(4)}`)
  }

  // Helper function for inverse of standard normal cumulative distribution
  const normalInverse = (p: number) => {
    const a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969
    const a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924
    const b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887
    const b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03
    const c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373
    const c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03
    const d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742
    const p_low = 0.02425, p_high = 1 - p_low
    let q, r
    if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p))
      return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    } else if (p <= p_high) {
      q = p - 0.5
      r = q * q
      return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p))
      return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mean">Sample Mean</Label>
        <Input id="mean" value={mean} onChange={(e) => setMean(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sd">Sample Standard Deviation</Label>
        <Input id="sd" value={sd} onChange={(e) => setSd(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sampleSize">Sample Size</Label>
        <Input id="sampleSize" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="confidenceLevel">Confidence Level (e.g., 0.95 for 95%)</Label>
        <Input id="confidenceLevel" value={confidenceLevel} onChange={(e) => setConfidenceLevel(e.target.value)} />
      </div>
      <Button onClick={calculateConfidenceInterval}>Calculate Confidence Interval</Button>
      {confidenceInterval && (
        <div>
          <Label>Confidence Interval</Label>
          <Input value={confidenceInterval} readOnly />
        </div>
      )}
    </div>
  )
}


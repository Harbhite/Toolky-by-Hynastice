"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ANOVACalculator() {
  const [groupData, setGroupData] = useState('')
  const [results, setResults] = useState<any>(null)

  const calculateANOVA = () => {
    const groups = groupData.split('\n').map(group => 
      group.split(',').map(Number).filter(n => !isNaN(n))
    ).filter(group => group.length > 0)

    if (groups.length < 2) {
      setResults('Need at least two groups')
      return
    }

    const grandMean = groups.flat().reduce((a, b) => a + b) / groups.flat().length
    const totalSS = groups.flat().reduce((sum, x) => sum + Math.pow(x - grandMean, 2), 0)
    const withinSS = groups.reduce((sum, group) => {
      const groupMean = group.reduce((a, b) => a + b) / group.length
      return sum + group.reduce((s, x) => s + Math.pow(x - groupMean, 2), 0)
    }, 0)
    const betweenSS = totalSS - withinSS

    const dfBetween = groups.length - 1
    const dfWithin = groups.flat().length - groups.length
    const dfTotal = groups.flat().length - 1

    const msBetween = betweenSS / dfBetween
    const msWithin = withinSS / dfWithin

    const fRatio = msBetween / msWithin

    setResults({
      dfBetween,
      dfWithin,
      dfTotal,
      ssBetween: betweenSS.toFixed(4),
      ssWithin: withinSS.toFixed(4),
      ssTotal: totalSS.toFixed(4),
      msBetween: msBetween.toFixed(4),
      msWithin: msWithin.toFixed(4),
      fRatio: fRatio.toFixed(4)
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="groupData">Enter group data (one group per line, comma-separated)</Label>
        <Textarea
          id="groupData"
          value={groupData}
          onChange={(e) => setGroupData(e.target.value)}
          placeholder="Group 1: 1,2,3,4,5
Group 2: 2,3,4,5,6
Group 3: 3,4,5,6,7"
          rows={5}
        />
      </div>
      <Button onClick={calculateANOVA}>Calculate ANOVA</Button>
      {results && (
        <div className="space-y-2">
          <div>
            <Label>Degrees of Freedom (Between)</Label>
            <Input value={results.dfBetween} readOnly />
          </div>
          <div>
            <Label>Degrees of Freedom (Within)</Label>
            <Input value={results.dfWithin} readOnly />
          </div>
          <div>
            <Label>Degrees of Freedom (Total)</Label>
            <Input value={results.dfTotal} readOnly />
          </div>
          <div>
            <Label>Sum of Squares (Between)</Label>
            <Input value={results.ssBetween} readOnly />
          </div>
          <div>
            <Label>Sum of Squares (Within)</Label>
            <Input value={results.ssWithin} readOnly />
          </div>
          <div>
            <Label>Sum of Squares (Total)</Label>
            <Input value={results.ssTotal} readOnly />
          </div>
          <div>
            <Label>Mean Square (Between)</Label>
            <Input value={results.msBetween} readOnly />
          </div>
          <div>
            <Label>Mean Square (Within)</Label>
            <Input value={results.msWithin} readOnly />
          </div>
          <div>
            <Label>F-Ratio</Label>
            <Input value={results.fRatio} readOnly />
          </div>
        </div>
      )}
    </div>
  )
}


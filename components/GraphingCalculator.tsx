"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { evaluate } from 'mathjs'

export default function GraphingCalculator() {
  const [equation, setEquation] = useState('x^2')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-10)
  const [yMax, setYMax] = useState(10)

  const generatePoints = () => {
    const points = []
    for (let x = xMin; x <= xMax; x += 0.1) {
      try {
        const y = evaluate(equation, { x })
        if (y >= yMin && y <= yMax) {
          points.push({ x, y })
        }
      } catch (error) {
        console.error('Error evaluating equation:', error)
      }
    }
    return points
  }

  const points = generatePoints()

  const svgWidth = 400
  const svgHeight = 400

  const xScale = svgWidth / (xMax - xMin)
  const yScale = svgHeight / (yMax - yMin)

  const transformX = (x: number) => (x - xMin) * xScale
  const transformY = (y: number) => svgHeight - (y - yMin) * yScale

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <div className="mb-4 space-y-2">
        <Label htmlFor="equation" className="text-lg font-bold">Equation (in terms of x)</Label>
        <Input
          id="equation"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="border-2 border-black shadow-brutal"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="xMin" className="text-lg font-bold">X Min</Label>
          <Input
            id="xMin"
            type="number"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
            className="border-2 border-black shadow-brutal"
          />
        </div>
        <div>
          <Label htmlFor="xMax" className="text-lg font-bold">X Max</Label>
          <Input
            id="xMax"
            type="number"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
            className="border-2 border-black shadow-brutal"
          />
        </div>
        <div>
          <Label htmlFor="yMin" className="text-lg font-bold">Y Min</Label>
          <Input
            id="yMin"
            type="number"
            value={yMin}
            onChange={(e) => setYMin(Number(e.target.value))}
            className="border-2 border-black shadow-brutal"
          />
        </div>
        <div>
          <Label htmlFor="yMax" className="text-lg font-bold">Y Max</Label>
          <Input
            id="yMax"
            type="number"
            value={yMax}
            onChange={(e) => setYMax(Number(e.target.value))}
            className="border-2 border-black shadow-brutal"
          />
        </div>
      </div>
      <div className="border-4 border-black shadow-brutal bg-white">
        <svg width={svgWidth} height={svgHeight}>
          {/* X and Y axes */}
          <line
            x1={0}
            y1={transformY(0)}
            x2={svgWidth}
            y2={transformY(0)}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={transformX(0)}
            y1={0}
            x2={transformX(0)}
            y2={svgHeight}
            stroke="black"
            strokeWidth="2"
          />
          {/* Graph line */}
          <path
            d={`M ${points.map(p => `${transformX(p.x)},${transformY(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}


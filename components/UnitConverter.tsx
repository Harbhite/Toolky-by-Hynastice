"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const conversions = {
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    mi: 0.000621371,
  },
  mass: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
  },
  volume: {
    l: 1,
    ml: 1000,
    gal: 0.264172,
    qt: 1.05669,
    pt: 2.11338,
    cup: 4.22675,
  },
}

type ConversionType = keyof typeof conversions
type UnitType = keyof (typeof conversions)[ConversionType]

export default function UnitConverter() {
  const [conversionType, setConversionType] = useState<ConversionType>("length")
  const [fromUnit, setFromUnit] = useState<UnitType>("m")
  const [toUnit, setToUnit] = useState<UnitType>("km")
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")

  const convert = () => {
    const from = parseFloat(fromValue)
    if (isNaN(from)) {
      setToValue("")
      return
    }

    const result =
      (from / conversions[conversionType][fromUnit]) *
      conversions[conversionType][toUnit]
    setToValue(result.toFixed(6))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Unit Converter</h2>
      <div className="space-y-2">
        <Label htmlFor="conversionType">Conversion Type</Label>
        <Select
          onValueChange={(value) => setConversionType(value as ConversionType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select conversion type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="length">Length</SelectItem>
            <SelectItem value="mass">Mass</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="fromUnit">From</Label>
          <Select onValueChange={(value) => setFromUnit(value as UnitType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(conversions[conversionType]).map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="fromValue"
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="toUnit">To</Label>
          <Select onValueChange={(value) => setToUnit(value as UnitType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(conversions[conversionType]).map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input id="toValue" type="number" value={toValue} readOnly />
        </div>
      </div>
      <Button onClick={convert}>Convert</Button>
    </div>
  )
}

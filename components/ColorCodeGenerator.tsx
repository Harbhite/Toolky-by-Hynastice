"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface Color {
  hex: string
  rgb: { r: number; g: number; b: number }
}

export default function ColorCodeGenerator() {
  const [colors, setColors] = useState<Color[]>([{ hex: '#000000', rgb: { r: 0, g: 0, b: 0 } }])
  const [palette, setPalette] = useState<Color[]>([])

  const handleColorChange = (index: number, newColor: string) => {
    const updatedColors = [...colors]
    updatedColors[index] = { hex: newColor, rgb: hexToRgb(newColor) }
    setColors(updatedColors)
  }

  const handleRgbChange = (index: number, channel: 'r' | 'g' | 'b', value: string) => {
    const updatedColors = [...colors]
    const newRgb = { ...updatedColors[index].rgb, [channel]: parseInt(value) || 0 }
    updatedColors[index] = { hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b), rgb: newRgb }
    setColors(updatedColors)
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const generateRandomColor = () => {
    return {
      hex: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      rgb: { r: Math.floor(Math.random()*256), g: Math.floor(Math.random()*256), b: Math.floor(Math.random()*256) }
    }
  }

  const generateRandomColors = () => {
    setColors(Array(5).fill(null).map(() => generateRandomColor()))
  }

  const generatePalette = () => {
    const baseColor = generateRandomColor()
    const palette = [
      baseColor,
      { hex: shiftHue(baseColor.hex, 30), rgb: hexToRgb(shiftHue(baseColor.hex, 30)) },
      { hex: shiftHue(baseColor.hex, 60), rgb: hexToRgb(shiftHue(baseColor.hex, 60)) },
      { hex: shiftHue(baseColor.hex, 90), rgb: hexToRgb(shiftHue(baseColor.hex, 90)) },
      { hex: shiftHue(baseColor.hex, 120), rgb: hexToRgb(shiftHue(baseColor.hex, 120)) },
    ]
    setPalette(palette)
  }

  const shiftHue = (hex: string, degree: number) => {
    const rgb = hexToRgb(hex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    hsl.h = (hsl.h + degree) % 360
    const shiftedRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
    return rgbToHex(shiftedRgb.r, shiftedRgb.g, shiftedRgb.b)
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: h * 360, s: s, l: l }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h / 360 + 1/3)
      g = hue2rgb(p, q, h / 360)
      b = hue2rgb(p, q, h / 360 - 1/3)
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${text} has been copied to clipboard.`,
      })
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
  }

  const copyPalette = () => {
    const paletteText = palette.map(color => color.hex).join(', ')
    copyToClipboard(paletteText)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-blue-200 border-4 border-black shadow-brutal">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {colors.map((color, index) => (
          <div key={index} className="space-y-2">
            <div 
              className="w-full h-24 border-4 border-black shadow-brutal cursor-pointer" 
              style={{ backgroundColor: color.hex }}
              onClick={() => copyToClipboard(color.hex)}
            ></div>
            <Input
              type="color"
              value={color.hex}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-full h-12 border-2 border-black shadow-brutal"
            />
            <div className="grid grid-cols-3 gap-1">
              {['r', 'g', 'b'].map((channel) => (
                <Input
                  key={channel}
                  type="number"
                  min="0"
                  max="255"
                  value={color.rgb[channel as 'r' | 'g' | 'b']}
                  onChange={(e) => handleRgbChange(index, channel as 'r' | 'g' | 'b', e.target.value)}
                  className="w-full border-2 border-black shadow-brutal"
                />
              ))}
            </div>
            <Button
              onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)}
              className="w-full h-8 text-sm font-bold border-2 border-black bg-green-400 hover:bg-green-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
            >
              Copy RGB
            </Button>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Button
          onClick={generateRandomColors}
          className="w-full h-12 text-xl font-bold border-2 border-black bg-green-400 hover:bg-green-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          Generate 5 Random Colors
        </Button>
        <Button
          onClick={generatePalette}
          className="w-full h-12 text-xl font-bold border-2 border-black bg-purple-400 hover:bg-purple-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
        >
          Generate Color Palette
        </Button>
      </div>
      {palette.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Generated Palette</h3>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {palette.map((color, index) => (
              <div 
                key={index} 
                className="h-24 border-4 border-black shadow-brutal cursor-pointer" 
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
              ></div>
            ))}
          </div>
          <Button
            onClick={copyPalette}
            className="w-full h-12 text-xl font-bold border-2 border-black bg-yellow-400 hover:bg-yellow-500 text-black shadow-brutal transform hover:rotate-1 transition-all duration-100"
          >
            Copy Palette
          </Button>
        </div>
      )}
    </div>
  )
}


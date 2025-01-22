"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"

export default function RelaxationGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
        addBubble()
      }, 1000)
    } else if (timeLeft === 0) {
      setIsPlaying(false)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      bubbles.forEach((bubble) => {
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(0, 123, 255, 0.5)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(0, 123, 255, 1)'
        ctx.stroke()
      })
    }
  }, [bubbles])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setIsPlaying(true)
    setBubbles([])
  }

  const addBubble = () => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * (canvasRef.current?.width || 300),
      y: Math.random() * (canvasRef.current?.height || 200),
      size: Math.random() * 20 + 10,
    }
    setBubbles((prev) => [...prev, newBubble])
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return

    const canvas = canvasRef.current
    const rect = canvas?.getBoundingClientRect()
    const x = event.clientX - (rect?.left || 0)
    const y = event.clientY - (rect?.top || 0)

    const clickedBubble = bubbles.find((bubble) => {
      const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2)
      return distance <= bubble.size
    })

    if (clickedBubble) {
      setScore((prev) => prev + 1)
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== clickedBubble.id))
    }
  }

  return (
    <div className="space-y-4 p-4 bg-green-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold">Relaxation Game: Pop the Bubbles</h2>
      <p className="text-lg">Score: {score} | Time Left: {timeLeft}s</p>
      {!isPlaying && (
        <Button 
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
        >
          Start Game
        </Button>
      )}
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        onClick={handleCanvasClick}
        className="w-full h-64 bg-white border-4 border-black cursor-pointer"
      />
    </div>
  )
}


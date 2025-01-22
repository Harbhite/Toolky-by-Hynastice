"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudyTimer() {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [inputTime, setInputTime] = useState("25")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      alert("Study time is over!")
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(parseInt(inputTime) * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Study Timer</h2>
      <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="studyTime">Set study time (minutes):</Label>
        <Input
          id="studyTime"
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="w-20"
        />
        <Button onClick={() => setTime(parseInt(inputTime) * 60)}>Set</Button>
      </div>
    </div>
  )
}


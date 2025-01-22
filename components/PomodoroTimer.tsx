"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(interval!)
          setIsActive(false)
          if (isWork) {
            setMinutes(breakTime)
            setIsWork(false)
          } else {
            setMinutes(workTime)
            setIsWork(true)
          }
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!)
    }

    return () => clearInterval(interval!)
  }, [isActive, minutes, seconds, isWork, workTime, breakTime])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(isWork ? workTime : breakTime)
    setSeconds(0)
  }

  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setWorkTime(value)
    if (isWork) setMinutes(value)
  }

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setBreakTime(value)
    if (!isWork) setMinutes(value)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
      <div className="text-4xl font-bold text-center">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </div>
      <div className="flex justify-center space-x-2">
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="workTime">Work Time (minutes):</Label>
        <Input
          id="workTime"
          type="number"
          value={workTime}
          onChange={handleWorkTimeChange}
          className="w-20"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="breakTime">Break Time (minutes):</Label>
        <Input
          id="breakTime"
          type="number"
          value={breakTime}
          onChange={handleBreakTimeChange}
          className="w-20"
        />
      </div>
      <p className="text-center font-semibold">
        {isWork ? "Work Time" : "Break Time"}
      </p>
    </div>
  )
}


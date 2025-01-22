"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Exam {
  id: number
  name: string
  date: string
}

export default function ExamCountdown() {
  const [exams, setExams] = useState<Exam[]>([])
  const [newExam, setNewExam] = useState({ name: "", date: "" })
  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const updatedCountdowns: { [key: number]: string } = {}

      exams.forEach((exam) => {
        const examDate = new Date(exam.date)
        const timeDiff = examDate.getTime() - now.getTime()

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          updatedCountdowns[exam.id] = `${days}d ${hours}h ${minutes}m`
        } else {
          updatedCountdowns[exam.id] = "Exam has passed"
        }
      })

      setCountdowns(updatedCountdowns)
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [exams])

  const addExam = () => {
    if (newExam.name && newExam.date) {
      setExams([...exams, { ...newExam, id: Date.now() }])
      setNewExam({ name: "", date: "" })
    }
  }

  const removeExam = (id: number) => {
    setExams(exams.filter((exam) => exam.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Exam Countdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="examName">Exam Name</Label>
          <Input
            id="examName"
            value={newExam.name}
            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            placeholder="Enter exam name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="examDate">Exam Date</Label>
          <Input
            id="examDate"
            type="date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
          />
        </div>
      </div>
      <Button onClick={addExam}>Add Exam</Button>
      <div className="space-y-2">
        {exams.map((exam) => (
          <div key={exam.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>
              <span className="font-semibold">{exam.name}</span>
              <span className="ml-2 text-sm text-gray-600">{exam.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{countdowns[exam.id]}</span>
              <Button variant="destructive" size="sm" onClick={() => removeExam(exam.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


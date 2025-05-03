"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StudySession {
  id: number
  subject: string
  day: string
  startTime: string
  duration: number
  priority: "Low" | "Medium" | "High"
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function StudyPlanner() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [subject, setSubject] = useState("")
  const [day, setDay] = useState(days[0])
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState(60)
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium")

  const addSession = () => {
    if (subject && day && startTime && duration) {
      setSessions([...sessions, { id: Date.now(), subject, day, startTime, duration, priority }])
      setSubject("")
      setStartTime("")
      setDuration(60)
      setPriority("Medium")
    }
  }

  const removeSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-200 text-green-800"
      case "Medium":
        return "bg-yellow-200 text-yellow-800"
      case "High":
        return "bg-red-200 text-red-800"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4 p-4 bg-purple-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold">Study Planner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-lg font-bold">
            Subject
          </Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-2 border-black text-xl"
            placeholder="Enter subject"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="day" className="text-lg font-bold">
            Day
          </Label>
          <Select onValueChange={setDay} value={day}>
            <SelectTrigger className="border-2 border-black text-xl">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime" className="text-lg font-bold">
            Start Time
          </Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border-2 border-black text-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-lg font-bold">
            Duration (minutes)
          </Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number.parseInt(e.target.value))}
            min={15}
            step={15}
            className="border-2 border-black text-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-lg font-bold">
            Priority
          </Label>
          <Select onValueChange={(value: "Low" | "Medium" | "High") => setPriority(value)} value={priority}>
            <SelectTrigger className="border-2 border-black text-xl">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={addSession}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100"
      >
        Add Study Session
      </Button>
      <div className="overflow-x-auto">
        <Table className="w-full border-4 border-black">
          <TableHeader>
            <TableRow>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Subject</TableHead>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Day</TableHead>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Start Time</TableHead>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Duration</TableHead>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Priority</TableHead>
              <TableHead className="border-2 border-black bg-gray-200 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="border-2 border-black">{session.subject}</TableCell>
                <TableCell className="border-2 border-black">{session.day}</TableCell>
                <TableCell className="border-2 border-black">{session.startTime}</TableCell>
                <TableCell className="border-2 border-black">{session.duration} minutes</TableCell>
                <TableCell className={`border-2 border-black ${getPriorityColor(session.priority)}`}>
                  {session.priority}
                </TableCell>
                <TableCell className="border-2 border-black">
                  <Button
                    onClick={() => removeSession(session.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 border-b-2 border-red-700 hover:border-red-800 active:border-t-2 active:border-b-0 transition-all duration-100"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

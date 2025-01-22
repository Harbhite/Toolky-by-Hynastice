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
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function StudyScheduler() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [subject, setSubject] = useState("")
  const [day, setDay] = useState(days[0])
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState(60)

  const addSession = () => {
    if (subject && day && startTime && duration) {
      setSessions([
        ...sessions,
        { id: Date.now(), subject, day, startTime, duration },
      ])
      setSubject("")
      setStartTime("")
      setDuration(60)
    }
  }

  const removeSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Study Scheduler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select onValueChange={setDay} value={day}>
            <SelectTrigger>
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
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={15}
            step={15}
          />
        </div>
      </div>
      <Button onClick={addSession}>Add Study Session</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.subject}</TableCell>
              <TableCell>{session.day}</TableCell>
              <TableCell>{session.startTime}</TableCell>
              <TableCell>{session.duration} minutes</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removeSession(session.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


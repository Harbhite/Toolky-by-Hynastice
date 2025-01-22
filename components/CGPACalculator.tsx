"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CGPACalculator() {
  const [courses, setCourses] = useState([{ name: "", grade: "", credits: "" }])
  const [cgpa, setCGPA] = useState(0)

  const addCourse = () => {
    setCourses([...courses, { name: "", grade: "", credits: "" }])
  }

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = [...courses]
    updatedCourses[index] = { ...updatedCourses[index], [field]: value }
    setCourses(updatedCourses)
  }

  const calculateCGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    courses.forEach((course) => {
      const credits = parseFloat(course.credits)
      let gradePoints = 0

      switch (course.grade.toUpperCase()) {
        case "A":
          gradePoints = 4.0
          break
        case "B":
          gradePoints = 3.0
          break
        case "C":
          gradePoints = 2.0
          break
        case "D":
          gradePoints = 1.0
          break
        case "F":
          gradePoints = 0.0
          break
      }

      totalPoints += credits * gradePoints
      totalCredits += credits
    })

    const calculatedCGPA = totalPoints / totalCredits
    setCGPA(isNaN(calculatedCGPA) ? 0 : calculatedCGPA)
  }

  return (
    <div className="space-y-4">
      {/* <h2 className="text-2xl font-bold">CGPA Calculator</h2> */}
      {courses.map((course, index) => (
        <div key={index} className="flex space-x-2">
          <Input
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => updateCourse(index, "name", e.target.value)}
          />
          <Input
            placeholder="Grade"
            value={course.grade}
            onChange={(e) => updateCourse(index, "grade", e.target.value)}
          />
          <Input
            placeholder="Credits"
            type="number"
            value={course.credits}
            onChange={(e) => updateCourse(index, "credits", e.target.value)}
          />
        </div>
      ))}
      <Button onClick={addCourse}>Add Course</Button>
      <Button onClick={calculateCGPA}>Calculate CGPA</Button>
      <div>
        <Label>Your CGPA:</Label>
        <Input value={cgpa.toFixed(2)} readOnly />
      </div>
    </div>
  )
}


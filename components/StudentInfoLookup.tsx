"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StudentInfo {
  "Matric No": string
  "Name": string
  "Department": string
  "Level": string
  "CGPA": string
}

const studentData: StudentInfo[] = [
  { "Matric No": "2020/1234", "Name": "John Doe", "Department": "Computer Science", "Level": "300", "CGPA": "4.5" },
  { "Matric No": "2020/5678", "Name": "Jane Smith", "Department": "Electrical Engineering", "Level": "200", "CGPA": "4.2" },
  { "Matric No": "2021/9876", "Name": "Alice Johnson", "Department": "Mechanical Engineering", "Level": "100", "CGPA": "3.8" },
  { "Matric No": "2019/4321", "Name": "Bob Williams", "Department": "Civil Engineering", "Level": "400", "CGPA": "4.0" },
  { "Matric No": "2022/1357", "Name": "Charlie Brown", "Department": "Chemical Engineering", "Level": "100", "CGPA": "3.5" },
]

export default function StudentInfoLookup() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<StudentInfo[]>([])

  const handleSearch = () => {
    const results = studentData.filter(student =>
      student["Matric No"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      student["Name"].toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className="space-y-4 p-4 bg-green-200 border-4 border-black shadow-brutal">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          placeholder="Search by Name or Matric No..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-black text-xl font-bold"
        />
        <Button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100">Search</Button>
      </div>
      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <Table className="w-full border-4 border-black bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-lg border-2 border-black">Matric No</TableHead>
                <TableHead className="font-bold text-lg border-2 border-black">Name</TableHead>
                <TableHead className="font-bold text-lg border-2 border-black">Department</TableHead>
                <TableHead className="font-bold text-lg border-2 border-black">Level</TableHead>
                <TableHead className="font-bold text-lg border-2 border-black">CGPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((student) => (
                <TableRow key={student["Matric No"]} className="hover:bg-yellow-100 transition-colors duration-200">
                  <TableCell className="border-2 border-black">{student["Matric No"]}</TableCell>
                  <TableCell className="border-2 border-black">{student["Name"]}</TableCell>
                  <TableCell className="border-2 border-black">{student["Department"]}</TableCell>
                  <TableCell className="border-2 border-black">{student["Level"]}</TableCell>
                  <TableCell className="border-2 border-black">{student["CGPA"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}


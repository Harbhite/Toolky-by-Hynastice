"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileSaver from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})

import 'react-quill/dist/quill.snow.css'

interface Note {
  id: number
  title: string
  content: string
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default function NoteTaker() {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, title: "", content: "" }])
  const [currentNote, setCurrentNote] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addNote = () => {
    const newNote = { id: Date.now(), title: "", content: "" }
    setNotes([...notes, newNote])
    setCurrentNote(notes.length)
  }

  const updateNote = (field: keyof Note, value: string) => {
    const updatedNotes = [...notes]
    updatedNotes[currentNote] = { ...updatedNotes[currentNote], [field]: value }
    setNotes(updatedNotes)
  }

  const copyNote = () => {
    const noteText = notes[currentNote].content.replace(/<[^>]+>/g, '')
    navigator.clipboard.writeText(noteText)
      .then(() => alert("Note copied to clipboard!"))
      .catch(err => console.error('Error copying text: ', err))
  }

  const downloadNote = () => {
    const noteText = notes[currentNote].content.replace(/<[^>]+>/g, '')
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(noteText),
            ],
          }),
        ],
      }],
    })

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, `${notes[currentNote].title || 'Untitled'}.docx`)
    })
  }

  return (
    <div className="space-y-4 p-4 bg-yellow-200 border-4 border-black shadow-brutal">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <Input
          placeholder="Note Title"
          value={notes[currentNote].title}
          onChange={(e) => updateNote("title", e.target.value)}
          className="border-2 border-black text-xl font-bold flex-grow"
        />
        <Button onClick={addNote} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 active:border-t-4 active:border-b-0 transition-all duration-100">New Note</Button>
        <Button onClick={copyNote} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-800 active:border-t-4 active:border-b-0 transition-all duration-100">Copy Note</Button>
        <Button onClick={downloadNote} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-800 active:border-t-4 active:border-b-0 transition-all duration-100">Download as .docx</Button>
      </div>
      {mounted && (
        <div className="border-4 border-black bg-white" style={{ height: '500px' }}>
          <ReactQuill
            theme="snow"
            value={notes[currentNote].content}
            onChange={(content) => updateNote("content", content)}
            modules={modules}
            formats={formats}
            style={{ height: '450px' }}
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        {notes.map((note, index) => (
          <Button
            key={note.id}
            variant={index === currentNote ? "default" : "outline"}
            onClick={() => setCurrentNote(index)}
            className={`border-2 border-black ${index === currentNote ? 'bg-purple-500 text-white' : 'bg-white text-black'} hover:bg-purple-600 hover:text-white font-bold py-2 px-4 transform hover:rotate-1 transition-all duration-100`}
          >
            {note.title || `Note ${index + 1}`}
          </Button>
        ))}
      </div>
    </div>
  )
}


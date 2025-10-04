'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NoteCard } from '@/components/notes/note-card'
import { NoteDialog } from '@/components/notes/note-dialog'
import { useToast } from '@/components/ui/use-toast'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes')
      if (!response.ok) throw new Error('Failed to fetch notes')
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async (note: { title: string; content: string }) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })

      if (!response.ok) throw new Error('Failed to create note')
      
      const newNote = await response.json()
      setNotes([newNote, ...notes])
      toast({
        title: "Success",
        description: "Note created successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleEditNote = async (note: { title: string; content: string }) => {
    if (!editingNote) return

    try {
      const response = await fetch(`/api/notes/${editingNote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })

      if (!response.ok) throw new Error('Failed to update note')
      
      const updatedNote = await response.json()
      setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
      toast({
        title: "Success",
        description: "Note updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete note')
      
      setNotes(notes.filter(note => note.id !== noteId))
      toast({
        title: "Success",
        description: "Note deleted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const openCreateDialog = () => {
    setEditingNote(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (note: Note) => {
    setEditingNote(note)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b border-purple-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-xl items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">My Notes</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={openCreateDialog}
              className="gradient-bg hover:opacity-90"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container max-w-screen-xl py-20">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-muted-foreground">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-purple-500/20 bg-purple-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold gradient-text">No Notes Yet</h2>
            <p className="text-muted-foreground">
              Create your first note to get started!
            </p>
            <Button
              onClick={openCreateDialog}
              className="gradient-bg hover:opacity-90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Note
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={openEditDialog}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>

      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingNote(null)
        }}
        onSubmit={editingNote ? handleEditNote : handleCreateNote}
        initialData={editingNote ?? undefined}
      />
    </div>
  )
}




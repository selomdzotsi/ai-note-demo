'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/utils'
import { Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface NoteCardProps {
  note: {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
  }
  onEdit: (note: any) => void
  onDelete: (id: string) => void
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(note.id)
    } catch (error) {
      console.error('Error deleting note:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="gradient-text">{note.title}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-purple-500/10"
              onClick={() => onEdit(note)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-purple-500/10"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Created {formatDate(new Date(note.createdAt))}
          {note.updatedAt > note.createdAt && 
            ` • Updated ${formatDate(new Date(note.updatedAt))}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
      </CardContent>
    </Card>
  )
}



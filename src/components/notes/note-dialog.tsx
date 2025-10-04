'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

interface NoteDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (note: { title: string; content: string }) => Promise<void>
  initialData?: {
    title: string
    content: string
  }
}

export function NoteDialog({ isOpen, onClose, onSubmit, initialData }: NoteDialogProps) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await onSubmit({ title, content })
      onClose()
      setTitle('')
      setContent('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? 'Edit Note' : 'Create Note'}</DialogTitle>
            <DialogDescription>
              {initialData ? 'Make changes to your note here.' : 'Add a new note to your collection.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-purple-500/20"
                required
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] border-purple-500/20"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="border-purple-500/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gradient-bg hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Note'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



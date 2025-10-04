import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId, isAuthenticated } = await auth()
    console.log('[NOTE_PATCH] User ID:', userId, 'Note ID:', params.noteId)

    if (!isAuthenticated || !userId) {
      console.log('[NOTE_PATCH] Not authenticated')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await currentUser()
    console.log('[NOTE_PATCH] Current user:', user?.id)

    if (!user) {
      console.log('[NOTE_PATCH] No user found')
      return new NextResponse("User not found", { status: 404 })
    }

    const { title, content } = await req.json()
    console.log('[NOTE_PATCH] Updating note:', { title, content })

    if (!title || !content) {
      console.log('[NOTE_PATCH] Missing required fields')
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const note = await prisma.note.update({
      where: {
        id: params.noteId,
        userId // Ensure the note belongs to the user
      },
      data: { title, content }
    })
    console.log('[NOTE_PATCH] Note updated:', note)

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTE_PATCH] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId, isAuthenticated } = await auth()
    console.log('[NOTE_DELETE] User ID:', userId, 'Note ID:', params.noteId)

    if (!isAuthenticated || !userId) {
      console.log('[NOTE_DELETE] Not authenticated')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await currentUser()
    console.log('[NOTE_DELETE] Current user:', user?.id)

    if (!user) {
      console.log('[NOTE_DELETE] No user found')
      return new NextResponse("User not found", { status: 404 })
    }

    const note = await prisma.note.delete({
      where: {
        id: params.noteId,
        userId // Ensure the note belongs to the user
      }
    })
    console.log('[NOTE_DELETE] Note deleted:', note)

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTE_DELETE] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}
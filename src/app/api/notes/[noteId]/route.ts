import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth()
    const { title, content } = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!title || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const note = await prisma.note.update({
      where: {
        id: params.noteId,
        userId
      },
      data: {
        title,
        content
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTE_PATCH]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const note = await prisma.note.delete({
      where: {
        id: params.noteId,
        userId
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTE_DELETE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}



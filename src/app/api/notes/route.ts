import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const notes = await prisma.note.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(notes)
  } catch (error) {
    console.error('[NOTES_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { title, content } = await req.json()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!title || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTES_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}



import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId, isAuthenticated } = await auth()
    console.log('[NOTES_GET] User ID:', userId, 'Is Authenticated:', isAuthenticated)
    
    if (!isAuthenticated || !userId) {
      console.log('[NOTES_GET] Not authenticated')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await currentUser()
    console.log('[NOTES_GET] Current user:', user?.id)

    if (!user) {
      console.log('[NOTES_GET] No user found')
      return new NextResponse("User not found", { status: 404 })
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    console.log('[NOTES_GET] Found notes:', notes.length)

    return NextResponse.json(notes)
  } catch (error) {
    console.error('[NOTES_GET] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId, isAuthenticated } = await auth()
    console.log('[NOTES_POST] User ID:', userId, 'Is Authenticated:', isAuthenticated)

    if (!isAuthenticated || !userId) {
      console.log('[NOTES_POST] Not authenticated')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await currentUser()
    console.log('[NOTES_POST] Current user:', user?.id)

    if (!user) {
      console.log('[NOTES_POST] No user found')
      return new NextResponse("User not found", { status: 404 })
    }

    const { title, content } = await req.json()
    console.log('[NOTES_POST] Creating note:', { title, content })

    if (!title || !content) {
      console.log('[NOTES_POST] Missing required fields')
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Ensure user exists in database
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: user.emailAddresses[0]?.emailAddress || "",
        f_name: user.firstName || "",
        l_name: user.lastName || ""
      },
      create: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        f_name: user.firstName || "",
        l_name: user.lastName || ""
      }
    })

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId
      }
    })
    console.log('[NOTES_POST] Note created:', note)

    return NextResponse.json(note)
  } catch (error) {
    console.error('[NOTES_POST] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}
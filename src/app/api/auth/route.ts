import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = auth()
    console.log('[AUTH_SYNC] Checking user ID:', userId)
    
    if (!userId) {
      console.log('[AUTH_SYNC] No user ID found')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const clerkUser = await currentUser()
    console.log('[AUTH_SYNC] Clerk user:', clerkUser?.id)
    
    if (!clerkUser) {
      console.log('[AUTH_SYNC] No Clerk user found')
      return new NextResponse("User not found", { status: 404 })
    }

    // Create or update user in our database
    console.log('[AUTH_SYNC] Upserting user with data:', {
      id: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName
    })

    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        f_name: clerkUser.firstName || "",
        l_name: clerkUser.lastName || ""
      },
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        f_name: clerkUser.firstName || "",
        l_name: clerkUser.lastName || ""
      }
    })

    console.log('[AUTH_SYNC] User upserted:', user)
    return NextResponse.json(user)
  } catch (error) {
    console.error('[AUTH_SYNC] Error:', error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
}
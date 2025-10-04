import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/api/sign-in",
    "/api/sign-up",
    "/api/auth" // Allow access to auth endpoint
  ]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
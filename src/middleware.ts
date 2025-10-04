import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/api/sign-in",
    "/api/sign-up"
  ]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
      <div className="flex max-w-[980px] flex-col items-center gap-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Transform Your Notes with
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> AI-Powered </span>
          Intelligence
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Experience the future of note-taking. Organize, analyze, and enhance your notes with powerful AI features.
          Your thoughts, supercharged.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/register">
            Get Started Free
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#features">
            Learn More
          </Link>
        </Button>
      </div>
      <div className="mt-8 flex items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">10K+</span>
          <span className="text-sm text-muted-foreground">Active Users</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">1M+</span>
          <span className="text-sm text-muted-foreground">Notes Created</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">99%</span>
          <span className="text-sm text-muted-foreground">Satisfaction</span>
        </div>
      </div>
    </div>
  )
}

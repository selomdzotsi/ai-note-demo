'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"

export function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-24 text-center md:py-32">
          <div className="flex max-w-[980px] flex-col items-center gap-4">
            <div className="inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-6 py-2 text-sm backdrop-blur-sm">
              Thrive Together Every Day →
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-7xl lg:leading-[1.1]">
              Your AI Assistant
              <span className="block gradient-text">for Smart Notes</span>
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Experience the future of note-taking. Organize, analyze, and enhance your notes with powerful AI features.
              Your thoughts, supercharged.
            </p>
          </div>
          <div className="flex gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="gradient-bg px-8 py-6 text-lg">
                Get Started Free
              </Button>
            </SignUpButton>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-500/20 bg-purple-500/10 px-8 py-6 text-lg backdrop-blur-sm hover:bg-purple-500/20" 
              asChild
            >
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-8 backdrop-blur-sm sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold gradient-text">10K+</span>
              <span className="mt-2 text-sm text-muted-foreground">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold gradient-text">1M+</span>
              <span className="mt-2 text-sm text-muted-foreground">Notes Created</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold gradient-text">99%</span>
              <span className="mt-2 text-sm text-muted-foreground">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-purple-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">AI Notes</span>
          </Link>
          <div className="hidden gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:gap-2">
            <SignedOut>
              <SignInButton afterSignInUrl="/dashboard" mode="modal">
                <Button variant="ghost" className="hover:bg-purple-500/10 hover:text-white">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton afterSignUpUrl="/dashboard" mode="modal">
                <Button className="gradient-bg hover:opacity-90">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button variant="ghost" className="hover:bg-purple-500/10 hover:text-white" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-purple-500/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-purple-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex flex-col gap-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <SignedOut>
                  <SignInButton afterSignInUrl="/dashboard" mode="modal">
                    <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary w-full text-left">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton afterSignUpUrl="/dashboard" mode="modal">
                    <button className="text-sm font-medium gradient-text transition-colors w-full text-left">
                      Get Started
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
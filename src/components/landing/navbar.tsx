import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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
            <Button variant="ghost" className="hover:bg-purple-500/10 hover:text-white" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button className="gradient-bg hover:opacity-90" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
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
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium gradient-text transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background antialiased">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
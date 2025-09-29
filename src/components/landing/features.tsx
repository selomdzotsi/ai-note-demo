import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles, Clock, Lock, Share2, Palette } from "lucide-react"

const features = [
  {
    title: "AI-Powered Insights",
    description: "Get smart summaries, suggestions, and insights from your notes using advanced AI technology.",
    icon: Brain
  },
  {
    title: "Smart Organization",
    description: "Automatically categorize and tag your notes for effortless organization and quick retrieval.",
    icon: Sparkles
  },
  {
    title: "Real-time Collaboration",
    description: "Share and collaborate on notes with team members in real-time with live updates.",
    icon: Share2
  },
  {
    title: "Advanced Security",
    description: "Your notes are protected with end-to-end encryption and secure cloud storage.",
    icon: Lock
  },
  {
    title: "Beautiful Themes",
    description: "Customize your note-taking environment with beautiful themes and layouts.",
    icon: Palette
  },
  {
    title: "Version History",
    description: "Track changes and restore previous versions of your notes at any time.",
    icon: Clock
  }
]

export function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Powerful Features for Modern Note-Taking
        </h2>
        <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Everything you need to capture, organize, and enhance your thoughts with AI-powered intelligence.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

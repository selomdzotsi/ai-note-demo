import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What makes AI Notes different from other note-taking apps?",
    answer: "AI Notes combines traditional note-taking with advanced AI capabilities. Our app provides smart summaries, automatic organization, and intelligent insights that help you get more value from your notes."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, absolutely. We use end-to-end encryption and secure cloud storage to ensure your notes are completely private and secure. Only you and those you choose to share with can access your notes."
  },
  {
    question: "Can I use AI Notes offline?",
    answer: "Yes, AI Notes works offline. You can create and edit notes without an internet connection, and they'll automatically sync when you're back online."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes basic note-taking features, limited AI-powered insights, and up to 100 notes. For unlimited AI features and advanced capabilities, check out our premium plans."
  },
  {
    question: "Can I import notes from other apps?",
    answer: "Yes, AI Notes supports importing notes from popular apps like Evernote, OneNote, and Google Keep. We also support common file formats like .txt, .md, and .doc."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="py-24 sm:py-32">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Frequently Asked
              <span className="block gradient-text">Questions</span>
            </h2>
            <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Everything you need to know about AI Notes. Can't find the answer you're looking for? 
              <a href="#contact" className="gradient-text hover:opacity-90"> Contact us</a>
            </p>
          </div>
          <div className="mx-auto max-w-[800px] rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-purple-500/20 px-2"
                >
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most brochure-style websites take about 2 to 4 weeks depending on scope, content readiness, and revision rounds.",
  },
  {
    question: "Do you offer SEO with web design?",
    answer:
      "Yes. Every build includes technical and on-page SEO foundations like clean structure, heading hierarchy, metadata-ready pages, and performance optimization.",
  },
  {
    question: "Can you redesign my existing site instead of building from scratch?",
    answer:
      "Absolutely. I can modernize your current site, improve speed and UX, and keep what is working while removing friction points.",
  },
  {
    question: "Will my site be easy to update after launch?",
    answer:
      "Yes. I build with maintainability in mind so you can update content and basic sections without fighting your codebase.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. I offer ongoing updates, maintenance, and optimization support so your website stays healthy as your business grows.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start with a quick discovery call. We will define your goals, target audience, and the pages you need, then map out a clear build plan.",
  },
];

export default function HomeFaqSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <HelpCircle className="size-3.5" />
            FAQ
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Questions people ask before they hire me
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Straight answers, no fluff. If you do not see your question here, I can cover it on a quick call.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border/70 bg-card/80 p-5 shadow-sm transition-colors open:bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-foreground marker:content-none">
                <span>{faq.question}</span>
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

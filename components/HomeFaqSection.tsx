import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most projects take between 2–6 weeks depending on scope, content readiness, and revisions. Larger or more custom builds may require additional time for strategy, integrations, or advanced functionality.",
  },
  {
    question: "Is SEO included with web design?",
    answer:
      "Every website includes foundational SEO best practices such as semantic structure, performance optimization, metadata setup, mobile responsiveness, and search-friendly page architecture.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. Existing websites can often be redesigned and rebuilt with improved structure, performance, messaging, and user experience without starting the business itself from scratch.",
  },
  {
    question: "Will the website be easy to update?",
    answer:
      "The goal is always to create a website that is clean, maintainable, and easy to manage long after launch — without relying on bloated or fragile systems.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Ongoing support is available for updates, refinements, performance improvements, and general website maintenance after launch.",
  },
  {
    question: "How do we get started?",
    answer:
      "The process starts with a short discovery call to understand your business, goals, and what the website needs to accomplish. From there, the project scope, direction, and next steps are clearly outlined.",
  },
];

export default function HomeFaqSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <HelpCircle className="size-3.5" />
            Frequently Asked Questions
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Before We Build
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Clear answers about timelines, process, support, and what it is like to work with Holtz Digital. If you have a specific question about your project, we can cover it during a quick discovery call.
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

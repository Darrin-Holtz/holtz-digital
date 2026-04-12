import Link from "next/link";
import { Compass, Gauge, Sparkles, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const outcomes = [
  {
    title: "Performance First",
    description:
      "Fast, mobile-first builds that feel premium and reduce drop-off before users bounce.",
    icon: Gauge,
  },
  {
    title: "Conversion Focus",
    description:
      "Clear messaging, stronger page structure, and CTAs that guide visitors toward real action.",
    icon: Target,
  },
  {
    title: "Easy to Maintain",
    description:
      "A clean build you can actually update without wrestling a bloated, fragile stack.",
    icon: Compass,
  },
];

const processSteps = [
  "Quick strategy call to align on goals",
  "Design + build in clear milestones",
  "Launch with SEO-ready page structure",
  "Iterate based on what users actually do",
];

export default function HomeAuthenticSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Built on real outcomes
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            No fake case studies. Just websites that are clear, fast, and built to convert.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            I have not shipped projects for every local niche yet, so I focus on what I can honestly promise: sharp design, clean architecture, and measurable improvements in usability.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-border/70 bg-gradient-to-b from-card to-card/70 shadow-sm"
              >
                <CardHeader>
                  <div className="mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h3 className="text-xl font-semibold">How we would work together</h3>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Get a Free Website Audit
            </Link>
            <Link
              href="/portfolio"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              See Sample Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

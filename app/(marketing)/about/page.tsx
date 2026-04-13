import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Code2,
  Compass,
  GitBranch,
  MapPin,
  NotebookPen,
  Search,
  Wrench,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Holtz Digital, a Buffalo-focused web designer building from-scratch websites in HTML, Next.js, WordPress, and other modern stacks for local businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Holtz Digital",
    description:
      "Buffalo-focused web design, from-scratch websites across modern stacks, local search strategy, and clear project execution.",
    url: "https://holtzdigital.com/about",
  },
};

const principles = [
  {
    title: "Built From Scratch",
    description:
      "Whether a project is built in HTML, Next.js, WordPress, or another stack, I build from scratch with a focus on clean structure, maintainability, and performance.",
    icon: Code2,
  },
  {
    title: "Local Search Matters",
    description:
      "For Buffalo-area businesses, the goal is simple: target the right keywords, improve visibility for local searches, and build pages that load fast and feel credible the moment someone lands on them.",
    icon: Search,
  },
  {
    title: "Practical Support",
    description:
      "The goal is not just launch day. I want your site to stay easy to update, easy to understand, and useful to your business over time.",
    icon: Wrench,
  },
];

const process = [
  "Start with your business goals, audience, and the pages you actually need.",
  "Design and build around clarity, speed, and conversion instead of visual noise.",
  "Launch with strong page structure, local SEO foundations, and a site you can maintain.",
  "Keep improving with updates, refinements, and ongoing support when needed.",
];

const proofPoints = [
  {
    title: "Buffalo Focus",
    body: "The positioning is local on purpose. I want the site to speak clearly to businesses in Buffalo and Western New York, not read like a generic agency template.",
    icon: MapPin,
  },
  {
    title: "Public Technical Work",
    body: "I can back up the technical side with real code, real builds, and a working process instead of hiding everything behind vague claims.",
    icon: GitBranch,
  },
  {
    title: "Writing That Explains the Work",
    body: "The blog is part of the trust signal. It gives you a way to see how I think about structure, SEO, and website improvements before you ever reach out.",
    icon: NotebookPen,
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden pb-20 pt-10 sm:pt-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="absolute bottom-24 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.72_0_0/.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.72_0_0/.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 px-6 py-10 shadow-sm backdrop-blur sm:px-8 sm:py-14 lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
              <Compass className="size-3.5" />
              About Holtz Digital
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Buffalo web design with a custom-build mindset.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              I build websites for Buffalo businesses that need more than a prettier homepage. The work is centered on
              clear messaging, fast performance, the right keyword strategy, and a site that actually supports lead generation.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Every website I build is from scratch, whether it is powered by HTML, Next.js, WordPress, or another modern stack.
              I care a lot about what sits underneath the design because clean structure, maintainable code, and a site you can keep using without fighting it later all matter.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
                Start a Project Conversation
              </Link>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
              >
                Read the Blog
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/30 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-foreground">Buffalo, NY Focused</p>
                <p className="mt-1 text-sm text-muted-foreground">Built for local businesses that want clearer positioning.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/30 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-foreground">From-Scratch Builds</p>
                <p className="mt-1 text-sm text-muted-foreground">HTML, Next.js, WordPress, and other stacks built intentionally.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/30 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-foreground">Built to Rank and Convert</p>
                <p className="mt-1 text-sm text-muted-foreground">Keyword-focused structure, local visibility goals, and fast-loading pages.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-3xl border border-border/70 bg-background/60 backdrop-blur lg:block" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-card via-card to-sky-500/10 shadow-sm">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute bottom-8 left-8 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />
                <div className="absolute right-6 top-16 h-32 w-32 rounded-full bg-indigo-500/12 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
              <Image
                src="/DarrinHoltz.png"
                alt="Portrait of Darrin Holtz"
                width={1000}
                height={1400}
                priority
                className="relative z-10 h-[420px] w-full -translate-x-[25px] object-contain object-bottom sm:h-[520px]"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/70 to-transparent p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Buffalo based</p>
                <p className="mt-2 max-w-md text-lg font-semibold leading-8">
                  The goal is simple: build websites that look sharp, load fast, and help the right local customers find and trust your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why I do this work</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Too many small business websites are hard to trust, hard to update, or hard to find.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>
            A lot of local businesses do not need a massive digital strategy. They need a site that loads fast, explains the offer clearly,
            targets the right searches, improves visibility over time, and gives customers a clean next step.
          </p>
          <p>
            That is the approach behind Holtz Digital. Keep the message clear. Keep the build clean. Remove friction where it hurts trust and conversions.
          </p>
          <p>
            If WordPress is the right platform, I build it from scratch. If HTML or Next.js is the right fit, I can build there too. The point is choosing the right stack for the job and building it cleanly from the start.
          </p>
        </div>
      </section>

      <section className="pt-16">
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="border-border/70 bg-gradient-to-b from-card to-card/70 shadow-sm">
                <CardHeader>
                  <div className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-8 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
          <Card className="border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">How projects usually work</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-4">
                {process.map((step, index) => (
                  <li key={step} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-background/30 p-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-8 text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">What you can expect from me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-8 text-muted-foreground">
              <p>
                Direct communication, realistic scope, and a build process that does not disappear behind vague language.
              </p>
              <p>
                A strong emphasis on choosing the right keywords, improving local visibility with clean information architecture, and keeping performance strong from the start instead of trying to fix it later.
              </p>
              <p>
                A site that is easier to maintain after launch, whether you need a from-scratch WordPress build, a custom Next.js project, a clean HTML site, ongoing updates, or help refining what is already there.
              </p>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <p className="font-semibold text-foreground">What that means in practice</p>
                <p className="mt-2 text-sm leading-8 text-muted-foreground">
                  You are not getting a one-size-fits-all build. The site should fit the business, target the right searches, load fast, and be something you can actually keep using after launch.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pt-16">
        <div className="grid gap-5 md:grid-cols-3">
          {proofPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-3xl border border-border/70 bg-card/75 p-6 shadow-sm backdrop-blur">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pt-16">
        <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-card to-card/70 p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Next step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            If you want a site that is clearer, faster, and easier to trust, let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            The best place to start is a focused project conversation. I can talk with you about where your current site is falling short,
            what you need from a rebuild, which keywords matter most, and whether HTML, Next.js, WordPress, or another stack makes the most sense for the business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
              Start the Conversation
            </Link>
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
            >
              Explore the Blog
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
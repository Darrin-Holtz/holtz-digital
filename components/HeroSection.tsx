import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-6 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.72_0_0/.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.72_0_0/.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8 sm:pb-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Buffalo Web Design Agency
          </p>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Web Design for Buffalo Businesses That Want More Qualified Leads
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            We design and build fast, SEO-ready websites for local businesses and startups in Buffalo, NY. Clean design, clear messaging, and conversion-focused pages that help you turn traffic into customers.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-44 px-6 py-3 font-semibold"
              )}
            >
              Get a Free Quote
            </Link>

            <Link
              href="/portfolio"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group min-w-44 px-6 py-3 font-semibold"
              )}
            >
              View Our Work
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 text-left text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <p className="font-semibold text-foreground">Fast Performance</p>
              <p className="mt-1">Built for speed across mobile and desktop.</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <p className="font-semibold text-foreground">Local SEO Foundations</p>
              <p className="mt-1">Structured pages that search engines can read.</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-4 backdrop-blur">
              <p className="font-semibold text-foreground">Conversion-Focused UX</p>
              <p className="mt-1">Clear CTAs and messaging that drive action.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
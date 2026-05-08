import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pills = [
  "Built for Performance",
  "Structured for Local SEO",
  "Designed to Convert",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-6 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.72_0_0/.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.72_0_0/.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="w-full pb-8 sm:pb-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Buffalo Web Design Agency
          </p>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Most Buffalo Business Websites Were Built to Exist — Not to Work.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Holtz Digital builds fast, conversion-focused websites that help local businesses earn trust, improve visibility, and turn more visitors into customers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur"
              >
                <CheckCircle2 className="size-3.5 text-primary" />
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-44 px-6 py-3 font-semibold"
              )}
            >
              Book a Discovery Call
            </Link>

            <Link
              href="/#work"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-w-44 px-6 py-3 font-semibold"
              )}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
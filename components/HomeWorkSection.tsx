import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stackTags = [
  "Next.js",
  "React",
  "Convex",
  "Stripe",
  "TypeScript",
  "Tailwind CSS",
];

const capabilities = [
  "Real-time seat selection with live availability updates",
  "Secure online checkout with instant order confirmation",
  "Mobile ticket delivery with QR-based entry scanning",
  "Responsive experience optimized for mobile and desktop",
  "Modern frontend architecture with scalable backend infrastructure",
];

export default function HomeWorkSection() {
  return (
    <section id="work" className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Layers className="size-3.5" />
            Selected Work
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            A full-stack application designed to demonstrate modern booking flows, real-time interactivity, and production-ready user experience.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            An interactive booking platform built to simulate the complete customer journey — from discovering showtimes to purchasing tickets and scanning entry passes on mobile devices.
          </p>
        </div>

        {/* Browser frame card */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg">
          {/* Browser chrome bar */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-muted/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="size-3 rounded-full bg-rose-400/70" />
              <div className="size-3 rounded-full bg-amber-400/70" />
              <div className="size-3 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex h-6 w-56 items-center rounded-md border border-border/50 bg-background/60 px-3 text-xs text-muted-foreground">
              quickshow.app
            </div>
          </div>

          {/* Hero screenshot */}
          <div className="relative w-full">
            <Image
              src="/movie-booking-app.webp"
              alt="QuickShow home page with featured movie and navigation"
              width={1400}
              height={788}
              className="w-full object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            />
          </div>

          {/* Two detail screenshots */}
          <div className="grid grid-cols-1 border-t border-border/60 sm:grid-cols-2">
            <div className="relative border-border/60 sm:border-r">
              <Image
                src="/time-seating-chart.png"
                alt="QuickShow showtime selection and interactive seating chart"
                width={700}
                height={420}
                className="h-56 w-full object-cover object-top sm:h-72"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative border-t border-border/60 sm:border-t-0">
              <Image
                src="/movie-ticket.png"
                alt="QuickShow mobile ticket with QR code"
                width={700}
                height={420}
                className="h-56 w-full object-cover object-top sm:h-72"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Project info below the card */}
        <div className="mt-8 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: name, description, capabilities, CTAs */}
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight">QuickShow</h3>
            <p className="mt-2 text-muted-foreground">
              A modern movie ticketing platform designed to feel fast, intuitive, and seamless across every interaction — engineered end-to-end as proof of advanced product capability.
            </p>

            <p className="mt-4 text-xs font-semibold tracking-wider text-primary uppercase">
              Key Capabilities
            </p>
            <ul className="mt-2 space-y-2">
              {capabilities.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://movie-booking-app-weld.vercel.app/"
                target="_blank"
                className={cn(buttonVariants({ size: "sm" }), "group")}
              >
                Live Demo
                <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://github.com/Darrin-Holtz/movie-booking-app"
                target="_blank"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "group")}
              >
                GitHub
                <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right: stack + why it matters */}
          <div className="flex flex-col gap-6 sm:max-w-xs">
            <div>
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                Built With
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {stackTags.join(" · ")}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                Why It Matters
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Modern businesses increasingly need more than static websites. QuickShow demonstrates the kind of scalable, interactive digital experiences Holtz Digital can design and engineer from the ground up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

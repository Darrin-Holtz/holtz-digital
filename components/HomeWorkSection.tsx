import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stackTags = [
  "Next.js 16",
  "React 19",
  "Convex",
  "Better Auth",
  "Stripe",
  "TMDB API",
  "TypeScript",
  "Tailwind CSS 4",
];

const highlights = [
  "Seats are held in real time — if someone else grabs a seat, it disappears from your screen instantly",
  "Secure online payment with instant order confirmation",
  "Your ticket lives on your phone and staff can scan it at the door with a camera",
];

export default function HomeWorkSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Layers className="size-3.5" />
            Recent Work
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            A recent project I built — from idea to deployed product.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            QuickShow is a movie booking demo app I built to showcase what a modern, full-stack web application looks like end-to-end — from browsing showtimes to a QR-coded mobile ticket.
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
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: name, description, highlights, CTAs */}
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight">QuickShow</h3>
            <p className="mt-2 text-muted-foreground">
              A fully functional movie ticketing app where users can browse showtimes, pick their seats, pay online, and receive a scannable ticket on their phone — all in one seamless flow.
            </p>
            <ul className="mt-4 space-y-2">
              {highlights.map((point) => (
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

          {/* Right: stack tags */}
          <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
            {stackTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Globe, Search, ShieldCheck, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Modern websites built to look credible, load fast, and communicate your value with clarity from the first interaction.",
    icon: Globe,
  },
  {
    title: "Local Search Visibility",
    description:
      "SEO-ready page structure, technical foundations, and content organization designed to help Buffalo-area businesses get discovered locally.",
    icon: Search,
  },
  {
    title: "Website Management & Support",
    description:
      "Ongoing updates, refinements, and technical support that keep your website current, stable, and performing at its best.",
    icon: ShieldCheck,
  },
  {
    title: "Performance & User Experience",
    description:
      "Speed optimization and UX improvements across mobile and desktop to reduce drop-off and create smoother user journeys.",
    icon: Zap,
  },
];

export default function HomeServicesSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute left-0 top-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
        <div className="orb absolute right-0 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <ShieldCheck className="size-3.5" />
            Services Built Around Business Growth
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Every part of the website is designed to reduce friction, strengthen trust, and move the right visitors toward action.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Holtz Digital focuses on modern digital experiences that perform well, communicate clearly, and support long-term business growth.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/40 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-card/60"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
            Talk About Your Project
          </Link>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
          >
            Read SEO and Web Tips
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

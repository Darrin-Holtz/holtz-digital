import Link from "next/link";
import { ArrowRight, Globe, Search, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Website Design",
    description:
      "Clean, modern pages designed to communicate your value quickly and drive the right action.",
    icon: Globe,
  },
  {
    title: "Local SEO Foundations",
    description:
      "On-page structure, content hierarchy, and technical setup to help Buffalo-area searches find you.",
    icon: Search,
  },
  {
    title: "Website Care + Updates",
    description:
      "Reliable edits, quality-of-life improvements, and ongoing support to keep your site current.",
    icon: Wrench,
  },
  {
    title: "Performance Optimization",
    description:
      "Speed and UX tuning across mobile and desktop to lower bounce and improve engagement.",
    icon: Sparkles,
  },
];

export default function HomeServicesSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <ShieldCheck className="size-3.5" />
            Service Snapshot
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Built for speed, clarity, and better next steps.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Each service is scoped to reduce friction in the user journey and make it easier for the right visitors to contact you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="border-border/70 bg-gradient-to-b from-card to-card/70 shadow-sm"
              >
                <CardHeader>
                  <div className="mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
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

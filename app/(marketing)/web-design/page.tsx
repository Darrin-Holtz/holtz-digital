import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Gauge, LayoutTemplate, Search, Smartphone, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Web Design Services",
  description:
    "What web design includes at Holtz Digital: custom website design, UX/UI design, mobile responsiveness, SEO-friendly structure, speed optimization, and CMS setup.",
  alternates: {
    canonical: "/web-design",
  },
  openGraph: {
    title: "Web Design Services | Holtz Digital",
    description:
      "Clear web design scope and deliverables so you know what you are paying for and why the work matters.",
    url: "https://holtzdigital.com/web-design",
  },
};

const includedItems = [
  {
    title: "Custom website design",
    description:
      "A design system tailored to your business goals, offer, and audience instead of a recycled template.",
    icon: LayoutTemplate,
  },
  {
    title: "UX/UI design",
    description:
      "Intentional page flow, hierarchy, and calls to action so people can understand your offer and take the next step.",
    icon: CheckCircle2,
  },
  {
    title: "Mobile responsiveness",
    description:
      "Layouts and interactions optimized for phones, tablets, and desktops, not just stretched to fit.",
    icon: Smartphone,
  },
  {
    title: "SEO-friendly structure",
    description:
      "Clean headings, page architecture, metadata-ready sections, and crawlable structure built in from day one.",
    icon: Search,
  },
  {
    title: "Speed optimization",
    description:
      "Performance-focused builds that load quickly, reduce friction, and support better user engagement.",
    icon: Gauge,
  },
  {
    title: "CMS setup",
    description:
      "Content workflows configured for your stack, including WordPress, Convex, Sanity.io, or MongoDB-backed setups when needed.",
    icon: Clock3,
  },
];

const trustSignals = [
  "Clear scope before work starts so pricing is tied to concrete deliverables.",
  "Direct communication with realistic timelines and milestone-based progress.",
  "Build decisions explained in plain English so you know why each part exists.",
  "Maintainable implementation so updates do not become expensive later.",
];

const differentiators = [
  {
    title: "Conversion-focused design",
    body: "Pages are designed to guide action, not just look good in a screenshot.",
  },
  {
    title: "Fast turnaround",
    body: "Clear milestones and focused scope keep projects moving without drag.",
  },
  {
    title: "Ongoing support",
    body: "Launch is not the finish line. You can get continued updates and refinements.",
  },
  {
    title: "Direct collaboration",
    body: "You work directly with me, so communication stays clear and decisions happen quickly.",
  },
];

const packages = [
  {
    name: "Basic",
    price: "Starting at $1,500",
    details: [
      "Custom brochure-style website",
      "Mobile responsive build",
      "SEO-friendly page structure",
      "Speed and launch setup",
    ],
  },
  {
    name: "Standard",
    price: "Starting at $3,000",
    details: [
      "Everything in Basic",
      "Expanded UX/UI for multiple service pages",
      "Conversion-focused content layout",
      "CMS setup for ongoing content updates",
    ],
  },
  {
    name: "Premium",
    price: "Starting at $5,500",
    details: [
      "Everything in Standard",
      "Advanced page strategy and funnels",
      "Performance and technical SEO deep pass",
      "Post-launch optimization support",
    ],
  },
];

const faqs = [
  {
    question: "Do you handle hosting?",
    answer:
      "Yes. I can recommend the right hosting provider, configure the environment, and handle deployment so the site is stable from day one.",
  },
  {
    question: "Is the website mine after completion?",
    answer:
      "Yes. The website and content are yours after final payment. You keep full ownership and control of your project assets.",
  },
  {
    question: "Do you handle the domain?",
    answer:
      "I can guide domain setup, DNS configuration, and domain connection. If you already own a domain, I can connect it to your new site.",
  },
];

const websiteTypes = [
  {
    title: "Lead Generation Websites",
    audience: "Best for contractors, home services, lawyers, consultants, and agencies.",
    goal: "Get calls, quote requests, and form submissions.",
    features: [
      "Contact forms and click-to-call CTAs",
      "Service pages built for local intent",
      "Testimonials and trust signals",
      "Local SEO foundations",
    ],
  },
  {
    title: "E-commerce Websites",
    audience: "Best for retail stores, product brands, and specialty product businesses.",
    goal: "Sell products online with a smooth buying flow.",
    features: [
      "Product pages, cart, and checkout",
      "Payment integration",
      "Inventory and order workflows",
      "Lightweight ordering options when full ecommerce is not needed",
    ],
  },
  {
    title: "Booking and Appointment Websites",
    audience: "Best for salons, spas, gyms, clinics, and service providers with schedules.",
    goal: "Let customers self-book available time slots.",
    features: [
      "Calendar and scheduling integration",
      "Automated confirmations",
      "Rescheduling flows",
      "Booking-focused CTAs",
    ],
  },
  {
    title: "Informational (Brochure) Websites",
    audience: "Best for small local businesses and newer businesses establishing trust.",
    goal: "Build credibility and make core information easy to find.",
    features: [
      "About and services pages",
      "Location, hours, and contact details",
      "Clear first impression and brand story",
      "Foundational conversion paths",
    ],
  },
  {
    title: "Hybrid Websites",
    audience: "Best for businesses that need multiple functions in one site.",
    goal: "Combine trust, lead capture, and transactions in one experience.",
    features: [
      "Examples: menu plus ordering plus reservations",
      "Examples: info plus memberships plus class bookings",
      "Examples: portfolio plus quote requests",
      "Scalable structure for higher-value growth",
    ],
  },
  {
    title: "Membership and Subscription Sites",
    audience: "Best for gyms, coaching businesses, and recurring-service brands.",
    goal: "Create recurring revenue and retention.",
    features: [
      "User accounts and access control",
      "Subscription billing",
      "Gated resources or member areas",
      "Lifecycle-focused onboarding flows",
    ],
  },
  {
    title: "Landing Pages for Ads",
    audience: "Best for promotions, seasonal campaigns, and paid traffic.",
    goal: "Convert intent quickly with minimal distractions.",
    features: [
      "Single focused offer",
      "Strong primary CTA",
      "Message-match with ad campaigns",
      "Fast-load, low-friction structure",
    ],
  },
];

export default function WebDesignPage() {
  return (
    <div className="relative overflow-hidden pb-20 pt-10 sm:pt-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.72_0_0/.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.72_0_0/.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 px-6 py-10 shadow-sm backdrop-blur sm:px-8 sm:py-14 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
              <Sparkles className="size-3.5" />
              Web Design Services
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Why should you trust me to design your website?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Trust should come from clarity, not hype. You should know exactly what web design includes,
              what outcomes each part supports, and how that scope connects to pricing.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              My process is straightforward: I define the scope, build in milestones, and keep the implementation
              clean so your site is easier to maintain after launch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
                Start a Project Conversation
              </Link>
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
              >
                Learn About How I Work
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-border/70 shadow-sm">
              <Image
                src="/web-design.jpg"
                alt="Web design workspace with dual monitors showing design work in progress"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <Card className="border-border/70 bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">What trust looks like in practice</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm leading-7 text-muted-foreground">
                  {trustSignals.map((item) => (
                    <li key={item} className="rounded-xl border border-border/70 bg-background/60 p-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What web design includes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Clear deliverables so pricing makes sense.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              This is the baseline scope I use so there is no confusion about what you are paying for.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/70 shadow-sm">
            <Image
              src="/Figma-Prototype.jpg"
              alt="Figma prototype open in design tool showing UI components and screen layout"
              width={1400}
              height={700}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {includedItems.map((item) => {
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
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pt-16">
        <div className="w-full">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why choose me</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            What makes Holtz Digital different from typical agencies
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Short version: better business outcomes, faster execution, and support after launch.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 text-sm leading-7 text-muted-foreground">
          {differentiators.map((item) => (
            <li key={item.title} className="rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-1">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16">
        <div className="w-full">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Website strategy</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            I design websites tailored to how your business makes money.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Most local businesses do not need full ecommerce. The right build depends on your revenue model,
            your customer journey, and what action you want visitors to take next.
          </p>
          <div className="mt-5 rounded-xl border border-border/70 bg-card/70 p-4 text-sm leading-7 text-muted-foreground">
            <p className="font-semibold text-foreground">Business outcome first</p>
            <p className="mt-1">
              The goal is never just a website type. The goal is more customers, less operational friction,
              and stronger revenue from your online presence.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {websiteTypes.map((type) => (
            <Card key={type.title} className="border-border/70 bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">{type.audience}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-foreground">Goal: {type.goal}</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                  {type.features.map((feature) => (
                    <li key={feature} className="rounded-lg border border-border/60 bg-background/50 px-3 py-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Starting rates and packages
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            You do not need a custom quote just to get a baseline. These starting points help filter fit before I scope details.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="border-border/70 bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <p className="text-sm font-semibold text-primary">{pkg.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {pkg.details.map((detail) => (
                    <li key={detail} className="rounded-lg border border-border/60 bg-background/50 px-3 py-2">
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions before you get started
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border/70 bg-card/80 p-5 shadow-sm transition-colors open:bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-foreground marker:content-none">
                <span>{faq.question}</span>
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

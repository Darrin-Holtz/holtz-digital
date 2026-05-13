import { Gauge, Layers, Sparkles, TrendingUp } from "lucide-react";

const outcomes = [
  {
    title: "Performance That Feels Instant",
    description:
      "Fast, mobile-first websites engineered to keep users engaged and reduce drop-off before they leave the page.",
    icon: Gauge,
  },
  {
    title: "Designed to Convert",
    description:
      "Clear messaging, intentional page structure, and strategic calls-to-action that guide visitors toward meaningful action.",
    icon: Layers,
  },
  {
    title: "Built for Long-Term Growth",
    description:
      "Clean, scalable builds that are easy to manage, easy to expand, and never weighed down by bloated systems.",
    icon: TrendingUp,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Strategy & Direction",
    description:
      "A focused discovery call to understand your business, goals, and what the website actually needs to accomplish.",
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "Structured milestones with clear communication from wireframes to launch-ready development.",
  },
  {
    number: "03",
    title: "Launch & Optimization",
    description:
      "SEO-ready foundations, fast performance, and a polished experience across every device.",
  },
  {
    number: "04",
    title: "Iterate & Improve",
    description:
      "Post-launch improvements informed by real user behavior, engagement, and business growth.",
  },
];

export default function HomeAuthenticSection() {
  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="orb absolute bottom-0 right-0 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="w-full">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Built on Real Business Outcomes
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            No inflated numbers. No fake case studies.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Just fast, modern websites built to create clarity, build trust, and drive action. Holtz Digital focuses on what actually matters: strong messaging, clean architecture, and user experiences designed to turn visits into real customer conversations.
          </p>
        </div>

        {/* Outcome cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-border/70 bg-gradient-to-b from-card to-card/60 p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Process steps */}
        <div className="mt-14">
          <h3 className="text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Projects Move Forward
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-border/70 bg-card/70 p-5 backdrop-blur"
              >
                <span className="text-3xl font-bold tracking-tighter text-primary/30">
                  {step.number}
                </span>
                <h4 className="mt-2 font-semibold text-foreground">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

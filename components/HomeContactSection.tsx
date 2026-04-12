"use client";

import { type FormEvent, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const PROJECT_TYPES = [
  "Website Design",
  "Website Redesign",
  "Local SEO Foundations",
  "Maintenance & Updates",
  "Performance Optimization",
  "Not sure yet",
];

const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Need guidance",
];

export default function HomeContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [details, setDetails] = useState("");

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`Website inquiry from ${name || "New lead"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType}`,
        `Budget: ${budget}`,
        "",
        "Project Details:",
        details,
      ].join("\n")
    );

    window.location.href = `mailto:hello@holtzdigital.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="relative pt-4 pb-16 sm:pt-8 sm:pb-24" id="contact">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            <Sparkles className="size-3.5" />
            Project Inquiry
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Tell me what you are building
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Share a few details and I will send back a focused recommendation with next steps.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-4xl border-border/70 bg-card/85 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle>Start your project inquiry</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={submitInquiry}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {PROJECT_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <select
                    id="budget"
                    name="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {BUDGET_RANGES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Project Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="What are you trying to improve? Timeline, goals, current site issues, anything helpful."
                  className="min-h-28"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" className="px-6 py-3">
                  Send Inquiry
                  <Send className="ml-2 size-4" />
                </Button>
                <Link href="mailto:hello@holtzdigital.com" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Prefer email directly
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

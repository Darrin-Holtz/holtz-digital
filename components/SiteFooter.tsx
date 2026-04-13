import Link from "next/link";
import { GitBranch, BriefcaseBusiness, Mail, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Darrin-Holtz",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: BriefcaseBusiness,
  },
  {
    label: "Email",
    href: "mailto:hello@holtzdigital.com",
    icon: Mail,
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-border/70 pt-4 pb-8 sm:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 border-b border-border/70 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">Final Step</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Ready to turn your website into a lead engine?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with a focused project conversation and a clear action plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#contact" className={cn(buttonVariants({ size: "lg" }), "px-5")}>Get a Free Quote</Link>
              <Link href="/blog" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group px-5")}>
                Read the Blog
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-semibold">Holtz Digital</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Modern web design for local businesses that want more qualified leads.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Buffalo, NY Area</p>
            </div>

            <div>
              <p className="text-sm font-semibold">Services</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Website Design</li>
                <li>Local SEO Foundations</li>
                <li>Website Care + Updates</li>
                <li>Performance Optimization</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">Quick Links</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/#contact" className="hover:text-foreground">Contact</Link></li>
              </ul>

              <div className="mt-4 flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright {currentYear} Holtz Digital. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span>Privacy policy available upon request</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

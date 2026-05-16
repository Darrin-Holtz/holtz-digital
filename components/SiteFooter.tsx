import Link from "next/link";
import { GitBranch, BriefcaseBusiness, Mail, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.514c-1.491 0-1.956.931-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darrin-holtz-a6909a2b1/",
    icon: BriefcaseBusiness,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Darrin.Holtz/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/akadarrinholtz/",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DarrinHoltz",
    icon: YouTubeIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Darrin-Holtz",
    icon: GitBranch,
  },
  {
    label: "Email",
    href: "mailto:support@holtzdigital.com",
    icon: Mail,
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-border/70 pt-4 pb-8 sm:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
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
              <address className="mt-2 text-sm text-muted-foreground not-italic">
                Buffalo, NY
              </address>
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

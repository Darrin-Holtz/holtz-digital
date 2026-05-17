"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Newspaper,
  FilePlus,
  Inbox,
  ExternalLink,
  LogOut,
} from "lucide-react";

const adminLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/posts", label: "Posts", icon: Newspaper, exact: false },
  { href: "/dashboard/posts/new", label: "New Post", icon: FilePlus, exact: true },
  { href: "/dashboard/leads", label: "Leads", icon: Inbox, exact: false },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen sticky top-0 border-r bg-background">
      {/* Logo */}
      <div className="px-5 py-6 border-b">
        <Link href="/dashboard">
          <span className="text-xl font-bold">
            Admin<span className="text-blue-500">Panel</span>
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {adminLinks.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "hover:bg-muted text-muted-foreground hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t flex flex-col gap-1">
        <Link
          href="/blog"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="size-4 shrink-0" />
          View Site
        </Link>
        <button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Successfully signed out.");
                  router.push("/");
                },
                onError: (error) => {
                  toast.error(error.error.message);
                },
              },
            })
          }
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
        >
          <LogOut className="size-4 shrink-0" />
          Sign Out
        </button>
        <div className="px-3 py-1">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants, Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/posts/new", label: "New Post" },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-full py-5 flex items-center justify-between border-b mb-6">
      <div className="flex items-center gap-8">
        <Link href="/dashboard">
          <h1 className="text-2xl md:text-3xl font-bold">
            Admin<span className="text-blue-500">Panel</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          {adminLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  isActive && "bg-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link className={buttonVariants({ variant: "outline" })} href="/blog">
          View Site
        </Link>
        <Button
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
        >
          Logout
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
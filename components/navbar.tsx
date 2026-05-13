"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/about", label: "About" },
    { href: "/web-design", label: "Web Design" },
    { href: "/blog", label: "Blog" },
];

export function Navbar() {
    const session = authClient.useSession();
    const isAuthenticated = Boolean(session.data?.user);
    const isLoading = session.isPending;
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleSignOut = () =>
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
        });

    return (
        <nav className="w-full">
            {/* Desktop / top bar */}
            <div className="py-5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                        <h1 className="text-3xl font-bold">
                            Holtz<span className="text-blue-500">Digital</span>
                        </h1>
                    </Link>
                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                className={buttonVariants({ variant: "ghost" })}
                                href={href}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {pathname.startsWith("/blog") && (
                        <div className="hidden md:block mr-2">
                            <SearchInput />
                        </div>
                    )}
                    {!isLoading && isAuthenticated && (
                        <Button className="hidden md:inline-flex" onClick={handleSignOut}>
                            Logout
                        </Button>
                    )}
                    <ThemeToggle />
                    {/* Hamburger — mobile only */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile full-screen overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-6">
                    {/* Close button */}
                    <button
                        className="absolute top-5 right-4 p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {pathname.startsWith("/blog") && (
                        <div className="w-64">
                            <SearchInput />
                        </div>
                    )}

                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-white text-2xl font-medium hover:text-blue-400 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}

                    {!isLoading && isAuthenticated && (
                        <button
                            className="text-white text-2xl font-medium hover:text-blue-400 transition-colors"
                            onClick={() => {
                                setMobileOpen(false);
                                handleSignOut();
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
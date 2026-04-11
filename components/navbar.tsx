"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth, useQuery } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
import { api } from "@/convex/_generated/api";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const profile = useQuery(api.profiles.getCurrentProfile);
    const router = useRouter();
    const pathname = usePathname();

    return(
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        Darrin<span className="text-blue-500">Holtz</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-2">                    
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    {!isLoading && isAuthenticated && profile?.role === "admin" && (
                        <Link className={buttonVariants({ variant: "ghost" })} href="/dashboard">Dashboard</Link>
                    )}
                </div>                
            </div>
            <div className="flex items-center gap-2">
                {pathname.startsWith("/blog") && (
                    <>
                        <div className="block md:hidden mr-2">
                            <SearchInput />
                        </div>                
                        <div className="hidden md:block mr-2">
                            <SearchInput />
                        </div>
                    </>
                )}
                {!isLoading && isAuthenticated && (
                    <Button 
                        onClick={() => 
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        toast.success("Successfully signed out.");
                                        router.push("/");
                                    },
                                    onError: (error) => {
                                        toast.error(error.error.message)
                                    }
                                }
                            })
                        }
                    >
                        Logout
                    </Button> 
                )}                
                <ThemeToggle />
            </div>
        </nav>
    )
}
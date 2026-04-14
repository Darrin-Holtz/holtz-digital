"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export function Navbar() {
    const session = authClient.useSession();
    const isAuthenticated = Boolean(session.data?.user);
    const isLoading = session.isPending;
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
                    <Link className={buttonVariants({ variant: "ghost" })} href="/about">About</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/web-design">Web Design</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
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
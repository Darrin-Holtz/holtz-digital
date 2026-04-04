'use client';

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
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
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog/create">Create</Link>
                </div>                
            </div>
            <div className="flex items-center gap-2">
                {isLoading ? null : isAuthenticated ? (
                    <Button>Logout</Button>
                ) : (
                    <>

                        <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">Sign up</Link>
                        <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link> 
                    </>    
                )}
                <ThemeToggle />
            </div>
        </nav>
    )
}
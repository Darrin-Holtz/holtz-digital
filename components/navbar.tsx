import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function Navbar() {
    return(
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        Darrin<span className="text-blue-500">Holtz</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="/blog">Blog</Link>
                    <Link href="/blog/create">Create</Link>
                </div>                
            </div>
            <div className="flex items-center gap-2">
                <Link className={buttonVariants({ variant: "secondary" })} href="/auth/sigm-up">Sign up</Link>
                <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Login</Link>
            </div>
        </nav>
    )
}
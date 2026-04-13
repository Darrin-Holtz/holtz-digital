import { Navbar } from "@/components/navbar";
import SiteFooter from "@/components/SiteFooter";
import { ReactNode, Suspense } from "react";
import { connection } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function NavbarFallback() {
    return <div className="w-full h-[76px]" aria-hidden="true" />;
}

export default async function SharedLayout({ children }: { children: ReactNode }) {
    await connection();

    return(
        <>
            <Suspense fallback={<NavbarFallback />}>
                <Navbar />
            </Suspense>
            {children}
            <SiteFooter />
        </>
    )
}
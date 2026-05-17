import { Navbar } from "@/components/navbar";
import SiteFooter from "@/components/SiteFooter";
import { ReactNode, Suspense } from "react";

function NavbarFallback() {
    return <div className="w-full h-[76px]" aria-hidden="true" />;
}

export default function SharedLayout({ children }: { children: ReactNode }) {
    return(
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            <Suspense fallback={<NavbarFallback />}>
                <Navbar />
            </Suspense>
            {children}
            <SiteFooter />
        </div>
    )
}
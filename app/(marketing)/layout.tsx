import { Navbar } from "@/components/navbar";
import { ReactNode, Suspense } from "react";

function NavbarFallback() {
    return <div className="w-full h-[76px]" aria-hidden="true" />;
}

export default function SharedLayout({ children }: { children: ReactNode }) {
    return(
        <>
            <Suspense fallback={<NavbarFallback />}>
                <Navbar />
            </Suspense>
            {children}
        </>
    )
}
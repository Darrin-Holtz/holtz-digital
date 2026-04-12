import HeroSection from "@/components/HeroSection";
import HomeAuthenticSection from "@/components/HomeAuthenticSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import HomeContactSection from "@/components/HomeContactSection";
import SiteFooter from "@/components/SiteFooter";
import { unstable_noStore as noStore } from "next/cache";
import { connection } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Holtz Digital",
  "description": "Holtz Digital offers web design, local SEO, e-commerce, and website maintenance services to businesses in the Buffalo, NY and Western New York area.",
  "url": "https://holtzdigital.com",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buffalo",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "areaServed": "Western New York",
  "sameAs": [],
  "priceRange": "$$"
};

export default async function Home() {
  noStore();
  await connection();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <HomeAuthenticSection />
      <HomeServicesSection />
      <HomeFaqSection />
      <HomeContactSection />
      <SiteFooter />
    </div>
  );
}

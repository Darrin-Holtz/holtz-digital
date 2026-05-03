import HeroSection from "@/components/HeroSection";
import HomeAuthenticSection from "@/components/HomeAuthenticSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import HomeWorkSection from "@/components/HomeWorkSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import HomeContactSection from "@/components/HomeContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buffalo Web Design for Local Businesses",
  description:
    "Holtz Digital builds fast, custom websites for Buffalo businesses with clear messaging, strong local search fundamentals, and modern performance.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Buffalo Web Design for Local Businesses",
    description:
      "Fast, custom websites for Buffalo businesses with clear messaging and local search fundamentals.",
    url: "https://holtzdigital.com",
  },
  twitter: {
    title: "Buffalo Web Design for Local Businesses",
    description:
      "Fast, custom websites for Buffalo businesses that want clearer positioning and better conversion paths.",
  },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://holtzdigital.com/#organization",
      name: "Holtz Digital",
      description:
        "Holtz Digital offers web design, local SEO foundations, website optimization, and maintenance for businesses in Buffalo, NY and Western New York.",
      url: "https://holtzdigital.com",
      telephone: "+1-716-461-3129",
      image: "https://holtzdigital.com/DarrinHoltz.png",
      logo: "https://holtzdigital.com/DarrinHoltz.png",
      areaServed: ["Buffalo, NY", "Western New York"],
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buffalo",
        addressRegion: "NY",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-716-461-3129",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
      sameAs: ["https://github.com/Darrin-Holtz"],
      serviceType: [
        "Website Design",
        "Website Redesign",
        "Local SEO Foundations",
        "Website Maintenance",
        "Performance Optimization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://holtzdigital.com/#website",
      url: "https://holtzdigital.com",
      name: "Holtz Digital",
      description:
        "Buffalo web design and local SEO services for businesses that want clearer positioning and stronger lead flow.",
      inLanguage: "en-US",
      publisher: {
        "@id": "https://holtzdigital.com/#organization",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://holtzdigital.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a typical website project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most brochure-style websites take about 2 to 4 weeks depending on scope, content readiness, and revision rounds.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer SEO with web design?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every build includes technical and on-page SEO foundations like clean structure, heading hierarchy, metadata-ready pages, and performance optimization.",
          },
        },
        {
          "@type": "Question",
          name: "Can you redesign my existing site instead of building from scratch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. I can modernize your current site, improve speed and UX, and keep what is working while removing friction points.",
          },
        },
        {
          "@type": "Question",
          name: "Will my site be easy to update after launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. I build with maintainability in mind so you can update content and basic sections without fighting your codebase.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide ongoing support after launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. I offer ongoing updates, maintenance, and optimization support so your website stays healthy as your business grows.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with a quick discovery call. I will define your goals, target audience, and the pages you need, then map out a clear build plan.",
          },
        },
      ],
    },
  ],
};

export default async function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <HeroSection />
      <HomeAuthenticSection />
      <HomeServicesSection />
      <HomeWorkSection />
      <HomeFaqSection />
      <HomeContactSection />
    </div>
  );
}

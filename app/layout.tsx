import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holtzdigital.com"),
  applicationName: "Holtz Digital",
  title: {
    default: "Buffalo Web Design and Local SEO | Holtz Digital",
    template: "%s | Holtz Digital",
  },
  description:
    "Holtz Digital designs fast, SEO-ready websites for Buffalo businesses that want more qualified leads, better UX, and stronger local visibility.",
  keywords: [
    "Buffalo web design",
    "Buffalo web designer",
    "web design Buffalo NY",
    "local SEO Buffalo",
    "small business website design",
    "website redesign Buffalo",
    "Holtz Digital",
  ],
  authors: [{ name: "Darrin Holtz" }],
  creator: "Darrin Holtz",
  publisher: "Holtz Digital",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://holtzdigital.com",
    siteName: "Holtz Digital",
    title: "Buffalo Web Design and Local SEO | Holtz Digital",
    description:
      "Holtz Digital designs fast, SEO-ready websites for Buffalo businesses that want more qualified leads, better UX, and stronger local visibility.",
  },
  twitter: {
    card: "summary",
    title: "Buffalo Web Design and Local SEO | Holtz Digital",
    description:
      "Fast, SEO-ready websites for Buffalo businesses that want more qualified leads.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            {children}
          </main>
          <Toaster closeButton />
        </Providers>
      </body>
    </html>
  );
}

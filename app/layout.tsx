import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { TopNav } from "@/widgets/TopNav";
import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";

import { Providers } from "./providers";
import { AuthInit } from "@/components/AuthInit";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luca-lombardi.store"),
  title: {
    default:
      "Luca Lombardi — Premium Fashion Store | Men's & Women's Collections",
    template: "%s | Luca Lombardi",
  },
  description:
    "Luca Lombardi — designer men's and women's fashion: coats, dresses, cashmere, sunglasses. Free shipping and easy returns & exchanges.",
  keywords: [
    "Luca Lombardi",
    "designer fashion",
    "men's coats",
    "women's dresses",
    "cashmere",
    "luxury sunglasses",
    "fashion store",
  ],
  authors: [{ name: "Luca Lombardi" }],
  alternates: {
    canonical: "https://www.luca-lombardi.store",
  },
  openGraph: {
    type: "website",
    url: "https://www.luca-lombardi.store",
    siteName: "Luca Lombardi",
    title: "Luca Lombardi — Premium Fashion Store",
    description:
      "Designer men's and women's fashion: coats, dresses, cashmere, sunglasses. Free shipping and easy returns.",
    images: [
      {
        url: "/luca-lombardi-logo.png",
        width: 1200,
        height: 630,
        alt: "Luca Lombardi",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Lombardi — Premium Fashion Store",
    description:
      "Designer men's and women's fashion. Free shipping and easy returns.",
    images: ["/luca-lombardi-logo.png"],
  },
  icons: {
    icon: "/luca-lombardi-logo.png",
    shortcut: "/luca-lombardi-logo.png",
    apple: "/luca-lombardi-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "Luca Lombardi",
              url: "https://www.luca-lombardi.store",
              logo: "https://www.luca-lombardi.store/luca-lombardi-logo.png",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <AuthInit />
          <TopNav />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

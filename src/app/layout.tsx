import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { shop } from "@/data/shop";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE = "https://kanayalalkhatri.github.io/zazz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Zazz — New & Used Laptops in Karachi | Apple, HP, Dell, Lenovo",
  description:
    "Zazz by Jimi Laptop Traders — new and used laptops from every brand: MacBook, HP, Dell, Lenovo, ASUS and Acer. Tested used laptops, warranty and honest prices in Karachi.",
  keywords: [
    "laptop shop Karachi",
    "used laptops Karachi",
    "new laptops Pakistan",
    "MacBook price Pakistan",
    "Dell laptop",
    "HP laptop",
    "Lenovo ThinkPad",
    "Zazz",
    "Jimi Laptop Traders",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    title: "Zazz — Every laptop. New & used.",
    description: shop.intro,
    url: SITE,
    siteName: "Zazz",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: `${shop.name} — ${shop.owner}`,
  description: shop.intro,
  url: SITE,
  telephone: shop.phone,
  email: shop.email,
  openingHours: "Mo-Sa 11:00-21:00",
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  brand: ["Apple", "HP", "Dell", "Lenovo", "ASUS", "Acer"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

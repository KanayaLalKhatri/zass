import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { shop } from "@/data/shop";
import { asset } from "@/lib/asset";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE = "https://kanayalalkhatri.github.io/zass";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Zass — New & Used Laptops in Karachi | Apple, HP, Dell, Lenovo",
  description:
    "Zass by Jimmy Laptop Traders — new and used laptops from every brand: MacBook, HP, Dell, Lenovo, ASUS and Acer. Tested used laptops, warranty and honest prices in Karachi.",
  keywords: [
    "laptop shop Karachi",
    "used laptops Karachi",
    "new laptops Pakistan",
    "MacBook price Pakistan",
    "Dell laptop",
    "HP laptop",
    "Lenovo ThinkPad",
    "Zass",
    "Jimmy Laptop Traders",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    title: "Zass — Every laptop. New & used.",
    description: shop.intro,
    url: SITE,
    siteName: "Zass",
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
  telephone: ["+92-321-2021809", "+92-21-32270823"],
  address: { "@type": "PostalAddress", streetAddress: "GE-25-27, Ground Floor, Techno City Mall, Hasrat Mohani Road", addressLocality: "Karachi", postalCode: "74000", addressCountry: "PK" },
  brand: ["Apple", "HP", "Dell", "Lenovo", "ASUS", "Acer"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundImage: `url(${asset("/wood.jpg")})` }}>{children}</body>
    </html>
  );
}

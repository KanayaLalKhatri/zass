import type { Metadata, Viewport } from "next";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Zass Admin",
  robots: { index: false, follow: false },
  manifest: asset("/admin.webmanifest"),
  appleWebApp: { capable: true, title: "Zass Admin", statusBarStyle: "default" },
  icons: { apple: asset("/admin-icon-180.png"), icon: asset("/admin-icon-192.png") },
};

export const viewport: Viewport = {
  themeColor: "#e8742a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

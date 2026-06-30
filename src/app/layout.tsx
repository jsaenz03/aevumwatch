import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Grain } from "@/components/effects/Grain";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Loader } from "@/components/effects/Loader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aevum.watches"),
  title: "Aevum - Bespoke Luxury Watches, Designed Around You",
  description:
    "Aevum is a bespoke horology atelier. Every timepiece is designed around your vision, from case metal to dial texture, then hand-assembled in limited production.",
  keywords: ["bespoke watches", "custom luxury watches", "horology", "watch configurator"],
  openGraph: {
    title: "Aevum - Bespoke Luxury Watches",
    description:
      "Every Aevum timepiece is designed around your vision, then hand-assembled in our atelier.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable}`}>
      <body className="min-h-[100dvh] antialiased">
        <Loader />
        <AmbientBackground />
        <Grain />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

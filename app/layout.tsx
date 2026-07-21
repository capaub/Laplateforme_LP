import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner/ConsentBanner";
import React from "react";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const themeVars = {
"--color-primary": site.theme.primary,
"--color-primary-hover": site.theme.primaryHover,
"--color-text": site.theme.text,
"--color-text-muted": site.theme.textMuted,
"--color-background": site.theme.background,
"--color-surface": site.theme.surface,
} as React.CSSProperties;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: site.name,
    description: site.description,
    images: [{
      url: "/og.jpg",
      width: 1200,
      height: 630,
      alt: site.tagLine
    }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={geist.variable} style={themeVars}>
      <body>
      {children}
      <ConsentBanner />
      </body>
    </html>
  );
}

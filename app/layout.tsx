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
    default: site.seo.title,
    template: `%s - ${site.seo.title}`,
  },
  description: site.seo.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: site.seo.title,
    description: site.seo.description,
    images: [{
      url: "/og.jpg",
      width: 1200,
      height: 630,
      alt: site.seo.title
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

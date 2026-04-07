import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peligram Intelligence | Engineering Human Agency",
  description: "Transforming marginalized youth, school dropouts, and PWDs into world-class software developers. Bridging Bukonzo West to the global digital economy.",
  keywords: ["software development", "training", "Kasese", "Uganda", "youth empowerment", "PWD", "technology education"],
  authors: [{ name: "Peligram Intelligence" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className="min-h-full flex flex-col bg-[#050505] font-sans">
        {children}
      </body>
    </html>
  );
}
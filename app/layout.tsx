import type { Metadata, Viewport } from "next";
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

// Viewport must be a separate export in Next.js 14/15
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Peligram Intelligence | Engineering Human Agency",
  description: "Transforming marginalized youth, school dropouts, and PWDs into world-class software developers. Bridging Bukonzo West to the global digital economy.",
  keywords: ["software development", "training", "Kasese", "Uganda", "youth empowerment", "PWD", "technology education"],
  authors: [{ name: "Peligram Intelligence" }],
  icons: {
    icon: "/favicon.ico", // Ensure this file exists in /public
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
      <body className="min-h-full flex flex-col bg-[#050505] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
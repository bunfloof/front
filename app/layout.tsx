import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foxomy",
  icons: {
    icon: {
      url: "/icon.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    title: "Foxomy",
    description:
      "The best Minecraft server hosting provider with powerful hardware, 24/7 support, mods, and plugins. Start your server and play with friends today!",
    siteName: "Foxomy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://fur1.foxomy.com/fapublicimgs/foxomybanner.jpg",
        width: 1200,
        height: 630,
        alt: "Foxomy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foxomy",
    description:
      "The best Minecraft server hosting provider with powerful hardware, 24/7 support, mods, and plugins. Start your server and play with friends today!",
    images: ["https://fur1.foxomy.com/fapublicimgs/foxomybanner.jpg"],
  },
  description:
    "The best Minecraft server hosting provider with powerful hardware, 24/7 support, mods, and plugins. Start your server and play with friends today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#071F2C]`}
      >
        {/* Temporary Announcement Banner */}
        <a
          href="https://foxomy.com/billing/announcements/66/Chicago-IL-outage-and-transfers-today.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-2.5 px-4 text-center text-sm font-medium text-white hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg"
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <strong>Chicago Transfers Today:</strong> Chicago-IL server transfers are happening today. Click here for details →
          </span>
        </a>
        {children}
        <Footer />
      </body>
    </html>
  );
}

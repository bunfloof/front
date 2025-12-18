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
        {children}
        <Footer />
      </body>
    </html>
  );
}

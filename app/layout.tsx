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
  title: "Foxomy: The World's Furry Host in Progress and Research Excellence",
  icons: {
    icon: {
      url: "/icon.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    title: "Foxomy: The World's Furry Host in Progress and Research Excellence",
    description:
      "Foxomy provides hosting services with 24x7x365 power and uptime guarantees, top-of-the-line equipment, and round-the-clock customer support. Start your server and play with friends today!",
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
    title: "Foxomy: The World's Furry Host in Progress and Research Excellence",
    description:
      "Foxomy provides hosting services with 24x7x365 power and uptime guarantees, top-of-the-line equipment, and round-the-clock customer support. Start your server and play with friends today!",
    images: ["https://fur1.foxomy.com/fapublicimgs/foxomybanner.jpg"],
  },
  description:
    "Foxomy provides hosting services with 24x7x365 power and uptime guarantees, top-of-the-line equipment, and round-the-clock customer support. Start your server and play with friends today!",
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

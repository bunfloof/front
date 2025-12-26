import type { Viewport, Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "IP Location Lookup",
  description:
    "Look up geolocation data for any IP address using multiple APIs because I don't like how iplocation.net is filled with ads and miners.",
  openGraph: {
    siteName: "IP Location Lookup",
    title: "IP Location Lookup",
    description:
      "Look up geolocation data for any IP address using multiple APIs because I don't like how iplocation.net is filled with ads and miners.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Location Lookup",
    description:
      "Look up geolocation data for any IP address using multiple APIs because I don't like how iplocation.net is filled with ads and miners.",
    images: undefined,
  },
};

export default function IpGeolocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="themed-selection hide-global-footer themed-page">
        {children}
      </div>
    </ThemeProvider>
  );
}

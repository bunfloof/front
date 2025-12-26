import type { Viewport, Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Minecraft Server Status Checker",
  description:
    "Check the status of any Minecraft Java or Bedrock server because I don't like the Cloudflare challenge on mcsrvstat.us.",
  openGraph: {
    siteName: "Minecraft Server Status Checker",
    title: "Minecraft Server Status Checker",
    description:
      "Check the status of any Minecraft Java or Bedrock server because I don't like the Cloudflare challenge on mcsrvstat.us.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minecraft Server Status Checker",
    description:
      "Check the status of any Minecraft Java or Bedrock server because I don't like the Cloudflare challenge on mcsrvstat.us.",
    images: undefined,
  },
};

export default function MinecraftServerStatusLayout({
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

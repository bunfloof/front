import type { Metadata } from "next";

const OG_IMAGE = "https://fur1.foxomy.com/summerhost2026furry.png";

export const metadata: Metadata = {
  title: "Minecraft Hosting",
  description:
    '"A summerhost is a hosting provider, usually run by skids between the ages of 12 and 14 with the intention of creating a Minecraft host for no god-given reason. These usually use nulled WHMCS, free themes, Contabo nodes, and other bad business practices. These companies usually do not last long, and go under after a month or two."',
  openGraph: {
    title: "Foxomy",
    description:
      '"A summerhost is a hosting provider, usually run by skids between the ages of 12 and 14 with the intention of creating a Minecraft host for no god-given reason. These usually use nulled WHMCS, free themes, Contabo nodes, and other bad business practices. These companies usually do not last long, and go under after a month or two."',
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Foxomy Summer 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minecraft Hosting",
    description:
      "3 months free Minecraft server hosting with code SUMMERHOST2026 — no payment info required.",
    images: [OG_IMAGE],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

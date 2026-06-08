import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "where are you sharing this?", // browser tab only — set to whatever you want
  description: null, // drops the inherited meta description
  openGraph: { images: [] }, // replaces root openGraph entirely → kills og:title/description/site_name/image
  twitter: { images: [] }, // same for any inherited twitter-image
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

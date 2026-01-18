import type { Metadata } from "next";

const title = "Bero: A Distributed Deduplication Backup System";
const description =
  "A formal analysis of Bero, a distributed backup system with node-side content-defined chunking deployed at Foxomy Minecraft Hosting Infrastructure.";
const publishedDate = "2026-01-10";
const author = "Foxomy Team";
const coverImage = "/Bero.jpg";

export const metadata: Metadata = {
  title: `${title} | Research`,
  description,
  openGraph: {
    siteName: "Foxomy",
    title,
    description,
    type: "article",
    publishedTime: publishedDate,
    authors: [author],
    images: [{ url: coverImage, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [coverImage],
  },
};

export default function BeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

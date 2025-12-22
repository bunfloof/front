import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blogData";

const post = getPostBySlug("strategic-relations-guidelines");

export const metadata: Metadata = {
  title: post ? `${post.title}` : "Blog - Foxomy",
  description: post?.excerpt,
  openGraph: {
    siteName: post?.author ?? "Foxomy",
    title: post ? `${post.title}` : "Blog - Foxomy",
    description: post?.excerpt,
    type: "article",
    publishedTime: post?.date,
    authors: post?.author ? [post.author] : undefined,
    images: post?.coverImage
      ? [{ url: post.coverImage, alt: post.title }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: post ? `${post.title}` : "Blog - Foxomy",
    description: post?.excerpt,
    images: post?.coverImage ? [post.coverImage] : undefined,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

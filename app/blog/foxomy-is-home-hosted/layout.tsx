import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blogData";

const post = getPostBySlug("foxomy-is-home-hosted");

export const metadata: Metadata = {
  title: post ? `${post.title} - Foxomy` : "Blog - Foxomy",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

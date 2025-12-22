"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { useTheme } from "@/contexts/ThemeContext";
import { blogPosts } from "@/lib/blogData";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const { isDark } = useTheme();

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Banner - positioned behind content */}
      <div
        className="absolute top-0 left-0 right-0 h-80 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('/imgs/flowers.jpg')`,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(3, 15, 22, 0.6), rgba(3, 15, 22, 0.4), rgb(3, 15, 22))"
              : "linear-gradient(to bottom, rgba(248, 250, 252, 0.6), rgba(248, 250, 252, 0.4), rgb(248, 250, 252))",
          }}
        />
      </div>

      {/* Content - overlaps the banner */}
      <div className="relative">
        {/* Header */}
        <header className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-4xl font-bold transition-colors duration-300"
              style={{ color: "var(--themed-heading)" }}
            >
              Blog
            </h1>
          </div>
        </header>

        {/* Posts List */}
        <main className="pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article
                    className="rounded overflow-hidden transition-all duration-150 hover:opacity-80 hover:shadow-lg border"
                    style={{
                      borderColor: "var(--themed-border-strong)",
                      boxShadow: isDark
                        ? "0 4px 6px -1px rgba(26, 119, 173, 0.1)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Top section - Title */}
                    <div
                      className="relative p-4 border-b transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--themed-bg-secondary)",
                        borderColor: "var(--themed-border-strong)",
                      }}
                    >
                      <span
                        className="font-bold text-lg transition-colors duration-300"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        {post.title}
                      </span>
                      <div className="absolute right-4 -bottom-4 text-2xl">
                        {post.emoji}
                      </div>
                    </div>

                    {/* Bottom section - Description & Meta */}
                    <div
                      className="p-4 transition-colors duration-300"
                      style={{ backgroundColor: "var(--themed-bg)" }}
                    >
                      <div
                        className="text-sm truncate transition-colors duration-300"
                        style={{ color: "var(--themed-text)" }}
                      >
                        {post.excerpt}
                      </div>
                      <div
                        className="flex flex-wrap items-center gap-x-2 text-sm mt-2 transition-colors duration-300"
                        style={{ color: "var(--themed-text-muted)" }}
                      >
                        <span>{post.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          {post.authorImage && (
                            <Image
                              src={post.authorImage}
                              alt={post.author}
                              width={20}
                              height={20}
                              className="rounded-full object-cover"
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                          {post.author}
                        </span>
                        <span>·</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <ThemedFooter />
    </div>
  );
}

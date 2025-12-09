"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { blogPosts } from "@/lib/blogData";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="font-sans bg-[#030F16] min-h-screen">
      <MainNavbar />

      {/* Banner - positioned behind content */}
      <div
        className="absolute top-0 left-0 right-0 h-80 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('/imgs/flowers.jpg')`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030F16]/60 via-[#030F16]/40 to-[#030F16]" />
      </div>

      {/* Content - overlaps the banner */}
      <div className="relative">
        {/* Header */}
        <header className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white">Articles</h1>
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
                  <article className="border border-[#1A77AD]/30 rounded overflow-hidden transition-all duration-150 hover:opacity-80 hover:shadow-lg hover:shadow-[#1A77AD]/10">
                    {/* Top section - Title */}
                    <div className="relative p-4 bg-[#071F2C] border-b border-[#1A77AD]/30">
                      <span className="font-bold text-lg text-white">
                        {post.title}
                      </span>
                      <div className="absolute right-4 -bottom-4 text-2xl">
                        {post.category === "Announcements" && "📢"}
                        {post.category === "Tutorials" && "📚"}
                        {post.category === "Security" && "🛡️"}
                      </div>
                    </div>

                    {/* Bottom section - Description & Meta */}
                    <div className="bg-[#0a1a24] p-4">
                      <div className="text-[#BDE0F5] text-sm truncate">
                        {post.excerpt}
                      </div>
                      <div className="text-[#BDE0F5]/50 flex flex-wrap items-center gap-x-2 text-sm mt-2">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.author}</span>
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
    </div>
  );
}

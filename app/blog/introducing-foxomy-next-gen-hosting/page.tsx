"use client";

import { MainNavbar } from "@/components/MainNavbar";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function IntroducingFoxomyPost() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-sans bg-[#030F16] min-h-screen">
      <MainNavbar />

      {/* Header */}
      <header className="pt-32 pb-12 border-b border-[#1A77AD]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#7AC2EB] hover:text-[#00c4aa] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00c4aa]/10 text-[#00c4aa] text-xs font-semibold uppercase tracking-wider">
              Announcements
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Introducing Foxomy: Next-Generation Game Server Hosting
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#BDE0F5]/50">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Foxomy Team
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 5, 2025
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              5 min read
            </span>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 hover:text-[#00c4aa] transition-colors ml-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <div className="text-[#BDE0F5]/80 leading-relaxed space-y-6">
              <p className="text-xl text-[#BDE0F5]/90 leading-relaxed">
                We&apos;re thrilled to announce the official launch of Foxomy — a revolutionary
                game server hosting platform built from the ground up with performance,
                reliability, and developer experience in mind.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Why We Built Foxomy
              </h2>
              <p>
                After years of working with various hosting providers, we noticed a pattern:
                most platforms either offered powerful hardware with poor user experience, or
                great interfaces with subpar performance. We set out to change that.
              </p>
              <p>
                Foxomy was designed to eliminate the trade-offs. We believe you shouldn&apos;t
                have to choose between a beautiful, intuitive control panel and raw server
                performance. You deserve both.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                What Makes Us Different
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                🚀 Enterprise-Grade Hardware
              </h3>
              <p>
                Every Foxomy server runs on the latest AMD EPYC and Ryzen 9 processors,
                paired with NVMe SSDs and DDR5 memory. We don&apos;t oversell — your resources
                are dedicated to you.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                🛡️ Advanced DDoS Protection
              </h3>
              <p>
                Our multi-layered DDoS mitigation system can handle attacks up to 3Tbps
                without affecting your server&apos;s performance. Your players stay connected,
                no matter what.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                ⚡ Instant Deployment
              </h3>
              <p>
                Go from signup to playing in under 60 seconds. Our automated provisioning
                system gets your server online faster than you can finish your coffee.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                🎮 Game-Optimized
              </h3>
              <p>
                We don&apos;t just host game servers — we optimize for them. Our custom-tuned
                kernel configurations and network stack deliver the lowest possible latency
                for your players.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Supported Games
              </h2>
              <p>
                At launch, we&apos;re supporting the games our community loves most:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>Minecraft (Java & Bedrock)</li>
                <li>Palworld</li>
                <li>Rust</li>
                <li>Valheim</li>
                <li>ARK: Survival Evolved</li>
                <li>Terraria</li>
                <li>And many more...</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                What&apos;s Next
              </h2>
              <p>
                This is just the beginning. In the coming months, we&apos;ll be rolling out:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>API access for programmatic server management</li>
                <li>Custom Docker container support</li>
                <li>Advanced scheduling and automation tools</li>
                <li>Even more game support based on community feedback</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Get Started Today
              </h2>
              <p>
                Ready to experience hosting the way it should be? Create your first server
                today and see the difference for yourself. We&apos;re confident you&apos;ll love
                Foxomy as much as we loved building it.
              </p>
              <p>
                Questions? Our support team is available 24/7 via live chat, Discord, and
                email. We&apos;re here to help you succeed.
              </p>
              <p className="text-[#00c4aa] font-semibold">
                Welcome to the future of game server hosting. Welcome to Foxomy.
              </p>
            </div>
          </article>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-[#1A77AD]/20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#7AC2EB] hover:text-[#00c4aa] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all posts
            </Link>
          </div>
        </div>
      </main>

      {/* Footer spacer */}
      <div className="h-24" />
    </div>
  );
}





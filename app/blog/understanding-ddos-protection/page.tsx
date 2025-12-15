"use client";

import { MainNavbar } from "@/components/MainNavbar";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function DDoSProtectionPost() {
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-semibold uppercase tracking-wider">
              Security
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Understanding DDoS Protection: How We Keep Your Servers Safe
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#BDE0F5]/50">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Security Team
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              November 28, 2025
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              6 min read
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
            <div className="text-[#BDE0F5]/80 leading-relaxed space-y-6">
              <p className="text-xl text-[#BDE0F5]/90 leading-relaxed">
                Distributed Denial of Service (DDoS) attacks are one of the biggest threats 
                facing game servers today. In this post, we&apos;ll explain how these attacks 
                work and the comprehensive measures we take to protect your servers.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                What is a DDoS Attack?
              </h2>
              <p>
                A DDoS attack occurs when multiple compromised systems flood a target server 
                with traffic, overwhelming its resources and making it unavailable to 
                legitimate users. Think of it like thousands of people trying to enter a 
                small door simultaneously — nobody gets through.
              </p>
              <p>
                Game servers are particularly attractive targets because:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>They&apos;re highly visible and competitive environments</li>
                <li>Downtime directly impacts player experience</li>
                <li>Attackers may be motivated by rivalry, griefing, or extortion</li>
                <li>UDP-based game traffic is easier to spoof</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Types of DDoS Attacks
              </h2>

              <div className="grid gap-4 my-6">
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Volumetric Attacks</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    The most common type. Attackers flood your server with massive amounts 
                    of traffic (UDP floods, ICMP floods) to saturate your bandwidth.
                  </p>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Protocol Attacks</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    These exploit weaknesses in network protocols (SYN floods, Ping of Death) 
                    to exhaust server resources like connection tables.
                  </p>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Application Layer Attacks</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    More sophisticated attacks that target specific application vulnerabilities, 
                    requiring fewer resources to be effective.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Our Multi-Layer Protection System
              </h2>
              <p>
                At Foxomy, we&apos;ve built a comprehensive defense system that operates at 
                multiple levels to ensure your servers stay online.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Layer 1: Network Edge Protection
              </h3>
              <p>
                Our network edge can absorb attacks up to 3 Tbps. We peer directly with 
                major carriers and use anycast routing to distribute traffic across our 
                global scrubbing centers. Malicious traffic is filtered before it even 
                reaches our datacenters.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Layer 2: Intelligent Traffic Analysis
              </h3>
              <p>
                Machine learning algorithms analyze traffic patterns in real-time, 
                distinguishing between legitimate game traffic and attack vectors. 
                Our system adapts to new attack patterns within seconds.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Layer 3: Game-Aware Filtering
              </h3>
              <p>
                Unlike generic DDoS protection, our filters understand game protocols. 
                We can identify and block spoofed game packets while allowing real player 
                connections through — even during active attacks.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Layer 4: Per-Server Rate Limiting
              </h3>
              <p>
                Each server has configurable rate limits and connection thresholds. 
                This prevents any single source from overwhelming your server, even if 
                they somehow bypass upper layers.
              </p>

              {/* Stats Box */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#00c4aa]">3 Tbps</div>
                  <div className="text-xs text-[#BDE0F5]/50 mt-1">Max Absorption</div>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#00c4aa]">&lt;10ms</div>
                  <div className="text-xs text-[#BDE0F5]/50 mt-1">Detection Time</div>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#00c4aa]">99.99%</div>
                  <div className="text-xs text-[#BDE0F5]/50 mt-1">Uptime SLA</div>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#00c4aa]">24/7</div>
                  <div className="text-xs text-[#BDE0F5]/50 mt-1">NOC Monitoring</div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                What Happens During an Attack
              </h2>
              <p>
                When an attack is detected, our system responds automatically:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4 text-[#BDE0F5]/70">
                <li>
                  <strong className="text-white">Detection (0-10ms):</strong> Anomalous traffic 
                  patterns trigger our detection systems
                </li>
                <li>
                  <strong className="text-white">Classification (10-50ms):</strong> Attack type 
                  and characteristics are identified
                </li>
                <li>
                  <strong className="text-white">Mitigation (50-100ms):</strong> Appropriate 
                  filters are applied at the network edge
                </li>
                <li>
                  <strong className="text-white">Monitoring:</strong> Our NOC team is alerted 
                  and monitors the situation
                </li>
                <li>
                  <strong className="text-white">Adaptation:</strong> Filters are tuned in 
                  real-time as attack patterns evolve
                </li>
              </ol>

              <div className="bg-[#071F2C] border border-[#00c4aa]/30 rounded-lg p-6 my-8">
                <h4 className="text-[#00c4aa] font-semibold mb-2">🔒 Included on All Plans</h4>
                <p className="text-[#BDE0F5]/80 text-sm">
                  DDoS protection is included at no extra cost on every Foxomy server. 
                  We believe security shouldn&apos;t be a premium feature — it&apos;s a necessity.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Best Practices for Server Owners
              </h2>
              <p>
                While we handle the heavy lifting, here are some additional steps you can take:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>Keep your server IP private when possible</li>
                <li>Use our provided proxy addresses for public sharing</li>
                <li>Enable connection throttling in your game server config</li>
                <li>Whitelist known player IPs for private servers</li>
                <li>Report sustained attacks to our support team for analysis</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Conclusion
              </h2>
              <p>
                DDoS attacks are an unfortunate reality of running public game servers, 
                but they don&apos;t have to ruin your experience. With Foxomy&apos;s enterprise-grade 
                protection, you can focus on what matters — building your community and 
                enjoying the game.
              </p>
              <p>
                Questions about our DDoS protection? Reach out to our security team at{" "}
                <a href="mailto:security@foxomy.com" className="text-[#00c4aa] hover:underline">
                  security@foxomy.com
                </a>.
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








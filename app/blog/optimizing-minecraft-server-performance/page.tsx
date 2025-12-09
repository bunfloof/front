"use client";

import { MainNavbar } from "@/components/MainNavbar";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function OptimizingMinecraftPost() {
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#7AC2EB]/10 text-[#7AC2EB] text-xs font-semibold uppercase tracking-wider">
              Tutorials
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Optimizing Your Minecraft Server for Maximum Performance
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#BDE0F5]/50">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Technical Team
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 3, 2025
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              8 min read
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
                Running a smooth Minecraft server isn&apos;t just about having good hardware — 
                it&apos;s about knowing how to configure and optimize every aspect of your setup. 
                In this guide, we&apos;ll cover everything you need to know.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                JVM Flags: The Foundation
              </h2>
              <p>
                The Java Virtual Machine (JVM) flags you use can dramatically impact your 
                server&apos;s performance. Here are our recommended flags for servers with 
                8GB+ of RAM:
              </p>

              {/* Code Block */}
              <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4 overflow-x-auto my-6">
                <pre className="text-sm text-[#BDE0F5]/90 font-mono whitespace-pre-wrap">
{`java -Xms8G -Xmx8G -XX:+UseG1GC -XX:+ParallelRefProcEnabled 
-XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions 
-XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 
-XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M 
-XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 
-XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 
-XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 
-XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 
-jar server.jar nogui`}
                </pre>
              </div>

              <p>
                These flags use the G1 garbage collector, which is optimized for 
                low-latency applications like game servers. The key parameters to 
                adjust based on your setup are <code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">-Xms</code> and 
                <code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">-Xmx</code> (memory allocation).
              </p>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Server Software Selection
              </h2>
              <p>
                The server software you choose matters more than you might think:
              </p>

              <div className="grid gap-4 my-6">
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Paper</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    Best for most servers. Includes performance patches and supports 
                    Bukkit/Spigot plugins. Recommended for survival, minigames, and most use cases.
                  </p>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Purpur</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    Fork of Paper with additional features and configuration options. 
                    Great for servers that want maximum customization.
                  </p>
                </div>
                <div className="bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Fabric</h4>
                  <p className="text-sm text-[#BDE0F5]/70">
                    Lightweight modding platform. Best for modded servers using 
                    Fabric mods, especially with Lithium and Starlight optimizations.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Essential Configuration Tweaks
              </h2>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                server.properties
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">view-distance=8</code> — Reduce from default 10 to save resources</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">simulation-distance=6</code> — Limits entity processing range</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">network-compression-threshold=256</code> — Optimize network traffic</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                spigot.yml
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">mob-spawn-range: 6</code> — Reduce mob spawn distance</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">entity-activation-range</code> — Lower values reduce entity tick rate</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">merge-radius</code> — Increase item and XP merge radius</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                paper.yml (Paper servers)
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">max-auto-save-chunks-per-tick: 8</code> — Spread out save operations</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">optimize-explosions: true</code> — Use optimized explosion algorithm</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">use-faster-eigencraft-redstone: true</code> — Alternative redstone implementation</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Plugin Optimization
              </h2>
              <p>
                Plugins can make or break your server&apos;s performance. Here are some tips:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>Use <strong>Spark</strong> to profile your server and identify lag sources</li>
                <li>Remove unused plugins — each one adds overhead</li>
                <li>Replace heavy plugins with lighter alternatives when possible</li>
                <li>Configure plugin update intervals to reduce async task spam</li>
                <li>Use async plugins where available (e.g., async world editing)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                World Management
              </h2>
              <p>
                Large worlds can cause significant performance issues:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li>Pre-generate your world using Chunky to avoid generation lag</li>
                <li>Set a world border to prevent players from loading new chunks</li>
                <li>Clear old chunk data periodically with plugins like ClearLag</li>
                <li>Consider using separate worlds for different activities</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Monitoring Your Server
              </h2>
              <p>
                Regular monitoring helps you catch issues before they become problems:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-[#BDE0F5]/70">
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">/tps</code> — Check your server&apos;s ticks per second (20 is perfect)</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">/spark profiler</code> — Generate detailed performance reports</li>
                <li><code className="text-[#00c4aa] bg-[#071F2C] px-1.5 py-0.5 rounded">/timings</code> — Built-in Paper timing reports</li>
              </ul>

              <div className="bg-[#071F2C] border border-[#00c4aa]/30 rounded-lg p-6 my-8">
                <h4 className="text-[#00c4aa] font-semibold mb-2">💡 Pro Tip</h4>
                <p className="text-[#BDE0F5]/80 text-sm">
                  On Foxomy, all our Minecraft servers come pre-configured with optimized 
                  JVM flags and Paper&apos;s latest builds. Our control panel also includes 
                  one-click optimization profiles for different server types.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-10 mb-4 pb-2 border-b border-[#1A77AD]/20">
                Conclusion
              </h2>
              <p>
                Optimizing a Minecraft server is an ongoing process. Start with the 
                fundamentals — proper JVM flags and server software — then fine-tune 
                based on your specific use case and player count.
              </p>
              <p>
                Remember: the goal isn&apos;t to disable every feature, but to find the 
                right balance between performance and gameplay experience. Happy hosting!
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





"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Check,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

export default function NewTutorialVideosPost() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Header */}
      <header
        className="pt-32 pb-12 border-b transition-colors duration-300"
        style={{ borderColor: "var(--themed-border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:opacity-70"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono">cd /blog</span>
          </Link>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight transition-colors duration-300"
            style={{ color: "var(--themed-heading)" }}
          >
            New YouTube Tutorial Videos
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              May 24, 2026
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Image
                src="/imgs/portfolios/cozmo/nCBGCW68_400x400.jpg"
                alt="Cozmo"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />{" "}
              Cozmo
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Social Media
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 transition-colors cursor-pointer hover:opacity-80"
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
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div
              className="leading-relaxed space-y-6 transition-colors duration-300"
              style={{ color: "var(--themed-text)" }}
            >
              <Gallery>
                <Item
                  original="/imgs/blogs/new-tutorial-videos/newyoutubetutorials.jpg"
                  thumbnail="/imgs/blogs/new-tutorial-videos/newyoutubetutorials.jpg"
                  width="1920"
                  height="1080"
                  alt="New YouTube tutorial videos announcement"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/new-tutorial-videos/newyoutubetutorials.jpg"
                        alt="New YouTube tutorial videos announcement"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                We're excited to announce that we've started uploading new
                tutorial videos on our YouTube channel! You can check them out
                here:{" "}
                <a
                  href="https://youtube.com/@foxomy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  https://youtube.com/@foxomy
                </a>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-sm border transition-colors"
                  style={{ borderColor: "var(--themed-border)" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/JMzx9HQNV3Q"
                    title="Foxomy YouTube tutorial video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-sm border transition-colors"
                  style={{ borderColor: "var(--themed-border)" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/EoNi015Ceps"
                    title="Foxomy YouTube tutorial video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <p>
                The most common support requests from our users are help with
                installing modpacks, plugins, or setting up crossplay. We
                provide our users with all of the tools to successfully set up
                their server, so there’s nothing we can achieve that you can’t.
                We use the same panel user interface as our users to set up our
                servers. If any feature is missing, users can easily request it
                to be developed onto our panel.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                The Setup
              </h2>
              <Gallery>
                <Item
                  original="/imgs/blogs/new-tutorial-videos/20251104_225601.jpg"
                  thumbnail="/imgs/blogs/new-tutorial-videos/20251104_225601.jpg"
                  width="1920"
                  height="1081"
                  alt="cumo setup"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden transition-colors my-4"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/new-tutorial-videos/20251104_225601.jpg"
                        alt="cumo setup"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                To streamline our tutorial environment, we record all of our
                videos on a remote server running either macOS or Windows that
                resets after every video. This will ensure that all of our
                tutorials stay consistent and clean without the clutter of messy
                files that you've likely seen in other tutorials recorded on
                someone's personal computer. We'll try not to blur out anything
                as we don't have anything to hide, so what you see is exactly
                what you'll experience.
              </p>

              <p>
                Below are the top 3 ticket requests we’ve observed over the past
                few years:
              </p>

              <h3
                className="text-xl font-semibold mt-8 mb-3 transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                1. Modpack Installations
              </h3>

              <p>
                Not every modpack author respects CurseForge, so while our
                modpack installer can install most modpacks well, it can’t
                perfectly accommodate all modpacks. Some authors may leave
                important README.txt files and have different installation
                instructions for their modpacks. For example, FTB (Feed The
                Beast) no longer updates their modpacks on CurseForge. Linggango
                only uploads their server packs onto their Discord server. Some
                server packs even leave in client-sided mods like Oculus or Iris
                shaders that can’t be run on servers. It’s always a good idea to
                install the modpack manually and join their Discord server for
                server installation assistance.
              </p>

              <h3
                className="text-xl font-semibold mt-8 mb-3 transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                2. Plugins Help
              </h3>
              <p>
                Our Minecraft servers always ship with the default installation
                of the latest Vanilla (default) server jar. Players may become
                disappointed after learning commands like{" "}
                <code style={{ color: "var(--themed-accent)" }}>/speed</code>,{" "}
                <code style={{ color: "var(--themed-accent)" }}>/fly</code>, or
                <code style={{ color: "var(--themed-accent)" }}>/god</code> are
                an unknown commands. These commands are part of the popular
                plugin Essentials. In order to support plugins, they need to use
                the PaperMC server jar. Installing a different server jar is as
                easy as swapping out the old server jar with the new one.
              </p>

              <h3
                className="text-xl font-semibold mt-8 mb-3 transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                3. Bedrock and Crossplay Compatibility
              </h3>

              <p>
                Our Minecraft server comes shipped with the Java Edition
                software, but it can always be changed to Bedrock Edition. Many
                users prefer to keep their server on Java Edition but enable
                crossplay compatibility for Bedrock Edition players to join
                because the Java Edition ecosystem has better support for
                plugins and customizations. The crossplay compatibility just
                mentioned itself is proof of Java’s superior plugin support.{" "}
              </p>

              <p>
                We hope to publish more tutorial videos soon to help our
                community build their very best servers.
              </p>
              <p>Thank you for choosing Foxomy.</p>
            </div>
          </article>

          {/* cd /blog */}
          <div
            className="mt-16 pt-8 border-t transition-colors duration-300"
            style={{ borderColor: "var(--themed-border)" }}
          >
            <Link
              href="/blog"
              className="flex w-full justify-between items-center gap-2 transition-colors group rounded-md p-4 border font-mono"
              style={{
                color: "var(--themed-text)",
                borderColor: "var(--themed-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--themed-nav-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              cd /blog
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
}

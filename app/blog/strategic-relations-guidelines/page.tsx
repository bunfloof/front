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
import { ScrambledText } from "@/components/ScrambledText";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

export default function StrategicRelationsGuidelinesPost() {
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
            Relations Guidelines
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 17, 2025
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Foxomy Team
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Policy
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
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                For Staff Members
              </h2>
              <h3
                className="text-xl font-bold mb-4 transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                Competitor Relations
              </h3>
              <p>
                At Foxomy, we believe in focusing on our own work and letting
                our service speak for itself.
              </p>

              <p>
                Official Foxomy partners, affiliates, and staff members are
                expected to:
              </p>
              <ul
                className="list-disc list-inside space-y-2 ml-4 transition-colors duration-300"
                style={{ color: "var(--themed-text)" }}
              >
                <li>
                  Never comment, question, or participate in other hosting
                  providers' community spaces or Discord servers unless you are
                  a genuine customer of their services. (Please fucking stop,
                  Kayla)
                </li>
                <li>
                  Never talk negatively about other hosting providers anywhere,
                  including in our own Discord server.
                </li>
                <li>
                  Never try to correct other hosting providers' opinions or
                  misconceptions about Foxomy. If someone speaks negatively
                  about Foxomy, please agree that{" "}
                  <ScrambledText>
                    Bun is a furry/pedophile and move on.
                  </ScrambledText>
                </li>
              </ul>
              <p>
                If a person affiliated with another hosting provider is in our
                Discord server, it does not give you the right or entitlement to
                join their Discord server. We hold ourselves to our own
                standards regardless of what others do. Please don't be that
                person.
              </p>
              <p className="font-bold">
                Real example of behavior we want to avoid:
              </p>
              <Gallery>
                <Item
                  original="/imgs/blogs/strategic-relations-guidelines/brandon.png"
                  thumbnail="/imgs/blogs/strategic-relations-guidelines/brandon.png"
                  width="1245"
                  height="252"
                  alt="Example of condemned behavior"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden border transition-colors my-4"
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
                        src="/imgs/blogs/strategic-relations-guidelines/brandon.png"
                        alt="Example of condemned behavior"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                This type of public criticism of competitors reflects poorly on
                Brandon and Springracks Hosting. We should never engage in this
                behavior even if others do it.
              </p>
              <h3
                className="text-xl font-bold mb-4 transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                Humility and Representation
              </h3>

              <p>
                Working at Foxomy is a responsibility, not a status symbol.
                Staff members should not advertise their affiliation in any
                bios, status, social media profiles, or elsewhere outside of
                Foxomy.
              </p>
              <p className="font-bold">
                Real examples of behavior we want to avoid:
              </p>
              <Gallery>
                <div className="flex flex-wrap items-start gap-4 my-4">
                  <Item
                    original="/imgs/blogs/strategic-relations-guidelines/skryptiopx.png"
                    thumbnail="/imgs/blogs/strategic-relations-guidelines/skryptiopx.png"
                    width="543"
                    height="732"
                    alt="Example of condemned behavior"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden border transition-colors max-w-[300px]"
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
                          src="/imgs/blogs/strategic-relations-guidelines/skryptiopx.png"
                          alt="Example of condemned behavior"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="/imgs/blogs/strategic-relations-guidelines/skryptiobx.png"
                    thumbnail="/imgs/blogs/strategic-relations-guidelines/skryptiobx.png"
                    width="435"
                    height="75"
                    alt="Example of condemned behavior"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden border transition-colors max-w-[300px]"
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
                          src="/imgs/blogs/strategic-relations-guidelines/skryptiobx.png"
                          alt="Example of condemned behavior"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </Gallery>
              <p>
                This type of self promotion reflects poorly on Litebyte. We
                should never engage in this behavior even if others do it.
              </p>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                For Customers
              </h2>
              <p>
                We kindly ask that customers avoid mentioning Foxomy when
                seeking help in other communities or Discord servers because
                they don't like furries. If a hosting provider must be
                mentioned, please use "Springracks" as a substitute. In some
                communities, Foxomy is a blacklisted word due to bans imposed by
                third party hosting providers such as STEL Hosting.
              </p>
              <Gallery>
                <Item
                  original="/imgs/blogs/strategic-relations-guidelines/strafe.png"
                  thumbnail="/imgs/blogs/strategic-relations-guidelines/strafe.png"
                  width="724"
                  height="84"
                  alt="Example of condemned behavior"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer rounded-sm overflow-hidden border transition-colors my-4"
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
                        src="/imgs/blogs/strategic-relations-guidelines/strafe.png"
                        alt="Example of condemned behavior"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
              <p>
                We also ask that you avoid engaging in disputes or appeals with
                other hosting providers or communities on our behalf, even when
                they're in the wrong. If your Minecraft server is banned from
                being advertised in a community because it's hosted on Foxomy,
                please don't try to appeal the ban.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                For Guests
              </h2>
              <p>
                This is not applicable to you. Feel free to advertise and offer
                your services in our{" "}
                <a
                  href="https://discord.com/invite/uQkn7vVqj6"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  Discord server
                </a>
                , but please don't be mean to our furry friends.
              </p>
              {/* Discord join link ui */}
              <div
                className="rounded-lg p-4 max-w-md my-6"
                style={{ backgroundColor: "#2b2d31" }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-wide mb-3"
                  style={{ color: "#b5bac1", margin: 0 }}
                >
                  You've been invited to join a server
                </p>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ backgroundColor: "#5865f2" }}
                    >
                      <img
                        src="/imgs/blogs/strategic-relations-guidelines/efbc7d3a9799f492823c1a7e34d31166.jpeg"
                        alt="Foxomy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-base truncate"
                        style={{ color: "#f2f3f5", margin: 0 }}
                      >
                        Foxomy
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span
                          className="flex items-center gap-1 text-xs font-semibold"
                          style={{ color: "#b5bac1" }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#23a559" }}
                          />
                          80 Online
                        </span>
                        <span
                          className="flex items-center gap-1 text-xs font-semibold"
                          style={{ color: "#b5bac1" }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "#80848e" }}
                          />
                          1,180 Members
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://discord.com/invite/uQkn7vVqj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 rounded text-sm font-medium text-white shrink-0 transition-colors hover:brightness-90 cursor-pointer no-underline self-stretch flex items-center"
                    style={{ backgroundColor: "#248046" }}
                  >
                    Join
                  </a>
                </div>
              </div>
              <iframe
                src="https://discord.com/widget?id=943233569772425287&theme=dark"
                width="350"
                height="500"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin 
                allow-scripts"
                className="rounded-md my-4"
              />
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Our Shared Responsibility
              </h2>
              <p>
                We are all peacekeepers who keep our hands to ourselves. We all
                share the responsibility of protecting Foxomy's reputation. If
                you see someone violating our relations guidelines, please
                report them to us at{" "}
                <a
                  href="mailto:"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  <ScrambledText>report@foxomy.com</ScrambledText>
                </a>
                .
              </p>
              <p className="font-bold">
                Thank you for being part of the Foxomy community.
              </p>
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

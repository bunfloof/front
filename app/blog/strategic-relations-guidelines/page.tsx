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
                  Never comment on other hosting providers or communities
                  (Please stop, Kayla)
                </li>
                <li>
                  Never participate in other communities to cause conflict or
                  drama
                </li>
                <li>
                  Never retaliate if another community speaks negatively about
                  Foxomy
                </li>
              </ul>
              <p>
                Even if other competitors attack us, we agree to disagree and
                move on.
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
                the person saying it and Springracks Hosting. We should never
                engage in this behavior.
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
                    original="/imgs/blogs/strategic-relations-guidelines/skryptiop.png"
                    thumbnail="/imgs/blogs/strategic-relations-guidelines/skryptiop.png"
                    width="530"
                    height="822"
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
                          src="/imgs/blogs/strategic-relations-guidelines/skryptiop.png"
                          alt="Example of condemned behavior"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="/imgs/blogs/strategic-relations-guidelines/skryptiob.png"
                    thumbnail="/imgs/blogs/strategic-relations-guidelines/skryptiob.png"
                    width="426"
                    height="74"
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
                          src="/imgs/blogs/strategic-relations-guidelines/skryptiob.png"
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
                should never engage in this behavior.
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
                they don't like furries. Do not attack other hosting providers
                or communities even if they are wrong. We are currently not
                asking for reviews. For the best support experience, please use
                our official channels.
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
                , but please don't be mean to other furry friends.
              </p>
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

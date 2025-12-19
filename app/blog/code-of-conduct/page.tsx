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

export default function CodeOfConductPost() {
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
            Community Code of Conduct
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 5, 2025
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
                Our Pledge
              </h2>
              <p>
                We as members, contributors, and leaders pledge to make
                participation in our community a harassment-free experience for
                everyone, regardless of age, body size, visible or invisible
                disability, ethnicity, sex characteristics, gender identity and
                expression, level of experience, education, socio-economic
                status, nationality, personal appearance, race, religion, or
                sexual identity and orientation.
              </p>
              <p>
                We pledge to act and interact in ways that contribute to an
                open, welcoming, diverse, inclusive, and healthy community.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Our Standards
              </h2>
              <p>
                Examples of behavior that contributes to a positive environment
                for our community include:
              </p>
              <ul
                className="list-disc list-inside space-y-2 ml-4 transition-colors duration-300"
                style={{ color: "var(--themed-text)" }}
              >
                <li>Demonstrating empathy and kindness toward other people</li>
                <li>
                  Being respectful of differing opinions, viewpoints, and
                  experiences
                </li>
                <li>
                  Accepting responsibility and apologizing to those affected by
                  our mistakes, and learning from the experience
                </li>
                <li>Giving and gracefully accepting constructive feedback</li>
                <li>
                  Focusing on what is best not just for us as individuals, but
                  for the overall community
                </li>
              </ul>
              <p>Examples of unacceptable behavior include:</p>
              <ul
                className="list-disc list-inside space-y-2 ml-4 transition-colors duration-300"
                style={{ color: "var(--themed-text)" }}
              >
                <li>
                  Trolling, insulting/derogatory comments, and personal attacks
                </li>
                <li>Bullying, discrimination, or harassment</li>
              </ul>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Enforcement Responsibilities
              </h2>
              <p>
                Community leaders are responsible for clarifying and enforcing
                our standards of acceptable behavior and will take appropriate
                and fair corrective action in response to any behavior that they
                deem inappropriate, threatening, offensive, or harmful.
              </p>
              <p>
                Community leaders have the right and responsibility to remove,
                edit, or reject comments, messages, and other contributions that
                are not aligned to this Code of Conduct, or to temporarily or
                permanently restrict any members for other behaviors that they
                deem inappropriate, threatening, offensive, or harmful.
              </p>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Scope
              </h2>
              <p>
                This Code of Conduct applies within all community spaces, and
                also applies when an individual is officially representing the
                community in public spaces. Examples of representing our
                community include using an official e-mail address, posting via
                an official social media account, or acting as an appointed
                representative at an online or offline event.
              </p>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Enforcement
              </h2>
              <p>
                Instances of abusive, harassing, or otherwise unacceptable
                behavior may be reported to the community leaders responsible
                for enforcement at{" "}
                <a
                  href="mailto:"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  <ScrambledText>report@foxomy.com</ScrambledText>
                </a>
                .
              </p>
              <p>
                All complaints will be reviewed and investigated promptly and
                fairly. All community leaders are obligated to respect the
                privacy and security of the reporter of any incident.
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

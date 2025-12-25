"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { ScrambledText } from "@/components/ScrambledText";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import { useState } from "react";

// Table of contents sections
const sections = [
  { id: "overview", title: "Overview" },
  { id: "core-principles", title: "Core Principles" },
  { id: "discord-policy", title: "Discord & Social Media" },
  { id: "what-we-do-not-act-on", title: "What We Do Not Act On" },
  { id: "why-this-matters", title: "Why This Matters" },
  { id: "our-commitment", title: "Our Commitment" },
  { id: "contact", title: "Contact Information" },
];

// Section heading component with copy link functionality
function SectionHeading({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <h2
      className="group flex items-center gap-3 text-xl font-semibold mb-4 pb-2 border-b transition-colors duration-300"
      style={{
        color: "var(--themed-heading)",
        borderColor: "var(--themed-border)",
      }}
    >
      <span>{title}</span>
      <button
        onClick={copyLink}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
        style={{ backgroundColor: "transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--themed-nav-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        title="Copy link to section"
      >
        {copied ? (
          <Check
            className="w-4 h-4"
            style={{ color: "var(--themed-accent)" }}
          />
        ) : (
          <Link2 className="w-4 h-4" style={{ color: "var(--themed-link)" }} />
        )}
      </button>
    </h2>
  );
}

export default function AkogenoActPage() {
  return (
    <div
      id="top"
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
          <div className="flex items-center gap-4 mb-4">
            <h1
              className="text-3xl md:text-4xl font-bold transition-colors duration-300"
              style={{ color: "var(--themed-heading)" }}
            >
              The Akogeno Sovereignty Act
            </h1>
          </div>
          <p style={{ color: "var(--themed-text-muted)" }}>
            Also known as The Akogeno Act
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="flex justify-center">
          {/* Sticky Table of Contents - Left Side */}
          <div className="hidden xl:block w-52 flex-shrink-0 mr-8 ml-8 2xl:ml-0">
            <nav className="sticky top-12 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h2
                className="text-sm font-semibold uppercase tracking-wider mb-4 transition-colors duration-300"
                style={{ color: "var(--themed-text-muted)" }}
              >
                Contents
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm transition-colors block py-0.5"
                      style={{ color: "var(--themed-text-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--themed-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--themed-text-muted)";
                      }}
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <section id="overview" className="mb-12 scroll-mt-24">
              <div
                className="leading-relaxed space-y-4 transition-colors duration-300"
                style={{ color: "var(--themed-text)" }}
              >
                <p>
                  We firmly believe that every user deserves the right to
                  privacy, freedom, and fairness. The Akogeno Sovereignty Act
                  establishes Foxomy&apos;s commitment to protecting our users
                  from external third parties and ensuring that moderation
                  decisions are made solely based on conduct within our own
                  platforms and services.
                </p>
                <p>
                  Per The Akogeno Sovereignty Act, Foxomy staff team does not
                  investigate, mediate, or take action on disputes originating
                  from other platforms or servers. We are not responsible for
                  anything that is considered rule-breaking outside of our
                  platforms and services, nor do we take enforcement actions
                  based on external rumors, personal disputes, or allegations
                  that happened outside of our community.
                </p>
              </div>
            </section>

            {/* Sections */}
            <div className="space-y-12">
              {/* Core Principles */}
              <section id="core-principles" className="scroll-mt-24">
                <SectionHeading id="core-principles" title="Core Principles" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We do not recognize or act upon demands, requests, or claims
                    made by external parties seeking to influence our moderation
                    decisions. Our moderation is based on what happens within
                    our community, not what others say happened elsewhere.
                  </p>
                  <p>
                    If a user approaches our staff team with claims that another
                    user has broken rules elsewhere, this remains an external
                    matter that falls outside of our jurisdiction, and we will
                    not act on such requests.
                  </p>
                  <p>
                    If you have any concerns about content or behavior you see
                    within our platforms, please report it through the
                    appropriate channels. For issues on Discord, please report
                    it to Discord directly.
                  </p>
                </div>
              </section>

              {/* Discord & Social Media */}
              <section id="discord-policy" className="scroll-mt-24">
                <SectionHeading
                  id="discord-policy"
                  title="Our Discord & Social Media"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    This act also applies to our Discord server. We do not own
                    Discord as a platform.
                  </p>

                  <p>
                    We are not in a position to police every interaction that
                    occurs on third-party platforms, even those where we
                    maintain a community presence. Discord has its own terms of
                    service, Trust &amp; Safety team, and reporting procedures
                    specifically designed to handle these matters. If you have
                    any concerns about anything you see, please report it to
                    their respective platforms or in this case, Discord directly{" "}
                    <a
                      href="https://support.discord.com/hc/en-us/requests/new"
                      className="hover:underline"
                      style={{ color: "var(--themed-accent)" }}
                    >
                      here
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* What We Do Not Act On */}
              <section id="what-we-do-not-act-on" className="scroll-mt-24">
                <SectionHeading
                  id="what-we-do-not-act-on"
                  title="What We Do Not Act On"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>This policy covers, but is not limited to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Allegations of misconduct occurring on third-party
                      platforms
                    </li>
                    <li>
                      Personal disputes that originate outside of our services
                    </li>
                    <li>
                      Unverified accusations that cannot be verified within our
                      systems
                    </li>
                    <li>
                      Requests made on behalf of individuals or groups with no
                      standing within our community
                    </li>
                    <li>
                      Screenshots or evidence from external platforms without
                      corresponding violations on our services
                    </li>
                    <li>
                      Secondhand reports or hearsay about a user&apos;s behavior
                      elsewhere
                    </li>
                  </ul>
                </div>
              </section>

              {/* Why This Matters */}
              <section id="why-this-matters" className="scroll-mt-24">
                <SectionHeading
                  id="why-this-matters"
                  title="Why This Matters"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    This policy serves to uphold our strong commitment to
                    sovereignty by protecting our users from unauthorized
                    requests and demands from third parties. Without this
                    protection, any user could be targeted by:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Ian Kim Pham / Akogeno</li>
                    <li>
                      Individuals with personal vendettas seeking to weaponize
                      moderation against them
                    </li>
                    <li>
                      Coordinated harassment campaigns originating from other
                      communities
                    </li>
                    <li>
                      Manipulation through one-sided narratives about external
                      disputes
                    </li>
                    <li>
                      Violations of privacy through the spread of personal
                      information shared in confidence
                    </li>
                  </ul>
                  <p>
                    We believe that users should be judged by their actions
                    within our community, not by allegations from outside
                    parties who may have their own motives.
                  </p>
                </div>
              </section>

              {/* Our Commitment */}
              <section id="our-commitment" className="scroll-mt-24">
                <SectionHeading id="our-commitment" title="Our Commitment" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>Foxomy commits to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Making moderation decisions based solely on conduct within
                      our platforms
                    </li>
                    <li>
                      Reaching 40/42 consensus of our staff team before taking
                      action
                    </li>
                    <li>
                      Protecting user privacy from external inquiries and
                      demands
                    </li>
                    <li>
                      Refusing to act as a tool for personal disputes between
                      users
                    </li>
                    <li>
                      Treating all users fairly regardless of their reputation
                      elsewhere
                    </li>
                    <li>
                      Giving every user a fair chance within our community
                    </li>
                  </ul>
                </div>
              </section>

              {/* Origin Story */}
              <section id="origin-story" className="scroll-mt-24">
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <div
                    className="rounded-lg p-6 transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--themed-bg-secondary)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "var(--themed-border)",
                    }}
                  >
                    <h3
                      className="text-lg font-medium mb-3"
                      style={{ color: "var(--themed-accent)" }}
                    >
                      Did you know?
                    </h3>
                    <p>
                      The Akogeno Sovereignty Act was created because our
                      founder Bun was banned from over 109 clubs and communities
                      over a personal dispute. The moderators of those
                      communities took one person&apos;s manipulative words and
                      acted on it without question.
                    </p>
                    <p className="mt-4">
                      This was a violation of Bun&apos;s right to privacy and
                      fair treatment. Since then, Bun made a commitment to
                      ensure no user in our community ever faces the same petty
                      treatment as she did.
                    </p>
                    <p className="mt-4 text-sm">
                      Listen to our speech at UCLA (00:42:04):{" "}
                      <a
                        href="https://www.youtube.com/watch?v=p4KHxFzwYaM&t=6124"
                        className="hover:underline"
                        style={{ color: "var(--themed-accent)" }}
                      >
                        https://www.youtube.com/watch?v=p4KHxFzwYaM&t=6124
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <SectionHeading id="contact" title="Contact Information" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    If you have any questions about The Akogeno Sovereignty Act
                    or our moderation policies, please contact us:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <span style={{ color: "var(--themed-text-muted)" }}>
                        Email:
                      </span>{" "}
                      <a
                        href="mailto:"
                        className="hover:underline"
                        style={{ color: "var(--themed-accent)" }}
                      >
                        <ScrambledText>legal@foxomy.com</ScrambledText>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Back to top */}
            <div
              className="mt-16 pt-8 border-t transition-colors duration-300"
              style={{ borderColor: "var(--themed-border)" }}
            >
              <Link
                href="#top"
                className="text-sm transition-colors"
                style={{ color: "var(--themed-link)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--themed-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--themed-link)";
                }}
              >
                ↑ Back to top
              </Link>
            </div>
          </div>

          {/* Right spacer to balance TOC and keep content centered */}
          <div className="hidden xl:block w-52 flex-shrink-0 ml-8" />
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
}

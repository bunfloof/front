"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { ScrambledText } from "@/components/ScrambledText";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import { useState } from "react";

// Table of contents sections
const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "definitions", title: "1. Definitions" },
  { id: "uptime-guarantee", title: "2. Uptime Guarantee" },
  { id: "exclusions", title: "3. Exclusions" },
  { id: "compensation", title: "4. Compensation" },
  { id: "claiming-credit", title: "5. Claiming Credit" },
  { id: "limitations", title: "6. Limitations" },
  { id: "contact", title: "7. Contact Information" },
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

export default function SLAPage() {
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
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300"
            style={{ color: "var(--themed-heading)" }}
          >
            Service Level Agreement
          </h1>
          <p style={{ color: "var(--themed-text-muted)" }}>
            Last updated: December 6, 2025
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
            <section id="introduction" className="mb-12 scroll-mt-24">
              <p
                className="leading-relaxed transition-colors duration-300"
                style={{ color: "var(--themed-text)" }}
              >
                This Service Level Agreement (&quot;SLA&quot;) describes the
                level of service you can expect from Foxomy. This agreement is
                governed by Foxomy&apos;s{" "}
                <Link
                  href="/terms"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  Terms of Service
                </Link>{" "}
                and applies to all customers using our services.
              </p>
            </section>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <section id="definitions" className="scroll-mt-24">
                <SectionHeading id="definitions" title="1. Definitions" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>The following terms are used throughout this agreement:</p>
                  <ul className="space-y-3 ml-4">
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Service&quot;
                      </span>{" "}
                      refers to any commercial offering provided by Foxomy to
                      the customer.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Status Page&quot;
                      </span>{" "}
                      refers to Foxomy&apos;s official site for tracking and
                      publishing service status.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Uptime&quot;
                      </span>{" "}
                      refers to the state where a service is operational
                      according to the Status Page.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Downtime&quot;
                      </span>{" "}
                      refers to the state where a service is not operational
                      according to the Status Page.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Maintenance&quot;
                      </span>{" "}
                      refers to the state where a service is undergoing
                      scheduled maintenance according to the Status Page.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Credit&quot;
                      </span>{" "}
                      or{" "}
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Balance&quot;
                      </span>{" "}
                      refers to virtual currency credit on the Foxomy billing
                      area, which can be used to pay for services offered by
                      Foxomy.
                    </li>
                    <li>
                      <span
                        className="font-medium"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        &quot;Force Majeure Event&quot;
                      </span>{" "}
                      refers to any event beyond the reasonable control of
                      Foxomy, including but not limited to natural disasters,
                      severe weather conditions, acts of war or terrorism, civil
                      unrest, labor disputes, or unforeseen technical failures.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="uptime-guarantee" className="scroll-mt-24">
                <SectionHeading
                  id="uptime-guarantee"
                  title="2. Uptime Guarantee"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    Foxomy offers a Universal Service Guarantee of 99.9% Uptime
                    for all services. This means we guarantee that our services
                    will be operational and accessible at least 99.9% of the
                    time during any given billing period.
                  </p>
                  <p>
                    Uptime is calculated per machine, per service, based on data
                    from our Status Page starting from the time of your service
                    deployment.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="exclusions" className="scroll-mt-24">
                <SectionHeading id="exclusions" title="3. Exclusions" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    The 99.9% Uptime Guarantee does not apply when downtime is
                    caused by:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>Force Majeure Events as defined above</li>
                    <li>Fire or other physical damage to infrastructure</li>
                    <li>
                      Actions taken by the customer that cause service
                      disruption
                    </li>
                    <li>
                      Targeted criminal activities such as incoming or outgoing
                      DDoS attacks
                    </li>
                    <li>Scheduled maintenance announced in advance</li>
                  </ul>
                  <p>
                    Downtime caused by any of these exclusions will not count
                    against our uptime calculations.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="compensation" className="scroll-mt-24">
                <SectionHeading id="compensation" title="4. Compensation" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    If we fail to meet the 99.9% Uptime Guarantee for your
                    service during a billing period, you are entitled to
                    compensation in the form of account credit.
                  </p>

                  <p>
                    This credit will be applied to your Foxomy account balance
                    and can be used to pay for service renewals or new services.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="claiming-credit" className="scroll-mt-24">
                <SectionHeading
                  id="claiming-credit"
                  title="5. Claiming Credit"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>To claim SLA credit, you must:</p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Submit a support ticket within 30 days of the downtime
                      incident
                    </li>
                    <li>
                      Include the affected service and the dates/times of the
                      downtime
                    </li>
                    <li>
                      Provide any relevant details about how the downtime
                      affected your service
                    </li>
                  </ul>
                  <p>
                    We will review your claim against our Status Page records
                    and apply the appropriate credit to your account if the
                    claim is valid.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="limitations" className="scroll-mt-24">
                <SectionHeading id="limitations" title="6. Limitations" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>The following limitations apply to this SLA:</p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      SLA credits are non-refundable and cannot be exchanged for
                      cash
                    </li>
                    <li>Credits can only be applied toward Foxomy services</li>
                    <li>
                      The maximum credit for any billing period is limited to
                      50% of the amount billed for the affected service
                    </li>
                    <li>
                      Credits must be claimed within 30 days of the incident
                    </li>
                    <li>
                      This SLA does not apply to free services or services in
                      beta
                    </li>
                  </ul>
                  <p>
                    This SLA represents your sole remedy for any failure by
                    Foxomy to meet the uptime guarantee. Please refer to our{" "}
                    <Link
                      href="/terms"
                      className="hover:underline"
                      style={{ color: "var(--themed-accent)" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    for additional information about limitation of liability.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="contact" className="scroll-mt-24">
                <SectionHeading id="contact" title="7. Contact Information" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    If you have any questions about this Service Level Agreement
                    or need to submit an SLA claim, please contact us:
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
                        <ScrambledText>support@foxomy.com</ScrambledText>
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
                href="#"
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

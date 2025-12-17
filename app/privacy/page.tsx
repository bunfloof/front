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
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Your Information" },
  { id: "information-sharing", title: "3. Information Sharing" },
  { id: "data-security", title: "4. Data Security" },
  { id: "cookies", title: "5. Cookies" },
  { id: "email-communications", title: "6. Email Communications" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "childrens-privacy", title: "8. Children's Privacy" },
  { id: "your-rights", title: "9. Your Rights" },
  { id: "changes", title: "10. Changes to This Policy" },
  { id: "contact", title: "11. Contact Information" },
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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                Foxomy (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                takes the privacy of our customers seriously. This Privacy
                Policy explains how we collect, use, and protect your personal
                information when you use our services. By using our services,
                you agree to the collection and use of information in accordance
                with this policy.
              </p>
            </section>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <section id="information-we-collect" className="scroll-mt-24">
                <SectionHeading
                  id="information-we-collect"
                  title="1. Information We Collect"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We collect information necessary to provide and improve our
                    services. This includes:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Information you provide on registration and order forms,
                      such as your name and email address.
                    </li>
                    <li>
                      Billing and payment information processed through our
                      payment providers.
                    </li>
                    <li>
                      Information about your transactions and services with us.
                    </li>
                    <li>
                      Technical information such as IP addresses and browser
                      information when you access our services.
                    </li>
                    <li>
                      Communications you send to us, including support requests.
                    </li>
                  </ul>
                  <p>
                    You may optionally provide additional information such as
                    your address, postal code, or phone number.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="how-we-use" className="scroll-mt-24">
                <SectionHeading
                  id="how-we-use"
                  title="2. How We Use Your Information"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We use the information we collect for the following
                    purposes:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>To provide, maintain, and improve our services.</li>
                    <li>
                      To process transactions and send related information,
                      including invoices and payment confirmations.
                    </li>
                    <li>
                      To communicate with you about your account, services, and
                      support requests.
                    </li>
                    <li>
                      To detect, prevent, and address technical issues, fraud,
                      or abuse.
                    </li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                  <p>
                    We do not use your personal information for marketing
                    purposes unless you have given explicit consent.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="information-sharing" className="scroll-mt-24">
                <SectionHeading
                  id="information-sharing"
                  title="3. Information Sharing"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We do not sell, trade, or rent your personal information to
                    third parties. We may share your information only in the
                    following circumstances:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      With service providers who assist us in operating our
                      business, such as payment processors and email delivery
                      services. These providers are obligated to keep your
                      information confidential.
                    </li>
                    <li>
                      When required by law, such as in response to a subpoena or
                      legal process.
                    </li>
                    <li>
                      To protect the rights, property, or safety of Foxomy, our
                      customers, or others.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section id="data-security" className="scroll-mt-24">
                <SectionHeading id="data-security" title="4. Data Security" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We take the security of your information seriously. We
                    maintain physical, electronic, and procedural safeguards to
                    protect your personal information. Access to your
                    information is restricted to employees and contractors who
                    need it to provide services to you.
                  </p>
                  <p>
                    Our billing systems and databases are hosted on secure
                    servers located in California, United States.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="cookies" className="scroll-mt-24">
                <SectionHeading id="cookies" title="5. Cookies" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    Our website uses cookies to provide essential functionality,
                    such as keeping you logged in and maintaining your session.
                    These cookies are necessary for the operation of our
                    services and are not used for tracking or marketing
                    purposes.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="email-communications" className="scroll-mt-24">
                <SectionHeading
                  id="email-communications"
                  title="6. Email Communications"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We may send you emails regarding your account and services.
                    These communications include:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Email address verification and password reset requests.
                    </li>
                    <li>
                      Order confirmations, invoices, and payment reminders.
                    </li>
                    <li>
                      Service status updates and support ticket notifications.
                    </li>
                    <li>Important account or security notifications.</li>
                  </ul>
                  <p>
                    These emails are transactional in nature and are not used
                    for promotional purposes.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="data-retention" className="scroll-mt-24">
                <SectionHeading id="data-retention" title="7. Data Retention" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We retain your personal information for as long as necessary
                    to provide our services and fulfill the purposes described
                    in this policy. We may also retain certain information as
                    required for legal, accounting, or business purposes.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="childrens-privacy" className="scroll-mt-24">
                <SectionHeading
                  id="childrens-privacy"
                  title="8. Children's Privacy"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    Our services are not intended for children under the age of
                    13. We do not knowingly collect personal information from
                    children under 13. If we become aware that we have collected
                    personal information from a child under 13, we will take
                    steps to delete that information.
                  </p>
                  <p>
                    Users between the ages of 13 and 18 must have parental or
                    guardian consent to use our services.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="your-rights" className="scroll-mt-24">
                <SectionHeading id="your-rights" title="9. Your Rights" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>You have the right to:</p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>Access the personal information we hold about you.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>
                      Request deletion of your personal information, subject to
                      legal and business requirements.
                    </li>
                    <li>
                      Request that we restrict processing of your information in
                      certain circumstances.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the
                    information below. We may require verification of your
                    identity before processing your request.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="changes" className="scroll-mt-24">
                <SectionHeading
                  id="changes"
                  title="10. Changes to This Policy"
                />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    We may update this Privacy Policy from time to time. Changes
                    will be posted on this page with an updated revision date.
                    We encourage you to review this policy periodically.
                    Continued use of our services after changes have been made
                    constitutes acceptance of the updated policy.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="contact" className="scroll-mt-24">
                <SectionHeading id="contact" title="11. Contact Information" />
                <div
                  className="space-y-4 leading-relaxed transition-colors duration-300"
                  style={{ color: "var(--themed-text)" }}
                >
                  <p>
                    If you have any questions about this Privacy Policy or wish
                    to exercise your rights regarding your personal information,
                    please contact us:
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
                        <ScrambledText>privacy@foxomy.com</ScrambledText>
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

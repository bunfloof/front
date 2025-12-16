"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { ScrambledText } from "@/components/ScrambledText";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import { useState } from "react";

// Table of contents sections
const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "prohibited-activities", title: "1. Prohibited Activities" },
  { id: "network-abuse", title: "2. Network Abuse" },
  { id: "content-restrictions", title: "3. Content Restrictions" },
  { id: "resource-usage", title: "4. Resource Usage" },
  { id: "game-servers", title: "5. Game Server Services" },
  { id: "enforcement", title: "6. Enforcement" },
  { id: "reporting-abuse", title: "7. Reporting Abuse" },
  { id: "changes", title: "8. Changes to This Policy" },
  { id: "contact", title: "9. Contact Information" },
];

// Section heading component with copy link functionality
function SectionHeading({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <h2 className="group flex items-center gap-3 text-xl font-semibold text-white mb-4 pb-2 border-b border-[#1A77AD]/20">
      <span>{title}</span>
      <button
        onClick={copyLink}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[#1A77AD]/20"
        title="Copy link to section"
      >
        {copied ? (
          <Check className="w-4 h-4 text-[#00c4aa]" />
        ) : (
          <Link2 className="w-4 h-4 text-[#7AC2EB]" />
        )}
      </button>
    </h2>
  );
}

export default function AcceptableUsePolicyPage() {
  return (
    <div className="font-sans bg-[#030F16] min-h-screen">
      <MainNavbar />

      {/* Header */}
      <header className="pt-32 pb-12 border-b border-[#1A77AD]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Acceptable Use Policy
          </h1>
          <p className="text-[#BDE0F5]/60">Last updated: December 6, 2025</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="flex justify-center">
          {/* Sticky Table of Contents - Left Side */}
          <div className="hidden xl:block w-52 flex-shrink-0 mr-8">
            <nav className="sticky top-12 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h2 className="text-sm font-semibold text-[#BDE0F5]/40 uppercase tracking-wider mb-4">
                Contents
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm text-[#BDE0F5]/50 hover:text-[#00c4aa] transition-colors block py-0.5"
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
              <p className="text-[#BDE0F5]/80 leading-relaxed">
                This Acceptable Use Policy (&quot;AUP&quot;) outlines the rules
                and guidelines for using Foxomy&apos;s services. By using our
                services, you agree to comply with this policy. This AUP is part
                of and should be read together with our{" "}
                <Link href="/terms" className="text-[#00c4aa] hover:underline">
                  Terms of Service
                </Link>
                . If you have any questions about whether a specific use is
                permitted, please contact us before proceeding.
              </p>
            </section>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <section id="prohibited-activities" className="scroll-mt-24">
                <SectionHeading
                  id="prohibited-activities"
                  title="1. Prohibited Activities"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Customers may not use Foxomy&apos;s services for any
                    unlawful or prohibited purpose. The following activities are
                    strictly prohibited:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Using the service to commit or facilitate any illegal
                      activity.
                    </li>
                    <li>
                      Distributing, hosting, or storing content that violates
                      copyright or intellectual property rights without explicit
                      consent from the rightsholder.
                    </li>
                    <li>
                      Hosting websites or content that impersonates individuals
                      or organizations.
                    </li>
                    <li>
                      Using the service to distribute spam, phishing attempts,
                      or fraudulent content.
                    </li>
                    <li>
                      Hosting or distributing malware, viruses, or other
                      malicious software.
                    </li>
                    <li>
                      Using the service to promote illegal products or services.
                    </li>
                    <li>
                      Mining cryptocurrencies or running similar
                      resource-intensive processes not related to the intended
                      service purpose.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="network-abuse" className="scroll-mt-24">
                <SectionHeading id="network-abuse" title="2. Network Abuse" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Customers may not use Foxomy&apos;s services to disrupt,
                    attack, or negatively impact any network or system. The
                    following network-related activities are prohibited:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Conducting or facilitating denial-of-service (DoS) or
                      distributed denial-of-service (DDoS) attacks.
                    </li>
                    <li>
                      Performing unauthorized port scanning or network probing
                      against systems you do not own or have permission to test.
                    </li>
                    <li>
                      Conducting penetration testing or security assessments on
                      systems without explicit authorization.
                    </li>
                    <li>
                      Using the service to relay attacks or mask the origin of
                      malicious traffic.
                    </li>
                    <li>
                      Sending mass unsolicited emails or messages that
                      negatively affect the reputation of our network.
                    </li>
                    <li>
                      Any activity that disrupts or interferes with
                      Foxomy&apos;s infrastructure or other customers&apos;
                      services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="content-restrictions" className="scroll-mt-24">
                <SectionHeading
                  id="content-restrictions"
                  title="3. Content Restrictions"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Customers are responsible for all content hosted on their
                    services. The following types of content are prohibited:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Any content depicting, involving, or exploiting minors in
                      any inappropriate manner.
                    </li>
                    <li>
                      Content that promotes violence, harassment,
                      discrimination, or hate against individuals or groups.
                    </li>
                    <li>Content that promotes self-harm or suicide.</li>
                    <li>
                      Copyrighted material used without proper authorization
                      from the rightsholder.
                    </li>
                    <li>
                      Content that violates applicable local, national, or
                      international laws.
                    </li>
                  </ul>
                  <p>
                    Foxomy reserves the right to determine, at its sole
                    discretion, whether content violates this policy.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="resource-usage" className="scroll-mt-24">
                <SectionHeading id="resource-usage" title="4. Resource Usage" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Services must be used in accordance with their intended
                    purpose and within reasonable resource limits:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Services must be used for their intended purpose as
                      described at the time of purchase.
                    </li>
                    <li>
                      Excessive resource consumption that negatively impacts
                      other customers or Foxomy&apos;s infrastructure is
                      prohibited.
                    </li>
                    <li>
                      Running processes or software that abuse CPU, memory,
                      disk, or network resources beyond normal operational needs
                      is not permitted.
                    </li>
                  </ul>
                  <p>
                    Certain activities such as pre-generating game world chunks,
                    handling high player counts, or other legitimate game server
                    operations are permitted exceptions for game server
                    services.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="game-servers" className="scroll-mt-24">
                <SectionHeading
                  id="game-servers"
                  title="5. Game Server Services"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Game server services are provided specifically for hosting
                    multiplayer game servers. Customers using these services
                    agree to the following:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      The service must be used primarily for hosting game
                      servers and related activities.
                    </li>
                    <li>
                      Hosting content unrelated to game server operation is not
                      permitted.
                    </li>
                    <li>
                      Customers using Minecraft services agree to comply with
                      the Minecraft End User License Agreement (EULA) available
                      at{" "}
                      <a
                        href="https://www.minecraft.net/en-us/eula"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c4aa] hover:underline"
                      >
                        minecraft.net/eula
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="enforcement" className="scroll-mt-24">
                <SectionHeading id="enforcement" title="6. Enforcement" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Foxomy reserves the right to take appropriate action against
                    any customer who violates this Acceptable Use Policy.
                    Actions may include, but are not limited to:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Issuing a warning notification requiring acknowledgement.
                    </li>
                    <li>Temporary suspension of the service or account.</li>
                    <li>Permanent termination of the service or account.</li>
                  </ul>
                  <p>
                    The severity of the action taken will depend on the nature
                    and severity of the violation. In cases of serious
                    violations, services may be terminated immediately without
                    prior notice or refund.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="reporting-abuse" className="scroll-mt-24">
                <SectionHeading
                  id="reporting-abuse"
                  title="7. Reporting Abuse"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    If you become aware of any violation of this Acceptable Use
                    Policy or any abusive activity on Foxomy&apos;s network,
                    please report it to us. Abuse reports can be submitted via
                    email to{" "}
                    <a
                      href="mailto:"
                      className="text-[#00c4aa] hover:underline"
                    >
                      <ScrambledText>abuse@foxomy.com</ScrambledText>
                    </a>
                    .
                  </p>
                  <p>
                    We only take credible reports seriously and will investigate
                    accordingly.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="changes" className="scroll-mt-24">
                <SectionHeading
                  id="changes"
                  title="8. Changes to This Policy"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Foxomy may update this Acceptable Use Policy at any time.
                    Changes may be communicated to customers via email when
                    significant, but customers are responsible for regularly
                    reviewing this policy to ensure compliance. Continued use of
                    our services after changes have been made constitutes
                    acceptance of the updated policy.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="contact" className="scroll-mt-24">
                <SectionHeading id="contact" title="9. Contact Information" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    If you have any questions about this Acceptable Use Policy,
                    please contact us:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <span className="text-[#BDE0F5]/50">Abuse Reports:</span>{" "}
                      <a
                        href="mailto:"
                        className="text-[#00c4aa] hover:underline"
                      >
                        <ScrambledText>abuse@foxomy.com</ScrambledText>
                      </a>
                    </li>
                    <li>
                      <span className="text-[#BDE0F5]/50">
                        General Inquiries:
                      </span>{" "}
                      <a
                        href="mailto:"
                        className="text-[#00c4aa] hover:underline"
                      >
                        <ScrambledText>legal@foxomy.com</ScrambledText>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Back to top */}
            <div className="mt-16 pt-8 border-t border-[#1A77AD]/20">
              <Link
                href="#"
                className="text-[#7AC2EB] hover:text-[#00c4aa] transition-colors text-sm"
              >
                ↑ Back to top
              </Link>
            </div>
          </div>

          {/* Right spacer to balance TOC and keep content centered */}
          <div className="hidden xl:block w-52 flex-shrink-0 ml-8" />
        </div>
      </main>

      {/* Footer spacer */}
      <div className="h-24" />
    </div>
  );
}

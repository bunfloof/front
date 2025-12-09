"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { ScrambledText } from "@/components/ScrambledText";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import { useState } from "react";

// Table of contents sections
const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services", title: "2. Description of Services" },
  { id: "accounts", title: "3. User Accounts" },
  { id: "acceptable-use", title: "4. Acceptable Use Policy" },
  { id: "payment", title: "5. Payment Terms" },
  { id: "refunds", title: "6. Refund Policy" },
  { id: "termination", title: "7. Termination" },
  { id: "intellectual-property", title: "8. Intellectual Property" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Indemnification" },
  { id: "privacy", title: "11. Privacy Policy" },
  { id: "modifications", title: "12. Modifications to Terms" },
  { id: "governing-law", title: "13. Governing Law" },
  { id: "contact", title: "14. Contact Information" },
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

export default function TermsOfServicePage() {
  return (
    <div className="font-sans bg-[#030F16] min-h-screen">
      <MainNavbar />

      {/* Header */}
      <header className="pt-32 pb-12 border-b border-[#1A77AD]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-[#BDE0F5]/60">Last updated: December 6, 2025</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-[#BDE0F5]/80 leading-relaxed">
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
              of Service&quot;) carefully before using the services operated by
              Foxomy (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;). Your
              access to and use of the Service is conditioned on your acceptance
              of and compliance with these Terms. These Terms apply to all
              visitors, users, and others who access or use the Service.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="mb-12 p-6 bg-[#071F2C] border border-[#1A77AD]/20 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className="text-[#7AC2EB] hover:text-[#00c4aa] transition-colors"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-24">
              <SectionHeading id="acceptance" title="1. Acceptance of Terms" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Explain that by accessing or using the service,
                  users agree to be bound by these terms. Include language about
                  legal capacity to enter into agreements and agreement on
                  behalf of organizations.]
                </p>
                <p>
                  [Placeholder: Additional paragraph about electronic acceptance
                  being equivalent to written signature and acknowledgment of
                  having read and understood all terms.]
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="services" className="scroll-mt-24">
              <SectionHeading
                id="services"
                title="2. Description of Services"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Describe the services offered including web
                  hosting, game server hosting, and any other services. Include
                  details about service availability, uptime guarantees, and
                  technical specifications.]
                </p>
                <p>
                  [Placeholder: Explain any limitations on services, beta
                  features, and the company&apos;s right to modify or
                  discontinue services with or without notice.]
                </p>
                <p>
                  [Placeholder: Detail about service levels, support
                  availability, and any service-specific terms that may apply.]
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="accounts" className="scroll-mt-24">
              <SectionHeading id="accounts" title="3. User Accounts" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Requirements for account creation including
                  accurate information, age requirements, and one account per
                  person policy.]
                </p>
                <p>
                  [Placeholder: User responsibilities for maintaining account
                  security, password confidentiality, and notification
                  requirements for unauthorized access.]
                </p>
                <p>
                  [Placeholder: Account transfer policies, restrictions on
                  sharing accounts, and consequences for account misuse.]
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="acceptable-use" className="scroll-mt-24">
              <SectionHeading
                id="acceptable-use"
                title="4. Acceptable Use Policy"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: General statement about lawful use and
                  compliance with all applicable laws and regulations.]
                </p>
                <p>
                  [Placeholder: List of prohibited activities including but not
                  limited to:]
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>[Placeholder: Illegal activities and content]</li>
                  <li>[Placeholder: Spam, phishing, and malicious content]</li>
                  <li>
                    [Placeholder: Copyright and intellectual property
                    violations]
                  </li>
                  <li>[Placeholder: Resource abuse and excessive usage]</li>
                  <li>
                    [Placeholder: Network attacks and security violations]
                  </li>
                  <li>[Placeholder: Adult or obscene content restrictions]</li>
                  <li>[Placeholder: Reselling without authorization]</li>
                </ul>
                <p>
                  [Placeholder: Consequences for violations and company&apos;s
                  right to suspend or terminate services without refund.]
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="payment" className="scroll-mt-24">
              <SectionHeading id="payment" title="5. Payment Terms" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Accepted payment methods, billing cycles, and
                  payment due dates. Include information about automatic renewal
                  and recurring charges.]
                </p>
                <p>
                  [Placeholder: Late payment policies, grace periods, and
                  consequences of non-payment including service suspension and
                  termination.]
                </p>
                <p>
                  [Placeholder: Currency, taxes, and additional fees. Price
                  change notification requirements and effective dates.]
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="refunds" className="scroll-mt-24">
              <SectionHeading id="refunds" title="6. Refund Policy" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Money-back guarantee terms, eligibility
                  requirements, and timeframes for requesting refunds.]
                </p>
                <p>
                  [Placeholder: Non-refundable items and services, including
                  setup fees, domain registrations, and add-on services.]
                </p>
                <p>
                  [Placeholder: Refund processing times, methods, and any
                  applicable fees or deductions.]
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="termination" className="scroll-mt-24">
              <SectionHeading id="termination" title="7. Termination" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: User&apos;s right to cancel services,
                  cancellation procedures, and notice requirements.]
                </p>
                <p>
                  [Placeholder: Company&apos;s right to terminate or suspend
                  services for violations, non-payment, or at discretion with or
                  without notice.]
                </p>
                <p>
                  [Placeholder: Effects of termination including data retention,
                  backup responsibilities, and post-termination obligations.]
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="intellectual-property" className="scroll-mt-24">
              <SectionHeading
                id="intellectual-property"
                title="8. Intellectual Property"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Company&apos;s ownership of service, website,
                  branding, and proprietary technology. Restrictions on use of
                  trademarks and copyrighted materials.]
                </p>
                <p>
                  [Placeholder: User&apos;s retention of ownership of their
                  content and data. License granted to company to host and
                  display user content.]
                </p>
                <p>
                  [Placeholder: DMCA compliance, copyright infringement
                  reporting procedures, and counter-notification process.]
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="liability" className="scroll-mt-24">
              <SectionHeading
                id="liability"
                title="9. Limitation of Liability"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Disclaimer of warranties including implied
                  warranties of merchantability, fitness for particular purpose,
                  and non-infringement.]
                </p>
                <p>
                  [Placeholder: Limitation on company&apos;s liability for
                  direct, indirect, incidental, special, consequential, or
                  punitive damages.]
                </p>
                <p>
                  [Placeholder: Maximum liability cap, typically limited to fees
                  paid in preceding period. Some jurisdictions may not allow
                  certain limitations.]
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="indemnification" className="scroll-mt-24">
              <SectionHeading
                id="indemnification"
                title="10. Indemnification"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: User&apos;s agreement to indemnify and hold
                  harmless the company, its officers, directors, employees, and
                  agents from any claims, damages, losses, or expenses arising
                  from user&apos;s use of services or violation of terms.]
                </p>
                <p>
                  [Placeholder: Company&apos;s right to assume defense and
                  control of any matter subject to indemnification. User&apos;s
                  cooperation requirements.]
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="privacy" className="scroll-mt-24">
              <SectionHeading id="privacy" title="11. Privacy Policy" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Reference to separate Privacy Policy document.
                  Brief overview of data collection, use, and protection
                  practices.]
                </p>
                <p>
                  [Placeholder: User consent to data practices described in
                  Privacy Policy. Link to full Privacy Policy document.]
                </p>
                <p>
                  See our{" "}
                  <Link
                    href="/privacy"
                    className="text-[#00c4aa] hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for detailed information about how we collect, use, and
                  protect your data.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="modifications" className="scroll-mt-24">
              <SectionHeading
                id="modifications"
                title="12. Modifications to Terms"
              />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Company&apos;s right to modify terms at any
                  time. Notification methods and timeframes for material
                  changes.]
                </p>
                <p>
                  [Placeholder: Effective date of changes and user&apos;s
                  continued use constituting acceptance. User&apos;s
                  responsibility to review terms periodically.]
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="governing-law" className="scroll-mt-24">
              <SectionHeading id="governing-law" title="13. Governing Law" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  [Placeholder: Jurisdiction and governing law provisions.
                  Typically the state or country where the company is
                  incorporated.]
                </p>
                <p>
                  [Placeholder: Dispute resolution procedures including
                  arbitration clauses, class action waivers, and venue for legal
                  proceedings.]
                </p>
                <p>
                  [Placeholder: Severability clause stating that if any
                  provision is found unenforceable, remaining provisions remain
                  in effect.]
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section id="contact" className="scroll-mt-24">
              <SectionHeading id="contact" title="14. Contact Information" />
              <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="space-y-2">
                  <li>
                    <span className="text-[#BDE0F5]/50">Email:</span>{" "}
                    <a
                      href="mailto:legal@foxomy.com"
                      className="text-[#00c4aa] hover:underline"
                    >
                      <ScrambledText>legal@foxomy.com</ScrambledText>
                    </a>
                  </li>
                  <li>
                    <span className="text-[#BDE0F5]/50">Support:</span>{" "}
                    <a
                      href="https://foxomy.com/contact"
                      className="text-[#00c4aa] hover:underline"
                    >
                      foxomy.com/contact
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
      </main>

      {/* Footer spacer */}
      <div className="h-24" />
    </div>
  );
}

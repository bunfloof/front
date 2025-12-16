"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { ScrambledText } from "@/components/ScrambledText";
import Link from "next/link";
import { Link2, Check } from "lucide-react";
import { useState } from "react";

// Table of contents sections
const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "refusal-of-service", title: "1. Refusal of Service Regulations" },
  { id: "customer-responsibilities", title: "2. Customer Responsibilities" },
  { id: "foxomy-responsibilities", title: "3. Foxomy's Responsibilities" },
  { id: "service-suspension", title: "4. Service Suspension" },
  { id: "registering-account", title: "5. Registering an Account" },
  { id: "cancellation", title: "6. Cancellation of Service" },
  { id: "billing-payment", title: "7. Billing and Payment Information" },
  { id: "support", title: "8. Support" },
  { id: "complaints", title: "9. Complaints" },
  {
    id: "limitation-liability",
    title: "10. Limitation of Liability and Disclaimer of Warranty",
  },
  { id: "compensation", title: "11. Compensation for Damages" },
  { id: "changes-terms", title: "12. Changes to Terms" },
  { id: "contact", title: "13. Contact Information" },
];

// Section heading component with copy link functionality
function SectionHeading({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers or non-HTTPS contexts
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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
                Foxomy (hereinafter referred to as &quot;Foxomy&quot;,
                &quot;we&quot; as the case may be) would like to send to
                customers (&quot;You&quot;, &quot;User&quot;, or
                &quot;Customer&quot; meaning individuals or legal entities who
                join us to use the service) the terms of the service agreement.
                Customers using Foxomy&apos;s services agree to accept the terms
                of service in this document.
              </p>
            </section>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <section id="refusal-of-service" className="scroll-mt-24">
                <SectionHeading
                  id="refusal-of-service"
                  title="1. Refusal of Service Regulations"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    We reserve the right to block service or refuse future
                    service if the usage regulations are violated. If you have
                    any questions about our Terms of Service, or if you&apos;d
                    like to clarify whether or not your usage is allowed on our
                    services, please contact us. Here is a non-exhaustive list
                    of prohibited activities:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>Using the service to commit crimes.</li>
                    <li>
                      Use server services or server resources to spread SPAM,
                      SPIM, SPIT, mass mailing, or forms of sending emails from
                      the server with the number of emails that negatively
                      affect the reputation of our IP ranges.
                    </li>
                    <li>
                      Distributing and storing malicious codes for the purpose
                      of attacking other websites, or for the purpose of
                      destroying Foxomy&apos;s system such as dstating, DoS,
                      DDoS, malware, virus, phishing, scamming, including cases
                      where the website contains malicious code, is infected
                      with malicious code, or is attacked by a large-scale DDoS
                      attack that seriously affects the infrastructure.
                    </li>
                    <li>
                      Using server services to host website impersonating
                      individuals and organizations to affect reputation of
                      others.
                    </li>
                    <li>
                      Using software that abuses CPU and other server resources
                      such as cryptocurrency mining with the exception of
                      Minecraft or other game server related activities such as
                      pre-genning chunks, high player counts, etc.
                    </li>
                    <li>
                      Using the website to promote illegal services/products.
                    </li>
                    <li>
                      Using the service to store digital content that violates
                      copyright, copyright, or content that impersonates other
                      organizations/individuals.
                    </li>
                  </ul>
                  <p>
                    For a complete list of prohibited activities and content
                    restrictions, please refer to our{" "}
                    <Link
                      href="/aup"
                      className="text-[#00c4aa] hover:underline hover:text-[#00c4aa]/80"
                    >
                      Acceptable Use Policy
                    </Link>
                    .
                  </p>
                  <p>
                    Clients who utilize services in a prohibited manner may be
                    subject to any of (or a combination of) the following:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Warning notification (which requires acknowledgement)
                    </li>
                    <li>Service or account suspension</li>
                    <li>Service or account termination</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section id="customer-responsibilities" className="scroll-mt-24">
                <SectionHeading
                  id="customer-responsibilities"
                  title="2. Customer Responsibilities"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Customers at Foxomy always have full rights and obligations
                    of the service lessee according to the provisions of the
                    Civil Code and the Commercial Law of Vietnam. To ensure the
                    best interests, customers also need to comply with the
                    following regulations:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Customers are responsible for keeping their login
                      information to the website system or login information to
                      the customer control panel at Foxomy secure.
                    </li>
                    <li>
                      Customers are responsible for notifying us if they
                      discover any unauthorized use of their password.
                    </li>
                    <li>
                      Customers are responsible for the content hosted and
                      stored on the Foxomy&apos;s server before the law in case
                      of disputes or complaints.
                    </li>
                    <li>
                      Customers are responsible for maintaining the hosted
                      content and are responsible for any damage caused by the
                      self negligence or mismanagement.
                    </li>
                    <li>
                      Customers are responsible for preserving and maintaining
                      content on Foxomy&apos;s servers. Foxomy will not be
                      responsible for data loss incidents caused by
                      customers&apos; negligence and security.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="foxomy-responsibilities" className="scroll-mt-24">
                <SectionHeading
                  id="foxomy-responsibilities"
                  title="3. Foxomy's Responsibilities"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    As a service provider, Foxomy has full rights and
                    obligations of a service provider as prescribed in the US
                    Consumer Law. Foxomy has the following responsibilities:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Provide services with technical specifications as
                      committed on the homepage foxomy.com.
                    </li>
                    <li>
                      Support customers throughout the service usage period
                      according to the support policy under the terms of use of
                      each service.
                    </li>
                    <li>
                      Notify customers when there is a service maintenance
                      schedule or change in service.
                    </li>
                    <li>
                      Use best efforts to prevent total data loss by allowing
                      customers to setup offsite backups and implementing data
                      protection practices.
                    </li>
                    <li>
                      Comply with other commitments in this document and related
                      legal documents.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section id="service-suspension" className="scroll-mt-24">
                <SectionHeading
                  id="service-suspension"
                  title="4. Service Suspension"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    The customer&apos;s service may be suspended without prior
                    notice but will receive an email notification of suspension
                    when the service has been suspended in the following cases:
                  </p>
                  <ul className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Payment is overdue 3 days from the service expiration
                      date.
                    </li>
                    <li>
                      The service violates the usage policy of the respective
                      service.
                    </li>
                    <li>
                      There is a dispute that leads to litigation or is subject
                      to legal scrutiny.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="registering-account" className="scroll-mt-24">
                <SectionHeading
                  id="registering-account"
                  title="5. Registering an Account"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    An account on the Foxomy service management system is a
                    customer account created during the service registration
                    process. This billing account will have the function of
                    tracking service duration, paying invoices, renewing
                    services, cancelling services, opening support requests, and
                    using specific functions of each service.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="cancellation" className="scroll-mt-24">
                <SectionHeading
                  id="cancellation"
                  title="6. Cancellation of Service"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    You must submit a cancellation request at
                    https://foxomy.com/billing to cancel the service. You can
                    cancel the service at any time for any reason. There are two
                    cancellation types: &quot;Immediate&quot; or &quot;At the
                    end of billing term.&quot; Please be sure to back up any of
                    your data prior to the cancellation date since upon
                    cancellation of the &quot;Immediate&quot; type, the data
                    upon the server is permanently deleted.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="billing-payment" className="scroll-mt-24">
                <SectionHeading
                  id="billing-payment"
                  title="7. Billing and Payment Information"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    1. Payment method
                  </h3>
                  <p>
                    Foxomy supports 3 payment methods: PayPal, Stripe, wire
                    transfer. You have the right to choose the appropriate
                    payment method and the service activation time will also
                    depend on the payment method. For PayPal payment method, the
                    system will automatically activate the service immediately
                    after completing the payment. For wire transfer payment
                    method, the system will automatically activate manually
                    after a review.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    2. Prepayment (Non-subscription PayPal only)
                  </h3>
                  <p>
                    We need customers to understand that service payments are
                    prepayments to maintain the service. For service renewals,
                    the system will automatically generate an invoice 2 weeks
                    before the invoice payment due date to notify customers.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    3. Auto-renewal (Stripe and PayPal subscription only)
                  </h3>
                  <p>
                    If the customer pays via a PayPal subscription, it is
                    necessary to accept that this payment method supports
                    automatic renewal of the service. If the customer cancels
                    the service, they must ensure that the Preapprove Payment
                    function from Foxomy is turned off in the PayPal account to
                    avoid automatic payment when the cycle comes even though the
                    invoice has been canceled.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    4. Taxes
                  </h3>
                  <p>
                    All service prices on the foxomy.com homepage are final and
                    do not include any additional surcharges or fees to the
                    user.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    5. Late Payment
                  </h3>
                  <p>
                    Customers are responsible for paying to maintain the service
                    on time. The service will be automatically suspended after 7
                    days of late payment, and service data will be permanently
                    deleted after 6 months if the service is not renewed. We do
                    not apply any penalties or late fees applied to overdue
                    invoices. If you missed more than 1 billing cycle, then you
                    must contact us to correct the next invoice payment due
                    date.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    6. Refusal of Payment
                  </h3>
                  <p>
                    We reserve the right to refuse and refund payment if we
                    detect that the payment is fraudulent.
                  </p>

                  <h3 className="text-lg font-medium text-white mt-6 mb-2">
                    7. Refunds
                  </h3>
                  <p>
                    We accept refunds upon request within 180 days of service
                    activation. Refund requests are fulfilled on a case-by-case
                    basis. Our intent is to work with each individual client in
                    a fair manner. Upon request, we will do our very best to
                    accommodate your request and let you know what is possible
                    (and why).
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="support" className="scroll-mt-24">
                <SectionHeading id="support" title="8. Support" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    You can submit a support issue via email or on-site ticket
                    support system. In some cases, resolving the issue may take
                    longer than usual, so we are sorry that we may not support
                    you faster.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="complaints" className="scroll-mt-24">
                <SectionHeading id="complaints" title="9. Complaints" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    We always try to improve our service. Customers have the
                    right to complain or give feedback on Foxomy&apos;s service
                    via email <a href="mailto:"><ScrambledText>support@foxomy.com</ScrambledText></a> or the on-site ticket system.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="limitation-liability" className="scroll-mt-24">
                <SectionHeading
                  id="limitation-liability"
                  title="10. Limitation of Liability and Disclaimer of Warranty"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    In no event shall any of Foxomy&apos;s directors, officers,
                    employees or agents be liable for any direct or
                    consequential loss. In particular, even for loss of customer
                    benefits or loss of data due to the customer&apos;s
                    negligence. The customer also accepts that Foxomy has the
                    right to waive liability under the terms of this document if
                    there is a separate agreement with the customer. The
                    customer is not entitled to waive liability under the terms
                    stated in this document.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="compensation" className="scroll-mt-24">
                <SectionHeading
                  id="compensation"
                  title="11. Compensation for Damages"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    In the case that Foxomy fails to ensure the service license
                    commitment (SLA), compensation will be made according to the
                    compensation policy. This balance can be used by the
                    customer to register for the service or renew, and may be
                    refunded.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section id="changes-terms" className="scroll-mt-24">
                <SectionHeading
                  id="changes-terms"
                  title="12. Changes to Terms"
                />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    Foxomy may change the terms of service, any policies or
                    related legal documents when necessary. Changes may be
                    notified to customers via email when necessary, but
                    customers are responsible for regularly monitoring these
                    documents to ensure compliance with the terms.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="contact" className="scroll-mt-24">
                <SectionHeading id="contact" title="13. Contact Information" />
                <div className="text-[#BDE0F5]/70 space-y-4 leading-relaxed">
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <span className="text-[#BDE0F5]/50">Email:</span>{" "}
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

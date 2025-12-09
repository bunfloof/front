"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long will I receive my server?",
    answer:
      "Your server will be set up instantly after payment confirmation. Most servers are ready within minutes, though some custom configurations may take up to a few hours during peak times.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a generous 180-day money-back guarantee. If you're not satisfied with our service for any reason, simply open a support ticket and we'll process your refund—no questions asked. We've never denied a refund request.",
  },
  {
    question: "Can I upgrade or downgrade my server?",
    answer:
      "Absolutely! You can upgrade or downgrade your server plan at any time through your client panel. Upgrades are applied instantly, and for downgrades, the remaining credit will be applied to your account balance.",
  },
  {
    question: "What are your server specifications?",
    answer:
      "Our servers run on enterprise-grade AMD EPYC and Intel Xeon processors with NVMe SSD storage and DDR5 ECC RAM. We use premium network providers to ensure low latency and high throughput for your applications.",
  },
  {
    question: "Do you offer DDoS protection?",
    answer:
      "Yes! All our servers come with built-in DDoS protection at no extra cost. Our in-house mitigation system can handle attacks up to 40 Gbps / 35 Mpps with less than 1 second response time.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Our support team is available 24/7. You can reach us through our ticket system for general inquiries, or use the emergency contact for urgent issues. We also offer personal Discord support for direct assistance.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b border-[#1A77AD]/20 transition-colors duration-200 ${
        isOpen ? "bg-[#0D3A54]/30" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left group"
      >
        <span
          className={`text-lg font-medium transition-colors duration-200 ${
            isOpen ? "text-[#00c4aa]" : "text-white group-hover:text-[#00c4aa]"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#00c4aa] transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-[#BDE0F5]/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#030F16] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Large transparent icon backdrop - fixed to top to prevent shifting */}
      <div className="absolute top-20 left-0 pointer-events-none overflow-hidden">
        <HelpCircle
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] text-[#00c4aa] opacity-[0.03] -ml-32 md:-ml-40"
          strokeWidth={1}
        />
      </div>

      {/* Gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -right-40 top-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,196,170,0.5) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -left-40 bottom-1/4 w-[350px] h-[350px] rounded-full blur-3xl opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,129,205,0.5) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[3px] accent-line-gradient" />
            <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase">
              FAQ
            </span>
            <div className="w-10 h-[3px] accent-line-gradient" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#BDE0F5]/70 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're
            looking for, feel free to reach out to our support team.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="bg-[#071F2C]/50 backdrop-blur-sm rounded-2xl border border-[#1A77AD]/20 overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 text-center">
          <p className="text-[#BDE0F5]/60 mb-4">Still have questions?</p>
          <a
            href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00c4aa] hover:text-[#00d4b8] font-medium transition-colors"
          >
            Contact our support team
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


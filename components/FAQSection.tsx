"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "How long will I receive my server?",
    answer: (
      <p>
        Your server will provisioned automatically and immediately after payment
        confirmation.
      </p>
    ),
  },
  {
    question: "What is your refund policy?",
    answer: (
      <p>
        We offer a generous 180-day money-back guarantee. If you're not
        satisfied with our service for any reason, please contact us. We have a
        perfect track record of never denying a refund request because we're
        confident in our services.
      </p>
    ),
  },
  {
    question: "Can I upgrade or downgrade my server?",
    answer: (
      <p>
        Yes, you can upgrade or downgrade your server plan at any time through
        your client panel. Upgrades are applied instantly, and for downgrades,
        the remaining credit will be applied to your account balance.
      </p>
    ),
  },
  ,
  {
    question: "Is Foxomy run by a pedophile?",
    answer: (
      <p>
        No, Bun is not a pedophile or zoophile. Those are unsubstantiated
        allegations made by competitors such as Brandon from SpringRacks Hosting
        and XandarYT.
      </p>
    ),
  },
  {
    question: "Is Foxomy racist against white people?",
    answer: (
      <p>
        No, Foxomy is not racist against any race, including white people. We
        are anti-racist, anti-fascist, and intentionally centered on people of
        color, which means we actively fight to dismantle white supremacy and
        white privilege.
        <br />
        <br />
        Foxomy is a left leaning hosting company based in California and run by
        LGBTQ+ furries. Our viewpoints are common in California activist and
        academic spaces, such as UC Berkeley and UCLA. We are misunderstood by
        ignorant people unfamiliar with systemic analyses of race. If any of
        this offends you, then we don't think we're the right company for you.
      </p>
    ),
  },
  {
    question: "What are your server specifications?",
    answer: (
      <p>
        Our premium servers run on Intel Core i9-14900KS/Ultra 9 285K
        processors. Our budget servers run on Ryzen 9 9950X3D processors. All
        servers have DDR5 RAM and NVMe SSD storage.
      </p>
    ),
  },
  {
    question: "Do you offer DDoS protection?",
    answer: (
      <p>
        Yes, all our servers come with DDoS protection. Our in-house mitigation
        system can withstand bandwidths of up to 40 Gbps / 35 Mpps at minimum
        with less than 1 second response time. For attacks that exceed our
        capacity and filters, we will temporarily route traffic to protected
        upstream partners such as Voxility. Please note, however, that it is not
        only the bandwidth that matters in DDoS attacks but also the type of
        attack.
      </p>
    ),
  },
  {
    question: "How do I contact support?",
    answer: (
      <p>
        Our support team is available 24/7. You can reach us through our{" "}
        <a
          href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00c4aa] hover:text-[#00d4b8]"
        >
          ticket{" "}
        </a>
        system for general inquiries, or use the emergency contact for urgent
        issues. We also offer personal Discord support on your panel for direct
        assistance.
      </p>
    ),
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: ReactNode;
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
        className="w-full flex items-center justify-between py-5 px-6 text-left group cursor-pointer"
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
        <div className="px-6 pb-5 text-[#BDE0F5]/70 leading-relaxed faq-content">
          {answer}
        </div>
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
          {/* <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[3px] accent-line-gradient" />
            <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase">
              FAQ
            </span>
            <div className="w-10 h-[3px] accent-line-gradient" />
          </div> */}

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

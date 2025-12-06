"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

export function GuaranteeSection() {
  return (
    <section className="relative py-10 md:py-14 bg-[#071F2C] overflow-hidden">
      {/* Large transparent icon backdrop - aligned right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <ShieldCheck
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] text-[#00c4aa] opacity-[0.05] -mr-16 md:-mr-24"
          strokeWidth={1.5}
        />
      </div>

      {/* Gradient accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,196,170,0.6) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full blur-3xl opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,129,205,0.6) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Left - Main message */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl md:text-4xl font-bold text-white">
                180-Day
              </span>
              <span className="text-lg md:text-xl font-semibold text-[#00c4aa]">
                Money-Back Guarantee
              </span>
            </div>
            <p className="text-[#BDE0F5]/70 text-sm md:text-base">
              We're so confident that you'll love our service that we offer a
              180-day money-back guarantee. We've never denied a refund request.
            </p>
          </div>

          {/* Right - CTA Button */}
          <Button
            variant="default"
            size="lg"
            className="bg-[#00c4aa] hover:bg-[#00b39b] text-[#030F16] font-semibold"
            asChild
          >
            <a
              href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a Refund
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

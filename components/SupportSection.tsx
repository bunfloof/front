"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export function SupportSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#030F16] overflow-hidden">
      {/* Continue the grid pattern from ServicesSection */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-2/3 h-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at left center, rgba(17,168,169,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <Image
              src="/PALLEDICOCCODRILLoNEfoxomy.png"
              alt="Foxomy Support"
              width={500}
              height={500}
              className="object-contain w-full h-auto max-w-sm"
              priority
            />
          </div>

          {/* Right side - Text Content */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow with accent line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] accent-line-gradient" />
              <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase">
                Support
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6">
              World-Class Support & Hospitality
            </h2>

            <div className="space-y-5 text-[#BDE0F5]/70 text-lg leading-relaxed">
              <p className="text-xl font-medium text-white">
                We're here to help, not lecture.
              </p>
              <p>
                Tired of feeling like you're "just a number" at your provider?
                With Foxomy, you can even chat with the owner on Discord if you
                need assistance. We love getting to know our customers.
              </p>
            </div>

            {/* Quote block */}
            {/* <blockquote className="mt-8 pl-5 border-l-4 border-[#00c4aa]">
              <p className="text-[#BDE0F5]/80 text-lg italic">
                "Let us show you what world-class service truly means."
              </p>
            </blockquote> */}

            {/* CTA */}
            <div className="mt-10">
              <Button
                variant="default"
                size="xl"
                className="text-base bg-[#00c4aa] hover:bg-[#00d4b8] text-[#030F16]"
                asChild
              >
                <a
                  href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

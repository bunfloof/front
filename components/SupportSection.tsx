"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export function SupportSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#E8F4F8] overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,58,84,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,58,84,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large decorative ring - top right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#0D3A54]/5" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-[#00c4aa]/10" />

        {/* Smaller ring - bottom left */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-[#0481CD]/8" />

        {/* Gradient glows */}
        <div
          className="absolute -left-32 top-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, rgba(17,168,169,0.8) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -right-32 bottom-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.10]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,129,205,0.8) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, rgba(0,196,170,0.05) 50%, transparent 60%)",
        }}
      />

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
              <span className="text-[#0D3A54] text-sm font-semibold tracking-wide uppercase">
                Support
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#071F2C] leading-tight mb-6">
              World-Class Support & Hospitality
            </h2>

            <div className="space-y-5 text-[#0D3A54]/80 text-lg leading-relaxed">
              <p className="text-xl font-medium text-[#071F2C]">
                We're here to help, not lecture.
              </p>
              <p>
                Our support team is available 24/7 with fast response times. We
                believe extraordinary hospitality means treating each guest as
                the most important person in the world—every time, no
                exceptions.
              </p>
            </div>

            {/* Quote block */}
            <blockquote className="mt-8 pl-5 border-l-4 border-[#00c4aa]">
              <p className="text-[#0D3A54] text-lg italic">
                "Let us show you what world-class service truly means."
              </p>
            </blockquote>

            {/* CTA */}
            <div className="mt-10">
              <Button
                variant="default"
                size="xl"
                className="text-base bg-[#0D3A54] hover:bg-[#071F2C]"
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

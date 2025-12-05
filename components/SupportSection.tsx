"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export function SupportSection() {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* Eyebrow with gold accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] bg-[#FDB515]" />
              <span className="text-[#003262] text-sm font-semibold tracking-wide uppercase">
                Support
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#003262] leading-tight mb-6">
              World-Class Support & Hospitality
            </h2>

            <div className="space-y-5 text-[#3B4049] text-lg leading-relaxed">
              <p className="text-xl font-medium text-[#003262]">
                We're here to help, not lecture.
              </p>
              <p>
                Our support team is available 24/7 with fast response times. We
                believe extraordinary hospitality means treating each guest as
                the most important person in the world—every time, no
                exceptions.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button
                variant="berkeley"
                size="xl"
                className="text-base"
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

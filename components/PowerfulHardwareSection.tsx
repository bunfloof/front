"use client";

import Image from "next/image";

export function PowerfulHardwareSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#F0F4F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text Content */}
          <div>
            {/* Eyebrow with gold accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] bg-[#FDB515]" />
              <span className="text-[#003262] text-sm font-semibold tracking-wide uppercase">
                Infrastructure
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#003262] leading-tight mb-6">
              Powerful, High-Quality Hardware
            </h2>

            <div className="space-y-5 text-[#3B4049] text-lg leading-relaxed">
              <p>
                Our servers are powered by the latest generation{" "}
                <strong className="text-[#003262]">AMD Ryzen</strong> and{" "}
                <strong className="text-[#003262]">Intel Core</strong>{" "}
                processors, <strong className="text-[#003262]">DDR5</strong>{" "}
                memory, and <strong className="text-[#003262]">NVMe</strong>{" "}
                storage for exceptional performance.
              </p>
              <p>
                Every component is hand-selected from trusted manufacturers,
                regularly maintained, and monitored around the clock to
                guarantee optimal uptime.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/pefetto_porca_troia.png"
              alt="Powerful Hardware"
              width={550}
              height={550}
              className="object-contain w-full h-auto max-w-md"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

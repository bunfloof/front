"use client";

import Image from "next/image";

export function PowerfulHardwareSection() {
  return (
    <section className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden bg-[#030F16]">
      {/* Continue the grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Subtle gradient overlay for depth - opposite side from SupportSection */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-2/3 h-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at right center, rgba(4,129,205,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text Content */}
          <div>
            {/* Eyebrow with accent line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] accent-line-gradient" />
              <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase">
                Infrastructure
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6">
              Powerful, High-Quality Hardware
            </h2>

            <div className="space-y-5 text-[#BDE0F5]/70 text-lg leading-relaxed">
              <p>
                Our servers are powered by the latest generation{" "}
                <strong className="text-white">AMD Ryzen</strong> and{" "}
                <strong className="text-white">Intel Core</strong> processors,{" "}
                <strong className="text-white">DDR5</strong> memory, and{" "}
                <strong className="text-white">NVMe</strong> storage for
                exceptional performance.
              </p>
              <p>
                Every component is hand-selected from trusted manufacturers,
                regularly maintained, and monitored around the clock to
                guarantee optimal uptime.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 pt-8 border-t border-[#1A77AD]/30">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-white">24/7</span>
                <div className="text-sm text-[#BDE0F5]/60 leading-tight">
                  <span className="block font-semibold text-[#00c4aa]">
                    Active Monitoring
                  </span>
                  Real-time health checks
                </div>
              </div>
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

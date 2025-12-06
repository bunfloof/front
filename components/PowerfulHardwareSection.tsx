"use client";

import Image from "next/image";

export function PowerfulHardwareSection() {
  return (
    <section className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden bg-[#F5F9FC]">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#0D3A54 0.8px, transparent 0), radial-gradient(#0D3A54 0.8px, transparent 0)",
          backgroundSize: "24px 24px, 24px 24px",
          backgroundPosition: "0 0, 12px 12px",
          opacity: 0.06,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient ring - top left */}
        <div
          className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.15]"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(135deg, rgba(0,196,170,0.2) 0%, transparent 50%)",
          }}
        />

        {/* Geometric accent - bottom right */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-[#0481CD]/10" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-[#0D3A54]/5" />

        {/* Gradient glows */}
        <div
          className="absolute -left-20 top-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.15]"
          style={{
            background:
              "radial-gradient(circle, rgba(17,168,169,0.6) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -right-20 top-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,129,205,0.6) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Diagonal stripe accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, transparent 30%, rgba(0,196,170,0.03) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text Content */}
          <div>
            {/* Eyebrow with accent line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] accent-line-gradient" />
              <span className="text-[#0D3A54] text-sm font-semibold tracking-wide uppercase">
                Infrastructure
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#071F2C] leading-tight mb-6">
              Powerful, High-Quality Hardware
            </h2>

            <div className="space-y-5 text-[#0D3A54]/80 text-lg leading-relaxed">
              <p>
                Our servers are powered by the latest generation{" "}
                <strong className="text-[#071F2C]">AMD Ryzen</strong> and{" "}
                <strong className="text-[#071F2C]">Intel Core</strong>{" "}
                processors, <strong className="text-[#071F2C]">DDR5</strong>{" "}
                memory, and <strong className="text-[#071F2C]">NVMe</strong>{" "}
                storage for exceptional performance.
              </p>
              <p>
                Every component is hand-selected from trusted manufacturers,
                regularly maintained, and monitored around the clock to
                guarantee optimal uptime.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 pt-8 border-t border-[#0D3A54]/20">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-[#071F2C]">24/7</span>
                <div className="text-sm text-[#0D3A54]/70 leading-tight">
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

      {/* Transition to dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
        {/* Gradient fade from light to dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #030F16 100%)",
          }}
        />
        {/* Accent line with glow */}
        <div className="absolute top-0 left-0 right-0">
          <span
            className="block h-[1px] w-full opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(87,230,170,1), rgba(94,171,194,1) 51%, rgba(26,163,255,1) 100%)",
            }}
          />
          {/* Left glow */}
          <span
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "linear-gradient(90deg, rgb(0, 0, 136), rgb(17,168,169))",
            }}
          />
          {/* Right glow */}
          <span
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "linear-gradient(90deg, rgb(0, 67, 136), rgb(4,129,205))",
            }}
          />
        </div>
      </div>
    </section>
  );
}

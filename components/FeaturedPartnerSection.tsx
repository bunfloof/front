"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function FeaturedPartnerSection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: "#071F2C",
      }}
    >
      {/* Background image with blur */}
      <div className="absolute inset-0">
        <Image
          src="/jackfilms-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10 blur-sm"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,31,44,0.95) 0%, rgba(3,15,22,0.98) 100%)",
          }}
        />
      </div>

      {/* Gradient accents */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center left, rgba(17,168,169,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glow effect behind the image */}
              <div
                className="absolute inset-0 w-64 h-64 md:w-80 md:h-80 -z-10 blur-2xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,196,170,0.4) 0%, rgba(4,129,205,0.3) 50%, transparent 70%)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Main image - Jackfilms face */}
              <div
                className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 30px rgba(0,196,170,0.4), 0 0 60px rgba(0,196,170,0.2), inset 0 0 60px rgba(0,0,0,0.3)",
                  border: "2px solid rgba(0,196,170,0.5)",
                }}
              >
                <Image
                  src="/imgs/jackfilms/jackfilmspicture.jpg"
                  alt="Jackfilms"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,196,170,0.1) 0%, transparent 50%, rgba(4,129,205,0.15) 100%)",
                  }}
                />
                {/* Vignette effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)",
                  }}
                />
              </div>

              {/* Stagelight SMP text art overlay - positioned to extend beyond image */}
              <div
                className="absolute -bottom-16 -right-24 w-48 h-48 md:w-52 md:h-52 z-10"
                style={{
                  filter:
                    "drop-shadow(0 0 15px rgba(0,196,170,0.6)) drop-shadow(0 0 40px rgba(0,196,170,0.3))",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
              >
                <Image
                  src="/imgs/jackfilms/stagelightsmp.png"
                  alt="Stagelight SMP"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Decorative offset frame */}
              <div
                className="absolute -bottom-4 -right-4 w-64 h-64 md:w-80 md:h-80 -z-10"
                style={{
                  border: "1px solid rgba(0,196,170,0.3)",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <span className="text-[#00c4aa] text-sm font-semibold tracking-wide uppercase mb-4 block">
              Featured Partner
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-50 mb-6">
              Jackfilms
            </h2>

            <p className="text-[#BDE0F5] text-lg leading-relaxed mb-6">
              YouTuber and content creator Jackfilms trusts Foxomy to power his
              Minecraft server,{" "}
              <a
                href="https://www.youtube.com/watch?v=G-Fc7V3hgF8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00c4aa] font-semibold hover:text-[#00d4b8] transition-colors"
              >
                StagelightSMP
              </a>
              . With millions of subscribers and an active gaming community,
              reliability and performance are non-negotiable.
            </p>

            <p className="text-[#7AC2EB]/60 text-base leading-relaxed mb-8">
              We're proud to provide the infrastructure that keeps his community
              connected and playing without interruption.
            </p>

            <a
              href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#7AC2EB] font-semibold hover:text-[#00d4b8] transition-colors group"
            >
              Learn more about partnerships
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

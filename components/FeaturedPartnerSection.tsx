"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedPartnerSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#003262] overflow-hidden">
      {/* Background image with blur */}
      <div className="absolute inset-0">
        <Image
          src="/jackfilms-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-[#003262]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Main image */}
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                <Image
                  src="/jackfilms.jpg"
                  alt="Jackfilms"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-3 -right-3 w-64 h-64 md:w-80 md:h-80 border-2 border-[#FDB515]" />
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <span className="text-[#FDB515] text-sm font-semibold tracking-wide uppercase mb-4 block">
              Featured Partner
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Jackfilms
            </h2>

            <p className="text-white/80 text-lg leading-relaxed mb-6">
              YouTuber and content creator Jackfilms trusts Foxomy to power his 
              Minecraft server, <span className="text-[#FDB515] font-semibold">StagelightSMP</span>. 
              With millions of subscribers and an active gaming community, 
              reliability and performance are non-negotiable.
            </p>

            <p className="text-white/60 text-base leading-relaxed mb-8">
              We're proud to provide the infrastructure that keeps his community 
              connected and playing without interruption.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#FDB515] font-semibold hover:text-white transition-colors group"
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


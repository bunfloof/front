"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function FeaturedPartnerSection() {
  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: '#071F2C',
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
            background: 'linear-gradient(135deg, rgba(7,31,44,0.95) 0%, rgba(3,15,22,0.98) 100%)',
          }}
        />
      </div>

      {/* Gradient accents */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center left, rgba(17,168,169,0.3) 0%, transparent 60%)',
        }}
      />

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
              {/* Decorative frame with gradient */}
              <div 
                className="absolute -bottom-3 -right-3 w-64 h-64 md:w-80 md:h-80"
                style={{
                  border: '2px solid transparent',
                  backgroundImage: 'linear-gradient(#071F2C, #071F2C), linear-gradient(135deg, #00c4aa, #0481CD)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
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
              Minecraft server, <span className="text-[#00c4aa] font-semibold">StagelightSMP</span>. 
              With millions of subscribers and an active gaming community, 
              reliability and performance are non-negotiable.
            </p>

            <p className="text-[#7AC2EB]/60 text-base leading-relaxed mb-8">
              We're proud to provide the infrastructure that keeps his community 
              connected and playing without interruption.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#7AC2EB] font-semibold hover:text-[#00c4aa] transition-colors group"
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

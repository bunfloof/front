"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function AboutUsSection() {
  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: '#071F2C',
      }}
    >
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, rgba(7,31,44,0.95) 0%, rgba(3,15,22,0.98) 100%)',
        }}
      />

      {/* Gradient accents */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center right, rgba(17,168,169,0.3) 0%, transparent 60%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-1/2 h-1/2 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(4,129,205,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Logo Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative rounded-2xl overflow-hidden bg-[#0D3A54]/50 flex items-center justify-center">
                <Image
                  src="/placeholder-logo.png"
                  alt="Foxomy Logo"
                  fill
                  className="object-contain p-8"
                />
              </div>
              {/* Decorative frame with gradient */}
              <div 
                className="absolute -bottom-3 -right-3 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl"
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
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-50 mb-6 leading-tight">
              Foxomy was founded by furries, for furries
            </h2>

            <p className="text-[#BDE0F5] text-lg leading-relaxed mb-6">
              Tired of feeling like you're "just a number" at your provider? With Foxomy, 
              you can even chat with the owner on Discord if you need assistance. We love 
              getting to know our customers.
            </p>

            <p className="text-[#7AC2EB]/60 text-base leading-relaxed mb-8">
              Learn more about our story and why you should choose Foxomy for your 
              hosting needs!
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#7AC2EB] font-semibold hover:text-[#00c4aa] transition-colors group"
            >
              Read our story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


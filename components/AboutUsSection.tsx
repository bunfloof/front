"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const staffImages = [
  { name: "Bun", src: "/imgs/portfolios/bun/bun icon.PNG" },
  {
    name: "Allitari",
    src: "/imgs/portfolios/allitari/d29ad6e8d9e07a8f0245a148f6255e3eab58e82c_full.jpg",
  },
  {
    name: "Cozmo",
    src: "/imgs/portfolios/cozmo/cd5b90be-add9-4e2c-b44a-97ab882580d5.jpeg",
  },
  { name: "Cheese", src: "/imgs/portfolios/cheese/ander.webp" },
  { name: "Goldie", src: "/imgs/portfolios/goldie/goldie.png" },
  {
    name: "Deku",
    src: "/imgs/portfolios/deku/43afee8815eccf17a55beddb2758564c.jpeg",
  },
  {
    name: "Tofu",
    src: "/imgs/portfolios/tofu/465e9a9f3fd566393fc51da7ee9b1c3b.jpeg",
  },
  {
    name: "Halo",
    src: "/imgs/portfolios/halo/298026AE-15B9-4D5C-9ECD-8EE7C428331C.png",
  },
  { name: "Lemon", src: "/imgs/portfolios/lemon/SZbo1k9w_400x400.png" },
  {
    name: "Shy",
    src: "/imgs/portfolios/shy/3a4b3f795ad45ecb136155086e5b81dd.png",
  },
  { name: "Kobi", src: "/imgs/portfolios/kobi/73299267.png" },
];

export function AboutUsSection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: "#071F2C",
      }}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(7,31,44,0.95) 0%, rgba(3,15,22,0.98) 100%)",
        }}
      />

      {/* Gradient accents */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center right, rgba(17,168,169,0.3) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-1/2 h-1/2 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(4,129,205,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - California Image with Staff Carousel */}
          <div className="relative flex justify-center lg:justify-start -my-12 lg:-my-20 lg:-ml-16">
            {/* Glow effect behind the California SVG */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,196,170,0.5) 0%, rgba(4,129,205,0.3) 40%, transparent 70%)",
                transform: "scale(1.2)",
              }}
            />

            {/* California SVG */}
            <img
              src="/cal5.svg"
              alt="California silhouette - Foxomy is based in California"
              className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 15px rgba(0,196,170,0.2)) drop-shadow(0 0 40px rgba(0,196,170,0.1)) drop-shadow(0 0 80px rgba(4,129,205,0.01))",
              }}
            />

            {/* Staff Carousel Overlay */}
            <div className="absolute inset-x-0 top-[20%] flex items-center overflow-hidden">
              {/* Fade edges - matching profile box heights */}
              <div
                className="absolute left-0 w-10 h-14 md:h-16 lg:h-20 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(7,31,44,1) 0%, transparent 100%)",
                }}
              />
              <div
                className="absolute right-0 w-6 h-14 md:h-16 lg:h-20 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, rgba(7,31,44,1) 0%, transparent 100%)",
                }}
              />

              {/* Scrolling container */}
              <div
                className="flex animate-scroll-left"
                style={{ width: "max-content" }}
              >
                {/* Triple the images for seamless loop */}
                {[...staffImages, ...staffImages, ...staffImages].map(
                  (staff, index) => (
                    <div
                      key={`${staff.name}-${index}`}
                      className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-1.5 md:mx-1.5"
                    >
                      <img
                        src={staff.src}
                        alt={staff.name}
                        className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-[#00c4aa]/30"
                      />
                    </div>
                  )
                )}
              </div>
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
              For the past 5 years, Foxomy has been a leading provider of hosting services for the furry community. We've helped thousands of furries build their dream servers and create unforgettable experiences.
            </p>

            <p className="text-[#7AC2EB]/60 text-base leading-relaxed mb-8">
              Learn more about our story and why you should choose Foxomy for
              your hosting needs!
            </p>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#7AC2EB] font-semibold hover:text-[#00c4aa] transition-colors group"
            >
              Read our blog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

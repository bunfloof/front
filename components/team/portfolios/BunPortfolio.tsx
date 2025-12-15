"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export const memberData = {
  id: "bun",
  name: "Bun",
  role: "Chink",
  handle: "@bunarcticfloof",
  avatar: "/imgs/portfolios/bun/IMG_0308.png",
  portfolioBg: "bg-[#2774AE]",
};

export function BunPortfolio() {
  return (
    <div className="min-h-[300px] p-8 md:p-12 bg-[#2774AE]">
      {/* Bunny has a two-column layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Bio and intro */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#8BB8E8]/50">
                <Image
                  src={memberData.avatar}
                  alt={memberData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {memberData.name}
                </h2>
                <p className="text-[#98e7ff]">{memberData.role}</p>
                <p className="text-white/60 text-sm">{memberData.handle}</p>
              </div>
            </div>

            <p className="text-white/90 leading-relaxed mb-6">
              I have over 13 years of experience in hosting Minecraft servers.
              My first public server opened in 2012 and was called the{" "}
              <a
                href="https://www.planetminecraft.com/forums/minecraft/servers/piratebay-server-need-132042/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98e7ff] hover:text-white hover:underline"
              >
                "PirateBay Server"
              </a>{" "}
              using Hamachi. In 2017, I gained my first experience with server
              hosting services through Google Cloud. Eventually, I founded
              Foxomy in September 2020 while I was still in high school. I went
              on to earn my Bachelor's degree in Computer Engineering in 2024 at
              the University of California, Santa Cruz, and am currently
              pursuing a Master's in Physics.
            </p>
          </div>

          {/* Right side - Image Gallery */}
          <div className="center items-center justify-center flex">
            <Gallery>
              <div className="grid grid-cols-4 gap-3">
                {[
                  "IMG_1388.png",
                  "IMG_0308.png",
                  "IMG_8949.PNG",
                  "bunfloof.png",
                  "IMG_1015.JPG",
                  "IMG_3355.PNG",
                  "IMG_3746.JPG",
                  "bun icon.PNG",
                ].map((image, index) => (
                  <Item
                    key={index}
                    original={`/imgs/portfolios/bun/${image}`}
                    thumbnail={`/imgs/portfolios/bun/${image}`}
                    width="800"
                    height="800"
                    alt={`Gallery image ${index + 1}`}
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-[#8BB8E8]/30 hover:border-[#8BB8E8]/70 transition-colors"
                      >
                        <img
                          src={`/imgs/portfolios/bun/${image}`}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                ))}
              </div>
            </Gallery>
          </div>
        </div>
      </div>
    </div>
  );
}

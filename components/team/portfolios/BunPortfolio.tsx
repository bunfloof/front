"use client";

import Image from "next/image";

export const memberData = {
  id: "bun",
  name: "Bun",
  role: "Founder",
  handle: "@bunarticfloof",
  avatar: "/imgs/bun/IMG_0308.png",
};

export function BunPortfolio() {
  return (
    <div className="min-h-[300px] p-8 md:p-12">
      {/* Bunny has a two-column layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Bio and intro */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#00c4aa]/30">
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
                <p className="text-[#00c4aa]">{memberData.role}</p>
                <p className="text-[#7AC2EB]/60 text-sm">{memberData.handle}</p>
              </div>
            </div>

            <p className="text-[#BDE0F5] leading-relaxed mb-6">
              I have over 10 years of experience in hosting Minecraft servers and I'm here to help you get your server running perfectly.
            </p>

            <p className="text-[#7AC2EB]/70 leading-relaxed">
              As the founder of Foxomy, I wanted to create a hosting service
              that truly understands its customers. Being part of the furry
              community myself, I know how important it is to have a reliable,
              friendly place to host your projects.
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}

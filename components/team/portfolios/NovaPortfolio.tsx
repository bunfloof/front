"use client";

import Image from "next/image";
import { Twitter } from "lucide-react";

// Nova's data - edit directly here!
export const memberData = {
  id: "nova",
  name: "Nova",
  role: "Community Manager",
  handle: "@nova",
  avatar: "/team/nova.png",
  bio: "Keeping our Discord server running smoothly and making sure everyone feels welcome. Love helping people solve their hosting problems!",
  portfolioBg: "bg-[#071F2C]",
  links: {
    discord: "nova",
    twitter: "novafluff",
  },
  skills: ["Community Management", "Support", "Content Creation"],
  joinedDate: "2024",
};

export function NovaPortfolio() {
  return (
    <div className="min-h-[300px] p-8 md:p-12">
      {/* Nova has a centered, minimal layout */}
      <div className="max-w-3xl mx-auto text-center">
        {/* Large centered avatar */}
        <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-[#00c4aa]/30 mb-6">
          <Image
            src={memberData.avatar}
            alt={memberData.name}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          {memberData.name}
        </h2>
        <p className="text-[#00c4aa] text-lg mb-2">{memberData.role}</p>
        <p className="text-[#7AC2EB]/60 mb-6">{memberData.handle}</p>

        <p className="text-[#BDE0F5] text-lg leading-relaxed mb-4">
          {memberData.bio}
        </p>

        <p className="text-[#7AC2EB]/70 leading-relaxed mb-8">
          Community is at the heart of everything we do at Foxomy. I'm here to
          make sure everyone feels at home. Don't be shy - come say hi in our
          Discord!
        </p>

        {/* Skills as tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {memberData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-[#00c4aa]/10 border border-[#00c4aa]/30 rounded-full text-sm text-[#00c4aa]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social link */}
        {memberData.links.twitter && (
          <a
            href={`https://twitter.com/${memberData.links.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#7AC2EB]/70 hover:text-[#00c4aa] transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span>Follow me on Twitter</span>
          </a>
        )}
      </div>
    </div>
  );
}

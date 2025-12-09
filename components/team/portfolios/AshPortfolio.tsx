"use client";

import Image from "next/image";
import { TeamMember } from "../teamMembers";
import { MessageCircle } from "lucide-react";

interface PortfolioProps {
  member: TeamMember;
}

export function AshPortfolio({ member }: PortfolioProps) {
  return (
    <div className="min-h-[300px] p-8 md:p-12">
      {/* Ash has a simple, support-focused layout */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left - Avatar and quick info */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#1A77AD]/30 mb-4">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-white">{member.name}</h2>
            <p className="text-[#00c4aa] text-sm">{member.role}</p>
          </div>

          {/* Right - Bio and specialties */}
          <div className="flex-1">
            <p className="text-[#BDE0F5] text-lg leading-relaxed mb-4">
              {member.bio}
            </p>

            <p className="text-[#7AC2EB]/70 leading-relaxed mb-6">
              I've been working with Minecraft servers for years, so I know
              exactly what issues you might run into and how to fix them.
            </p>

            {/* Specialties */}
            {member.skills && (
              <div className="mb-6">
                <h4 className="text-[#7AC2EB]/50 text-xs font-semibold uppercase tracking-wider mb-3">
                  I can help with
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-[#0D3A54]/70 rounded text-sm text-[#BDE0F5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            {member.links?.discord && (
              <a
                href="https://discord.gg/foxomy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message me on Discord</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

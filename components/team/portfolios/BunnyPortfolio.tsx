"use client";

import Image from "next/image";
import { TeamMember } from "../teamMembers";
import { Github, Twitter } from "lucide-react";

interface PortfolioProps {
  member: TeamMember;
}

export function BunnyPortfolio({ member }: PortfolioProps) {
  return (
    <div className="min-h-[300px] p-8 md:p-12">
      {/* Bunny has a two-column layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Bio and intro */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#00c4aa]/30">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                <p className="text-[#00c4aa]">{member.role}</p>
                <p className="text-[#7AC2EB]/60 text-sm">{member.handle}</p>
              </div>
            </div>

            <p className="text-[#BDE0F5] text-lg leading-relaxed mb-6">
              {member.bio}
            </p>

            <p className="text-[#7AC2EB]/70 leading-relaxed">
              As the founder of Foxomy, I wanted to create a hosting service
              that truly understands its customers. Being part of the furry
              community myself, I know how important it is to have a reliable,
              friendly place to host your projects.
            </p>
          </div>

          {/* Right side - Skills and links */}
          <div>
            {member.skills && (
              <div className="mb-8">
                <h4 className="text-[#00c4aa] text-sm font-semibold uppercase tracking-wider mb-4">
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-[#0D3A54]/50 border border-[#1A77AD]/30 rounded-lg text-sm text-[#BDE0F5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.joinedDate && (
              <p className="text-[#7AC2EB]/50 text-sm mb-6">
                Building Foxomy since {member.joinedDate}
              </p>
            )}

            <div className="flex items-center gap-4">
              {member.links?.github && (
                <a
                  href={`https://github.com/${member.links.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D3A54]/50 rounded-lg text-[#7AC2EB]/70 hover:text-[#00c4aa] hover:bg-[#0D3A54] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {member.links?.twitter && (
                <a
                  href={`https://twitter.com/${member.links.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D3A54]/50 rounded-lg text-[#7AC2EB]/70 hover:text-[#00c4aa] hover:bg-[#0D3A54] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm">Twitter</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

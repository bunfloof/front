"use client";

import Image from "next/image";
import { TeamMember } from "../teamMembers";
import { Github, Twitter } from "lucide-react";

interface PortfolioProps {
  member: TeamMember;
}

export function FelixPortfolio({ member }: PortfolioProps) {
  return (
    <div className="min-h-[300px] p-8 md:p-12">
      {/* Felix has his own unique layout */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {member.name}
            </h2>
            <p className="text-red-200 text-lg mb-4">{member.role}</p>
            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl">
              {member.bio}
            </p>

            {/* Skills */}
            {member.skills && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              {member.links?.github && (
                <a
                  href={`https://github.com/${member.links.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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

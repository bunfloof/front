"use client";

// SkylerAcer's data - edit directly here!
export const memberData = {
  id: "skyleracer",
  name: "SkylerAcer",
  role: "Moderation Team Lead",
  handle: "@skyleracer",
  avatar: "/imgs/portfolios/skyleracer/2d7a837db7998ba98e68d0a7b5bea708.png",
  portfolioBg: "bg-gray-700",
};

export function SkylerAcerPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}











"use client";

// Shy's data - edit directly here!
export const memberData = {
  id: "shy",
  name: "Shy",
  role: "Partners Team Member",
  handle: "@shy",
  avatar: "/imgs/portfolios/shy/3a4b3f795ad45ecb136155086e5b81dd.png",
  portfolioBg: "bg-gray-700",
};

export function ShyPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}











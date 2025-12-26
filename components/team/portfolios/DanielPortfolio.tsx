"use client";

// Daniel's data - edit directly here!
export const memberData = {
  id: "daniel",
  name: "Daniel",
  role: "Moderation Team Director",
  handle: "@daniel",
  avatar: "/imgs/portfolios/daniel/1fffa6728c713292f37ad93ccfea3110.jpeg",
  portfolioBg: "bg-gray-700",
};

export function DanielPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}








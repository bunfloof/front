"use client";

// Kobi's data - edit directly here!
export const memberData = {
  id: "kobi",
  name: "Kobi",
  role: "Backend Development Lead",
  handle: "@kobi",
  avatar: "/imgs/portfolios/kobi/73299267.png",
  portfolioBg: "bg-gray-700",
};

export function KobiPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}










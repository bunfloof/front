"use client";

// Broken Sun's data - edit directly here!
export const memberData = {
  id: "brokensun",
  name: "Broken Sun",
  role: "Creative Team Member",
  handle: "@brokensun",
  avatar: "/imgs/portfolios/brokensun/3k47qnkt_400x400.jpg",
  portfolioBg: "bg-gray-700",
};

export function BrokenSunPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





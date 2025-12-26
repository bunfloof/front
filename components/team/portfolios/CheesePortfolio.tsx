"use client";

// Cheese's data - edit directly here!
export const memberData = {
  id: "cheese",
  name: "Cheese",
  role: "Business Team Lead",
  handle: "@cheese",
  avatar: "/imgs/portfolios/cheese/ander.webp",
  portfolioBg: "bg-gray-700",
};

export function CheesePortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}








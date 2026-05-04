"use client";

// Ayasu's data - edit directly here!
export const memberData = {
  id: "blstmo",
  name: "Blstmo",
  role: "Senior System Administrator",
  handle: "@blstmo",
  avatar: "/imgs/portfolios/blstmo/blstmo.jpg",
  portfolioBg: "bg-gray-700",
};

export function BlstmoPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}

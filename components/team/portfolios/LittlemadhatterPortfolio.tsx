"use client";

// Littlemadhatter's data - edit directly here!
export const memberData = {
  id: "littlemadhatter",
  name: "Littlemadhatter",
  role: "Frontend Development Team Member",
  handle: "@littlemadhatter",
  avatar:
    "/imgs/portfolios/littlemadhatter/e726e60255fa7c04ca30ffb2348c9943.jpeg",
  portfolioBg: "bg-gray-700",
};

export function LittlemadhatterPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}






"use client";

// Benjamin Carter's data - edit directly here!
export const memberData = {
  id: "benjamincarter",
  name: "Benji",
  role: "Local Team Member",
  handle: "@benjamincarter",
  avatar: "/imgs/portfolios/benjamincarter/benji.webp",
  portfolioBg: "bg-gray-700",
};

export function BenjaminCarterPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












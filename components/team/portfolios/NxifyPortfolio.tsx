"use client";

// Nxifiy's data - edit directly here!
export const memberData = {
  id: "nxify",
  name: "Tenn",
  role: "Backend Developer Member",
  handle: "@nxify",
  avatar: "/imgs/portfolios/nxify/03c7606084f8fe89bb0f927bbf778136.jpeg",
  portfolioBg: "bg-gray-700",
};

export function NxifyPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}


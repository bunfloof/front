"use client";

// Papatonydeep's data - edit directly here!
export const memberData = {
  id: "papatonydeep",
  name: "Papatonydeep",
  role: "HR Team Member",
  handle: "@papatonydeep",
  avatar: "/imgs/portfolios/papatonydeep/papatonydeep.webp",
  portfolioBg: "bg-gray-700",
};

export function PapatonydeepPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





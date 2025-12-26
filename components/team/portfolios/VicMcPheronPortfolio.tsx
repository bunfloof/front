"use client";

// Vic McPheron's data - edit directly here!
export const memberData = {
  id: "vicmcpheron",
  name: "Vic McPheron",
  role: "Creative Team Member",
  handle: "@vicmcpheron",
  avatar: "/imgs/portfolios/vicmcpheron/vic2.webp",
  portfolioBg: "bg-gray-700",
};

export function VicMcPheronPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}








"use client";

// Feliix's data - edit directly here!
export const memberData = {
  id: "feliix",
  name: "Feliix",
  role: "Creative Team Lead",
  handle: "@feliix",
  avatar: "/imgs/portfolios/feliix/IMG_3882.JPG",
  portfolioBg: "bg-gray-700",
};

export function FeliixPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}











"use client";

// Tofu's data - edit directly here!
export const memberData = {
  id: "tofu",
  name: "Tofu",
  role: "Finance Team Lead",
  handle: "@tofu",
  avatar: "/imgs/portfolios/tofu/465e9a9f3fd566393fc51da7ee9b1c3b.jpeg",
  portfolioBg: "bg-gray-700",
};

export function TofuPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}






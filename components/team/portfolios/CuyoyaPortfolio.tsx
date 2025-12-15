"use client";

// Cucoya's data - edit directly here!
export const memberData = {
  id: "cuyoya",
  name: "Cuyoya",
  role: "Partners Team Lead",
  handle: "@cuyoya",
  avatar: "/imgs/portfolios/cuyoya/xD_rDP1N_400x400.jpg",
  portfolioBg: "bg-gray-700",
};

export function CuyoyaPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}


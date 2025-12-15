"use client";

// ThatKyrgyz's data - edit directly here!
export const memberData = {
  id: "thatkyrgyz",
  name: "ThatKyrgyz",
  role: "Partners Team",
  handle: "@thatkyrgyz",
  avatar: "/imgs/portfolios/thatkyrgyz/6a875a507461d3d8d72bd1c1cb80bf44.jpeg",
  portfolioBg: "bg-gray-700",
};

export function ThatKyrgyzPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





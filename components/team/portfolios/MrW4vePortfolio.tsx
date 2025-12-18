"use client";

// MrW4ve's data - edit directly here!
export const memberData = {
  id: "mrw4ve",
  name: "MrW4ve",
  role: "Backend Development Member",
  handle: "@mrw4ve",
  avatar: "/imgs/portfolios/mrw4ve/mrw4ve.png",
  portfolioBg: "bg-gray-700",
};

export function MrW4vePortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





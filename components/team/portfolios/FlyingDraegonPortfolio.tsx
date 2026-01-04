"use client";

// FlyingDraegon's data - edit directly here!
export const memberData = {
  id: "flyingdraegon",
  name: "FlyingDraegon",
  role: "Local Team Director ",
  handle: "@flyingdraegon",
  avatar:
    "/imgs/portfolios/flyingdraegon/0e81c9dba9f141844bb9763372fe1906.png",
  portfolioBg: "bg-[#80FFC0]",
};

export function FlyingDraegonPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-black/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












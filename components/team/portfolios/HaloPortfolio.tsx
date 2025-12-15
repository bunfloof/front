"use client";

// Grayson Gorney's data - edit directly here!
export const memberData = {
  id: "halo",
  name: "HaloPaws",
  role: "Backend Developer Team Member",
  handle: "@halopaws",
  avatar: "/imgs/portfolios/halo/298026AE-15B9-4D5C-9ECD-8EE7C428331C.png",
  portfolioBg: "bg-gray-700",
};

export function HaloPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}

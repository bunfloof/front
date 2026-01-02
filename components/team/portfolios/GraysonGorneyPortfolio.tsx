"use client";

// Grayson Gorney's data - edit directly here!
export const memberData = {
  id: "graysongorney",
  name: "Grayson Gorney",
  role: "Marketing Team Member",
  handle: "@graysongorney",
  avatar: "/imgs/portfolios/graysongorney/grayson.webp",
  portfolioBg: "bg-gray-700",
};

export function GraysonGorneyPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}











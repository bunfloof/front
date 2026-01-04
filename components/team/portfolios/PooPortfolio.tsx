"use client";

// Poo's data - edit directly here!
export const memberData = {
  id: "poo",
  name: "Poo",
  role: "Local Team Member",
  handle: "@poo",
  avatar: "/imgs/portfolios/poo/0b555fbb28e23ccab570afc6bbcaa362.jpeg",
  portfolioBg: "bg-[#E65461]",
};

export function PooPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-black/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












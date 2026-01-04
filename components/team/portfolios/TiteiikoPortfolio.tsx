"use client";

// Titeiiko's data - edit directly here!
export const memberData = {
  id: "titeiiko",
  name: "Titeiiko",
  role: "Finance Team",
  handle: "@titeiiko",
  avatar: "/imgs/portfolios/titeiiko/65754609.png",
  portfolioBg: "bg-gray-700",
};

export function TiteiikoPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












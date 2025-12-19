"use client";

// Ayasu's data - edit directly here!
export const memberData = {
  id: "ayasu",
  name: "Ayasu",
  role: "Social Media Team Lead",
  handle: "@ayasu",
  avatar: "/imgs/portfolios/ayasu/2fec834ae140ff896984efbc329effba.png",
  portfolioBg: "bg-gray-700",
};

export function AyasuPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}






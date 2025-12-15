"use client";

// Ayasu's data - edit directly here!
export const memberData = {
  id: "enoch",
  name: "Enoch",
  role: "C/CMSgt",
  handle: "@enoch",
  avatar: "/imgs/portfolios/enoch/enoch.jpg",
  portfolioBg: "bg-gray-700",
};

export function EnochPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}

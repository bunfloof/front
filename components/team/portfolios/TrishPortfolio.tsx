"use client";

// Trish's data - edit directly here!
export const memberData = {
  id: "trish",
  name: "Trish",
  role: "Support Team Director",
  handle: "@trish",
  avatar: "/imgs/portfolios/trish/fd3c42c4e4ded19a2e1433535c3babc1.jpeg",
  portfolioBg: "bg-gray-700",
};

export function TrishPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












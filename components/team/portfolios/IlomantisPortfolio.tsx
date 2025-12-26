"use client";

// Ilomantis's data - edit directly here!
export const memberData = {
  id: "ilomantis",
  name: "Ilomantis",
  role: "Business Team Member",
  handle: "@ilomantis",
  avatar: "/imgs/portfolios/ilomantis/75d6c0e674bb9134ff0af7d6028c450f.jpeg",
  portfolioBg: "bg-gray-700",
};

export function IlomantisPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}








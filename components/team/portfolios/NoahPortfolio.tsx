"use client";

// Noah's data - edit directly here!
export const memberData = {
  id: "noah",
  name: "Noah",
  role: "HR Team Member",
  handle: "@noah",
  avatar: "/imgs/portfolios/noah/noah.jpg",
  portfolioBg: "bg-gray-700",
};

export function NoahPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





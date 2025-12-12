"use client";

// Felix's data - edit directly here!
export const memberData = {
  id: "felix",
  name: "Felix",
  role: "Lead Developer",
  handle: "@felix",
  avatar: "/team/felix.png",
  portfolioBg: "bg-gray-700",
};

export function FelixPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet. Please check back later.
      </p>
    </div>
  );
}

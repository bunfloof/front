"use client";

// Deku's data - edit directly here!
export const memberData = {
  id: "deku",
  name: "Deku",
  role: "Graphics Team Member",
  handle: "@deku",
  avatar: "/imgs/portfolios/deku/43afee8815eccf17a55beddb2758564c.jpeg",
  portfolioBg: "bg-gray-700",
};

export function DekuPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}








"use client";

// Zolomight's data - edit directly here!
export const memberData = {
  id: "zolomight",
  name: "Zolomight",
  role: "Communications Team Lead",
  handle: "@zolomight",
  avatar: "/imgs/portfolios/zolomight/fa79f9a44e607f5ed7a33c0884032ab1.jpeg",
  portfolioBg: "bg-gray-700",
};

export function ZolomightPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












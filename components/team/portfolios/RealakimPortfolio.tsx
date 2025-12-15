"use client";

// realakim's data - edit directly here!
export const memberData = {
  id: "realakim",
  name: "realakim",
  role: "Creative Team Member",
  handle: "@realakim",
  avatar: "/imgs/portfolios/realakim/8aae42285272a48a4f9d2fd7c6d1cc61.png",
  portfolioBg: "bg-gray-700",
};

export function RealakimPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





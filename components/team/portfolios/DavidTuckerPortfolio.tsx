"use client";

// David Tucker's data - edit directly here!
export const memberData = {
  id: "davidtucker",
  name: "David Tucker",
  role: "Business Team Director",
  handle: "@dtucker2003",
  avatar: "/imgs/portfolios/davidtucker/f103b5a8aaf78842b2886fa711f83a71.jpeg",
  portfolioBg: "bg-gray-700",
};

export function DavidTuckerPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}

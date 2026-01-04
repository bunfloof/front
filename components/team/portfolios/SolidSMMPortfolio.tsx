"use client";

// SolidSMM's data - edit directly here!
export const memberData = {
  id: "solidsmm",
  name: "SolidSMM",
  role: "Marketing Team Director",
  handle: "@solidsmm",
  avatar: "/imgs/portfolios/solidsmm/logo-solid-SMM-SMM-Panel-4.png",
  portfolioBg: "bg-gray-700",
};

export function SolidSMMPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}












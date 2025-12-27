"use client";

// GrayDay78's data - edit directly here!
export const memberData = {
  id: "grayday78",
  name: "GrayDay78",
  role: "Graphics Team Lead",
  handle: "@grayday78",
  avatar: "/imgs/portfolios/grayday78/rdCoB3yt_400x400.jpg",
  portfolioBg: "bg-gray-700",
};

export function GrayDay78Portfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}









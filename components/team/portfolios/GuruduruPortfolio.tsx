"use client";

// Guruduru's data - edit directly here!
export const memberData = {
  id: "guruduru",
  name: "Guruduru",
  role: "Local Team Lead",
  handle: "@guruduru",
  avatar: "/imgs/portfolios/guruduru/d376d989a15ff420063fca4e85ecdac2.jpeg",
  portfolioBg: "bg-[#D85B6B]",
};

export function GuruduruPortfolio() {
  return (
    <div className="bg-[url('/imgs/portfolios/guruduru/27b2609006c5dbca161b2016c9acaf2b.jpeg')] bg-cover bg-center">
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-white/60 text-lg backdrop-blur-sm">
          {memberData.name} hasn't set up their portfolio yet.
        </p>
      </div>
    </div>
  );
}








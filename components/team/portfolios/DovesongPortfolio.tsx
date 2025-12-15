"use client";

// Dovesong's data - edit directly here!
export const memberData = {
  id: "dovesong",
  name: "Dovesongg",
  role: "Creative Team Member",
  handle: "@dovesongg",
  avatar:
    "/imgs/portfolios/dovesong/591179596_17891065434384736_7265756780106240166_n.jpg",
  portfolioBg: "bg-gray-700",
};

export function DovesongPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <p className="text-white/60 text-lg">
        {memberData.name} hasn't set up their portfolio yet.
      </p>
    </div>
  );
}





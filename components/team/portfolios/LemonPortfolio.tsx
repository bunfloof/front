"use client";

// Lemon's data - edit directly here!
export const memberData = {
  id: "lemon",
  name: "Lemon",
  role: "Kernel Development Director",
  handle: "@lemon",
  avatar: "/imgs/portfolios/lemon/SZbo1k9w_400x400.png",
  portfolioBg: "bg-[#ffeb79]",
};

export function LemonPortfolio() {
  return (
    <div className="min-h-[300px] flex items-center justify-center bg-[#ffeb79]">
      <p className="text-black/60 text-lg underline">
        <a href="https://lemob.xyz/" target="_blank" rel="noopener noreferrer">
          https://lemob.xyz/
        </a>
      </p>
    </div>
  );
}




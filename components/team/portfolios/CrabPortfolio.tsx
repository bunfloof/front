"use client";

// Crab's data - edit directly here!
export const memberData = {
  id: "crab",
  name: "Crab",
  role: "Backend Development Director",
  handle: "@crab",
  avatar: "/imgs/portfolios/crab/2c3354428687d37144951caa2907ba30.png",
  portfolioBg: "bg-black",
};

export function CrabPortfolio() {
  const primaryColor = "#a13534";

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div
        className="w-full max-w-2xl p-6"
        style={{
          border: `4px solid ${primaryColor}`,
          color: primaryColor,
          fontFamily: "var(--font-berkeley-mono)",
        }}
      >
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Hi my name is Crab!</h1>

        {/* Dotted separator */}
        <div
          className="w-full mb-4"
          style={{
            borderTop: `1px dotted ${primaryColor}`,
          }}
        />

        {/* Bio paragraphs */}
        <p className="mb-4">
          I am a developer who does a lot of stuff I guess. Mostly writing code
          in Rust and Typescript. I also have experience with writing smart
          contracts in Solidity &amp; Rust and have shipped many live contracts
          since 2019. Currently I am just working on whatever, experimenting
          with random side projects and tools to make myself actually be
          productive.
        </p>

        <p className="mb-6">
          Outside of programming I am interested in biotech and love reading all
          kinds of medical literature. Solely out of existential dread I hope
          that one day we can dramatically improve our lifespan to live far
          longer than we do now. I want to wait a few hundred years before
          deciding if I wanna die or not! :)
        </p>

        {/* Website link */}
        <span className="font-bold block mb-2">Website</span>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <a
              href="https://crabcrabcrabcrab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: primaryColor }}
            >
              crabcrabcrabcrab.com
            </a>{" "}
            - My personal website with links, socials, and blog!
          </li>
        </ul>

        {/* Fun facts */}
        <span className="font-bold block mb-2">Some other stuff about me</span>
        <ul className="list-disc pl-6">
          <li>
            Dunno what my favorite game is but I like the visual novel Milk
            outside a bag of milk outside a bag of milk.
          </li>
          <li>
            I am into fishkeeping (totally don't have 5 different tanks) and had
            a pufferfish at one point (who unfortunately passed away). Now I am
            making plans to raise a group of six spotted congo pufferfish!
          </li>
          <li>
            At one point I was hyperfocused on skincare. Feel free to hit me up
            for skincare advice.
          </li>
          <li>I am currently in UTC -06:00.</li>
        </ul>
      </div>
    </div>
  );
}

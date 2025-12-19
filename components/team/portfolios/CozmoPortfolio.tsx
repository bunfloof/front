"use client";

import { useState } from "react";
import Image from "next/image";

export const memberData = {
  id: "cozmo",
  name: "Cozmo",
  role: "Local Team Member",
  handle: "@CozmoFPS",
  avatar: "/imgs/portfolios/cozmo/cd5b90be-add9-4e2c-b44a-97ab882580d5.jpeg",
  portfolioBg: "bg-[#06040F]",
};

type Section = "home" | "interests" | "contact";

export function CozmoPortfolio() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div
      className="min-h-[300px] p-4 sm:p-8 md:p-12 bg-cover bg-center"
      style={{
        fontFamily: "var(--font-commissioner)",
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,0.753), rgba(0,0,0,0.753)), url('https://cozmofps.carrd.co/assets/images/bg.gif')",
      }}
    >
      {/* Main Card */}
      <div
        className="relative w-full max-w-xl mx-auto rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 md:p-11 transition-all duration-300 ease-out"
        style={{
          background: "linear-gradient(45deg, #D9B2B2, #96A9EB 54%)",
        }}
      >
        {/* Navigation Buttons */}
        <nav className="flex flex-col sm:flex-row justify-center gap-2">
          {[
            { id: "home" as Section, label: "Home" },
            { id: "interests" as Section, label: "Interests" },
            { id: "contact" as Section, label: "Contact Info" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full sm:w-auto px-4 py-1.5 rounded-lg text-sm font-normal cursor-pointer transition-all ${
                activeSection === item.id
                  ? "bg-black text-white"
                  : "bg-black/70 text-white/80 hover:bg-black hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div>
          {/* Home Section */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              activeSection === "home" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={
                  activeSection === "home"
                    ? "animate-in fade-in zoom-in-95 duration-300"
                    : ""
                }
              >
                {/* Student Badge */}
                <div className="flex justify-center my-3">
                  <span className="text-lg font-bold text-black">
                    Student He/Him
                  </span>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 px-2 sm:px-7">
                  {/* Left Column - Profile */}
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={memberData.avatar}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h1 className="text-sm text-black font-bold mt-1">
                      Hello I&apos;m Cozmo! :3
                    </h1>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-0.5">
                      <a
                        href="https://steamcommunity.com/id/CozmoFPS/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Steam"
                      >
                        <img
                          src="/imgs/portfolios/cozmo/steam-svgrepo-com.svg"
                          alt="Steam"
                          className="w-5 h-5"
                        />
                      </a>
                      <a
                        href="https://soundcloud.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="SoundCloud"
                      >
                        <img
                          src="/imgs/portfolios/cozmo/soundcloud-svgrepo-com.svg"
                          alt="SoundCloud"
                          className="w-5 h-5"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/@CozmoFPS"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="YouTube"
                      >
                        <img
                          src="/imgs/portfolios/cozmo/youtube-168-svgrepo-com.svg"
                          alt="YouTube"
                          className="w-5 h-5"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Right Column - About */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold text-black flex items-center gap-2">
                      About
                    </h2>
                    <div className="text-black text-sm font-semibold space-y-4">
                      <p className="text-center">
                        Hello! I&apos;m a silly little &quot;music
                        producer&quot; based in California!! I&apos;m not very
                        good at what I do but I have a lot of fun doing it
                      </p>
                      <p className="text-center">
                        Thank you for reading! Feel free to look around :3
                      </p>
                    </div>
                  </div>
                </div>

                {/* YouTube Video */}
                <div className="rounded-2xl overflow-hidden bg-black/30 aspect-video mx-2 sm:mx-12 mb-4">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/XXKVouH1cBQ?rel=0&loop=0&controls=1&cc_load_policy=0&autoplay=0"
                    allowFullScreen
                    title="Featured Video"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              activeSection === "interests"
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={
                  activeSection === "interests"
                    ? "animate-in fade-in zoom-in-95 duration-300"
                    : ""
                }
              >
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {/* Likes */}
                  <div className="p-7 rounded-2xl">
                    <p className="text-black text-center text-lg font-medium leading-relaxed">
                      <span className="font-bold">Likes:</span> <br /> kemono
                      style fursuits and art, music production, listening to
                      music, playing the guitar, fabulous beasts, reading,
                      airplanes, and cats :3
                    </p>
                  </div>

                  {/* Dislikes */}
                  <div className="p-7 rounded-2xl">
                    <p className="text-black text-center text-lg font-medium leading-relaxed">
                      <span className="font-bold">Dislikes:</span> <br /> akogeno, toxic
                      positivity, rice, people who take games too seriously (ur
                      not good dude), and my flower allergies &gt;:c
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              activeSection === "contact"
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`text-center ${
                  activeSection === "contact"
                    ? "animate-in fade-in zoom-in-95 duration-300"
                    : ""
                }`}
              >
                <p className="text-black text-lg font-bold leading-relaxed mt-4">
                  Hello! You could find me on
                  <br />
                  any of these platforms! (ordered by usage)
                </p>
                <p className="text-black text-lg font-medium leading-8 my-3">
                  Instagram: CozmoFPS <br />
                  Discord: CozmoFPS <br />
                  Steam: /id/CozmoFPS <br />
                  Telegram: SharkSushii
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4">
          <span className="text-black/50 text-xs">(Made by Jews)</span>
        </footer>
      </div>
    </div>
  );
}

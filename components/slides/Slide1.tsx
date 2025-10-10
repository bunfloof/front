import Image from "next/image";
import Noise from "@/components/ui/noise";

export function Slide1() {
  return (
    <div className="min-h-[700px] flex flex-col">
      {/* Background with Noise */}
      <div className="absolute inset-0 bg-black">
        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_300px,rgba(116,212,255,0.20),transparent)]" />
        {/* Grain overlay */}
        <Noise patternRefreshInterval={2} patternAlpha={35} />
      </div>

      {/* Content - Top section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        {/* Hero Text */}
        <div className="text-center text-white max-w-5xl mx-auto mb-8 md:mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Elevate your next
            <br />
            <span className="text-blue-500">Game Server</span>
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
              Get Started Today
            </button>
            <button className="bg-transparent border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2">
              Starting at just $12/month
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Console Screenshot - Bottom section with mt-auto to push to bottom */}
      <div className="relative z-10 mt-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-t-xl overflow-hidden shadow-2xl border border-gray-800/50 border-b-0">
            {/* Subtle glow behind screenshot */}
            <div className="absolute inset-0 bg-orange-500/5 blur-2xl" />
            <div className="relative">
              <Image
                src="/pterodactylconsole.png"
                alt="Game Server Console"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover object-top"
                priority
              />
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Noise from "@/components/ui/noise";
import { Button } from "@/components/ui/button";

interface Slide2Props {
  isAnimating?: boolean;
}

export function Slide2({ isAnimating = false }: Slide2Props) {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden pt-20">
      {/* Background with Noise */}
      <div className="absolute inset-0 bg-[#070e2b] -top-20">
        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_900px,rgba(87,105,160,0.4),transparent)]" />
        {/* Grain overlay - disabled during animations for better performance */}
        {!isAnimating && <Noise patternRefreshInterval={2} patternAlpha={40} />}
      </div>

      {/* Content - Top section with vertical centering */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Text */}
          <div className="text-white max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              Introducing our new panel
              <br />
            </h1>
            <p className="text-gray-400 mb-6 text-xl">
              The most powerful panel for your game servers and applications.
              Built by developers, for developers.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="classic" size="lg" className="text-md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Console Screenshot - Bottom section with mt-auto to push to bottom */}
      <div className="relative z-10 mt-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-t-xl overflow-hidden shadow-2xl shadow-black border border-gray-800/50 border-b-0">
            {/* Subtle glow behind screenshot */}
            <div className="absolute inset-0 bg-orange-500/5 blur-2xl" />
            <div className="relative">
              <Image
                src="/pterodactylconsole.png"
                alt="Game Server Console"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover object-top"
                draggable={false}
                priority
              />
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

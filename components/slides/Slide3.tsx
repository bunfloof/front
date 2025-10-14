import { Button } from "../ui/button";
import Image from "next/image";

export function Slide3() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden pt-20">
      {/* Background */}
      <Image
        src="/mathias-reding-unsplash.jpg"
        alt="Newspaperbackground"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              Message from CEO
            </h1>
            <p className="text-gray-300 mb-6 text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo orci, semper vel odio nec, tempor consectetur arcu. Aenean et nisl non eros finibus blandit.
            </p>
            <div className="pt-4 mb-8">
              <Button variant="classic" size="lg" className="text-md">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

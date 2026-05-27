import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export function SlideResearch() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden pt-20">
      {/* Background */}
      <Image
        src="/Bero.jpg"
        alt="Bero Research Paper"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay with slight blue tint for academic feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-8">
          <div className="text-white max-w-6xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              Content-Addressed
              <br />
              Backup System for Minecraft servers
            </h1>
            <p className="text-gray-300 mb-6 text-xl leading-relaxed">
              A deep dive into our distributed backup architecture featuring
              content-defined chunking, cryptographic deduplication, and S3
              integration.
            </p>
            <div className="pt-4 mb-8 flex gap-4 flex-wrap">
              <Button variant="classic" size="lg" className="text-md">
                <Link href="/research/bero?mode=light">Read Paper</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

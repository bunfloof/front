import Image from "next/image";
import { Button } from "./ui/button";

export function PowerfulHardwareSection() {
  return (
    <section className="relative py-2 md:pb-16 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-2 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black leading-tight">
              Powerful, High-Quality Hardware
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-base md:text-lg leading-relaxed">
                Our servers are powered by the newer generation AMD Ryzen or
                Intel Core series, DDR5 RAM, and NVMe storage for high
                performance and reliability.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                We use high-quality hardware from various manufacturers,
                regularly maintained and monitored 24/7 to guarantee optimal
                uptime and performance.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/pefetto_porca_troia.png"
              alt="Powerful Hardware"
              width={600}
              height={600}
              className="object-contain w-full h-auto max-w-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

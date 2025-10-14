import { Button } from "../ui/button";
import Image from "next/image";

export function Slide1() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col relative overflow-hidden pt-20">
      {/* Background */}
      <Image
        src="/wallpaper_minecraft_pc_bundle_1920x1080.png"
        alt="Minecraft background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Minecraft Window Background - Starting from center, extending right */}
      <div className="absolute left-1/2 top-0 bottom-0 z-[5] flex items-center ml-40">
        <div className="relative w-[800px] h-[500px] md:h-[550px] lg:h-[600px]">
          <Image
            src="/Minecraftwindow.png"
            alt="Minecraft window"
            fill
            className="object-contain object-left"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              Minecraft Server Hosting
            </h1>
            <p className="text-gray-300 mb-6 text-xl">
              Powered by the fastest rated processors in single threading.
            </p>
            <div className="pt-4 mb-8">
              <Button variant="minecraft" size="xl" className="text-xl">
                Create Server
              </Button>
            </div>
            {/* Features in 2 columns */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 mb-8 bg-black/20 backdrop-blur-sm border border-white/20 rounded-md p-4 max-w-2xl max-h-[300px] overflow-y-auto">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Java & Bedrock Edition Servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Official Partner for Jackfilms SMP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>24/7 DM and Ticket Support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>All Mod & Plugin Support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Curseforge Modpack Installer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Premium Hardware & Low Latency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Full SFTP & MySQL Database Access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Free Server Transfers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>180 day money back guarantee</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>50 Backup Slots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>24/7 Servers with 99.9% Uptime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Get Started in less than 10 minutes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

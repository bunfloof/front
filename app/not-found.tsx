import { MainNavbar } from "@/components/MainNavbar";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="font-sans bg-bluey-950">
      <MainNavbar />

      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Image
          src="/imgs/purr/Lazy_Cat_Spinning_cat.gif"
          alt="Spinning cat"
          width={384}
          height={384}
          className="mb-2"
          unoptimized
        />
        <div className="flex items-center">
          <h1 className="text-2xl text-white font-medium pr-6 mr-6 border-r border-white/30">
            404
          </h1>
          <p className="text-sm text-gray-300">This page could not be found.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "@/components/HeroSection";
import { TransitionSection } from "@/components/TransitionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ServerLocationsSection } from "@/components/ServerLocationsSection";

export default function Home() {
  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />
      <HeroSection />
      {/* Transition Section */}
      <TransitionSection />
      {/* Services Section */}
      <ServicesSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Server Locations Section */}
      <ServerLocationsSection />
    </div>
  );
}

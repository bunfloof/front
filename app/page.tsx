"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "@/components/HeroSection";
import { SupportSection } from "@/components/SupportSection";
import { PowerfulHardwareSection } from "@/components/PowerfulHardwareSection";
import { TrustSection } from "@/components/TrustSection";
import { TransitionSection } from "@/components/TransitionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PanelFeaturesSection } from "@/components/PanelFeaturesSection";
import { ServerLocationsSection } from "@/components/ServerLocationsSection";

export default function Home() {
  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />
      <HeroSection />
      {/* Support Section */}
      <SupportSection />
      {/* Powerful Hardware Section */}
      <PowerfulHardwareSection />
      {/* Transition Section */}
      <TransitionSection />
      {/* Services Section */}
      <ServicesSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Panel Features Section */}
      <PanelFeaturesSection />
      {/* Server Locations Section */}
      <ServerLocationsSection />
    </div>
  );
}

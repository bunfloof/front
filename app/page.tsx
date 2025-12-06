"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { SupportSection } from "@/components/SupportSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { PowerfulHardwareSection } from "@/components/PowerfulHardwareSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FeaturedPartnerSection } from "@/components/FeaturedPartnerSection";
import { PanelFeaturesSection } from "@/components/PanelFeaturesSection";
import { ServerLocationsSection } from "@/components/ServerLocationsSection";

export default function Home() {
  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />
      <HeroSection />
      {/* Stats Section */}
      <StatsSection />
      {/* Services Section */}
      <ServicesSection />
      {/* Support Section */}
      <SupportSection />
      {/* Powerful Hardware Section */}
      <PowerfulHardwareSection />
      {/* Panel Features Section */}
      <PanelFeaturesSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Reviews Section */}
      <ReviewsSection />
      {/* Featured Partner Section */}
      <FeaturedPartnerSection />
      {/* Server Locations Section */}
      <ServerLocationsSection />
      {/* Guarantee Section */}
      <GuaranteeSection />
    </div>
  );
}

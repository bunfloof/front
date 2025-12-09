"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { SupportSection } from "@/components/SupportSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { FAQSection } from "@/components/FAQSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { PowerfulHardwareSection } from "@/components/PowerfulHardwareSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { HatersSection } from "@/components/HatersSection";
import { FeaturedPartnerSection } from "@/components/FeaturedPartnerSection";
import { PanelFeaturesSection } from "@/components/PanelFeaturesSection";
import { ServerLocationsSection } from "@/components/ServerLocationsSection";
import { Footer } from "@/components/Footer";

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
      {/* Haters Section */}
      <HatersSection />
      {/* Guarantee Section */}
      <GuaranteeSection />
      {/* FAQ Section */}
      <FAQSection />
      {/* About Us Section */}
      <AboutUsSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}

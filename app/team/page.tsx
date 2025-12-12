"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { TeamSection } from "@/components/team/TeamSection";
import { Footer } from "@/components/Footer";

export default function TeamPage() {
  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />
      <TeamSection />
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

const tabs = [
  {
    id: 0,
    label: "Multiple Servers",
    video: "/projects.webm",
    description:
      "Split server resources across multiple servers from one plan. Create and manage multiple servers without purchasing separate plans, and switch between games easily.",
    features: [
      "Split resources across servers",
      "Organize servers in projects",
      "Switch games without losing data",
    ],
  },
  {
    id: 1,
    label: "Modpack Installer",
    video: "/modpack.webm",
    description:
      "Browse and install popular modpacks from CurseForge directly in the panel. Update existing modpacks safely without deleting your world.",
    features: [
      "Native CurseForge integration",
      "Safe modpack updates",
      "Intuitive file management",
    ],
  },
  {
    id: 2,
    label: "Jar Installer",
    video: "/jar.webm",
    description:
      "Install server software like Paper, Velocity, Purpur, Forge, NeoForge, and Fabric with just a few clicks. Custom jar files are also supported.",
    features: [
      "Paper, Purpur, Velocity support",
      "Forge, NeoForge, Fabric support",
      "Custom jar files allowed",
    ],
  },
  {
    id: 3,
    label: "BorgBackups",
    video: "/borg.webm",
    description:
      "Powered by BorgBackup for incremental, deduplicated backups. Set automatic schedules and restore individual files when needed.",
    features: [
      "Incremental backups",
      "Automatic scheduling",
      "Individual file restore",
    ],
  },
];

export function PanelFeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
      if (!isMobile) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeTab, isMobile]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const activeData = tabs[activeTab];

  return (
    <section
      className="py-16 md:py-24"
      style={{
        backgroundColor: "#030F16",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl md:text-4xl font-bold text-green-50 mb-4">
            Pterodactyl Panel but built with NextJS 15
          </h2>
          <p className="text-[#BDE0F5]/70 text-lg">
            Our custom fork with major improvements developed in-house.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#1A77AD]/30 mb-10">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === index
                    ? "text-green-50 border-[#00c4aa]"
                    : "text-[#7AC2EB]/60 border-transparent hover:text-green-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Video */}
          <div className="bg-[#071F2C] border border-[#1A77AD]/30">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                key={activeData.video}
                src={activeData.video}
                autoPlay={!isMobile}
                loop
                muted
                playsInline
                className={`w-full h-full object-contain ${
                  isMobile && !isPlaying ? "hidden" : ""
                }`}
              />

              {isMobile && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0D3A54]">
                  <button
                    onClick={handlePlay}
                    className="w-16 h-16 bg-[#00c4aa] text-[#030F16] flex items-center justify-center hover:bg-[#00d4b8] transition-colors"
                  >
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-2xl font-bold text-green-50 mb-4">
              {activeData.label}
            </h3>

            <p className="text-[#BDE0F5]/70 leading-relaxed mb-8">
              {activeData.description}
            </p>

            <ul className="space-y-3 mb-8">
              {activeData.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[#BDE0F5]"
                >
                  <span className="text-[#00c4aa]">•</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#7AC2EB] font-semibold hover:text-[#00c4aa] transition-colors group"
            >
              Request a demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

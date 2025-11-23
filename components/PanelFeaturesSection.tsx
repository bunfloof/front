"use client";

import { useState, useEffect, useRef } from "react";
import {
  Anvil,
  ArrowRightLeft,
  CopyPlus,
  ChevronsLeftRightEllipsis,
  Slice,
  Server,
  Package,
  Coffee,
  Archive,
  SquareTerminal,
  Puzzle,
  SquareStack,
  SquareArrowRight,
  CalendarSync,
  DatabaseBackup,
} from "lucide-react";

const ROTATION_INTERVAL = 10000; // 10 seconds
const TOTAL_TABS = 4;

export function PanelFeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasChangedTab = useRef(false);

  // Reset progress and flag when tab changes
  useEffect(() => {
    setProgress(0);
    hasChangedTab.current = false;
  }, [activeTab]);

  // Progress animation and tab rotation
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Stop at 100
        if (prev >= 100) {
          return 100;
        }

        const newProgress = prev + 1;

        // Change tab only once when reaching 100
        if (newProgress >= 100 && !hasChangedTab.current) {
          hasChangedTab.current = true;
          setActiveTab((current) => (current + 1) % TOTAL_TABS);
        }

        return newProgress;
      });
    }, ROTATION_INTERVAL / 100);

    return () => clearInterval(progressInterval);
  }, [isPaused]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight">
            Pterodactyl Panel
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-gray-600 max-w-xl">
              Pterodactyl Panel is our fork of Pterodactyl Panel with major
              improvements and features developed in-house. We never use
              third-party addons from Builtbybit.
            </p>
            <button className="bg-black text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors w-fit">
              REQUEST A DEMO
            </button>
          </div>
        </div>

        {/* Full Width Tabs with Seamless Progress Bar */}
        <div className="relative mb-8">
          <div className="grid grid-cols-4 gap-0">
            <button
              onClick={() => handleTabClick(0)}
              className={`flex items-center justify-start gap-3 px-6 py-4 transition-all cursor-pointer ${
                activeTab === 0
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Server className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Create Multiple Servers
              </span>
            </button>

            <button
              onClick={() => handleTabClick(1)}
              className={`flex items-center justify-start gap-3 px-6 py-4 transition-all cursor-pointer ${
                activeTab === 1
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Modpack Installer
              </span>
            </button>

            <button
              onClick={() => handleTabClick(2)}
              className={`flex items-center justify-start gap-3 px-6 py-4 transition-all cursor-pointer ${
                activeTab === 2
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Coffee className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Jar Installer
              </span>
            </button>

            <button
              onClick={() => handleTabClick(3)}
              className={`flex items-center justify-start gap-3 px-6 py-4 transition-all cursor-pointer ${
                activeTab === 3
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Archive className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                BorgBackups
              </span>
            </button>
          </div>

          {/* Seamless Full Width Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-black"
              style={{
                width: `${activeTab * 25 + progress * 0.25}%`,
                transition: progress === 0 ? "none" : "width 100ms linear",
              }}
            />
          </div>
        </div>

        {/* Content Area - Separate Cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column - Image Card (3/5) */}
          <div className="lg:col-span-3 bg-white rounded-md">
            <div
              className="relative bg-white overflow-visible flex items-center justify-center rounded-md"
              style={{ height: "428px" }}
            >
              <video
                src="/projects.webm"
                autoPlay
                loop
                muted
                playsInline
                className={`max-w-full max-h-full object-contain ${
                  activeTab === 0 ? "block" : "hidden"
                }`}
              />
              <video
                src="/modpack.webm"
                autoPlay
                loop
                muted
                playsInline
                className={`max-w-full max-h-full object-contain ${
                  activeTab === 1 ? "block" : "hidden"
                }`}
              />
              <video
                src="/jar.webm"
                autoPlay
                loop
                muted
                playsInline
                className={`max-w-full max-h-full object-contain ${
                  activeTab === 2 ? "block" : "hidden"
                }`}
              />
              <video
                src="/borg.webm"
                autoPlay
                loop
                muted
                playsInline
                className={`max-w-full max-h-full object-contain ${
                  activeTab === 3 ? "block" : "hidden"
                }`}
              />
            </div>
          </div>

          {/* Right Column - Feature Cards (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Create Multiple Servers Features */}
            {activeTab === 0 && (
              <>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <Slice className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Split server resources across multiple servers from one
                      plan, organized in projects
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <CopyPlus className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Create multiple servers on one plan without the need to
                      purchase multiple plans
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <ArrowRightLeft className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Switch between games and applications easily without
                      losing data
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Modpack Installer Features */}
            {activeTab === 1 && (
              <>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <Anvil className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Browse and install popular modpacks from CurseForge
                      without ever leaving the panel
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <SquareArrowRight className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Safely update existing modpacks without deleting your
                      world by selecting files to delete
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <ChevronsLeftRightEllipsis className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Intuitive interface with native CurseForge feel, not a
                      one-click modpack installer
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Jar Installer Features */}
            {activeTab === 2 && (
              <>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <Puzzle className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Install Minecraft server software jar files like Paper,
                      Velocity, Purpur, and more.
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <Anvil className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Install modded Minecraft server software jar files like
                      Forge, NeoForge, Fabric, and more.
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <SquareTerminal className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Custom jar files supported and allowed such as RAM hack
                      and jailed shell
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Split Servers Features */}
            {activeTab === 3 && (
              <>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <SquareStack className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Powered by BorgBackup, the incremental and deduplicated backup software
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <CalendarSync className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Set automatic backup schedules for your servers and
                      restore them easily
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] p-4 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center">
                      <DatabaseBackup className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Restore, download, and browse individual files from
                      backups
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

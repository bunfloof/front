"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Check,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CodeOfConductPost() {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("blog-theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  // Save theme preference to localStorage when it changes
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("blog-theme", newTheme ? "dark" : "light");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`font-sans min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#030F16]" : "bg-[#F8FAFC]"
      }`}
    >
      <MainNavbar isDark={isDark} />

      {/* Header */}
      <header
        className={`pt-32 pb-12 border-b transition-colors duration-300 ${
          isDark ? "border-[#1A77AD]/20" : "border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1
            className={`text-3xl md:text-4xl font-bold mb-6 leading-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Relations Code of Conduct
          </h1>

          {/* Meta */}
          <div
            className={`flex flex-wrap items-center text-md transition-colors duration-300 ${
              isDark ? "text-[#D1D5E3]/80" : "text-gray-500"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 5, 2025
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Foxomy Team
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Policy
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? "hover:text-[#D1D5E3]" : "hover:text-gray-600"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={copyLink}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? "hover:text-[#D1D5E3]" : "hover:text-gray-600"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className={`prose prose-lg max-w-none transition-colors duration-300 ${
              isDark ? "prose-invert" : ""
            }`}
          >
            <div
              className={`leading-relaxed space-y-6 transition-colors duration-300 ${
                isDark ? "text-[#D1D5DB]" : "text-gray-600"
              }`}
            >
              <p>
                This Code of Conduct outlines our strict expectations for our
                staff members and customers to maintain a respectful and
                drama-free environment. We aim to be peacekeepers in the hosting
                community.
              </p>

              <h2
                className={`text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300 ${
                  isDark
                    ? "text-white border-[#1A77AD]/30"
                    : "text-gray-900 border-gray-200"
                }`}
              >
                For Staff Members
              </h2>

              <h3
                className={`text-lg font-semibold mt-8 mb-3 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Competitor Relations
              </h3>

              <p>
                We focus on our own work and let our service speak for itself.
                We do not publicly engage in negative commentary about other
                hosting providers.
              </p>

              <p>Staff members are expected to:</p>
              <ul
                className={`list-disc list-inside space-y-2 ml-4 transition-colors duration-300 ${
                  isDark ? "text-[#D1D5DB]" : "text-gray-600"
                }`}
              >
                <li>
                  Never criticize, slander, or speak negatively about other
                  hosting providers
                </li>
                <li>
                  Never participate in other hosting providers&apos; communities
                  to cause conflict or drama
                </li>
                <li>
                  Never retaliate if another competitor speaks negatively about
                  Foxomy
                </li>
              </ul>

              <p>
                Even if other competitors attack us, we agree to disagree and
                move on.
              </p>

              <h3
                className={`text-lg font-semibold mt-8 mb-3 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Humility and Representation
              </h3>

              <p>
                Working at Foxomy is a responsibility, not a status symbol.
                Staff members should not advertise their Foxomy affiliation in
                Discord bios, social media profiles, or elsewhere.
              </p>

              <h3
                className={`text-lg font-semibold mt-8 mb-3 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Our Shared Responsibility
              </h3>

              <p>
                With 42 team members and partners, we all share the
                responsibility of keeping Foxomy&apos;s reputation clean and
                professional. We don&apos;t waste our time or energy on petty
                activities.
              </p>

              <h2
                className={`text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300 ${
                  isDark
                    ? "text-white border-[#1A77AD]/30"
                    : "text-gray-900 border-gray-200"
                }`}
              >
                For Customers
              </h2>

              <p>
                We kindly ask that customers use our official support channels
                when seeking help with their Foxomy services. For the best
                experience, please avoid mentioning Foxomy when asking for
                server help in Discord servers or communities of other hosting
                providers.
              </p>

              <p>
                Our support team is available 24/7 via live chat, Discord, and
                email. We&apos;re here to help you succeed—just reach out to us
                directly.
              </p>

              <p className="text-[#00c4aa] font-semibold mt-8">
                Thank you for being part of the Foxomy.
              </p>
            </div>
          </article>

          {/* cd /blog */}
          <div
            className={`mt-16 pt-8 border-t transition-colors duration-300 ${
              isDark ? "border-[#1A77AD]/20" : "border-gray-200"
            }`}
          >
            <Link
              href="/blog"
              className={`flex w-full justify-between items-center gap-2 transition-colors group rounded-md p-4 ${
                isDark
                  ? "text-[#7AC2EB] hover:bg-[#071F2C]/90 border border-[#1A77AD]/20"
                  : "text-sky-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              cd /blog
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}

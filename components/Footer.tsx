"use client";

import Image from "next/image";
import Link from "next/link";
import { footerSections, socialLinks } from "@/config/navigation";
import { CdnLocationBadge } from "@/components/CdnLocationBadge";

interface FooterProps {
  isDark?: boolean;
}

export function Footer({ isDark = true }: FooterProps) {
  return (
    <footer
      className={`relative -mt-6 w-full rounded-t-3xl border-t transition-colors duration-300 ${
        isDark
          ? "border-[#1A77AD]/30 bg-[#030F16]"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logotail.svg"
                alt="Foxomy"
                width={40}
                height={40}
                className={`w-10 h-10 transition-all duration-300 ${
                  isDark ? "" : "invert"
                }`}
              />
              <span
                className={`text-xl font-semibold transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Foxomy
              </span>
            </Link>
            <p
              className={`text-sm mb-6 transition-colors duration-300 ${
                isDark ? "text-[#7AC2EB]/50" : "text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} Foxomy. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 ${
                    isDark
                      ? "bg-[#0D3A54]/50 text-[#7AC2EB]/60 hover:bg-[#00c4aa]/20 hover:text-[#00c4aa]"
                      : "bg-gray-200 text-gray-500 hover:bg-sky-100 hover:text-sky-600"
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${
                  isDark ? "text-[#d6fff9]" : "text-gray-800"
                }`}
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm transition-colors duration-200 ${
                          isDark
                            ? "text-[#BDE0F5]/70 hover:text-[#00c4aa]"
                            : "text-gray-600 hover:text-sky-600"
                        }`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors duration-200 ${
                          isDark
                            ? "text-[#BDE0F5]/70 hover:text-[#00c4aa]"
                            : "text-gray-600 hover:text-sky-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <CdnLocationBadge isDark={isDark} />
    </footer>
  );
}

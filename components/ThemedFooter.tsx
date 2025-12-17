"use client";

import Image from "next/image";
import Link from "next/link";
import { footerSections, socialLinks } from "@/config/navigation";

export function ThemedFooter() {
  return (
    <footer
      className="relative -mt-6 w-full rounded-t-3xl border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--themed-footer-bg)",
        borderColor: "var(--themed-border-strong)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logotail.svg"
                alt="Foxomy"
                width={40}
                height={40}
                className="w-10 h-10 transition-all duration-300"
                style={{ filter: "var(--themed-logo-filter)" }}
              />
              <span
                className="text-xl font-semibold transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                Foxomy
              </span>
            </div>
            <p
              className="text-sm mb-6 transition-colors duration-300"
              style={{ color: "var(--themed-text-muted)" }}
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
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--themed-social-bg)",
                    color: "var(--themed-social-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--themed-nav-hover)";
                    e.currentTarget.style.color = "var(--themed-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--themed-social-bg)";
                    e.currentTarget.style.color = "var(--themed-social-text)";
                  }}
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
                className="text-xl font-medium mb-4 transition-colors duration-300"
                style={{
                  color: "var(--themed-footer-title)",
                  fontFamily: "var(--font-caveat)",
                }}
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
                        className="text-sm transition-colors duration-200"
                        style={{ color: "var(--themed-text-muted)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--themed-accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--themed-text-muted)";
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: "var(--themed-text-muted)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--themed-accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--themed-text-muted)";
                        }}
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
    </footer>
  );
}

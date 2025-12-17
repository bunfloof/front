"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { menuItems, loginOptions } from "@/config/navigation";

export const ThemedNavbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const [menuState, setMenuState] = React.useState(false);
  const [loginDropdown, setLoginDropdown] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const loginRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full">
      {/* Full-width gradient backdrop when at top */}
      {isAtTop && (
        <div className="fixed inset-x-0 top-0 h-12 -z-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to bottom, var(--themed-nav-bg), transparent)`,
            }}
          />
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:block w-full">
        <div
          className="w-full transition-all duration-300 border-b"
          style={{
            backgroundColor: isAtTop ? "transparent" : "var(--themed-nav-bg)",
            borderColor: isAtTop ? "transparent" : "var(--themed-border)",
            backdropFilter: isAtTop ? "none" : "blur(24px)",
          }}
        >
          <div className="max-w-[90rem] mx-auto w-full flex flex-col relative px-4 py-4 transition duration-200">
            <div className="flex flex-row items-center justify-between transition duration-200">
              <div className="flex flex-row gap-2 items-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 mr-4 relative z-20"
                >
                  <Image
                    src="/logotail.svg"
                    alt="Foxomy"
                    width={24}
                    height={24}
                    className="w-6 h-6 transition-all duration-300"
                    style={{ filter: "var(--themed-logo-filter)" }}
                  />
                  <span
                    className="text-lg font-semibold tracking-tight transition-colors duration-300"
                    style={{ color: "var(--themed-heading)" }}
                  >
                    Foxomy
                  </span>
                </Link>
                <div className="flex items-center gap-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-center text-sm px-4 py-2 h-8 rounded-md transition duration-200"
                      style={{
                        color: "var(--themed-text-muted)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--themed-nav-hover)";
                        e.currentTarget.style.color = "var(--themed-heading)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          "var(--themed-text-muted)";
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--themed-text-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--themed-nav-hover)";
                    e.currentTarget.style.color = "var(--themed-heading)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--themed-text-muted)";
                  }}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>

                <div className="relative" ref={loginRef}>
                  <button
                    onClick={() => setLoginDropdown(!loginDropdown)}
                    className="group relative z-10 text-sm transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center h-8 gap-1.5 border"
                    style={{
                      backgroundColor: "var(--themed-button-bg)",
                      borderColor: "var(--themed-button-border)",
                      color: "var(--themed-button-text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--themed-button-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--themed-button-bg)";
                    }}
                  >
                    Login
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        loginDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {loginDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-48 rounded-lg border backdrop-blur-2xl shadow-xl overflow-hidden z-50"
                        style={{
                          backgroundColor: "var(--themed-dropdown-bg)",
                          borderColor: "var(--themed-border)",
                        }}
                      >
                        {loginOptions.map((option, index) => (
                          <a
                            key={index}
                            href={option.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 text-sm transition-colors duration-150"
                            style={{ color: "var(--themed-text-muted)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--themed-nav-hover)";
                              e.currentTarget.style.color =
                                "var(--themed-heading)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                "var(--themed-text-muted)";
                            }}
                            onClick={() => setLoginDropdown(false)}
                          >
                            {option.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex h-full w-full items-center lg:hidden">
        <div
          className="w-full transition-all duration-300 border-b"
          style={{
            backgroundColor: isAtTop ? "transparent" : "var(--themed-nav-bg)",
            borderColor: isAtTop ? "transparent" : "var(--themed-border)",
            backdropFilter: isAtTop ? "none" : "blur(24px)",
          }}
        >
          <div className="w-full flex flex-row relative justify-between px-4 py-2 mx-auto transition duration-200 items-center">
            <Link href="/" className="flex items-center gap-2 relative z-20">
              <Image
                src="/logotail.svg"
                alt="Foxomy"
                width={24}
                height={24}
                className="w-6 h-6 transition-all duration-300"
                style={{ filter: "var(--themed-logo-filter)" }}
              />
              <span
                className="text-lg font-semibold tracking-tight transition-colors duration-300"
                style={{ color: "var(--themed-heading)" }}
              >
                Foxomy
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="relative z-20 flex items-center justify-center h-8 w-8 rounded-md transition-colors cursor-pointer"
                style={{ color: "var(--themed-text-muted)" }}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 flex items-center justify-center h-8 w-8 px-2"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    initial={{ rotate: 0, y: -6, width: "24px" }}
                    animate={
                      menuState
                        ? { rotate: 45, y: 0, width: "24px" }
                        : { rotate: 0, y: -6, width: "24px" }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block h-0.5 absolute origin-center"
                    style={{ backgroundColor: "var(--themed-heading)" }}
                  />
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={menuState ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="block w-6 h-0.5"
                    style={{ backgroundColor: "var(--themed-heading)" }}
                  />
                  <motion.span
                    initial={{ rotate: 0, y: 6, width: "24px" }}
                    animate={
                      menuState
                        ? { rotate: -45, y: 0, width: "24px" }
                        : { rotate: 0, y: 6, width: "24px" }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block h-0.5 absolute origin-center"
                    style={{ backgroundColor: "var(--themed-heading)" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuState && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-4 right-4 mt-2 p-6 rounded-xl border backdrop-blur-2xl"
              style={{
                backgroundColor: "var(--themed-dropdown-bg)",
                borderColor: "var(--themed-border)",
              }}
            >
              <motion.ul
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block text-sm px-4 py-2 rounded-md transition duration-200"
                      style={{ color: "var(--themed-text-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--themed-nav-hover)";
                        e.currentTarget.style.color = "var(--themed-heading)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          "var(--themed-text-muted)";
                      }}
                      onClick={() => setMenuState(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "var(--themed-border)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <p
                  className="text-xs uppercase tracking-wider px-4 mb-2"
                  style={{ color: "var(--themed-text-muted)" }}
                >
                  Login
                </p>
                {loginOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm px-4 py-2 transition duration-200"
                    style={{ color: "var(--themed-text-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--themed-heading)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--themed-text-muted)";
                    }}
                    onClick={() => setMenuState(false)}
                  >
                    {option.name}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

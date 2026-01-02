"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { menuItems, loginOptions } from "@/config/navigation";

interface MainNavbarProps {
  isDark?: boolean;
}

export const MainNavbar = ({ isDark = true }: MainNavbarProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [loginDropdown, setLoginDropdown] = React.useState(false);
  const [resourcesDropdown, setResourcesDropdown] = React.useState(false);
  const [mobileResourcesExpanded, setMobileResourcesExpanded] =
    React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const loginRef = React.useRef<HTMLDivElement>(null);
  const resourcesRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setLoginDropdown(false);
      }
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target as Node)
      ) {
        setResourcesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full">
      {/* Temporary Announcement Banner */}
      {/* <a
        href="https://foxomy.com/billing/announcements/66/Chicago-IL-outage-and-transfers-today.html"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-2.5 px-4 text-center text-sm font-medium text-white hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg"
      >
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <strong>Chicago Transfers Today:</strong> All remaining Chicago-IL
          server (166.1.173.231){" "}
          transfers are happening today. Click here for
          details →
        </span>
      </a> */}
      {/* Full-width gradient backdrop when at top */}
      {isAtTop && (
        <div className="fixed inset-x-0 top-0 h-12 -z-10 pointer-events-none">
          <div
            className={`w-full h-full bg-gradient-to-b ${
              isDark
                ? "from-black/50 via-black/40 to-transparent"
                : "from-white/50 via-white/40 to-transparent"
            }`}
          />
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:block w-full">
        <div
          className={`w-full transition-all duration-300 border-b ${
            isAtTop
              ? "bg-transparent border-transparent"
              : isDark
              ? "backdrop-blur-2xl bg-[#030F16]/80 border-[#1A77AD]/30"
              : "backdrop-blur-2xl bg-white/80 border-gray-200"
          }`}
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
                    className={`w-6 h-6 transition-all duration-300 select-none ${
                      isDark ? "" : "invert"
                    }`}
                  />
                  <span
                    className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Foxomy
                  </span>
                </Link>
                <div className="flex items-center gap-1">
                  {menuItems.map((item, index) =>
                    item.children ? (
                      <div key={index} className="relative" ref={resourcesRef}>
                        <button
                          onClick={() =>
                            setResourcesDropdown(!resourcesDropdown)
                          }
                          className={`flex items-center justify-center text-sm px-4 py-2 h-8 rounded-md transition duration-200 gap-1 cursor-pointer ${
                            isDark
                              ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {item.name}
                          <svg
                            className={`w-3 h-3 transition-transform duration-200 ${
                              resourcesDropdown ? "rotate-180" : ""
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
                          {resourcesDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              className={`absolute left-0 mt-2 w-48 rounded-lg border backdrop-blur-2xl shadow-xl overflow-hidden z-50 ${
                                isDark
                                  ? "border-[#1A77AD]/30 bg-[#030F16]/95 shadow-black/20"
                                  : "border-gray-200 bg-white/95 shadow-gray-200/50"
                              }`}
                            >
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                                    isDark
                                      ? "text-[#BDE0F5]/80 hover:text-white hover:bg-[#1A77AD]/20"
                                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                  }`}
                                  onClick={() => setResourcesDropdown(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={index}
                        href={item.href!}
                        className={`flex items-center justify-center text-sm px-4 py-2 h-8 rounded-md transition duration-200 ${
                          isDark
                            ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="relative" ref={loginRef}>
                  <button
                    onClick={() => setLoginDropdown(!loginDropdown)}
                    className={`group relative z-10 text-sm transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center h-8 gap-1.5 ${
                      isDark
                        ? "bg-[#071F2C] hover:bg-[#0D3A54] border border-[#1A77AD]/40 text-[#BDE0F5]"
                        : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700"
                    }`}
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
                        className={`absolute right-0 mt-2 w-48 rounded-lg border backdrop-blur-2xl shadow-xl overflow-hidden z-50 ${
                          isDark
                            ? "border-[#1A77AD]/30 bg-[#030F16]/95 shadow-black/20"
                            : "border-gray-200 bg-white/95 shadow-gray-200/50"
                        }`}
                      >
                        {loginOptions.map((option, index) => (
                          <a
                            key={index}
                            href={option.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                              isDark
                                ? "text-[#BDE0F5]/80 hover:text-white hover:bg-[#1A77AD]/20"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
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
          className={`w-full transition-all duration-300 border-b ${
            isAtTop
              ? "bg-transparent border-transparent"
              : isDark
              ? "backdrop-blur-2xl bg-[#030F16]/80 border-[#1A77AD]/30"
              : "backdrop-blur-2xl bg-white/80 border-gray-200"
          }`}
        >
          <div className="w-full flex flex-row relative justify-between px-4 py-2 mx-auto transition duration-200 items-center">
            <Link href="/" className="flex items-center gap-2 relative z-20">
              <Image
                src="/logotail.svg"
                alt="Foxomy"
                width={24}
                height={24}
                className={`w-6 h-6 transition-all duration-300 ${
                  isDark ? "" : "invert"
                }`}
              />
              <span
                className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Foxomy
              </span>
            </Link>

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
                  className={`block h-0.5 absolute origin-center ${
                    isDark ? "bg-white" : "bg-gray-900"
                  }`}
                />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={menuState ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`block w-6 h-0.5 ${
                    isDark ? "bg-white" : "bg-gray-900"
                  }`}
                />
                <motion.span
                  initial={{ rotate: 0, y: 6, width: "24px" }}
                  animate={
                    menuState
                      ? { rotate: -45, y: 0, width: "24px" }
                      : { rotate: 0, y: 6, width: "24px" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`block h-0.5 absolute origin-center ${
                    isDark ? "bg-white" : "bg-gray-900"
                  }`}
                />
              </div>
            </button>
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
              className={`absolute top-full left-4 right-4 mt-2 p-6 rounded-xl border backdrop-blur-2xl max-h-[calc(100vh-80px)] overflow-y-auto ${
                isDark
                  ? "border-[#1A77AD]/30 bg-[#030F16]/90"
                  : "border-gray-200 bg-white/90"
              }`}
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
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileResourcesExpanded(!mobileResourcesExpanded)
                          }
                          className={`flex items-center justify-between w-full text-sm px-4 py-2 rounded-md transition duration-200 cursor-pointer ${
                            isDark
                              ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {item.name}
                          <svg
                            className={`w-3 h-3 transition-transform duration-200 ${
                              mobileResourcesExpanded ? "rotate-180" : ""
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
                          {mobileResourcesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  className={`block text-sm pl-8 pr-4 py-2 transition duration-200 ${
                                    isDark
                                      ? "text-[#BDE0F5]/70 hover:text-white"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                                  onClick={() => setMenuState(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`block text-sm px-4 py-2 rounded-md transition duration-200 ${
                          isDark
                            ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setMenuState(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className={`mt-4 pt-4 border-t ${
                  isDark ? "border-[#1A77AD]/20" : "border-gray-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <p
                  className={`text-xs uppercase tracking-wider px-4 mb-2 ${
                    isDark ? "text-[#BDE0F5]/50" : "text-gray-400"
                  }`}
                >
                  Login
                </p>
                {loginOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-sm px-4 py-2 transition duration-200 ${
                      isDark
                        ? "text-[#BDE0F5]/70 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
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

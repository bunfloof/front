"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

const menuItems = [
  { name: "Minecraft", href: "/game" },
  { name: "Game", href: "/game" },
  { name: "Web", href: "/web" },
  { name: "Team", href: "/team" },
];

const loginOptions = [
  { name: "Billing Panel", href: "https://foxomy.com/billing" },
  { name: "Game Panel", href: "https://panel.foxomy.com/app" },
  { name: "Webhosting Panel", href: "https://us1.rapidcpanelserver.com:2083" },
];

interface MainNavbarProps {
  isDark?: boolean;
}

export const MainNavbar = ({ isDark = true }: MainNavbarProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [loginDropdown, setLoginDropdown] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const loginRef = React.useRef<HTMLDivElement>(null);

  // Close login dropdown when clicking outside
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

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full">
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
                <div className="flex items-center gap-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center justify-center text-sm px-4 py-2 h-8 rounded-md transition duration-200 ${
                        isDark
                          ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
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
              className={`absolute top-full left-4 right-4 mt-2 p-6 rounded-xl border backdrop-blur-2xl ${
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
                    <Link
                      href={item.href}
                      className={`block text-sm px-4 py-2 rounded-md transition duration-200 ${
                        isDark
                          ? "hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setMenuState(false)}
                    >
                      {item.name}
                    </Link>
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

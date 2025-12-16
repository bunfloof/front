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

export const MainNavbar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);

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
          <div className="w-full h-full bg-gradient-to-b from-black/50 via-black/40 to-transparent" />
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:block w-full">
        <div
          className={`w-full transition-all duration-300 border-b ${
            isAtTop
              ? "bg-transparent border-transparent"
              : "backdrop-blur-2xl bg-[#030F16]/80 border-[#1A77AD]/30"
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
                    className="w-6 h-6"
                  />
                  <span className="text-white text-lg font-semibold tracking-tight">
                    Foxomy
                  </span>
                </Link>
                <div className="flex items-center gap-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-center text-sm px-4 py-2 h-8 rounded-md hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white transition duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <Link
                  href="#"
                  className="group bg-[#071F2C] relative z-10 hover:bg-[#0D3A54] border border-[#1A77AD]/40 text-[#BDE0F5] text-sm transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center h-8"
                >
                  Log in
                </Link>
                <Link
                  href="#"
                  className="group bg-[#00c4aa] relative z-10 hover:bg-[#00d4b8] border border-[#00c4aa] text-[#030F16] text-sm transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center h-8"
                >
                  Sign up
                </Link>
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
              : "backdrop-blur-2xl bg-[#030F16]/80 border-[#1A77AD]/30"
          }`}
        >
          <div className="w-full flex flex-row relative justify-between px-4 py-2 mx-auto transition duration-200 items-center">
            <Link href="/" className="flex items-center gap-2 relative z-20">
              <Image
                src="/logotail.svg"
                alt="Foxomy"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-white text-lg font-semibold tracking-tight">
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
                  className="block h-0.5 bg-white absolute origin-center"
                />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={menuState ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="block w-6 h-0.5 bg-white"
                />
                <motion.span
                  initial={{ rotate: 0, y: 6, width: "24px" }}
                  animate={
                    menuState
                      ? { rotate: -45, y: 0, width: "24px" }
                      : { rotate: 0, y: 6, width: "24px" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="block h-0.5 bg-white absolute origin-center"
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
              className="absolute top-full left-4 right-4 mt-2 p-6 rounded-xl border border-[#1A77AD]/30 backdrop-blur-2xl bg-[#030F16]/90"
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
                      className="block text-sm px-4 py-2 rounded-md hover:bg-[#1A77AD]/20 text-[#BDE0F5]/70 hover:text-white transition duration-200"
                      onClick={() => setMenuState(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-6 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Link
                  href="#"
                  className="w-full block text-center bg-[#071F2C] hover:bg-[#0D3A54] border border-[#1A77AD]/40 text-[#BDE0F5] text-sm transition font-medium duration-200 rounded-md px-4 py-2 h-10 leading-6"
                  onClick={() => setMenuState(false)}
                >
                  Log in
                </Link>
                <Link
                  href="#"
                  className="w-full block text-center bg-[#00c4aa] hover:bg-[#00d4b8] border border-[#00c4aa] text-[#030F16] text-sm transition font-medium duration-200 rounded-md px-4 py-2 h-10 leading-6"
                  onClick={() => setMenuState(false)}
                >
                  Sign up
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

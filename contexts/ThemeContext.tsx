"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  brandName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  brandName?: string;
}

export function ThemeProvider({
  children,
  brandName = "Foxomy",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const searchParams = useSearchParams();

  // Load theme from URL query parameter or localStorage on mount
  useEffect(() => {
    // Check for ?mode=light or ?mode=dark query parameter
    const modeParam = searchParams.get("mode");
    if (modeParam === "light" || modeParam === "dark") {
      setTheme(modeParam);
      localStorage.setItem("blog-theme", modeParam);
      return;
    }

    // Fall back to localStorage
    const savedTheme = localStorage.getItem("blog-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [searchParams]);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("blog-theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === "dark", brandName }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

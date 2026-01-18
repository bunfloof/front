import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <ThemeProvider brandName="Research">
        <div className="themed-selection hide-global-footer themed-page">
          {children}
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

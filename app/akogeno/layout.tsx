import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "The Akogeno Act",
};

export default function AkogenoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <ThemeProvider>
        <div className="themed-selection hide-global-footer themed-page">
          {children}
        </div>
      </ThemeProvider>
    </Suspense>
  );
}








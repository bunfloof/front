import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="themed-selection hide-global-footer themed-page">
        {children}
      </div>
    </ThemeProvider>
  );
}





import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider brandName="Blog">
      <div className="themed-selection hide-global-footer themed-page">
        {children}
      </div>
    </ThemeProvider>
  );
}

import { ThemeProvider } from "@/contexts/ThemeContext";

export default function SLALayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="themed-selection hide-global-footer themed-page">
        {children}
      </div>
    </ThemeProvider>
  );
}

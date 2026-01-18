"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { FileText, Calendar, Building2 } from "lucide-react";

interface ResearchPaper {
  slug: string;
  title: string;
  institution: string;
  date: string;
  abstract: string;
}

const researchPapers: ResearchPaper[] = [
  {
    slug: "bero",
    title:
      "Bero: A Distributed Deduplication Backup System with Node-Side Content-Defined Chunking",
    institution: "Foxomy Team",
    date: "January 10, 2026",
    abstract:
      "Keeping backups is an extremely important responsibility for a company to protect their data. This paper proposes Bero, an off-site distributed backup system deployed in production at Foxomy, a game hosting provider with a global presence in multiple geographical regions.",
  },
];

export default function ResearchPage() {
  const { isDark } = useTheme();

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Banner - positioned behind content */}
      <div
        className="absolute top-0 left-0 right-0 h-80 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('/imgs/flowers.jpg')`,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(3, 15, 22, 0.6), rgba(3, 15, 22, 0.4), rgb(3, 15, 22))"
              : "linear-gradient(to bottom, rgba(248, 250, 252, 0.6), rgba(248, 250, 252, 0.4), rgb(248, 250, 252))",
          }}
        />
      </div>

      {/* Content - overlaps the banner */}
      <div className="relative">
        {/* Header */}
        <header className="pt-32 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-4xl font-bold transition-colors duration-300"
              style={{ color: "var(--themed-heading)" }}
            >
              Research
            </h1>
          </div>
        </header>

        {/* Papers List */}
        <main className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {researchPapers.map((paper) => (
                <Link
                  key={paper.slug}
                  href={`/research/${paper.slug}`}
                  className="group block"
                >
                  <article
                    className="rounded-lg overflow-hidden transition-all duration-150 hover:opacity-90 hover:shadow-lg border"
                    style={{
                      borderColor: "var(--themed-border-strong)",
                      boxShadow: isDark
                        ? "0 4px 6px -1px rgba(26, 119, 173, 0.1)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="p-5 border-b transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--themed-bg-secondary)",
                        borderColor: "var(--themed-border-strong)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="min-w-0">
                          <h2
                            className="font-bold text-lg leading-tight transition-colors duration-300"
                            style={{ color: "var(--themed-heading)" }}
                          >
                            {paper.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div
                      className="p-5 transition-colors duration-300"
                      style={{ backgroundColor: "var(--themed-bg)" }}
                    >
                      <p
                        className="text-sm line-clamp-3 transition-colors duration-300"
                        style={{ color: "var(--themed-text)" }}
                      >
                        {paper.abstract}
                      </p>

                      {/* Meta & Tags */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span
                          className="flex items-center gap-1.5 text-xs transition-colors duration-300"
                          style={{ color: "var(--themed-text-muted)" }}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          {paper.institution}
                        </span>
                        <span
                          className="flex items-center gap-1.5 text-xs transition-colors duration-300"
                          style={{ color: "var(--themed-text-muted)" }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {paper.date}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <ThemedFooter />
    </div>
  );
}

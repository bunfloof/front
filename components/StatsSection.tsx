"use client";

import { useEffect, useState } from "react";

interface ApiStats {
  total_customers: number;
  active_customers: number;
  total_servers_deployed: string;
}

function StatSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Match exact height of text-4xl/5xl/6xl font-bold */}
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none">
        <span className="inline-block h-[1em] w-20 md:w-24 bg-gradient-to-r from-[#0D3A54]/60 to-[#092B3E]/60 rounded" />
      </div>
      {/* Match exact height of text-sm with mt-1 */}
      <div className="text-sm font-medium mt-1">
        <span className="inline-block h-[1em] w-24 md:w-28 bg-[#7AC2EB]/20 rounded-sm" />
      </div>
    </div>
  );
}

function formatNumber(num: number | string): string {
  const n = typeof num === "string" ? parseInt(num, 10) : num;
  return n.toLocaleString();
}

export function StatsSection() {
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          "https://fur1.foxomy.com/rustapps/getclientcount"
        );
        const data: ApiStats = await res.json();
        setApiStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const stats = [
    {
      value: apiStats ? "0" + formatNumber(apiStats.active_customers) : null,
      label: "Active Clients",
      subLabel: apiStats
        ? `OUT OF ${formatNumber(apiStats.total_customers)} TOTAL`
        : null,
      isApi: true,
    },
    {
      value: apiStats ? formatNumber(apiStats.total_servers_deployed) : null,
      label: "Servers Deployed",
      isApi: true,
    },
    {
      value: "5 Years",
      label: "Of Business Since 2020",
      isApi: false,
    },
    {
      value: "99.9%",
      label: "Uptime",
      isApi: false,
    },
  ];

  return (
    <section className="relative py-14 md:py-16 bg-[#030F16] border-b border-white/10 overflow-hidden">
      {/* Subtle shine gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,196,170,0.03) 0%, transparent 40%)",
        }}
      />
      {/* Accent line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 accent-line-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-baseline gap-y-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="w-1/2 md:w-auto text-center md:text-left"
            >
              {stat.isApi && isLoading ? (
                <StatSkeleton />
              ) : (
                <div className="relative">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-50 tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[#7AC2EB] text-sm font-medium mt-1 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  {"subLabel" in stat && stat.subLabel && (
                    <div className="absolute left-0 right-0 text-center md:text-left text-[#7AC2EB]/40 text-xs">
                      {stat.subLabel}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

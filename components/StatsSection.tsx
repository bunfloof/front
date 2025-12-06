const stats = [
  {
    value: "1,000+",
    label: "Active Clients",
  },
  {
    value: "1,200+",
    label: "Servers Deployed",
  },
  {
    value: "5 Years",
    label: "Of Excellence Since 2020",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-14 md:py-16 bg-[#030F16] border-b border-white/10">
      {/* Accent line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 accent-line-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-baseline gap-y-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="w-1/2 md:w-auto text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-50 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[#7AC2EB] text-sm font-medium mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

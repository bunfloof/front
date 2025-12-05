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
    label: "Of Excellence",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-14 md:py-16 bg-white border-b border-gray-200">
      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FDB515]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-baseline gap-y-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="w-1/2 md:w-auto text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003262] tracking-tight">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

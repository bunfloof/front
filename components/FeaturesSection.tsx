import {
  Shield,
  Users,
  Clock,
  Lightbulb,
  UserCheck,
  Network,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Delay-free, in-house permanent DDoS protection up to 40 Gbps / 35 Mpps at minimum with less than 1 second response time.",
  },
  {
    icon: Users,
    title: "Project Support",
    description:
      "We accompany your project from idea to completion and remain at your disposal afterward.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Reach us day and night via our ticket system and emergency contact whenever you need help.",
  },
  {
    icon: Lightbulb,
    title: "Tailored Development",
    description:
      "Benefit from years of experience and developments tailored to your individual needs.",
  },
  {
    icon: UserCheck,
    title: "Personal Contact",
    description:
      "You'll be assigned a dedicated personal contact on Discord who will assist you at any time.",
  },
  {
    icon: Network,
    title: "Excellent Infrastructure",
    description:
      "Benefit from all the advantages of our enterprise-grade infrastructure.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-16 md:py-24 border-t border-[#1A77AD]/30"
      style={{
        backgroundImage: "linear-gradient(#030F16, #010609)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-4">
            Why Foxomy
          </h2>
          <p className="text-[#BDE0F5]/70 text-lg">
            Everything you need for reliable, high-performance hosting.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col">
              {/* Simple icon */}
              <feature.icon
                className="w-8 h-8 text-[#00c4aa] mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-green-50 mb-2">
                {feature.title}
              </h3>
              <p className="text-[#BDE0F5]/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  href?: string;
  featured?: boolean;
}

function ServiceCard({
  title,
  description,
  price,
  priceLabel,
  features,
  imageSrc,
  imageAlt,
  linkText,
  href = "#",
  featured = false,
}: ServiceCardProps) {
  return (
    <div
      className={`relative h-full flex flex-col rounded-sm transition-colors ${
        featured
          ? "bg-[#071F2C] border-2 border-[#00c4aa] shadow-[0_0_30px_rgba(0,196,170,0.15)]"
          : "bg-[#071F2C] border border-[#1A77AD]/30 hover:border-[#33A1E0]/50 overflow-hidden"
      }`}
    >
      {/* Featured badge - centered on top border */}
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="bg-[#00c4aa] text-[#030F16] text-xs font-bold uppercase tracking-wider px-4 py-1.5">
            Featured
          </span>
        </div>
      )}

      {/* Image header with gradient */}
      <div
        className="relative h-48 flex items-center justify-center p-6"
        style={{
          backgroundImage: featured
            ? "linear-gradient(135deg, #0D3A54 0%, #071F2C 50%, rgba(0,196,170,0.1) 100%)"
            : "linear-gradient(135deg, #0D3A54 0%, #071F2C 100%)",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-green-50">{price}</span>
          <span className="text-sm text-[#7AC2EB]/60 ml-1">/{priceLabel}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-green-50 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-[#BDE0F5]/70 text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-[#BDE0F5]"
            >
              <span className="text-[#00c4aa] mt-1">•</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Link */}
        <a
          href={href}
          className={`inline-flex items-center gap-1 font-semibold transition-colors group ${
            featured
              ? "text-[#00c4aa] hover:text-white"
              : "text-[#7AC2EB] hover:text-[#00c4aa]"
          }`}
        >
          {linkText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

const services: ServiceCardProps[] = [
  {
    title: "Minecraft Servers",
    description:
      "Game servers managed via Pterodactyl Panel — instantly deployed.",
    price: "$1",
    priceLabel: "month",
    features: [
      "Pterodactyl Panel Beta",
      "Switch between games",
      "Global locations",
      "DDoS protection",
      "Instant setup",
    ],
    imageSrc: "/minecraftgrass.png",
    imageAlt: "Minecraft",
    linkText: "View plans",
    href: "/game",
    featured: true,
  },
  {
    title: "Game/App Servers",
    description: "Game and application servers managed via Pterodactyl Panel.",
    price: "$1",
    priceLabel: "month",
    features: [
      "Pterodactyl Panel Beta",
      "Switch between games",
      "Global locations",
      "DDoS protection",
      "Instant setup",
    ],
    imageSrc: "/discordbot.png",
    imageAlt: "Discord Bot",
    linkText: "View plans",
  },
  {
    title: "Website Hosting",
    description:
      "Shared hosting supporting WordPress, PHP, Python, NodeJS, and more.",
    price: "$1",
    priceLabel: "month",
    features: [
      "cPanel control panel",
      "Multiple languages supported",
      "WordPress installer",
      "Managed service",
      "Instant setup",
    ],
    imageSrc: "/web.png",
    imageAlt: "Website Hosting",
    href: "/web",
    linkText: "View plans",
  },
  {
    title: "Private Cloud",
    description:
      "Private cloud servers with dedicated resources and full root access.",
    price: "Custom",
    priceLabel: "quote",
    features: [
      "Install your own OS",
      "Dedicated resources",
      "Full root access",
      "DDoS protection available",
      "Scalable resources",
    ],
    imageSrc: "/cloud.png",
    href: "https://foxomy.com/billing/submitticket.php?step=2&deptid=2",
    imageAlt: "Private Cloud",
    linkText: "Get a quote",
  },
];

export function ServicesSection() {
  return (
    <section
      className="relative py-16 md:py-24 bg-grid-pattern"
      style={{
        backgroundColor: "#030F16",
      }}
    >
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(17,168,169,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(4,129,205,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          {/* Accent line */}
          <div className="w-16 h-1 accent-line-gradient mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-4">
            Our Services
          </h2>
          <p className="text-[#BDE0F5]/70 text-lg">
            High-performance hosting for games, applications, and websites.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

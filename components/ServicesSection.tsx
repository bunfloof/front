"use client";

import Image from "next/image";
import Link from "next/link";
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
}: ServiceCardProps) {
  return (
    <div className="bg-white h-full flex flex-col">
      {/* Image header */}
      <div className="relative h-48 bg-[#003262]/5 flex items-center justify-center p-6">
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
          <span className="text-3xl font-bold text-[#003262]">{price}</span>
          <span className="text-sm text-gray-500 ml-1">/{priceLabel}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#003262] mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="text-[#FDB515] mt-1">•</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Link */}
        <a
          href={href}
          className="inline-flex items-center gap-1 text-[#003262] font-semibold hover:text-[#FDB515] transition-colors group"
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
    imageAlt: "Private Cloud",
    linkText: "Get a quote",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003262] mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg">
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

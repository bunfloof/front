"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { motion } from "motion/react";
import { Check, Globe, MapPin, Zap, Shield, Server } from "lucide-react";

// Web hosting plans data
const plans = [
  {
    id: "10gb",
    name: "10 GB",
    storage: "10 GB",
    bandwidth: "3 TB",
    domains: "2",
    subdomains: "3",
    price: 2,
    orderLink: "https://foxomy.com/billing/cart.php?a=add&pid=200",
  },
  {
    id: "20gb",
    name: "20 GB",
    storage: "20 GB",
    bandwidth: "6 TB",
    domains: "3",
    subdomains: "Unlimited",
    price: 4,
    orderLink: "https://foxomy.com/billing/cart.php?a=add&pid=201",
  },
  {
    id: "30gb",
    name: "30 GB",
    storage: "30 GB",
    bandwidth: "10 TB",
    domains: "4",
    subdomains: "Unlimited",
    price: 6,
    orderLink: "https://foxomy.com/billing/cart.php?a=add&pid=202",
  },
  {
    id: "40gb",
    name: "40 GB",
    storage: "40 GB",
    bandwidth: "20 TB",
    domains: "5",
    subdomains: "Unlimited",
    price: 8,
    orderLink: "https://foxomy.com/billing/cart.php?a=add&pid=203",
  },
  {
    id: "unmetered",
    name: "Unlimited",
    storage: "Unmetered",
    bandwidth: "30 TB",
    domains: "Unlimited",
    subdomains: "Unlimited",
    price: 10,
    orderLink: "https://foxomy.com/billing/cart.php?a=add&pid=204",
  },
];

// Shared features across all plans
const sharedFeatures = [
  "Unlimited Databases",
  "Free SSL Certificates",
  "CloudLinux Powered",
  "KernelCare Enabled",
  "cPanel Control Panel",
  "Softaculous Script Installer",
  "SiteJet AI Website Builder",
  "LiteSpeed Web Server",
  "Free Offsite Daily Backups (JetBackup)",
  "MailChannels - Premium Email Delivery",
  "Available in Jacksonville, Florida",
];

export default function WebHostingPage() {
  return (
    <div className="font-sans bg-[#030F16] min-h-screen">
      <MainNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(3,15,22,0) 0%, rgba(3,15,22,1) 100%), linear-gradient(135deg, rgba(17,168,169,0.12) 0%, transparent 50%), linear-gradient(225deg, rgba(4,129,205,0.12) 0%, transparent 50%)",
          }}
        />

        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Floating decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#00c4aa]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-60 right-10 w-96 h-96 bg-[#0481CD]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-8"
            >
                <Globe className="w-15 h-15 text-white" />

              
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Web Hosting
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#BDE0F5]/70 text-lg md:text-xl max-w-2xl mb-6"
            >
              Fast, reliable, and secure web hosting powered by LiteSpeed and
              CloudLinux. Perfect for WordPress blogs, businesses, and everything in
              between.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative flex flex-col rounded-xl border border-[#1A77AD]/30 bg-[#071F2C] hover:border-[#1A77AD]/50 transition-all duration-300"
              >
                <div className="p-5 flex flex-col flex-grow">
                  {/* Plan header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-[#7AC2EB]/60">/mo</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#1A77AD]/40 to-transparent mb-6" />

                  {/* Plan-specific features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00c4aa]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00c4aa]" />
                      </div>
                      <span className="text-white text-sm">
                        <span className="font-semibold text-[#00c4aa]">
                          {plan.storage.toLowerCase().includes("unmetered")
                            ? "Unmetered"
                            : plan.storage}
                        </span>{" "}
                        {plan.storage.toLowerCase().includes("unmetered")
                          ? "NVMe Storage"
                          : "of NVMe Storage"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00c4aa]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00c4aa]" />
                      </div>
                      <span className="text-white text-sm">
                        <span className="font-semibold text-[#00c4aa]">
                          {plan.bandwidth}
                        </span>{" "}
                        Monthly Transfer
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00c4aa]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00c4aa]" />
                      </div>
                      <span className="text-white text-sm">
                        Host{" "}
                        <span className="font-semibold text-[#00c4aa]">
                          {plan.domains}
                        </span>{" "}
                        Domain
                        {plan.domains !== "Unlimited" && plan.domains !== "1"
                          ? "s"
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00c4aa]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00c4aa]" />
                      </div>
                      <span className="text-white text-sm">
                        Host{" "}
                        <span className="font-semibold text-[#00c4aa]">
                          {plan.subdomains}
                        </span>{" "}
                        Subdomains
                      </span>
                    </div>
                  </div>

                  {/* Shared features */}
                  <div className="space-y-2.5 mb-6 flex-grow">
                    {sharedFeatures.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1A77AD]/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#7AC2EB]" />
                        </div>
                        <span className="text-[#BDE0F5]/70 text-sm leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order button */}
                  <a
                    href={plan.orderLink}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-center bg-[#1A77AD]/20 text-[#7AC2EB] border border-[#1A77AD]/40 hover:bg-[#1A77AD]/30 hover:border-[#33A1E0]/60"
                  >
                    Order Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-24" style={{ backgroundColor: "#030F16" }} />
    </div>
  );
}

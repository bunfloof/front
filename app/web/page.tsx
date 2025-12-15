"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { motion } from "motion/react";
import { Check, Globe, MapPin, Zap, Shield, Server } from "lucide-react";

// Web hosting plans data
const plans = [
  {
    id: "starter",
    name: "Starter",
    storage: "10 GB",
    bandwidth: "3 TB",
    domains: "2",
    subdomains: "3",
    price: 4.99,
    whmcsPid: "200", // Update with actual PID
  },
  {
    id: "basic",
    name: "Basic",
    storage: "20 GB",
    bandwidth: "6 TB",
    domains: "3",
    subdomains: "Unlimited",
    price: 7.99,
    whmcsPid: "201", // Update with actual PID
  },
  {
    id: "standard",
    name: "Standard",
    storage: "30 GB",
    bandwidth: "10 TB",
    domains: "4",
    subdomains: "Unlimited",
    price: 12.99,
    whmcsPid: "202", // Update with actual PID
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    storage: "40 GB",
    bandwidth: "20 TB",
    domains: "5",
    subdomains: "Unlimited",
    price: 19.99,
    whmcsPid: "203", // Update with actual PID
  },
  {
    id: "enterprise",
    name: "Enterprise",
    storage: "Unmetered",
    bandwidth: "30 TB",
    domains: "Unlimited",
    subdomains: "Unlimited",
    price: 29.99,
    whmcsPid: "204", // Update with actual PID
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
];

export default function WebHostingPage() {
  const handleOrderNow = (plan: (typeof plans)[0]) => {
    const url = `https://foxomy.com/billing/cart.php?a=add&pid=${plan.whmcsPid}`;
    window.open(url, "_self");
  };

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
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00c4aa] to-[#0481CD] flex items-center justify-center shadow-lg shadow-[#00c4aa]/20">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00c4aa] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-[#030F16]" />
              </div>
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
              CloudLinux. Perfect for blogs, businesses, and everything in
              between.
            </motion.p>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#071F2C] border border-[#1A77AD]/30"
            >
              <MapPin className="w-4 h-4 text-[#00c4aa]" />
              <span className="text-[#BDE0F5]/80 text-sm">
                Hosted in{" "}
                <span className="text-white font-medium">
                  Jacksonville, Florida
                </span>
              </span>
              <span className="text-lg">🇺🇸</span>
            </motion.div>
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
                className={`relative flex flex-col rounded-xl border transition-all duration-300 ${
                  plan.popular
                    ? "border-[#00c4aa] bg-gradient-to-b from-[#071F2C] to-[#061821] shadow-[0_0_40px_rgba(0,196,170,0.15)]"
                    : "border-[#1A77AD]/30 bg-[#071F2C] hover:border-[#1A77AD]/50"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 rounded-full bg-[#00c4aa] text-[#030F16] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#00c4aa]/30">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Plan header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price.toFixed(2)}
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
                          {plan.storage}
                        </span>{" "}
                        of NVMe Storage
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
                        Domain{plan.domains !== "Unlimited" && plan.domains !== "1" ? "s" : ""}
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
                        Subdomain{plan.subdomains !== "Unlimited" && plan.subdomains !== "1" ? "s" : ""}
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
                  <button
                    onClick={() => handleOrderNow(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                      plan.popular
                        ? "bg-[#00c4aa] text-[#030F16] hover:bg-[#00d4b8] hover:shadow-[0_0_20px_rgba(0,196,170,0.4)]"
                        : "bg-[#1A77AD]/20 text-[#7AC2EB] border border-[#1A77AD]/40 hover:bg-[#1A77AD]/30 hover:border-[#33A1E0]/60"
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #030F16 0%, #061821 50%, #030F16 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Why Choose Our Web Hosting?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#BDE0F5]/60 text-lg max-w-2xl mx-auto"
            >
              Industry-leading technology and premium features included with
              every plan
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "LiteSpeed Web Server",
                description:
                  "Up to 11x faster than Apache. Built-in caching and optimization for lightning-fast page loads.",
              },
              {
                icon: Shield,
                title: "CloudLinux & KernelCare",
                description:
                  "Enhanced security and stability with isolated environments and automatic kernel updates.",
              },
              {
                icon: Server,
                title: "NVMe SSD Storage",
                description:
                  "Ultra-fast NVMe drives deliver read/write speeds up to 7x faster than traditional SSDs.",
              },
              {
                icon: Globe,
                title: "Free SSL Certificates",
                description:
                  "Secure your websites with free SSL certificates. One-click installation via cPanel.",
              },
              {
                icon: () => (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M4 4v16" />
                    <path d="M4 4h16" />
                    <path d="M4 12h12" />
                    <path d="M4 20h16" />
                    <path d="M20 4v16" />
                  </svg>
                ),
                title: "cPanel Control Panel",
                description:
                  "The world's most popular hosting control panel. Easy-to-use interface for all your hosting needs.",
              },
              {
                icon: () => (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M12 12h.01" />
                    <path d="M17 12h.01" />
                    <path d="M7 12h.01" />
                  </svg>
                ),
                title: "MailChannels Premium",
                description:
                  "Enterprise-grade email delivery ensuring your emails reach inboxes, not spam folders.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-xl bg-[#071F2C]/50 border border-[#1A77AD]/20 hover:border-[#1A77AD]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00c4aa]/20 to-[#0481CD]/20 flex items-center justify-center mb-4 text-[#00c4aa]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#BDE0F5]/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#071F2C] to-[#061821] border border-[#1A77AD]/30"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[#BDE0F5]/60 mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers. Deploy your website in
              minutes with our easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  handleOrderNow(plans.find((p) => p.popular) || plans[2])
                }
                className="px-8 py-3 rounded-lg bg-[#00c4aa] text-[#030F16] font-semibold hover:bg-[#00d4b8] hover:shadow-[0_0_20px_rgba(0,196,170,0.4)] transition-all cursor-pointer"
              >
                Get Started Now
              </button>
              <a
                href="https://foxomy.com/contact"
                className="px-8 py-3 rounded-lg bg-transparent text-[#7AC2EB] font-semibold border border-[#1A77AD]/40 hover:bg-[#1A77AD]/20 hover:border-[#33A1E0]/60 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-24" style={{ backgroundColor: "#030F16" }} />
    </div>
  );
}








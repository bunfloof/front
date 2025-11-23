"use client";

import {
  Shield,
  Users,
  Clock,
  Lightbulb,
  UserCheck,
  Network,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="pb-24 pt-14 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 items-start">
          <div>
            <Shield className="w-10 h-10 text-black mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-black mb-2">
              DDoS Schutz
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Delay-free, in-house permanent DDoS protection up to 40 Gbps / 35 Mpps in less than 1 second response time
            </p>
          </div>

          <div>
            <Users className="w-10 h-10 text-black mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-black mb-2">
              Project support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We accompany your project from your idea to completion and are
              happy to be at your disposal even afterward
            </p>
          </div>

          <div>
            <Clock className="w-10 h-10 text-black mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-black mb-2">
              24/7 support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              If you ever have a problem, you can easily reach us day and night
              via our ticket system and emergency contact
            </p>
          </div>

          <div>
            <Lightbulb
              className="w-10 h-10 text-black mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-semibold text-black mb-2">
              Development to the point
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Benefit from years of experience and developments tailored to your
              individual needs
            </p>
          </div>

          <div>
            <UserCheck
              className="w-10 h-10 text-black mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-semibold text-black mb-2">
              Personal contact
            </h3>
            <p className="text-gray-600 leading-relaxed">
              From the very beginning, you will be assigned a dedicated personal
              contact on Discord (found on panel) who will be available to
              assist you at any time
            </p>
          </div>

          <div>
            <Network className="w-10 h-10 text-black mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-black mb-2">
              Excellent infrastructure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You benefit from all the advantages of our excellent
              infrastructure and create your own added value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

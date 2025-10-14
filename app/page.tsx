"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "@/components/HeroSection";
import { TransitionSection } from "@/components/TransitionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ServerLocationsSection } from "@/components/ServerLocationsSection";

export default function Home() {
  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />
      <HeroSection />
      {/* Transition Section */}
      <TransitionSection />
      {/* Services Section */}
      <ServicesSection />
      {/* Server Locations Section */}
      <ServerLocationsSection />
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-sm text-gray-400 mb-4 tracking-wider uppercase">
              Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Scalable. Secure. Fast.
              <br />
              <span className="text-gray-400">
                Introducing Next-Gen Management.
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl">
              Everything you need to manage your servers efficiently. From
              single instances to large-scale cluster deployments.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 text-sm">
                  Deploy and manage servers in seconds with our optimized
                  infrastructure
                </p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
                <p className="text-gray-400 text-sm">
                  Enterprise-grade security built-in with automatic updates
                </p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                <p className="text-gray-400 text-sm">
                  Real-time monitoring and insights for all your servers
                </p>
              </div>
            </div>

            <div className="mt-12">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-200 transition-all inline-flex items-center gap-2">
                GET STARTED
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers managing their servers with our
            platform. Start your free trial today.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-md font-bold text-base hover:bg-gray-200 transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2">
            START FREE TRIAL
            <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

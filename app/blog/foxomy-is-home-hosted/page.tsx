"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Check,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

export default function FoxomyIsHomeHostedPost() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Header */}
      <header
        className="pt-32 pb-12 border-b transition-colors duration-300"
        style={{ borderColor: "var(--themed-border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:opacity-70"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono">cd /blog</span>
          </Link>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight transition-colors duration-300"
            style={{ color: "var(--themed-heading)" }}
          >
            Foxomy Is Home Hosted (Really)
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center text-md transition-colors duration-300"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              December 18, 2025
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Image
                src="/imgs/portfolios/trish/fd3c42c4e4ded19a2e1433535c3babc1.jpeg"
                alt="Trish"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />{" "}
              Trish
            </span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Infrastructure
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 transition-colors cursor-pointer hover:opacity-80"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div
              className="leading-relaxed space-y-6 transition-colors duration-300"
              style={{ color: "var(--themed-text)" }}
            >
              <p>
                You are currently being served this website from our home (and
                Cloudflare).
              </p>
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                The Beginning of Foxomy (?)
              </h2>
              <p>
                Foxomy was not a thing back then. Server hosting was just a
                personal hobby of Bun. Bun has been providing private server
                hosting services to her furry friends from 2016-2019. This was
                an ancient relic of Bun's DIY rack in 2019 when she was still in
                high school.
              </p>
              <Gallery>
                <div className="flex flex-col md:flex-row gap-4 my-4">
                  <Item
                    original="/imgs/blogs/foxomy-is-home-hosted/2019_03_14_01_08_IMG_4032.JPG"
                    thumbnail="/imgs/blogs/foxomy-is-home-hosted/2019_03_14_01_08_IMG_4032.JPG"
                    width="2016"
                    height="1512"
                    alt="Foxomy rack in 2019 showing 4 Motorola SB6141 modems and a switch"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[1.33]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-is-home-hosted/2019_03_14_01_08_IMG_4032.JPG"
                          alt="Foxomy rack in 2019 showing 4 Motorola SB6141 modems and a switch"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="/imgs/blogs/foxomy-is-home-hosted/2019_03_10_21_50_IMG_4011.JPG"
                    thumbnail="/imgs/blogs/foxomy-is-home-hosted/2019_03_10_21_50_IMG_4011.JPG"
                    width="1504"
                    height="2016"
                    alt="Foxomy rack dark in 2019 at a residential building"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer rounded-sm overflow-hidden transition-colors flex-[0.75]"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="/imgs/blogs/foxomy-is-home-hosted/2019_03_10_21_50_IMG_4011.JPG"
                          alt="Foxomy rack dark in 2019 at a residential building"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </Gallery>

              <p>
                We had four Motorola Surfboard SB6141 DOCSIS 3.0 cable modems.
                The modems had 8x4 channel bonding with 8 downstream channels
                and 4 upstream channels. Each modem's SPI chips were flashed
                with the forceWare firmware (the successor to the legendary
                Haxorware firmware). For those not familiar with the modem
                modding scene of the mid-2010s, Haxorware and its forks let you
                obtain free internet from cable companies. We cloned MAC
                addresses of modems and tricked Spectrum's CMTS that we were a
                paying customer when in reality we did not pay anything.
              </p>

              <p>
                Each modem was loaded with a config of the Spectrum's highest
                tier plan, which gave us 943 mbps download and 42 mbps upload
                speeds. We multiplied that by four modems and ran them through
                our 3Com switch load balancer to get an aggregate of 3772 mbps
                download and 168 mbps upload speeds. The highly asymmetrical
                download/upload ratio was due to the limitations of DOCSIS 3.0.
                It was good enough to host small game servers, websites, and
                Discord bots but would suffer during large file transfers or
                when multiple users were connected to the server at the same
                time.
              </p>

              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Redundancy and Fault-Tolerant Network
              </h2>

              <p>
                By 2020, DOCSIS 3.1 made our free internet setup obsolete.
                Spectrum started requiring modems to be approved, and and their
                CMTS software detected spoofed configs. The golden age of free
                cable internet was over. However, symmetrical gigabit fiber from
                Sonic internet was just around the corner. When Sonic's fiber
                finally reached our neighborhood, we subscribed to them
                immediately. With Sonic, our speeds were now 9 gbps down and up
                with sub-1ms latency to Cloudflare. Our old cable modem setup
                was decommissioned, though we kept a single modem as a backup
                line.
              </p>

              <p>
                We have a redundant and fault-tolerant 3-ISP setup running
                across three different layer 1 mediums: fiber, copper, and 5G.
                Sonic fiber is our primary uplink that has perfect uptime and
                reliability. Spectrum cable is our secondary uplink. AT&T 5G
                cellular is our last-resort backup. If Sonic goes down, it will
                failover to Spectrum. If Spectrum goes down too, 5G will be used
                until the wired connections come back online. Here are some
                speedtest results from 4 different ISPs serving our home:
              </p>
              <Gallery>
                <div className="flex flex-wrap gap-4 my-4">
                  <Item
                    original="https://www.speedtest.net/result/18615899979.png"
                    thumbnail="https://www.speedtest.net/result/18615899979.png"
                    width="750"
                    height="400"
                    alt="Speedtest result from Sonic Telecom"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer overflow-hidden transition-colors rounded-sm max-w-sm"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="https://www.speedtest.net/result/18615899979.png"
                          alt="Speedtest result from Sonic Telecom"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="https://www.speedtest.net/result/18615948897.png"
                    thumbnail="https://www.speedtest.net/result/18615948897.png"
                    width="750"
                    height="400"
                    alt="Speedtest result from Spectrum"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer overflow-hidden transition-colors rounded-sm max-w-sm"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="https://www.speedtest.net/result/18615948897.png"
                          alt="Speedtest result from Spectrum"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="https://www.speedtest.net/result/18615968377.png"
                    thumbnail="https://www.speedtest.net/result/18615968377.png"
                    width="750"
                    height="400"
                    alt="Speedtest result from AT&T 5G"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer overflow-hidden transition-colors rounded-sm max-w-sm"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="https://www.speedtest.net/result/18615968377.png"
                          alt="Speedtest result from AT&T 5G"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                  <Item
                    original="https://www.speedtest.net/result/18617990023.png"
                    thumbnail="https://www.speedtest.net/result/18617990023.png"
                    width="750"
                    height="400"
                    alt="Speedtest result from our home"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="cursor-pointer overflow-hidden transition-colors rounded-sm max-w-sm"
                        style={{ borderColor: "var(--themed-border)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border-strong)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--themed-border)";
                        }}
                      >
                        <img
                          src="https://www.speedtest.net/result/18617990023.png"
                          alt="Speedtest result from our home"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </Item>
                </div>
              </Gallery>
              <h2
                className="text-2xl font-bold mt-12 mb-6 pb-3 border-b transition-colors duration-300"
                style={{
                  color: "var(--themed-heading)",
                  borderColor: "var(--themed-border-strong)",
                }}
              >
                Home Is Where the Heart Is
              </h2>

              <p>
                While Foxomy now leases server space in multiple tier 3
                datacenters around the globe, our roots started from a small
                home in California. From day one, we owned our own hardware,
                operated our own load balanced network, and ran everything on
                our own infrastructure that we can touch. This is the heart of
                Foxomy, where our main infrastructure, website, billing panel,
                game panel, and utility scripts are still hosted. This is where
                we've always been, and we wouldn't have it any other way.
              </p>
              <Gallery>
                <Item
                  original="/imgs/blogs/foxomy-is-home-hosted/furryhousesonic.jpg"
                  thumbnail="/imgs/blogs/foxomy-is-home-hosted/furryhousesonic.jpg"
                  width="2000"
                  height="2000"
                  alt="furry house"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="cursor-pointer overflow-hidden transition-colors my-4 rounded-sm max-w-md"
                      style={{ borderColor: "var(--themed-border)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--themed-border)";
                      }}
                    >
                      <img
                        src="/imgs/blogs/foxomy-is-home-hosted/furryhousesonic.jpg"
                        alt="furry house"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </Item>
              </Gallery>
            </div>
          </article>

          {/* cd /blog */}
          <div
            className="mt-16 pt-8 border-t transition-colors duration-300"
            style={{ borderColor: "var(--themed-border)" }}
          >
            <Link
              href="/blog"
              className="flex w-full justify-between items-center gap-2 transition-colors group rounded-md p-4 border font-mono"
              style={{
                color: "var(--themed-text)",
                borderColor: "var(--themed-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--themed-nav-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              cd /blog
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
}

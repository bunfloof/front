"use client";

/* =========================================================================
   Foxomy · SUMMER HOST 2026  ☀
   app/summer/page.tsx

   A beach-themed twist on the game hosting configurator. It reuses the same
   data + components as the main page (so the order flow stays 100% real),
   but only surfaces three locations and plans 16 GB or under, and wraps the
   whole thing in a hand-made pixel-art beach skin.

   Promo: 3 months free with code SUMMERHOST2026. At WHMCS checkout the buyer
   picks "PayPal Basic (Legacy)" so no payment info is ever entered.

   All beach art lives in /public/imgs/summer/ and is original pixel art.
   ========================================================================= */

import { useState, useEffect, useRef, useCallback } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { SignalBar, pingToSignalState } from "@/components/SignalBar";
import {
  locations,
  addons,
  getPlansForLocation,
  generateCartUrl,
  getAddonsForLocation,
  type Location,
  type Plan,
  type Addon,
} from "@/lib/gameData";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Copy,
  MapPin,
  Server,
  Package,
  ShoppingCart,
  RefreshCw,
  Cpu,
  HardDrive,
  Archive,
  Layers,
  Info,
  Sun,
  Waves,
  Ticket,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

/* ---------------------------------------------------------------------------
   Promo config
--------------------------------------------------------------------------- */
const PROMO = "SUMMERHOST2026";
const MAX_RAM = 16; // promo only applies to plans 16 GB or under
const IMG = "/imgs/summer"; // where the user uploads the generated art

// The three locations included in the promo. Matched tolerantly on the
// location name + tier so it keeps working regardless of exact labels.
const ALLOWED: { match: string; tier: "budget" | "premium" }[] = [
  { match: "new jersey", tier: "budget" },
  { match: "new york", tier: "premium" },
  { match: "richardson", tier: "budget" },
];

function tierOf(loc: Location): "budget" | "premium" {
  const t = (loc.tier || "").toString().toLowerCase();
  const n = (loc.name || "").toLowerCase();
  return t.includes("prem") || n.includes("prem") ? "premium" : "budget";
}

// Build the promo location list (kept in the ALLOWED order: NJ, NY, Dallas)
const summerLocations: Location[] = ALLOWED.map((a) =>
  locations.find(
    (loc) => loc.name.toLowerCase().includes(a.match) && tierOf(loc) === a.tier
  )
).filter((l): l is Location => Boolean(l));

// Append the promo code onto whatever cart URL gameData generates.
function withPromo(url: string): string {
  if (!url || url === "#") return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}promocode=${PROMO}`;
}

/* ---------------------------------------------------------------------------
   Small decorative helpers
--------------------------------------------------------------------------- */
function PixelImg({
  src,
  w,
  h,
  className = "",
  style = {},
  alt = "",
}: {
  src: string;
  w: number;
  h: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  // plain <img> so we don't need next.config domains; pixelated scaling
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`${IMG}/${src}`}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={alt === ""}
      className={`sm-pixel ${className}`}
      style={{ width: w, height: h, ...style }}
    />
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */
export default function SummerHostingPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [pings, setPings] = useState<Record<string, number | null>>({});
  const [pollingBar, setPollingBar] = useState(0);
  const [pollingDirection, setPollingDirection] = useState(1);
  const [copied, setCopied] = useState(false);

  const websocketsRef = useRef<Record<string, WebSocket>>({});

  /* polling bar animation (for the SignalBar "measuring" state) */
  useEffect(() => {
    const interval = setInterval(() => {
      setPollingBar((prev) => {
        const next = prev + pollingDirection;
        if (next >= 5) {
          setPollingDirection(-1);
          return 3;
        }
        if (next < 0) {
          setPollingDirection(1);
          return 1;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [pollingDirection]);

  /* live ping measurement over the location websockets */
  const startPingMeasurements = useCallback(() => {
    const initial: Record<string, number | null> = {};
    summerLocations.forEach((l) => (initial[l.codename] = null));
    setPings(initial);

    Object.values(websocketsRef.current).forEach((ws) => {
      if ((ws as unknown as { _pingInterval?: number })._pingInterval) {
        clearInterval(
          (ws as unknown as { _pingInterval: number })._pingInterval
        );
      }
      ws.close();
    });
    websocketsRef.current = {};

    summerLocations.forEach((location) => {
      try {
        const ws = new WebSocket(location.wsUrl);
        ws.onopen = () => {
          const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              (ws as unknown as { _lastPingTime: number })._lastPingTime =
                Date.now();
              ws.send("PING 0");
            }
          }, 2000);
          (ws as unknown as { _pingInterval: number })._pingInterval =
            pingInterval as unknown as number;
        };
        ws.onmessage = (event) => {
          if (String(event.data).startsWith("PONG")) {
            const sendTime = (ws as unknown as { _lastPingTime?: number })
              ._lastPingTime;
            if (sendTime) {
              const ping = Date.now() - sendTime;
              setPings((prev) => {
                const cur = prev[location.codename];
                if (cur === null || cur < 0 || ping < cur) {
                  return { ...prev, [location.codename]: ping };
                }
                return prev;
              });
            }
          }
        };
        ws.onerror = () =>
          setPings((prev) => ({ ...prev, [location.codename]: -1 }));
        websocketsRef.current[location.codename] = ws;
      } catch {
        setPings((prev) => ({ ...prev, [location.codename]: -1 }));
      }
    });
  }, []);

  useEffect(() => {
    startPingMeasurements();
    return () => {
      Object.values(websocketsRef.current).forEach((ws) => {
        if ((ws as unknown as { _pingInterval?: number })._pingInterval) {
          clearInterval(
            (ws as unknown as { _pingInterval: number })._pingInterval
          );
        }
        ws.close();
      });
    };
  }, [startPingMeasurements]);

  // reset addons whenever the location changes
  useEffect(() => {
    if (selectedLocation) setSelectedAddons([]);
  }, [selectedLocation]);

  const toggleAddon = (addonId: string, disabled: boolean) => {
    if (disabled) return;
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleLocationSelect = (location: Location) => {
    if (location.outOfStock) return;
    setSelectedLocation(location);
    setSelectedPlan(null);
  };

  /* derived data — filtered to the promo rules */
  const locationPlans = selectedLocation
    ? getPlansForLocation(selectedLocation.codename).filter(
        (p) => p.ram <= MAX_RAM
      )
    : [];
  const locationAddons = selectedLocation
    ? getAddonsForLocation(selectedLocation.apiKey)
    : [];

  const getMonthly = (): number => {
    if (!selectedPlan) return 0;
    let total = selectedPlan.price;
    selectedAddons.forEach((id) => {
      const a = addons.find((x) => x.id === id);
      if (a) total += a.price;
    });
    return total;
  };

  const getCheckoutUrl = (): string => {
    if (!selectedPlan || !selectedLocation) return "#";
    return withPromo(generateCartUrl(selectedPlan, selectedAddons));
  };

  const isDedicatedIPDisabled = (addon: Addon): boolean => {
    // Dedicated IPs are limited stock — not available on the free promo plans.
    return addon.id === "dedicated-ip";
  };

  const sortedAddons = [...locationAddons].sort((a, b) => {
    const ad = isDedicatedIPDisabled(a);
    const bd = isDedicatedIPDisabled(b);
    return ad === bd ? 0 : ad ? 1 : -1;
  });

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const scrollToPick = () =>
    document
      .getElementById("sm-locations")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ----------------------------------------------------------------------- */
  return (
    <div className="font-sans" style={{ background: "#bdeefb" }}>
      <MainNavbar />

      {/* All summer-only styles, scoped with the sm- prefix */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sm-pixel{image-rendering:pixelated;image-rendering:crisp-edges;}
        .sm-mc{font-family:var(--font-minecraft),system-ui,sans-serif;}
        .sm-shadow{text-shadow:2px 2px 0 rgba(11,37,48,.35);}
        @keyframes sm-drift{from{transform:translateX(-18vw)}to{transform:translateX(118vw)}}
        @keyframes sm-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes sm-bobsm{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes sm-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
        @keyframes sm-wave{from{background-position-x:0}to{background-position-x:-128px}}
        @keyframes sm-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes sm-sunpulse{0%,100%{filter:drop-shadow(0 0 10px rgba(255,203,61,.7))}50%{filter:drop-shadow(0 0 22px rgba(255,203,61,.95))}}
        .sm-bob{animation:sm-bob 4s ease-in-out infinite}
        .sm-bobsm{animation:sm-bobsm 3.4s ease-in-out infinite}
        .sm-sway{animation:sm-sway 5s ease-in-out infinite;transform-origin:bottom center}
        .sm-sun{animation:sm-bob 6s ease-in-out infinite, sm-sunpulse 4s ease-in-out infinite}
        .sm-ocean{background-image:url(${IMG}/ocean_strip.png);background-repeat:repeat-x;background-size:128px auto;image-rendering:pixelated;animation:sm-wave 6s linear infinite}
        .sm-sand{background-image:url(${IMG}/tex_sand.png);background-repeat:repeat;background-size:52px 52px;image-rendering:pixelated}
        .sm-sandstone{background-image:url(${IMG}/tex_sandstone.png);background-repeat:repeat;background-size:64px 64px;image-rendering:pixelated}
        .sm-planks{background-image:url(${IMG}/tex_planks.png);background-repeat:repeat;background-size:40px 40px;image-rendering:pixelated}
        /* beveled "block" panel */
        .sm-panel{background:#fffaf0;border:3px solid #c9a05a;box-shadow:inset 2px 2px 0 #fffef8,inset -3px -3px 0 #d7b06a,0 5px 0 rgba(11,37,48,.10);border-radius:4px}
        .sm-panel-sel{background:#e3faf4;border:3px solid #00a892;box-shadow:inset 2px 2px 0 #f3fffc,inset -3px -3px 0 #67ddc9,0 0 0 2px rgba(0,196,170,.35),0 6px 0 rgba(0,168,146,.18);border-radius:4px}
        .sm-clouds img{position:absolute;top:0;opacity:.95}
        .sm-marquee-track{display:flex;width:max-content;animation:sm-marquee 22s linear infinite}
        .sm-link{color:#0d6f8f}
        .sm-link:hover{color:#00a892;text-decoration:underline}
      `,
        }}
      />

      {/* ============================== HERO ============================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(#79cdf0 0%,#a6e2f6 42%,#d8f3fb 78%,#eaf9fd 100%)",
        }}
      >
        {/* drifting clouds */}
        <div className="sm-clouds absolute inset-0 pointer-events-none">
          <img
            src={`${IMG}/spr_cloud.png`}
            alt=""
            className="sm-pixel"
            style={{
              width: 150,
              top: 38,
              animation: "sm-drift 38s linear infinite",
            }}
          />
          <img
            src={`${IMG}/spr_cloud.png`}
            alt=""
            className="sm-pixel"
            style={{
              width: 105,
              top: 110,
              animation: "sm-drift 52s linear infinite",
              animationDelay: "-12s",
              opacity: 0.85,
            }}
          />
          <img
            src={`${IMG}/spr_cloud.png`}
            alt=""
            className="sm-pixel"
            style={{
              width: 190,
              top: 20,
              animation: "sm-drift 64s linear infinite",
              animationDelay: "-30s",
              opacity: 0.8,
            }}
          />
        </div>

        {/* sun */}
        <PixelImg
          src="spr_sun.png"
          w={104}
          h={104}
          className="sm-sun absolute"
          style={{ right: 40, top: 30 }}
        />

        {/* palms framing the hero */}
        <PixelImg
          src="spr_palm.png"
          w={150}
          h={210}
          className="sm-sway absolute hidden md:block"
          style={{ left: 18, bottom: 96, zIndex: 2 }}
        />
        <PixelImg
          src="spr_palm.png"
          w={120}
          h={168}
          className="sm-sway absolute hidden lg:block"
          style={{ right: 60, bottom: 96, transform: "scaleX(-1)", zIndex: 2 }}
        />

        {/* hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-40 pb-44 text-center">
          <h1
            className="sm-mc sm-shadow leading-[0.95] text-white font-bold"
            style={{ fontSize: "clamp(2.6rem,9vw,6rem)" }}
          >
            3 MONTHS
            <br />
            <span style={{ color: "#ffd34e" }}>FREE</span> HOSTING
          </h1>

          {/* promo code card */}
          <div className="mt-9 max-w-xl mx-auto">
            <div
              className="relative px-5 pt-5 pb-4 backdrop-blur-md"
              style={{
                background: "rgba(10,32,44,0.34)",
                border: "2px solid rgba(255,255,255,0.55)",
                borderRadius: 14,
                boxShadow: "0 10px 30px rgba(11,37,48,.28)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl rotate-[20deg]">👈</span>
                <span className="sm-mc text-white sm-shadow text-lg tracking-widest">
                  PROMO CODE
                </span>
                <span className="text-2xl -scale-x-100 rotate-[20deg]">👈</span>
              </div>

              <button
                onClick={copyCode}
                className="group w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3 cursor-pointer transition-transform active:translate-y-0.5"
                style={{
                  background: "rgba(0,0,0,0.28)",
                  border: "2px dashed rgba(255,255,255,0.65)",
                  borderRadius: 10,
                }}
                aria-label="Copy promo code"
              >
                <span
                  className="sm-mc sm-shadow"
                  style={{
                    color: "#ffe15d",
                    fontSize: "clamp(1.8rem,6vw,3rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {PROMO}
                </span>
                <span className="text-white/90 flex items-center gap-1 text-sm font-semibold">
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" /> Copy
                    </>
                  )}
                </span>
              </button>

              <p className="text-xs sm:text-sm text-white sm-shadow mt-3 leading-snug">
                Valid through <b>June 30, 2026</b> or while stock lasts · plans{" "}
                <b>16&nbsp;GB or under</b> · highest availability in{" "}
                <b>New York</b> · <b>no payment information required</b>
              </p>
            </div>
          </div>

          <button
            onClick={scrollToPick}
            className="minecraft-button sm-mc mt-8 inline-flex items-center gap-2 px-7 py-3 text-2xl"
          >
            Grab a free server
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* sand shelf + beach props + animated ocean at the bottom */}
        <div className="sm-sand absolute bottom-0 left-0 right-0 h-28 z-0">
          <PixelImg
            src="spr_sandcastle.png"
            w={104}
            h={96}
            className="sm-bobsm absolute"
            style={{ left: "8%", bottom: 18 }}
          />
          <PixelImg
            src="spr_parasol.png"
            w={96}
            h={96}
            className="absolute hidden sm:block"
            style={{ left: "26%", bottom: 20 }}
          />
          <PixelImg
            src="spr_beachball.png"
            w={56}
            h={56}
            className="sm-bob absolute"
            style={{ right: "20%", bottom: 22 }}
          />
          <PixelImg
            src="spr_starfish.png"
            w={48}
            h={48}
            className="sm-bobsm absolute"
            style={{ right: "9%", bottom: 14 }}
          />
          <PixelImg
            src="spr_crab.png"
            w={64}
            h={42}
            className="sm-bobsm absolute hidden sm:block"
            style={{ left: "46%", bottom: 10 }}
          />
        </div>
        <div className="sm-ocean absolute -bottom-1 left-0 right-0 h-12 z-10" />
      </section>

      {/* ======================= STEP 1: LOCATIONS ======================== */}
      <section
        id="sm-locations"
        className="relative py-14"
        style={{ background: "#bdeefb" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-7">
            <div
              className="flex items-center justify-center w-11 h-11 rounded"
              style={{ background: "#0b2530", border: "2px solid #00c4aa" }}
            >
              <MapPin className="w-5 h-5" style={{ color: "#ffd34e" }} />
            </div>
            <div>
              <h2 className="sm-mc text-2xl" style={{ color: "#0b2530" }}>
                Pick your Location
              </h2>
            </div>
            <button
              onClick={startPingMeasurements}
              className="ml-auto flex items-center gap-2 text-sm font-semibold sm-link cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh pings
            </button>
          </div>

          {summerLocations.length === 0 ? (
            <div
              className="sm-panel p-6 text-center"
              style={{ color: "#5b4a2a" }}
            >
              No promo beaches are loading right now — check that the New Jersey
              Budget, New York Premium, and Dallas Budget locations exist in
              your gameData.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {summerLocations.map((location) => {
                const ping = pings[location.codename];
                const signalState = pingToSignalState(ping);
                const pingText =
                  ping === null
                    ? "..."
                    : ping < 0
                    ? "ERR"
                    : `${Math.round(ping)}ms`;
                const isSelected =
                  selectedLocation?.codename === location.codename;
                const isNY = location.name.toLowerCase().includes("new york");

                return (
                  <motion.button
                    key={location.codename}
                    onClick={() => handleLocationSelect(location)}
                    disabled={location.outOfStock}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`relative p-4 text-left transition-all ${
                      location.outOfStock
                        ? "opacity-50 cursor-not-allowed sm-panel"
                        : isSelected
                        ? "cursor-pointer sm-panel-sel"
                        : "cursor-pointer sm-panel hover:-translate-y-0.5"
                    }`}
                  >
                    {/* tier + price + "most stock" badges */}
                    <div className="absolute -top-3 right-3 flex gap-1.5">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{
                          background:
                            tierOf(location) === "premium"
                              ? "#00c4aa"
                              : "#33a1e0",
                          color: "#06222e",
                        }}
                      >
                        {tierOf(location) === "premium" ? "$2/GB" : "$1/GB"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center"
                        style={{
                          background: isSelected ? "#00a892" : "transparent",
                          borderColor: isSelected ? "#00a892" : "#c9a05a",
                        }}
                      >
                        {isSelected && (
                          <Check
                            className="w-4 h-4"
                            style={{ color: "#ffffff" }}
                          />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {location.flagIcon && (
                            <Image
                              src={location.flagIcon}
                              alt=""
                              width={20}
                              height={14}
                              className="object-contain"
                            />
                          )}
                          <span
                            className="font-bold truncate"
                            style={{ color: "#0b2530" }}
                          >
                            {location.name}
                          </span>
                        </div>
                        <p
                          className="text-xs mb-2 truncate"
                          style={{ color: "#7a6738" }}
                        >
                          {location.cpu}
                        </p>
                        <div className="flex items-center gap-2">
                          <SignalBar
                            state={signalState}
                            pollingBar={pollingBar}
                            pixelSize={2}
                          />
                          <span
                            className="text-xs font-mono"
                            style={{ color: "#2c5566" }}
                          >
                            {pingText}
                          </span>
                          {location.outOfStock && (
                            <span className="text-red-500 text-xs ml-auto font-semibold">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================= STEP 2: PLANS ========================== */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.section
            id="sm-plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm-sandstone relative py-14"
            style={{ background: "#f3e6c4" }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0b2530", border: "2px solid #00c4aa" }}
                >
                  <Server className="w-5 h-5" style={{ color: "#ffd34e" }} />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0b2530" }}>
                    Pick your plan
                  </h2>
                </div>
              </div>

              {locationPlans.length === 0 ? (
                <div
                  className="sm-panel p-6 text-center"
                  style={{ color: "#5b4a2a" }}
                >
                  No 16&nbsp;GB-or-under plans are available at this beach right
                  now. Try another location.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {locationPlans.map((plan) => {
                    const isSelected = selectedPlan?.id === plan.id;
                    return (
                      <motion.button
                        key={plan.id}
                        onClick={() => {
                          setSelectedPlan(plan);
                        }}
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className={`relative p-4 text-left transition-all ${
                          isSelected
                            ? "cursor-pointer sm-panel-sel"
                            : "cursor-pointer sm-panel hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-1"
                            style={{
                              background: isSelected
                                ? "#00a892"
                                : "transparent",
                              borderColor: isSelected ? "#00a892" : "#c9a05a",
                            }}
                          >
                            {isSelected && (
                              <Check
                                className="w-3 h-3"
                                style={{ color: "#ffffff" }}
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div>
                              <span
                                className="text-lg font-extrabold"
                                style={{ color: "#0b2530" }}
                              >
                                {plan.ram} GB
                              </span>
                              <span
                                className="text-xs ml-1 font-medium"
                                style={{ color: "#7a6738" }}
                              >
                                RAM
                              </span>
                            </div>
                            <div className="mb-1 leading-tight">
                              <span
                                className="text-xs line-through"
                                style={{ color: "#b09255" }}
                              >
                                ${plan.price}/mo
                              </span>
                              <div
                                className="text-sm font-extrabold"
                                style={{ color: "#00a892" }}
                              >
                                $0 for 3 months
                              </div>
                            </div>
                            <div
                              className="space-y-1 text-xs font-medium"
                              style={{ color: "#7a6738" }}
                            >
                              <div className="flex items-center gap-1.5">
                                <Cpu className="w-3 h-3" /> {plan.vCores} vCores
                              </div>
                              <div className="flex items-center gap-1.5">
                                <HardDrive className="w-3 h-3" /> {plan.storage}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Archive className="w-3 h-3" />{" "}
                                {plan.backupSlots} backups
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Layers className="w-3 h-3" />{" "}
                                {plan.containerSplits} split
                                {plan.containerSplits > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              <p
                className="text-xs mt-4 flex items-center gap-1.5"
                style={{ color: "#7a6738" }}
              >
                <Info className="w-3.5 h-3.5" /> Soft storage limits can be
                raised for free. Unlimited/unmetered specs fall under the fair
                usage policy. After the 3 free months, plans renew at the
                regular monthly rate (cancel anytime).
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========================= STEP 3: ADDONS ========================= */}
      <AnimatePresence>
        {selectedLocation && selectedPlan && locationAddons.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-14"
            style={{ background: "#bdeefb" }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0b2530", border: "2px solid #00c4aa" }}
                >
                  <Package className="w-5 h-5" style={{ color: "#ffd34e" }} />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0b2530" }}>
                    Optional Addons
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  const isDisabled = isDedicatedIPDisabled(addon);
                  return (
                    <motion.button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id, isDisabled)}
                      disabled={isDisabled}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`relative p-4 text-left transition-all ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed sm-panel"
                          : isSelected
                          ? "cursor-pointer sm-panel-sel"
                          : "cursor-pointer sm-panel hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5"
                          style={{
                            background:
                              isSelected && !isDisabled
                                ? "#00a892"
                                : "transparent",
                            borderColor:
                              isSelected && !isDisabled ? "#00a892" : "#c9a05a",
                          }}
                        >
                          {isSelected && !isDisabled && (
                            <Check
                              className="w-3 h-3"
                              style={{ color: "#ffffff" }}
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <span
                            className="font-bold"
                            style={{ color: "#0b2530" }}
                          >
                            {addon.name}
                          </span>
                          <div className="mb-1">
                            <span
                              className="font-bold"
                              style={{ color: "#00a892" }}
                            >
                              {addon.price === 0 ? "Free" : `$${addon.price}`}
                            </span>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "#7a6738" }}
                            >
                              {" "}
                              per month
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: "#5b4a2a" }}>
                            {addon.description}
                          </p>
                          {addon.id === "dedicated-ip" && (
                            <p
                              className="text-xs mt-2 font-semibold"
                              style={{ color: "#0b2530" }}
                            >
                              Please don&apos;t order dedicated IPs on free
                              plans.
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===================== STEP 4: ORDER SUMMARY ====================== */}
      <AnimatePresence>
        {selectedLocation && selectedPlan && (
          <motion.section
            id="sm-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm-sandstone relative py-14"
            style={{ background: "#f3e6c4" }}
          >
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0b2530", border: "2px solid #00c4aa" }}
                >
                  <ShoppingCart
                    className="w-5 h-5"
                    style={{ color: "#ffd34e" }}
                  />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0b2530" }}>
                    Your Order Summary
                  </h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 items-start">
                {/* order card */}
                <div className="sm-panel p-6">
                  <div className="space-y-2.5 mb-5 text-sm">
                    {[
                      ["Location", selectedLocation.name],
                      ["CPU", selectedLocation.cpu],
                      ["RAM", `${selectedPlan.ram} GB`],
                      ["vCores", `${selectedPlan.vCores} shared vCores`],
                      ["Storage", selectedPlan.storage],
                      ["Backups", `${selectedPlan.backupSlots} backups`],
                      [
                        "Container Splits",
                        `${selectedPlan.containerSplits} splits`,
                      ],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span style={{ color: "#7a6738" }}>{k}</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0b2530" }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}

                    {selectedAddons.length > 0 && (
                      <div
                        className="pt-3 mt-1 space-y-2"
                        style={{ borderTop: "2px dashed #d7b06a" }}
                      >
                        {selectedAddons.map((id) => {
                          const a = addons.find((x) => x.id === id);
                          if (!a) return null;
                          return (
                            <div key={id} className="flex justify-between">
                              <span style={{ color: "#7a6738" }}>{a.name}</span>
                              <span
                                className="font-semibold"
                                style={{ color: "#0b2530" }}
                              >
                                {a.price === 0 ? "Free" : `+$${a.price}/mo`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* deal math */}
                  <div
                    className="pt-3 space-y-1.5 text-sm"
                    style={{ borderTop: "3px solid #d7b06a" }}
                  >
                    <div className="flex justify-between">
                      <span style={{ color: "#7a6738" }}>Regular rate</span>
                      <span style={{ color: "#0b2530" }}>
                        ${getMonthly()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span style={{ color: "#00a892" }}>
                        Promo {PROMO} · first 3 months
                      </span>
                      <span style={{ color: "#00a892" }}>FREE</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span
                        className="font-extrabold text-lg"
                        style={{ color: "#0b2530" }}
                      >
                        Due today
                      </span>
                      <span
                        className="sm-mc text-3xl"
                        style={{ color: "#00a892" }}
                      >
                        $0.00
                      </span>
                    </div>
                  </div>

                  {/* checkout */}
                  <a
                    href={
                      selectedLocation.outOfStock ? undefined : getCheckoutUrl()
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`minecraft-button sm-mc mt-5 flex items-center justify-center gap-2 py-2 px-4 text-xl ${
                      selectedLocation.outOfStock
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    {selectedLocation.outOfStock ? (
                      "Out of stock"
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" /> Continue to checkout
                      </>
                    )}
                  </a>

                    <p
                      className="text-xs mb-2 mt-2"
                      style={{ color: "#7a6738" }}
                    >
                      If you don't want to put any payment information, select{" "}
                      <span style={{ color: "#0b8f78" }}>
                        PayPal Basic Legacy (Non-subscription/Manual Renew)
                      </span>{" "}
                      to bypass it.
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${IMG}/paypal_basic_legacy.png`}
                      alt="Select the PayPal Basic Legacy payment method at checkout"
                      className="w-full h-auto"
                    />
                  </div>

                {/* Hosting Facts — Fixed Hosting Consumer Disclosure */}
                <div className="sm-panel font-sans overflow-hidden">
                  {/* Header */}
                  <div className="px-4 pt-3 pb-2">
                    <h3
                      className="sm-mc text-2xl font-black tracking-tight leading-none"
                      style={{ color: "#0b2530" }}
                    >
                      Hosting Facts
                    </h3>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />

                  {/* Provider & Plan Info */}
                  <div className="px-4 py-2">
                    <p
                      className="text-lg font-bold"
                      style={{ color: "#0b2530" }}
                    >
                      Foxomy
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#0b2530" }}
                    >
                      {selectedPlan.ram}GB RAM Plan
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#7a6738" }}>
                      Fixed Hosting Consumer Disclosure
                    </p>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />

                  {/* Final Monthly Price */}
                  <div className="px-4 py-3">
                    <div className="flex justify-between items-baseline">
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#0b2530" }}
                      >
                        Monthly Price
                      </span>
                      <span
                        className="text-2xl font-black"
                        style={{ color: "#0b2530" }}
                      >
                        ${getMonthly()}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />
                  {/* Price Disclaimer */}
                  <div className="px-4 py-2">
                    <p
                      className="text-xs leading-tight"
                      style={{ color: "#7a6738" }}
                    >
                      The monthly price above is the standard rate. With
                      promotional code {PROMO}, the first 3 months are billed at
                      $0; service then renews at the standard monthly rate
                      above. This price does not require a contract.
                    </p>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />

                  {/* Service Details Section */}
                  <div className="px-4 py-2">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0b2530" }}
                    >
                      Service Specifications
                    </p>
                    <div className="space-y-1 text-xs">
                      {[
                        ["Location", selectedLocation.name],
                        ["CPU", selectedLocation.cpu],
                        ["vCores", `${selectedPlan.vCores} shared vCores`],
                        ["Memory (RAM)", `${selectedPlan.ram} GB`],
                        ["Storage", selectedPlan.storage],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span style={{ color: "#7a6738" }}>{label}</span>
                          <span
                            className="font-semibold text-right ml-2"
                            style={{ color: "#0b2530" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <p
                        className="text-[10px] leading-tight mt-1"
                        style={{ color: "#7a6738" }}
                      >
                        Soft limit of {selectedPlan.storage.split("/")[0]} GB
                        guaranteed and can be raised for free. Unlimited or
                        unmetered specifications goes towards the fair usage
                        policy.
                      </p>
                      {[
                        [
                          "Backup Slots",
                          `${selectedPlan.backupSlots} offsite backups per server`,
                        ],
                        ["Port Allocations", "10 ports per server"],
                        ["SQL Databases", "10 databases per server"],
                        [
                          "Container Splits",
                          `${selectedPlan.containerSplits} splits`,
                        ],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span style={{ color: "#7a6738" }}>{label}</span>
                          <span
                            className="font-semibold text-right ml-2"
                            style={{ color: "#0b2530" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />

                  {/* Selected Addons */}
                  {selectedAddons.length > 0 && (
                    <>
                      <div className="px-4 py-2">
                        <p
                          className="text-sm font-bold mb-2"
                          style={{ color: "#0b2530" }}
                        >
                          Selected Addons
                        </p>
                        <div className="space-y-1 text-xs">
                          {selectedAddons.map((addonId) => {
                            const addon = addons.find((a) => a.id === addonId);
                            if (!addon) return null;
                            return (
                              <div
                                key={addonId}
                                className="flex justify-between"
                              >
                                <span style={{ color: "#7a6738" }}>
                                  {addon.name}
                                </span>
                                <span
                                  className="font-semibold"
                                  style={{ color: "#0b2530" }}
                                >
                                  {addon.price === 0
                                    ? "Free"
                                    : `+$${addon.price}/mo`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="border-t border-[#d7b06a] mx-2" />
                    </>
                  )}

                  {/* Additional Charges */}
                  <div className="px-4 py-2">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0b2530" }}
                    >
                      Additional Charges &amp; Terms
                    </p>
                    <div className="space-y-1 text-xs">
                      {[
                        ["Provider Monthly Fees", "$0"],
                        ["One-Time Setup Fees", "$0"],
                        ["Late Fees", "$0"],
                        ["Early Termination Fee", "$0"],
                        ["Government Taxes", "$0"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span style={{ color: "#7a6738" }}>{label}</span>
                          <span
                            className="font-semibold"
                            style={{ color: "#0b2530" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <p
                        className="text-[10px] leading-tight mt-1"
                        style={{ color: "#7a6738" }}
                      >
                        Invoices are sent 2 weeks before due date. If you miss
                        payments by more than a month, please contact us to
                        cancel all past due invoices.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#d7b06a] mx-2" />

                  {/* Legal Links */}
                  <div className="px-4 py-2">
                    <div className="flex gap-4 text-xs">
                      <a
                        href="https://foxomy.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-link"
                      >
                        Terms of Service
                      </a>
                      <a
                        href="https://foxomy.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-link"
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                  <div className="border-t-4 border-[#d7b06a] mx-2" />
                  {/* Customer Support */}
                  <div className="px-4 py-4">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0b2530" }}
                    >
                      Customer Support
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span style={{ color: "#7a6738" }}>Email</span>
                        <a
                          href="mailto:support@foxomy.com"
                          className="sm-link font-semibold"
                        >
                          support@foxomy.com
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#7a6738" }}>Support Portal</span>
                        <a
                          href="https://foxomy.com/billing/submitticket.php?step=2&deptid=2"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-link font-semibold"
                        >
                          Submit a Ticket
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

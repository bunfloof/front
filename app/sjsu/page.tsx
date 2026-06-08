"use client";

/* =========================================================================
   Foxomy · I MISS SJSU  ·  app/sjsu/page.tsx

   A San Jose State send-off skin on the hosting configurator, for current
   SJSU Spartans. Reuses the same data + components as the main page (so the
   order flow stays 100% real), surfaces three locations and plans 16 GB or
   under, and wraps it all in a hand-made pixel-art "pinned-to-the-corkboard"
   campus scrapbook: parchment, lined notes, pennants, palms and Tower Hall.

   Promo: 3 months free with code IMISSSJSU. At WHMCS checkout the buyer
   picks "PayPal Basic (Legacy)" so no payment info is ever entered.

   All art lives in /public/imgs/sjsu/ and is original pixel art (no SJSU
   logos / no Sammy the Spartan). Foxomy is not affiliated with SJSU.
   ========================================================================= */

import { useState, useEffect, useRef, useCallback } from "react";
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
  Ticket,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

/* ---------------------------------------------------------------------------
   Promo config
--------------------------------------------------------------------------- */
const PROMO = "IMISSSJSU";
const MAX_RAM = 16; // promo only applies to plans 16 GB or under
const IMG = "/imgs/sjsu"; // where the user uploads the generated art

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

// A photographic cut-out helper was here previously; the hero is now pixel-art,
// so it has been removed.

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
    <div
      className="font-sans"
      style={{
        backgroundImage: `url(${IMG}/tex_cork.png)`,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
        imageRendering: "pixelated",
      }}
    >
      {/* SJSU styles, scoped with the sm- prefix */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sm-pixel{image-rendering:pixelated;image-rendering:crisp-edges;}
        .sm-mc{font-family:var(--font-minecraft),system-ui,sans-serif;}
        .sm-hand{font-family:"Bradley Hand","Segoe Print","Comic Sans MS",ui-rounded,cursive;}
        .sm-shadow{text-shadow:2px 2px 0 rgba(6,22,46,.55);}
        /* parchment "block" panel */
        .sm-panel{background:#f7efda url(${IMG}/tex_paper.png) repeat;background-size:320px 320px;image-rendering:pixelated;border:3px solid #2f6fb0;box-shadow:inset 2px 2px 0 #fffdf3,inset -3px -3px 0 #cdb06a,0 5px 0 rgba(6,22,46,.16);border-radius:4px}
        .sm-panel-sel{background:#fcf2d2 url(${IMG}/tex_goldpaper.png) repeat;background-size:320px 320px;image-rendering:pixelated;border:3px solid #0055a2;box-shadow:inset 2px 2px 0 #fffdf2,inset -3px -3px 0 #f3d486,0 0 0 2px rgba(229,168,35,.55),0 6px 0 rgba(0,85,162,.22);border-radius:4px}
        .sm-link{color:#0a66bd}
        .sm-link:hover{color:#0055a2;text-decoration:underline}
        /* handwritten note on lined paper */
        .sm-note{background:#fffdf3 url(${IMG}/tex_lined.png);background-size:100% auto;image-rendering:pixelated;border:1px solid #d9c7a0;box-shadow:0 10px 22px rgba(6,22,46,.30)}
        /* --- diorama animations + decor --- */
        @keyframes sm-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
        @keyframes sm-sway2{0%,100%{transform:rotate(2.6deg)}50%{transform:rotate(-2.6deg)}}
        @keyframes sm-swayf{0%,100%{transform:scaleX(-1) rotate(-2.4deg)}50%{transform:scaleX(-1) rotate(2.4deg)}}
        @keyframes sm-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes sm-drift{from{transform:translateX(-16vw)}to{transform:translateX(116vw)}}
        @keyframes sm-tw{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1.18)}}
        .sm-sway{animation:sm-sway 5s ease-in-out infinite;transform-origin:bottom center}
        .sm-sway2{animation:sm-sway2 6.4s ease-in-out infinite;transform-origin:bottom center}
        .sm-swayf{animation:sm-swayf 5.6s ease-in-out infinite;transform-origin:bottom center}
        .sm-bob{animation:sm-bob 6s ease-in-out infinite}
        .sm-tw{animation:sm-tw 3s ease-in-out infinite}
        .sm-grass{background-image:url(${IMG}/grass_px.png);background-size:240px 64px;background-repeat:repeat-x;background-position:left bottom;image-rendering:pixelated}
        .sm-pennant{clip-path:polygon(0 0,100% 0,50% 100%)}
      `,
        }}
      />

      {/* ============================== HERO ============================== */}
      {/* A little hand-built SJSU diorama: real cut-outs of Tower Hall + palms
          standing on a real lawn, under a painted sky. Promo front & center. */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "clamp(720px,94vh,1000px)",
          background:
            "repeating-linear-gradient(45deg,#0d2954 0 26px,#11346a 26px 52px)",
        }}
      >
        {/* moon + twinkling pixel stars */}
        <PixelImg
          src="moon_px.png"
          w={54}
          h={54}
          className="absolute sm-bob"
          style={{ top: 40, right: "10%", zIndex: 1 }}
        />
        <PixelImg
          src="star_px.png"
          w={18}
          h={18}
          className="absolute sm-tw"
          style={{ top: 70, left: "14%", zIndex: 1 }}
        />
        <PixelImg
          src="star_px.png"
          w={14}
          h={14}
          className="absolute sm-tw"
          style={{ top: 124, left: "30%", zIndex: 1, animationDelay: "1.1s" }}
        />
        <PixelImg
          src="star_px.png"
          w={21}
          h={21}
          className="absolute sm-tw"
          style={{ top: 96, left: "62%", zIndex: 1, animationDelay: ".5s" }}
        />
        <PixelImg
          src="star_px.png"
          w={14}
          h={14}
          className="absolute sm-tw"
          style={{ top: 172, right: "16%", zIndex: 1, animationDelay: "1.6s" }}
        />
        <PixelImg
          src="star_px.png"
          w={18}
          h={18}
          className="absolute sm-tw"
          style={{ top: 214, left: "8%", zIndex: 1, animationDelay: "2s" }}
        />
        <PixelImg
          src="star_px.png"
          w={14}
          h={14}
          className="absolute sm-tw"
          style={{ top: 58, left: "45%", zIndex: 1, animationDelay: ".9s" }}
        />
        <PixelImg
          src="star_px.png"
          w={18}
          h={18}
          className="absolute sm-tw"
          style={{ top: 150, left: "80%", zIndex: 1, animationDelay: "1.3s" }}
        />

        {/* pixel pennant bunting */}
        <div className="absolute left-0 right-0" style={{ top: 10, zIndex: 2 }}>
          <div style={{ height: 2, background: "rgba(255,255,255,.4)" }} />
          <div
            className="flex justify-center"
            style={{ gap: 8, marginTop: -1, flexWrap: "wrap" }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <PixelImg
                key={i}
                src={i % 2 ? "pennant_b.png" : "pennant_g.png"}
                w={22}
                h={27}
                className="sm-sway2"
                style={{
                  animationDelay: `${(i % 5) * 0.2}s`,
                  transformOrigin: "top center",
                }}
              />
            ))}
          </div>
        </div>

        {/* ----- the ground: pixel grass ----- */}
        <div
          className="sm-grass absolute left-0 right-0 bottom-0"
          style={{ height: 64, zIndex: 1 }}
        />

        {/* ----- the pixel diorama: Tower Hall + palms on the lawn ----- */}
        {/* little bushes for ground fill */}
        <PixelImg
          src="bush_px.png"
          w={66}
          h={36}
          className="absolute"
          style={{ left: "33%", bottom: 40, zIndex: 2 }}
        />
        <PixelImg
          src="bush_px.png"
          w={54}
          h={29}
          className="absolute"
          style={{ right: "33%", bottom: 42, zIndex: 2 }}
        />
        <PixelImg
          src="bush_px.png"
          w={48}
          h={26}
          className="absolute"
          style={{ left: "47%", bottom: 38, zIndex: 4 }}
        />

        {/* short palms */}
        <PixelImg
          src="palm_px.png"
          w={60}
          h={104}
          className="absolute sm-sway2"
          style={{ left: "40%", bottom: 52, zIndex: 2, animationDelay: "-2s" }}
        />
        <PixelImg
          src="palm_px.png"
          w={55}
          h={95}
          className="absolute sm-swayf"
          style={{ right: "40%", bottom: 54, zIndex: 2 }}
        />
        {/* mid palms */}
        <PixelImg
          src="palm_px.png"
          w={78}
          h={135}
          className="absolute sm-sway"
          style={{
            left: "25%",
            bottom: 50,
            zIndex: 2,
            animationDelay: "-1.6s",
          }}
        />
        <PixelImg
          src="palm_px.png"
          w={72}
          h={125}
          className="absolute sm-swayf"
          style={{ right: "25%", bottom: 52, zIndex: 2 }}
        />
        {/* tall palms */}
        <PixelImg
          src="palm_px.png"
          w={104}
          h={180}
          className="absolute sm-sway2"
          style={{ left: "12%", bottom: 48, zIndex: 2 }}
        />
        <PixelImg
          src="palm_px.png"
          w={98}
          h={170}
          className="absolute sm-swayf"
          style={{
            right: "12%",
            bottom: 50,
            zIndex: 2,
            animationDelay: "-0.8s",
          }}
        />

        {/* Tower Hall — pixel centerpiece (no clock) */}
        <PixelImg
          src="tower_px.png"
          w={112}
          h={244}
          className="absolute"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 54,
            zIndex: 3,
          }}
        />

        {/* big foreground framing palms */}
        <PixelImg
          src="palm_px.png"
          w={120}
          h={208}
          className="absolute sm-sway hidden sm:block"
          style={{ left: "-1%", bottom: 34, zIndex: 4 }}
        />
        <PixelImg
          src="palm_px.png"
          w={128}
          h={222}
          className="absolute sm-swayf"
          style={{ right: "-2%", bottom: 28, zIndex: 4 }}
        />

        {/* ----- centered headline + promo (kept clear of the diorama) ----- */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-14 pb-10 sm:pb-[360px]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="sm-mc sm-shadow text-white tracking-[0.25em] text-sm mb-3"></p>
            <h1
              className="sm-mc sm-shadow leading-[0.95] text-white font-bold"
              style={{ fontSize: "clamp(2.4rem,7.5vw,5.2rem)" }}
            >
              3 MONTHS <span style={{ color: "#ffd24a" }}>FREE</span>
              <br />
              MINECRAFT
              <br />
              HOSTING
            </h1>
            <p className="sm-mc sm-shadow text-white mt-3 text-xl tracking-wide">
              for <span style={{ color: "#ffd24a" }}>my friends</span> 💙💛
            </p>

            {/* promo code card */}
            <div className="mt-7 max-w-xl mx-auto">
              <div
                className="relative px-5 pt-5 pb-4 backdrop-blur-md"
                style={{
                  background: "rgba(8,28,58,0.6)",
                  border: "2px solid rgba(229,168,35,0.75)",
                  borderRadius: 14,
                  boxShadow: "0 14px 38px rgba(6,22,46,.5)",
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span style={{ color: "#e5a823" }}>✦</span>
                  <span className="sm-mc text-white sm-shadow text-lg tracking-widest">
                    PROMO CODE
                  </span>
                  <span style={{ color: "#e5a823" }}>✦</span>
                </div>

                <button
                  onClick={copyCode}
                  className="group w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3 cursor-pointer transition-transform active:translate-y-0.5"
                  style={{
                    background: "rgba(0,0,0,0.34)",
                    border: "2px dashed rgba(229,168,35,0.75)",
                    borderRadius: 10,
                  }}
                  aria-label="Copy promo code"
                >
                  <span
                    className="sm-mc sm-shadow"
                    style={{
                      color: "#ffd24a",
                      fontSize: "clamp(1.7rem,5.5vw,2.9rem)",
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
                  Valid through <b>June 30, 2026</b> or while stock lasts ·
                  plans <b>16&nbsp;GB or under</b> ·{" "}
                  <b>no payment information required</b>
                </p>
              </div>
            </div>

            <button
              onClick={scrollToPick}
              className="minecraft-button sm-mc mt-8 inline-flex items-center gap-2 px-7 py-3 text-2xl"
            >
              Grab a free Minecraft server
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* handwritten note, tucked to the side */}
        <div className="relative z-20 mx-auto w-full max-w-xs px-4 pb-16 lg:px-0 lg:pb-0 lg:absolute lg:left-6 lg:top-28 xl:w-[378px] lg:w-[278px]">
          <div className="relative" style={{ transform: "rotate(-3deg)" }}>
            <PixelImg
              src="spr_tape.png"
              w={84}
              h={31}
              className="absolute"
              style={{
                top: -14,
                left: 28,
                transform: "rotate(-8deg)",
                zIndex: 4,
              }}
            />
            <PixelImg
              src="spr_pushpin.png"
              w={22}
              h={25}
              className="absolute"
              style={{ top: -13, right: 16, zIndex: 5 }}
            />
            <div className="sm-note p-5 pt-7">
              <p
                className="sm-hand text-lg"
                style={{ color: "#0a2a4e", lineHeight: "27px" }}
              >
                <b>my time @ SJSU 💙💛</b>
                <br />
                Even though the dining hall here is pretty mid, San José is my
                home, and I'm gonna miss it so much. During my time here, I had
                the privilege of meeting awesome faculty and peers. I'm just
                moving on a little sooner than I'd planned, to pursue my
                next academic career. Here's a little fun treat for my fellow Spartan
                gamers over the summer.
              </p>
              <p
                className="sm-hand text-right text-base mt-1"
                style={{ color: "#2f5e8c" }}
              >
                — with love, a fellow Spartan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= STEP 1: LOCATIONS ======================== */}
      <section
        id="sm-locations"
        className="relative py-14"
        style={{
          backgroundImage: `url(${IMG}/tex_bluepaper.png)`,
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
          imageRendering: "pixelated",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-7">
            <div
              className="flex items-center justify-center w-11 h-11 rounded"
              style={{ background: "#0a2a4e", border: "2px solid #0a66bd" }}
            >
              <MapPin className="w-5 h-5" style={{ color: "#e5a823" }} />
            </div>
            <div>
              <h2 className="sm-mc text-2xl" style={{ color: "#0a2a4e" }}>
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
              style={{ color: "#313f55" }}
            >
              No promo locations are loading right now — check that the New
              Jersey Budget, New York Premium, and Dallas Budget locations exist
              in your gameData.
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
                              ? "#0a66bd"
                              : "#2f7fd0",
                          color: "#0a2a4e",
                        }}
                      >
                        {tierOf(location) === "premium" ? "$2/GB" : "$1/GB"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center"
                        style={{
                          background: isSelected ? "#0055a2" : "transparent",
                          borderColor: isSelected ? "#0055a2" : "#2f6fb0",
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
                            style={{ color: "#0a2a4e" }}
                          >
                            {location.name}
                          </span>
                        </div>
                        <p
                          className="text-xs mb-2 truncate"
                          style={{ color: "#46566f" }}
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
                            style={{ color: "#2f5e8c" }}
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
            className="relative py-14"
            style={{
              backgroundImage: `url(${IMG}/tex_goldpaper.png)`,
              backgroundRepeat: "repeat",
              backgroundSize: "320px 320px",
              imageRendering: "pixelated",
            }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0a2a4e", border: "2px solid #0a66bd" }}
                >
                  <Server className="w-5 h-5" style={{ color: "#e5a823" }} />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0a2a4e" }}>
                    Pick your plan
                  </h2>
                </div>
              </div>

              {locationPlans.length === 0 ? (
                <div
                  className="sm-panel p-6 text-center"
                  style={{ color: "#313f55" }}
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
                                ? "#0055a2"
                                : "transparent",
                              borderColor: isSelected ? "#0055a2" : "#2f6fb0",
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
                                style={{ color: "#0a2a4e" }}
                              >
                                {plan.ram} GB
                              </span>
                              <span
                                className="text-xs ml-1 font-medium"
                                style={{ color: "#46566f" }}
                              >
                                RAM
                              </span>
                            </div>
                            <div className="mb-1 leading-tight">
                              <span
                                className="text-xs line-through"
                                style={{ color: "#b8973f" }}
                              >
                                ${plan.price}/mo
                              </span>
                              <div
                                className="text-sm font-extrabold"
                                style={{ color: "#0055a2" }}
                              >
                                $0 for 3 months
                              </div>
                            </div>
                            <div
                              className="space-y-1 text-xs font-medium"
                              style={{ color: "#46566f" }}
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
                style={{ color: "#46566f" }}
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
            style={{
              backgroundImage: `url(${IMG}/tex_bluepaper.png)`,
              backgroundRepeat: "repeat",
              backgroundSize: "320px 320px",
              imageRendering: "pixelated",
            }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0a2a4e", border: "2px solid #0a66bd" }}
                >
                  <Package className="w-5 h-5" style={{ color: "#e5a823" }} />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0a2a4e" }}>
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
                                ? "#0055a2"
                                : "transparent",
                            borderColor:
                              isSelected && !isDisabled ? "#0055a2" : "#2f6fb0",
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
                            style={{ color: "#0a2a4e" }}
                          >
                            {addon.name}
                          </span>
                          <div className="mb-1">
                            <span
                              className="font-bold"
                              style={{ color: "#0055a2" }}
                            >
                              {addon.price === 0 ? "Free" : `$${addon.price}`}
                            </span>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "#46566f" }}
                            >
                              {" "}
                              per month
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: "#313f55" }}>
                            {addon.description}
                          </p>
                          {addon.id === "dedicated-ip" && (
                            <p
                              className="text-xs mt-2 font-semibold"
                              style={{ color: "#0a2a4e" }}
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
            className="relative py-14"
            style={{
              backgroundImage: `url(${IMG}/tex_goldpaper.png)`,
              backgroundRepeat: "repeat",
              backgroundSize: "320px 320px",
              imageRendering: "pixelated",
            }}
          >
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded"
                  style={{ background: "#0a2a4e", border: "2px solid #0a66bd" }}
                >
                  <ShoppingCart
                    className="w-5 h-5"
                    style={{ color: "#e5a823" }}
                  />
                </div>
                <div>
                  <h2 className="sm-mc text-2xl" style={{ color: "#0a2a4e" }}>
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
                        <span style={{ color: "#46566f" }}>{k}</span>
                        <span
                          className="font-semibold"
                          style={{ color: "#0a2a4e" }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}

                    {selectedAddons.length > 0 && (
                      <div
                        className="pt-3 mt-1 space-y-2"
                        style={{ borderTop: "2px dashed #cdb06a" }}
                      >
                        {selectedAddons.map((id) => {
                          const a = addons.find((x) => x.id === id);
                          if (!a) return null;
                          return (
                            <div key={id} className="flex justify-between">
                              <span style={{ color: "#46566f" }}>{a.name}</span>
                              <span
                                className="font-semibold"
                                style={{ color: "#0a2a4e" }}
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
                    style={{ borderTop: "3px solid #cdb06a" }}
                  >
                    <div className="flex justify-between">
                      <span style={{ color: "#46566f" }}>Regular rate</span>
                      <span style={{ color: "#0a2a4e" }}>
                        ${getMonthly()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span style={{ color: "#0055a2" }}>
                        Promo {PROMO} · first 3 months
                      </span>
                      <span style={{ color: "#0055a2" }}>FREE</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span
                        className="font-extrabold text-lg"
                        style={{ color: "#0a2a4e" }}
                      >
                        Due today
                      </span>
                      <span
                        className="sm-mc text-3xl"
                        style={{ color: "#0055a2" }}
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

                  <p className="text-xs mb-2 mt-2" style={{ color: "#46566f" }}>
                    I don't want your payment information. Do not put any
                    payment information, select{" "}
                    <span style={{ color: "#0055a2" }}>
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
                      style={{ color: "#0a2a4e" }}
                    >
                      Hosting Facts
                    </h3>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />

                  {/* Provider & Plan Info */}
                  <div className="px-4 py-2">
                    <p
                      className="text-lg font-bold"
                      style={{ color: "#0a2a4e" }}
                    >
                      Foxomy
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#0a2a4e" }}
                    >
                      {selectedPlan.ram}GB RAM Plan
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#46566f" }}>
                      Fixed Hosting Consumer Disclosure
                    </p>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />

                  {/* Final Monthly Price */}
                  <div className="px-4 py-3">
                    <div className="flex justify-between items-baseline">
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#0a2a4e" }}
                      >
                        Monthly Price
                      </span>
                      <span
                        className="text-2xl font-black"
                        style={{ color: "#0a2a4e" }}
                      >
                        ${getMonthly()}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />
                  {/* Price Disclaimer */}
                  <div className="px-4 py-2">
                    <p
                      className="text-xs leading-tight"
                      style={{ color: "#46566f" }}
                    >
                      The monthly price above is the standard rate. With
                      promotional code {PROMO}, the first 3 months are billed at
                      $0; service then renews at the standard monthly rate
                      above. This price does not require a contract. The promo
                      is offered to San Jose State University students as a
                      personal send-off and may end at any time.
                    </p>
                    <p
                      className="text-[10px] leading-tight mt-1"
                      style={{ color: "#7d8aa0" }}
                    >
                      We are a private host and not affiliated with, sponsored
                      by, or endorsed by San Jose State University.
                      &ldquo;SJSU&rdquo;, &ldquo;Spartans&rdquo;, and related
                      names are trademarks of their respective owners.
                    </p>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />

                  {/* Service Details Section */}
                  <div className="px-4 py-2">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0a2a4e" }}
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
                          <span style={{ color: "#46566f" }}>{label}</span>
                          <span
                            className="font-semibold text-right ml-2"
                            style={{ color: "#0a2a4e" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <p
                        className="text-[10px] leading-tight mt-1"
                        style={{ color: "#46566f" }}
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
                          <span style={{ color: "#46566f" }}>{label}</span>
                          <span
                            className="font-semibold text-right ml-2"
                            style={{ color: "#0a2a4e" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />

                  {/* Selected Addons */}
                  {selectedAddons.length > 0 && (
                    <>
                      <div className="px-4 py-2">
                        <p
                          className="text-sm font-bold mb-2"
                          style={{ color: "#0a2a4e" }}
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
                                <span style={{ color: "#46566f" }}>
                                  {addon.name}
                                </span>
                                <span
                                  className="font-semibold"
                                  style={{ color: "#0a2a4e" }}
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
                      <div className="border-t border-[#cdb06a] mx-2" />
                    </>
                  )}

                  {/* Additional Charges */}
                  <div className="px-4 py-2">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0a2a4e" }}
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
                          <span style={{ color: "#46566f" }}>{label}</span>
                          <span
                            className="font-semibold"
                            style={{ color: "#0a2a4e" }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <p
                        className="text-[10px] leading-tight mt-1"
                        style={{ color: "#46566f" }}
                      >
                        Invoices are sent 2 weeks before due date. If you miss
                        payments by more than a month, please contact us to
                        cancel all past due invoices.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#cdb06a] mx-2" />

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
                  <div className="border-t-4 border-[#cdb06a] mx-2" />
                  {/* Customer Support */}
                  <div className="px-4 py-4">
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: "#0a2a4e" }}
                    >
                      Customer Support
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span style={{ color: "#46566f" }}>Email</span>
                        <a
                          href="mailto:support@foxomy.com"
                          className="sm-link font-semibold"
                        >
                          support@foxomy.com
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#46566f" }}>Support Portal</span>
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

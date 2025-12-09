"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { SignalBar, pingToSignalState } from "@/components/SignalBar";
import {
  locations,
  addons,
  getPlansForLocation,
  generateCartUrl,
  type Location,
  type Plan,
} from "@/lib/gameData";
import { motion, AnimatePresence } from "motion/react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  Check,
  MapPin,
  Server,
  Package,
  ShoppingCart,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const lakesUrl =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_lakes.geojson";

// Initial map position
const INITIAL_POSITION = {
  coordinates: [20, 30] as [number, number],
  zoom: 1,
};

export default function GameHostingPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [pings, setPings] = useState<Record<string, number | null>>({});
  const [pollingBar, setPollingBar] = useState(0);
  const [pollingDirection, setPollingDirection] = useState(1);

  // Map position state
  const [mapPosition, setMapPosition] = useState(INITIAL_POSITION);
  const [isMapTransitioning, setIsMapTransitioning] = useState(false);

  const websocketsRef = useRef<Record<string, WebSocket>>({});

  // Polling bar animation
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

  // Start ping measurements
  const startPingMeasurements = useCallback(() => {
    // Reset all pings to null (polling state)
    const initialPings: Record<string, number | null> = {};
    locations.forEach((location) => {
      initialPings[location.codename] = null;
    });
    setPings(initialPings);

    // Clean up existing websockets
    Object.values(websocketsRef.current).forEach((ws) => {
      if ((ws as any)._pingInterval) {
        clearInterval((ws as any)._pingInterval);
      }
      ws.close();
    });
    websocketsRef.current = {};

    // Create new websockets
    locations.forEach((location) => {
      try {
        const ws = new WebSocket(location.wsUrl);

        ws.onopen = () => {
          const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              const sendTime = Date.now();
              ws.send("PING 0");
              (ws as any)._lastPingTime = sendTime;
            }
          }, 2000);

          (ws as any)._pingInterval = pingInterval;
        };

        ws.onmessage = (event) => {
          const message = event.data;
          if (message.startsWith("PONG")) {
            const sendTime = (ws as any)._lastPingTime;
            if (sendTime) {
              const receiveTime = Date.now();
              const ping = receiveTime - sendTime;
              setPings((prev) => ({
                ...prev,
                [location.codename]: ping,
              }));
            }
          }
        };

        ws.onerror = () => {
          setPings((prev) => ({
            ...prev,
            [location.codename]: -1,
          }));
        };

        websocketsRef.current[location.codename] = ws;
      } catch {
        setPings((prev) => ({
          ...prev,
          [location.codename]: -1,
        }));
      }
    });
  }, []);

  // Initialize ping measurements on mount
  useEffect(() => {
    startPingMeasurements();

    return () => {
      Object.values(websocketsRef.current).forEach((ws) => {
        if ((ws as any)._pingInterval) {
          clearInterval((ws as any)._pingInterval);
        }
        ws.close();
      });
    };
  }, [startPingMeasurements]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Animate map to location
  const animateMapToLocation = useCallback(
    (location: Location) => {
      setIsMapTransitioning(true);

      const startPosition = { ...mapPosition };
      const endPosition = {
        coordinates: location.coordinates as [number, number],
        zoom: 6.5,
      };

      const duration = 400;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);

        setMapPosition({
          coordinates: [
            startPosition.coordinates[0] +
              (endPosition.coordinates[0] - startPosition.coordinates[0]) *
                eased,
            startPosition.coordinates[1] +
              (endPosition.coordinates[1] - startPosition.coordinates[1]) *
                eased,
          ],
          zoom:
            startPosition.zoom +
            (endPosition.zoom - startPosition.zoom) * eased,
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsMapTransitioning(false);
        }
      };

      requestAnimationFrame(animate);
    },
    [mapPosition]
  );

  const handleLocationSelect = (location: Location) => {
    if (location.outOfStock) return;
    setSelectedLocation(location);
    setSelectedPlan(null); // Reset plan when location changes
    animateMapToLocation(location);
  };

  // Get plans for the selected location
  const locationPlans = selectedLocation
    ? getPlansForLocation(selectedLocation.codename)
    : [];

  const getTotalPrice = (): string => {
    if (!selectedPlan) return "$0";

    let total = selectedPlan.price;

    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        const addonPrice = parseInt(addon.price.replace(/[^0-9]/g, ""));
        total += addonPrice;
      }
    });

    return `$${total}`;
  };

  const handleCheckout = () => {
    if (!selectedPlan || !selectedLocation) return;
    const url = generateCartUrl(selectedPlan, selectedAddons);
    window.open(url, "_self");
  };

  // Sort locations by ping
  const sortedLocations = [...locations].sort((a, b) => {
    const pingA = pings[a.codename];
    const pingB = pings[b.codename];
    if (pingA === null || pingA < 0) return 1;
    if (pingB === null || pingB < 0) return -1;
    return pingA - pingB;
  });

  return (
    <div className="font-sans bg-bluey-950 min-h-screen">
      <MainNavbar />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(3,15,22,0) 0%, rgba(3,15,22,1) 100%), linear-gradient(135deg, rgba(17,168,169,0.15) 0%, transparent 50%), linear-gradient(225deg, rgba(4,129,205,0.15) 0%, transparent 50%)",
          backgroundColor: "#030F16",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Image
                src="/minecraftgrass.png"
                alt="Minecraft"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Game Server Hosting
            </h1>
            <p className="text-[#BDE0F5]/70 text-lg md:text-xl max-w-2xl mb-8">
              Deploy your Minecraft server in minutes with high-performance
              hardware and global locations.
            </p>
          </div>
        </div>
      </section>

      {/* Step 1: Location Selection with Map Background */}
      <section
        className="relative py-12 overflow-hidden"
        style={{ backgroundColor: "#030F16" }}
      >
        {/* Map Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <ComposableMap
            projection="geoMercator"
            className="w-full h-full"
            projectionConfig={{
              scale: 147,
              center: [0, 20],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              center={mapPosition.coordinates}
              zoom={mapPosition.zoom}
              onMoveEnd={(newPosition) => {
                if (!isMapTransitioning) {
                  setMapPosition(newPosition);
                }
              }}
            >
              {/* Countries layer */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies
                    .filter((geo) => geo.properties.name !== "Antarctica")
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#0D3A54"
                        stroke="#030F16"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                }
              </Geographies>

              {/* Lakes layer - same color as ocean/background */}
              <Geographies geography={lakesUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#030F16"
                      stroke="none"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Render markers for each location */}
              {locations.map((location) => {
                const isSelected =
                  selectedLocation?.codename === location.codename;

                return (
                  <Marker
                    key={location.codename}
                    coordinates={location.coordinates}
                  >
                    <g transform={`scale(${1 / mapPosition.zoom})`}>
                      {/* Pulsing outer circle - only for selected */}
                      {isSelected && (
                        <circle
                          r={12}
                          fill="#00c4aa"
                          fillOpacity={0.3}
                          className="animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                      )}
                      {/* Static inner dot */}
                      <circle
                        r={isSelected ? 6 : 4}
                        fill={isSelected ? "#00c4aa" : "#7AC2EB"}
                      />
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Vignette overlay - fades map edges to background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 60% at center, transparent 0%, transparent 30%, rgba(3,15,22,0.7) 60%, rgba(3,15,22,1) 100%)
              `,
            }}
          />
          {/* Top edge fade */}
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(3,15,22,1) 0%, transparent 100%)",
            }}
          />
          {/* Bottom edge fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(3,15,22,1) 0%, transparent 100%)",
            }}
          />
          {/* Left edge fade */}
          <div
            className="absolute inset-y-0 left-0 w-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(3,15,22,1) 0%, transparent 100%)",
            }}
          />
          {/* Right edge fade */}
          <div
            className="absolute inset-y-0 right-0 w-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(3,15,22,1) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00c4aa]/20 border border-[#00c4aa]/40">
              <MapPin className="w-5 h-5 text-[#00c4aa]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Select Your Location
              </h2>
              <p className="text-[#BDE0F5]/60 text-sm">
                Choose the server location closest to you for the best
                performance
              </p>
            </div>
            <button
              onClick={startPingMeasurements}
              className="ml-auto flex items-center gap-2 text-sm text-[#7AC2EB]/60 hover:text-[#00c4aa] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh pings
            </button>
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedLocations.map((location) => {
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

              return (
                <motion.button
                  key={location.codename}
                  onClick={() => handleLocationSelect(location)}
                  disabled={location.outOfStock}
                  className={`relative p-4 rounded-sm border transition-all text-left cursor-pointer backdrop-blur-sm ${
                    location.outOfStock
                      ? "opacity-40 cursor-not-allowed border-[#1A77AD]/20 bg-[#071F2C]/70"
                      : isSelected
                      ? "border-[#00c4aa] bg-[#071F2C]/90 shadow-[0_0_20px_rgba(0,196,170,0.15)]"
                      : "border-[#1A77AD]/30 bg-[#071F2C]/70 hover:border-[#33A1E0]/50 hover:bg-[#071F2C]/90"
                  }`}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {/* Tier & Price Badges */}
                  <div className="absolute top-0 right-3 -translate-y-1/2 flex gap-1.5">
                    {/* Tier Badge */}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded transition-all border ${
                        location.tier === "premium"
                          ? "bg-[#00c4aa]/20 text-[#00c4aa]"
                          : "bg-[#7AC2EB]/20 text-[#7AC2EB]"
                      } ${
                        isSelected
                          ? "backdrop-blur-xl border-[#00c4aa]/60 shadow-[0_0_8px_rgba(0,196,170,0.3)]"
                          : "backdrop-blur-sm border-[#1A77AD]/30"
                      }`}
                    >
                      {location.tier === "premium" ? "Premium" : "Budget"}
                    </span>
                    {/* Price Badge */}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded transition-all border ${
                        location.tier === "premium"
                          ? "bg-[#00c4aa]/20 text-[#00c4aa]"
                          : "bg-[#7AC2EB]/20 text-[#7AC2EB]"
                      } ${
                        isSelected
                          ? "backdrop-blur-xl border-[#00c4aa]/60 shadow-[0_0_8px_rgba(0,196,170,0.3)]"
                          : "backdrop-blur-sm border-[#1A77AD]/30"
                      }`}
                    >
                      ${location.pricePerGb}/GB
                    </span>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                        isSelected
                          ? "bg-[#00c4aa]/20 border-[#00c4aa]"
                          : "border-[#1A77AD]/50"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-[#00c4aa]" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      {/* Location Name & Flag */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{location.flag}</span>
                        <span className="text-white font-semibold truncate">
                          {location.name}
                        </span>
                      </div>

                      {/* CPU */}
                      <p className="text-[#7AC2EB]/60 text-xs mb-2 truncate">
                        {location.cpu}
                      </p>

                      {/* Ping & Signal */}
                      <div className="flex items-center gap-2">
                        <SignalBar
                          state={signalState}
                          pollingBar={pollingBar}
                          pixelSize={2}
                        />
                        <span className="text-[#7AC2EB]/60 text-xs font-mono">
                          {pingText}
                        </span>
                        {location.outOfStock && (
                          <span className="text-red-400 text-xs ml-auto">
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
        </div>
      </section>

      {/* Step 2: Plan Selection */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-12 bg-grid-pattern"
            style={{ backgroundColor: "#030F16" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00c4aa]/20 border border-[#00c4aa]/40">
                  <Server className="w-5 h-5 text-[#00c4aa]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Select Your Plan
                  </h2>
                  <p className="text-[#BDE0F5]/60 text-sm">
                    Choose the amount of RAM for your {selectedLocation.name}{" "}
                    server
                  </p>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {locationPlans.map((plan) => {
                  const isSelected = selectedPlan?.id === plan.id;

                  return (
                    <motion.button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative p-4 rounded-sm border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "border-[#00c4aa] bg-[#071F2C] shadow-[0_0_20px_rgba(0,196,170,0.15)]"
                          : "border-[#1A77AD]/30 bg-[#071F2C] hover:border-[#33A1E0]/50"
                      }`}
                      layout
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Checkbox */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            isSelected
                              ? "bg-[#00c4aa]/20 border-[#00c4aa]"
                              : "border-[#1A77AD]/50"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-[#00c4aa]" />
                          )}
                        </div>

                        <div className="flex-grow">
                          {/* RAM */}
                          <div className="mb-1">
                            <span className="text-xl font-bold text-white">
                              {plan.ram} GB
                            </span>
                            <span className="text-[#7AC2EB]/60 text-sm ml-1">
                              RAM
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mb-3">
                            <span className="text-[#00c4aa] font-bold">
                              ${plan.price}
                            </span>
                            <span className="text-[#7AC2EB]/60 text-xs">
                              /mo
                            </span>
                          </div>

                          {/* Specs */}
                          <div className="space-y-1 text-xs text-[#7AC2EB]/60">
                            <p>{plan.vCores} vCores</p>
                            <p>{plan.storage}</p>
                            <p>{plan.backupSlots} Backups</p>
                            <p>
                              {plan.containerSplits} Split
                              {plan.containerSplits > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-[#7AC2EB]/40 text-sm mt-4">
                All plans include DDoS protection, instant setup, and access to
                Pterodactyl Panel.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Step 3: Addons Selection */}
      <AnimatePresence>
        {selectedLocation && selectedPlan && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-12 bg-grid-pattern"
            style={{ backgroundColor: "#030F16" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00c4aa]/20 border border-[#00c4aa]/40">
                  <Package className="w-5 h-5 text-[#00c4aa]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Optional Addons
                  </h2>
                  <p className="text-[#BDE0F5]/60 text-sm">
                    Enhance your server with these optional addons
                  </p>
                </div>
              </div>

              {/* Addons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);

                  return (
                    <motion.button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`relative p-4 rounded-sm border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "border-[#00c4aa] bg-[#071F2C] shadow-[0_0_20px_rgba(0,196,170,0.15)]"
                          : "border-[#1A77AD]/30 bg-[#071F2C] hover:border-[#33A1E0]/50"
                      }`}
                      layout
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            isSelected
                              ? "bg-[#00c4aa]/20 border-[#00c4aa]"
                              : "border-[#1A77AD]/50"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-[#00c4aa]" />
                          )}
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-semibold">
                              {addon.name}
                            </span>
                            <span className="text-[#00c4aa] font-bold">
                              {addon.price}/mo
                            </span>
                          </div>
                          <p className="text-[#7AC2EB]/60 text-sm">
                            {addon.description}
                          </p>
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

      {/* Step 4: Order Summary */}
      <AnimatePresence>
        {selectedLocation && selectedPlan && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-12"
            style={{ backgroundColor: "#030F16" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00c4aa]/20 border border-[#00c4aa]/40">
                  <ShoppingCart className="w-5 h-5 text-[#00c4aa]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Order Summary
                  </h2>
                  <p className="text-[#BDE0F5]/60 text-sm">
                    Review your order before checkout
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="max-w-xl mx-auto">
                <div className="bg-[#071F2C] border border-[#1A77AD]/30 rounded-sm p-6">
                  {/* Plan Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">Location</span>
                      <span className="text-white font-medium">
                        {selectedLocation.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">Plan</span>
                      <span className="text-white font-medium">
                        {selectedPlan.ram} GB RAM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">vCores</span>
                      <span className="text-white font-medium">
                        {selectedPlan.vCores} shared vCores
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">Storage</span>
                      <span className="text-white font-medium">
                        {selectedPlan.storage}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">CPU</span>
                      <span className="text-white font-medium">
                        {selectedLocation.cpu}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#BDE0F5]/70">Base Price</span>
                      <span className="text-white font-medium">
                        ${selectedPlan.price}/mo
                      </span>
                    </div>
                  </div>

                  {/* Addons */}
                  {selectedAddons.length > 0 && (
                    <div className="border-t border-[#1A77AD]/30 pt-4 mb-4">
                      <p className="text-[#BDE0F5]/50 text-sm mb-3">Addons</p>
                      <div className="space-y-2">
                        {selectedAddons.map((addonId) => {
                          const addon = addons.find((a) => a.id === addonId);
                          if (!addon) return null;
                          return (
                            <div
                              key={addonId}
                              className="flex justify-between items-center"
                            >
                              <span className="text-[#BDE0F5]/70">
                                {addon.name}
                              </span>
                              <span className="text-white font-medium">
                                {addon.price}/mo
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-[#1A77AD]/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">
                        Total
                      </span>
                      <span className="text-[#00c4aa] font-bold text-2xl">
                        {getTotalPrice()}/mo
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={selectedLocation.outOfStock}
                    className={`w-full mt-6 py-3 px-6 rounded-sm font-semibold transition-all ${
                      selectedLocation.outOfStock
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed"
                        : "bg-[#00c4aa] text-[#030F16] hover:bg-[#00d4b8] hover:shadow-[0_0_20px_rgba(0,196,170,0.3)]"
                    }`}
                  >
                    {selectedLocation.outOfStock
                      ? "Out of Stock"
                      : "Continue to Checkout"}
                  </button>

                  <p className="text-[#7AC2EB]/40 text-xs text-center mt-4">
                    You&apos;ll be redirected to our billing portal to complete
                    your order.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer spacer */}
      <div className="h-24" style={{ backgroundColor: "#030F16" }} />
    </div>
  );
}

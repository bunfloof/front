"use client";

import { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { SignalBar, pingToSignalState } from "./SignalBar";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type TipDirection = "top" | "bottom" | "left" | "right";

interface Location {
  name: string;
  coordinates: [number, number]; // [longitude, latitude] for the dot
  badgeCoordinates: [number, number]; // [longitude, latitude] for where the ARROW TIP should be
  tipDirection: TipDirection; // Direction the tooltip tip points (badge extends from this tip)
  websocketUrl: string; // WebSocket URL for ping measurement
}

const locations: Location[] = [
  {
    name: "El Segundo",
    coordinates: [-118.2437, 34.0522],
    badgeCoordinates: [-118.5991, 34.0522], // Tip positioned here, badge extends downward
    tipDirection: "right", // Tip points upward to the dot
    websocketUrl: "wss://losangeles.ca.speedtest.frontier.com:8080/ws",
  },
  {
    name: "Chicago",
    coordinates: [-87.6298, 41.8781],
    badgeCoordinates: [-73.706, 40.7128], // Tip positioned here, badge extends upward
    tipDirection: "left", // Tip points downward to the dot
    websocketUrl: "wss://speedtest.is.cc.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    badgeCoordinates: [-73.706, 40.7128], // Tip positioned here, badge extends upward
    tipDirection: "left", // Tip points downward to the dot
    websocketUrl: "wss://speedtest.is.cc.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "Frankfurt",
    coordinates: [8.6821, 50.1109],
    badgeCoordinates: [8.6821, 50.3555], // Tip positioned here, badge extends upward
    tipDirection: "bottom", // Tip points downward to the dot
    websocketUrl:
      "wss://speedtest1.synlinq.de.prod.hosts.ooklaserver.net:8080/ws?",
  },
];

// Initial map position and zoom - CUSTOMIZE THESE VALUES
const INITIAL_POSITION = {
  coordinates: [0, 20] as [number, number],
  zoom: 1,
};

// Badge styling constants - CUSTOMIZE THESE VALUES
const BADGE_HEIGHT = 28; // Change this to adjust badge height
const ARROW_SIZE = 6; // Size of the arrow triangle
const ELEMENT_SCALE = 0.7; // Global scale for badges and dots (adjust this to change size)

// Helper function to render signal bars in pure SVG
const renderSignalBarSVG = (
  x: number,
  y: number,
  state: "none" | "1" | "2" | "3" | "4" | "5" | "polling",
  pollingBar: number
) => {
  const signalStates: Record<
    string,
    { fg: string; bg: string; bars: number; animate?: boolean }
  > = {
    none: { fg: "#5B5B5B", bg: "#383838", bars: 0 },
    "1": { fg: "#FF0000", bg: "#810002", bars: 1 },
    "2": { fg: "#FF6F01", bg: "#853700", bars: 2 },
    "3": { fg: "#F3FF01", bg: "#808A00", bars: 3 },
    "4": { fg: "#B3FE01", bg: "#618700", bars: 4 },
    "5": { fg: "#02FF46", bg: "#008720", bars: 5 },
    polling: { fg: "#0356F7", bg: "#012D7D", bars: 5, animate: true },
  };

  const currentState = signalStates[state];
  const barHeights = [3, 4, 5, 6, 7];
  const pixelSize = 2.75;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {barHeights.map((height, barNum) => {
        let isLit;
        if (currentState.animate) {
          isLit = barNum === pollingBar;
        } else {
          isLit = barNum < currentState.bars;
        }

        const fgColor = isLit ? currentState.fg : "#1A1A1A";
        const bgColor = isLit ? currentState.bg : "#2D2D2D";

        const barX = barNum * pixelSize * 2;
        const barY = -height * pixelSize;

        return (
          <g key={barNum}>
            {/* Main color column (left side, from row 2 to top) */}
            <rect
              x={barX}
              y={barY}
              width={pixelSize}
              height={(height - 1) * pixelSize}
              fill={fgColor}
            />
            {/* Backdrop column (right side, from bottom to second-to-last row) */}
            <rect
              x={barX + pixelSize}
              y={barY + pixelSize}
              width={pixelSize}
              height={(height - 1) * pixelSize}
              fill={bgColor}
            />
          </g>
        );
      })}
    </g>
  );
};

// Helper function to render badge tip based on direction (shadcn-style)
// Using triangular arrows like CSS border trick
// Solution inspired by: https://www.jestsee.com/blog/customize-shadcn-tooltip-arrows/
const getBadgeTip = (
  direction: TipDirection,
  badgeWidth: number,
  badgeHeight: number
) => {
  const halfWidth = badgeWidth / 2;
  const halfHeight = badgeHeight / 2;

  switch (direction) {
    case "top":
      // Arrow pointing upward (triangle pointing up)
      return (
        <>
          {/* Border triangle */}
          <polygon
            points={`0,${-halfHeight - ARROW_SIZE} ${
              -ARROW_SIZE - 1
            },${-halfHeight} ${ARROW_SIZE + 1},${-halfHeight}`}
            fill="#3b82f6"
          />
          {/* Inner fill triangle - overlaps badge border to hide it */}
          <polygon
            points={`0,${-halfHeight - ARROW_SIZE + 1.5} ${-ARROW_SIZE + 0.5},${
              -halfHeight + 1
            } ${ARROW_SIZE - 0.5},${-halfHeight + 1}`}
            fill="#1e293b"
          />
        </>
      );
    case "bottom":
      // Arrow pointing downward (triangle pointing down)
      return (
        <>
          {/* Border triangle */}
          <polygon
            points={`0,${halfHeight + ARROW_SIZE} ${
              -ARROW_SIZE - 1
            },${halfHeight} ${ARROW_SIZE + 1},${halfHeight}`}
            fill="#3b82f6"
          />
          {/* Inner fill triangle - overlaps badge border to hide it */}
          <polygon
            points={`0,${halfHeight + ARROW_SIZE - 1.5} ${-ARROW_SIZE + 0.5},${
              halfHeight - 1
            } ${ARROW_SIZE - 0.5},${halfHeight - 1}`}
            fill="#1e293b"
          />
        </>
      );
    case "left":
      // Arrow pointing left (triangle pointing left)
      return (
        <>
          {/* Border triangle */}
          <polygon
            points={`${-halfWidth - ARROW_SIZE},0 ${-halfWidth},${
              -ARROW_SIZE - 1
            } ${-halfWidth},${ARROW_SIZE + 1}`}
            fill="#3b82f6"
          />
          {/* Inner fill triangle - overlaps badge border to hide it */}
          <polygon
            points={`${-halfWidth - ARROW_SIZE + 1.5},0 ${-halfWidth + 1},${
              -ARROW_SIZE + 0.5
            } ${-halfWidth + 1},${ARROW_SIZE - 0.5}`}
            fill="#1e293b"
          />
        </>
      );
    case "right":
      // Arrow pointing right (triangle pointing right)
      return (
        <>
          {/* Border triangle */}
          <polygon
            points={`${halfWidth + ARROW_SIZE},0 ${halfWidth},${
              -ARROW_SIZE - 1
            } ${halfWidth},${ARROW_SIZE + 1}`}
            fill="#3b82f6"
          />
          {/* Inner fill triangle - overlaps badge border to hide it */}
          <polygon
            points={`${halfWidth + ARROW_SIZE - 1.5},0 ${halfWidth - 1},${
              -ARROW_SIZE + 0.5
            } ${halfWidth - 1},${ARROW_SIZE - 0.5}`}
            fill="#1e293b"
          />
        </>
      );
  }
};

export function ServerLocationsSection() {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [badgeWidths, setBadgeWidths] = useState<Record<string, number>>({});
  const [responsiveScale, setResponsiveScale] = useState(ELEMENT_SCALE);
  const [pings, setPings] = useState<Record<string, number | null>>({});
  const [pollingBar, setPollingBar] = useState(0);
  const [pollingDirection, setPollingDirection] = useState(1);
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});

  // Adjust scale based on screen size to keep elements visible
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      // Smaller screens need LARGER scale to compensate for compression
      if (width < 640) {
        setResponsiveScale(ELEMENT_SCALE * 1.8); // Mobile: 80% larger
      } else if (width < 768) {
        setResponsiveScale(ELEMENT_SCALE * 1.5); // Small tablet: 50% larger
      } else if (width < 1024) {
        setResponsiveScale(ELEMENT_SCALE * 1.2); // Tablet: 20% larger
      } else {
        setResponsiveScale(ELEMENT_SCALE); // Desktop: normal
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Measure actual text widths after render
  useEffect(() => {
    const widths: Record<string, number> = {};
    locations.forEach((location) => {
      const textElement = textRefs.current[location.name];
      if (textElement) {
        // Get actual rendered text width
        const bbox = textElement.getBBox();
        // Add padding (8px on each side = 16px total)
        widths[location.name] = bbox.width + 20;
      }
    });
    setBadgeWidths(widths);
  }, []);

  // Polling bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPollingBar((prev) => {
        const next = prev + pollingDirection;
        if (next >= 5) {
          setPollingDirection(-1);
          return 4;
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

  // WebSocket ping measurement for each location
  useEffect(() => {
    const websockets: Record<string, WebSocket> = {};

    locations.forEach((location) => {
      try {
        const ws = new WebSocket(location.websocketUrl);

        ws.onopen = () => {
          // Start pinging every 2 seconds
          const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              const sendTime = Date.now();
              ws.send("PING 0");

              // Store send time temporarily
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
                [location.name]: ping,
              }));
            }
          }
        };

        ws.onerror = () => {
          setPings((prev) => ({
            ...prev,
            [location.name]: -1, // Error state
          }));
        };

        websockets[location.name] = ws;
      } catch (error) {
        setPings((prev) => ({
          ...prev,
          [location.name]: -1,
        }));
      }
    });

    return () => {
      // Cleanup websockets
      Object.values(websockets).forEach((ws) => {
        if ((ws as any)._pingInterval) {
          clearInterval((ws as any)._pingInterval);
        }
        ws.close();
      });
    };
  }, []);

  const handleLocationClick = (location: Location) => {
    setPosition({
      coordinates: location.coordinates,
      zoom: 4,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-bluey-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm text-gray-400 mb-4 tracking-wider uppercase">
            Server Locations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Global Infrastructure
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our servers are strategically located across the United States to
            ensure optimal performance and low latency.
          </p>
        </div>
      </div>

      {/* Full-width map container */}
      <div className="w-full">
        <div className="relative w-full h-[720px] bg-black overflow-hidden border border-gray-800">
          {/* Map Section - Full Width */}
          <div className="w-full h-full bg-ocean-1">
            <ComposableMap
              projection="geoMercator"
              className="w-full h-full"
              projectionConfig={{
                scale: 147,
                center: [0, 20],
              }}
            >
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                onMoveEnd={(newPosition) => {
                  setPosition(newPosition);
                  // Console log for finding your desired initial position
                  console.log("📍 Map Position:", {
                    coordinates: newPosition.coordinates,
                    zoom: newPosition.zoom,
                  });
                  console.log(
                    "💡 Copy this to INITIAL_POSITION:",
                    `{ coordinates: [${newPosition.coordinates[0]}, ${newPosition.coordinates[1]}] as [number, number], zoom: ${newPosition.zoom} }`
                  );
                }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies
                      .filter((geo) => geo.properties.name !== "Antarctica")
                      .map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#1e293b"
                          stroke="#070E2B"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#334155", outline: "none" },
                            pressed: { fill: "#475569", outline: "none" },
                          }}
                        />
                      ))
                  }
                </Geographies>

                {/* Render pulsing dots */}
                {locations.map((location) => (
                  <Marker
                    key={location.name}
                    coordinates={location.coordinates}
                  >
                    <g transform={`scale(${responsiveScale / position.zoom})`}>
                      {/* Pulsing outer circle */}
                      <circle
                        r={8}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        className="animate-ping"
                        style={{
                          animationDuration: "2s",
                        }}
                      />
                      {/* Static inner dot */}
                      <circle r={4} fill="#60a5fa" />
                    </g>
                  </Marker>
                ))}

                {/* Hidden text elements for measuring actual width */}
                <defs>
                  {locations.map((location) => (
                    <text
                      key={`measure-${location.name}`}
                      ref={(el) => {
                        textRefs.current[location.name] = el;
                      }}
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {location.name}
                    </text>
                  ))}
                </defs>

                {/* Render badges at separate positions */}
                {locations.map((location) => {
                  const ping = pings[location.name];
                  const signalState = pingToSignalState(ping);

                  // Use measured width, fallback to approximate if not yet measured
                  const baseWidth =
                    badgeWidths[location.name] || location.name.length * 8 + 16;
                  // Add extra width for signal bar and ping
                  const badgeWidth = baseWidth + 60;
                  const badgeHeight = BADGE_HEIGHT;
                  const halfWidth = badgeWidth / 2;
                  const halfHeight = badgeHeight / 2;

                  // Calculate offset based on tip direction
                  // badgeCoordinates now represents where the TIP is, not the center
                  let offsetX = 0;
                  let offsetY = 0;

                  switch (location.tipDirection) {
                    case "top":
                      // Tip is at top, badge extends downward
                      offsetY = halfHeight + ARROW_SIZE;
                      break;
                    case "bottom":
                      // Tip is at bottom, badge extends upward
                      offsetY = -(halfHeight + ARROW_SIZE);
                      break;
                    case "left":
                      // Tip is at left, badge extends rightward
                      offsetX = halfWidth + ARROW_SIZE;
                      break;
                    case "right":
                      // Tip is at right, badge extends leftward
                      offsetX = -(halfWidth + ARROW_SIZE);
                      break;
                  }

                  return (
                    <Marker
                      key={`badge-${location.name}`}
                      coordinates={location.badgeCoordinates}
                    >
                      <g
                        transform={`scale(${
                          responsiveScale / position.zoom
                        }) translate(${offsetX}, ${offsetY})`}
                      >
                        {/* Badge that hugs the text */}
                        <rect
                          x={-halfWidth}
                          y={-halfHeight}
                          width={badgeWidth}
                          height={badgeHeight}
                          fill="#1e293b"
                          stroke="#3b82f6"
                          strokeWidth={1.5}
                          rx={3}
                        />
                        {/* Tooltip tip pointing toward the dot - drawn after badge so it can overlap the border */}
                        {getBadgeTip(
                          location.tipDirection,
                          badgeWidth,
                          badgeHeight
                        )}
                        {/* City name */}
                        <text
                          x={-halfWidth + 8}
                          y={4}
                          textAnchor="start"
                          style={{
                            fill: "#fff",
                            fontSize: "14px",
                            fontWeight: "600",
                            letterSpacing: "0.01em",
                            fontFamily: "system-ui",
                          }}
                        >
                          {location.name}
                        </text>
                        {/* Signal bars - pure SVG, positioned from right edge */}
                        {renderSignalBarSVG(
                          halfWidth - 70,
                          10,
                          signalState,
                          pollingBar
                        )}
                        {/* Ping display */}
                        <text
                          x={halfWidth - 8}
                          y={10}
                          textAnchor="end"
                          style={{
                            fill: "#fff",
                            fontSize: "14px",
                            fontFamily: "monospace",
                            fontWeight: "400",
                          }}
                        >
                          {ping === null
                            ? "..."
                            : ping < 0
                            ? "ERR"
                            : `${Math.round(ping)}ms`}
                        </text>
                      </g>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Overlay - Floating on top */}
          <div className="absolute top-0 right-0 h-full w-64 bg-gradient-to-l from-black/80 via-black/60 to-transparent pointer-events-none">
            <div className="absolute right-0 top-0 h-full w-48 p-6 flex flex-col gap-4 pointer-events-auto">
              <h3 className="text-white font-semibold text-lg mb-2">
                Our Locations
              </h3>
              {locations.map((location) => {
                const ping = pings[location.name];
                const signalState = pingToSignalState(ping);

                return (
                  <button
                    key={location.name}
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left px-4 py-3 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white hover:bg-black/70 hover:border-blue-500 transition-all duration-200 font-medium"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex-1">{location.name}</span>
                      <div className="flex items-center gap-2">
                        <SignalBar
                          state={signalState}
                          pollingBar={pollingBar}
                        />
                        <span className="text-xs font-mono">
                          {ping === null
                            ? "..."
                            : ping < 0
                            ? "ERR"
                            : `${Math.round(ping)}ms`}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

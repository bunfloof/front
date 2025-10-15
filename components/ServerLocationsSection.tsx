"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { SignalBar, pingToSignalState } from "./SignalBar";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const lakesUrl =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_lakes.geojson";

type TipEdge = "top" | "bottom" | "left" | "right";

interface Location {
  name: string;
  coordinates: [number, number]; // [longitude, latitude] for the dot
  arrowCoordinates: [number, number]; // [longitude, latitude] where the arrow tip should be locked - arrow points to the dot from here
  tipEdge: TipEdge; // Which edge the arrow is on (top/bottom/left/right)
  tipOffset: number; // Precise pixel offset from center along the edge (positive/negative for fine-tuning)
  websocketUrl: string; // WebSocket URL for ping measurement
}

const locations: Location[] = [
  {
    name: "Los Angeles",
    coordinates: [-118.2437, 34.0522],
    arrowCoordinates: [-118.5991, 34.0522], // Arrow tip locked here
    tipEdge: "right", // Arrow on right edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl: "wss://losangeles.ca.speedtest.frontier.com:8080/ws",
  },
  {
    name: "Dallas",
    coordinates: [-96.8066, 32.7767],
    arrowCoordinates: [-96.8066, 32.9767], // Arrow tip locked here
    tipEdge: "bottom", // Arrow on bottom edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl: "wss://dallas1.cabospeed.com:8080/ws?",
  },
  {
    name: "Chicago",
    coordinates: [-87.6298, 41.8781],
    arrowCoordinates: [-87.6298, 42.0781], // Arrow tip locked here
    tipEdge: "bottom", // Arrow on bottom edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl:
      "wss://speedtest.chi.gigenet.com.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    arrowCoordinates: [-73.706, 40.7128], // Arrow tip locked here
    tipEdge: "left", // Arrow on left edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl: "wss://speedtest.is.cc.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "Frankfurt",
    coordinates: [8.6821, 50.1109],
    arrowCoordinates: [8.6821, 50.3555], // Arrow tip locked here
    tipEdge: "bottom", // Arrow on bottom edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl:
      "wss://speedtest1.synlinq.de.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "Helsinki",
    coordinates: [24.9384, 60.1699],
    arrowCoordinates: [24.9384, 60.3699], // Arrow tip locked here
    tipEdge: "bottom", // Arrow on bottom edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl:
      "wss://speedtest-hki.retn.net.prod.hosts.ooklaserver.net:8080/ws?",
  },
  {
    name: "Ho Chi Minh",
    coordinates: [106.8412, 10.8231],
    arrowCoordinates: [107.2412, 10.8231], // Arrow tip locked here
    tipEdge: "left", // Arrow on left edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl: "wss://speedtest.fpt.vn.prod.hosts.ooklaserver.net:8080/ws?",
  },
];

// Initial map position and zoom - CUSTOMIZE THESE VALUES
const INITIAL_POSITION = {
  coordinates: [0, 20] as [number, number],
  zoom: 1,
};

// Badge styling constants - CUSTOMIZE THESE VALUES
const BADGE_HEIGHT = 28; // Change this to adjust badge height
const ARROW_SIZE = 8; // Size of the arrow triangle (increased from 6)
const ELEMENT_SCALE = 0.7; // Global scale for badges and dots (adjust this to change size)

export function ServerLocationsSection() {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [responsiveScale, setResponsiveScale] = useState(ELEMENT_SCALE);

  // Initialize with null for each location to show polling state
  const [pings, setPings] = useState<Record<string, number | null>>(() => {
    const initialPings: Record<string, number | null> = {};
    locations.forEach((location) => {
      initialPings[location.name] = null;
    });
    return initialPings;
  });
  const [pollingBar, setPollingBar] = useState(0);
  const [pollingDirection, setPollingDirection] = useState(1);

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
          <div className="w-full h-full bg-[#080F2C]">
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
                          fill="#222843"
                          stroke="#080F2C"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#222843", outline: "none" },
                            pressed: { fill: "#222843", outline: "none" },
                          }}
                        />
                      ))
                  }
                </Geographies>

                {/* Lakes layer - same color as ocean */}
                <Geographies geography={lakesUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#070e2b"
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

                {/* Render badges using foreignObject for proper HTML/Tailwind layout */}
                {locations.map((location) => {
                  const ping = pings[location.name];
                  const signalState = pingToSignalState(ping);
                  const pingText =
                    ping === null
                      ? "..."
                      : ping < 0
                      ? "ERR"
                      : `${Math.round(ping)}ms`;

                  // Calculate badge dimensions - foreignObject will handle the layout
                  const estimatedWidth = 200; // Generous width, HTML will size itself
                  const badgeHeight = BADGE_HEIGHT;

                  // Calculate offset and arrow positioning based on tip edge and offset
                  // The arrow tip is locked at arrowCoordinates, and the badge extends from it
                  let offsetX = 0;
                  let offsetY = 0;
                  let arrowBeforeStyle: React.CSSProperties = {};
                  let arrowAfterStyle: React.CSSProperties = {};
                  let containerClass = "";

                  const baseArrowStyle = {
                    position: "absolute" as const,
                    width: 0,
                    height: 0,
                    background: "transparent",
                  };

                  switch (location.tipEdge) {
                    case "top":
                      // Arrow tip at top, badge extends downward
                      offsetY = ARROW_SIZE;
                      offsetX = -estimatedWidth / 2 - location.tipOffset; // Compensate for tipOffset so arrow stays fixed
                      containerClass = "pt-1.5";
                      // Arrow on top edge, positioned at tipOffset pixels from center (pointing up)
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        top: 0,
                        left: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, -100%)",
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderBottom: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        top: "1.5px",
                        left: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, -100%)",
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderBottom: "7px solid #080F2C",
                      };
                      break;
                    case "bottom":
                      // Arrow tip at bottom, badge extends upward
                      offsetY = -(badgeHeight + ARROW_SIZE);
                      offsetX = -estimatedWidth / 2 - location.tipOffset; // Compensate for tipOffset so arrow stays fixed
                      containerClass = "pb-1.5";
                      // Arrow on bottom edge, positioned at tipOffset pixels from center (pointing down)
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        bottom: 0,
                        left: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, 100%)",
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        bottom: "1.5px",
                        left: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, 100%)",
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderTop: "7px solid #080F2C",
                      };
                      break;
                    case "left":
                      // Arrow tip at left, badge extends rightward
                      offsetX = ARROW_SIZE;
                      offsetY = -badgeHeight / 2 - location.tipOffset; // Compensate for tipOffset so arrow stays fixed
                      containerClass = "pl-1.5";
                      // Arrow on left edge, positioned at tipOffset pixels from center (pointing left)
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        left: 0,
                        top: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-100%, -50%)",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        left: "1.5px",
                        top: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-100%, -50%)",
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        borderRight: "7px solid #080F2C",
                      };
                      break;
                    case "right":
                      // Arrow tip at right, badge extends leftward
                      offsetX = -(estimatedWidth + ARROW_SIZE);
                      offsetY = -badgeHeight / 2 - location.tipOffset; // Compensate for tipOffset so arrow stays fixed
                      containerClass = "pr-1.5";
                      // Arrow on right edge, positioned at tipOffset pixels from center (pointing right)
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        right: 0,
                        top: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(100%, -50%)",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        right: "1.5px",
                        top: `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(100%, -50%)",
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        borderLeft: "7px solid #080F2C",
                      };
                      break;
                  }

                  return (
                    <Marker
                      key={`badge-${location.name}`}
                      coordinates={location.arrowCoordinates}
                    >
                      <foreignObject
                        x={offsetX}
                        y={offsetY}
                        width={estimatedWidth}
                        height={badgeHeight + 12}
                        transform={`scale(${responsiveScale / position.zoom})`}
                        style={{ overflow: "visible" }}
                      >
                        <div
                          className={`relative ${containerClass}`}
                          style={{ pointerEvents: "none" }}
                        >
                          <div className="relative inline-flex items-center gap-2 px-2 py-1 bg-[#080F2C] border border-[#323953] rounded-[3px] whitespace-nowrap">
                            {/* Arrow border (outer) - positioned absolutely so it doesn't affect flexbox layout */}
                            <div
                              style={{
                                ...arrowBeforeStyle,
                                pointerEvents: "none",
                              }}
                            />
                            {/* Arrow fill (inner) - positioned absolutely so it doesn't affect flexbox layout */}
                            <div
                              style={{
                                ...arrowAfterStyle,
                                pointerEvents: "none",
                              }}
                            />

                            <span className="text-white text-md font-semibold tracking-[0.01em]">
                              {location.name}
                            </span>
                            <SignalBar
                              state={signalState}
                              pollingBar={pollingBar}
                              pixelSize={2.75}
                            />
                            <span className="text-white text-md font-minecraft font-normal">
                              {pingText}
                            </span>
                          </div>
                        </div>
                      </foreignObject>
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

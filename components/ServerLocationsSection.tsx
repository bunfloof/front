"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
    arrowCoordinates: [-118.2437, 34.0521], // Arrow tip locked here
    tipEdge: "right", // Arrow on right edge of badge
    tipOffset: 0, // Centered on that edge
    websocketUrl: "wss://losangeles.ca.speedtest.frontier.com:8080/ws",
  },
  {
    name: "Dallas",
    coordinates: [-96.8066, 32.7767],
    arrowCoordinates: [-96.8066, 32.7767 + 0.4222], // Arrow tip locked here
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
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Store websockets in a ref so we can access them for cleanup and retry
  const websocketsRef = useRef<Record<string, WebSocket>>({});

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
          return 3; // Bounce back immediately to avoid displaying bar 4 twice
        }
        if (next < 0) {
          setPollingDirection(1);
          return 1; // Bounce back immediately to avoid skipping bar 0
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [pollingDirection]);

  // Function to start/restart ping measurements
  const startPingMeasurements = useCallback(() => {
    // Reset all pings to null (polling state)
    const initialPings: Record<string, number | null> = {};
    locations.forEach((location) => {
      initialPings[location.name] = null;
    });
    setPings(initialPings);

    // Clean up existing websockets if any
    Object.values(websocketsRef.current).forEach((ws) => {
      if ((ws as any)._pingInterval) {
        clearInterval((ws as any)._pingInterval);
      }
      ws.close();
    });
    websocketsRef.current = {};

    // Create new websockets
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

    websocketsRef.current = websockets;
  }, []);

  // WebSocket ping measurement for each location - initialize on mount
  useEffect(() => {
    startPingMeasurements();

    return () => {
      // Cleanup websockets on unmount
      Object.values(websocketsRef.current).forEach((ws) => {
        if ((ws as any)._pingInterval) {
          clearInterval((ws as any)._pingInterval);
        }
        ws.close();
      });
    };
  }, [startPingMeasurements]);

  const handleLocationClick = (location: Location) => {
    // Offset the coordinates to the right to account for the overlay card on the left
    // Longitude offset: positive moves west, negative moves east
    const longitudeOffset = -15; // Adjust based on zoom level for better centering

    // Enable smooth transition
    setIsTransitioning(true);

    // Smoothly transition to the new position
    const startPosition = { ...position };
    const endPosition = {
      coordinates: [
        location.coordinates[0] + longitudeOffset,
        location.coordinates[1],
      ] as [number, number],
      zoom: 4,
    };

    const duration = 250; // 1 second
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-in-out)
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setPosition({
        coordinates: [
          startPosition.coordinates[0] +
            (endPosition.coordinates[0] - startPosition.coordinates[0]) * eased,
          startPosition.coordinates[1] +
            (endPosition.coordinates[1] - startPosition.coordinates[1]) * eased,
        ],
        zoom:
          startPosition.zoom + (endPosition.zoom - startPosition.zoom) * eased,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section>
      {/* Full-width map container */}
      <div className="w-full">
        <div className="relative w-full h-[600px] bg-black overflow-hidden border border-gray-800 select-none">
          {/* Map Section - Full Width */}
          <div className="w-full h-full bg-[#080F2C] select-none">
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
                  // Only update position if user is manually dragging (not during our custom animation)
                  if (!isTransitioning) {
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
                  }
                }}
              >
                {/* Transparent rectangle to capture mouse events everywhere on the map */}
                <rect
                  x="-1000"
                  y="-1000"
                  width="2000"
                  height="2000"
                  fill="transparent"
                  style={{ cursor: "grab" }}
                />
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
                        r={12}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        className="animate-ping"
                        style={{
                          animationDuration: "2s",
                        }}
                      />
                      {/* Static inner dot */}
                      <circle r={6} fill="#60a5fa" />
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
                  let badgeAlignment = ""; // Controls which direction the badge expands

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
                      offsetX = -estimatedWidth / 2; // Always center the container
                      containerClass = "pt-1.5";
                      badgeAlignment = "center"; // Centered horizontally
                      // Arrow on top edge, positioned at tipOffset pixels from center (pointing up)
                      // Use percentage-based positioning that's immune to zoom changes
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        top: 0,
                        left:
                          location.tipOffset === 0
                            ? "50%"
                            : `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, -100%)",
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderBottom: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        top: "1.5px",
                        left:
                          location.tipOffset === 0
                            ? "50%"
                            : `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, -100%)",
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderBottom: "7px solid #080F2C",
                      };
                      break;
                    case "bottom":
                      // Arrow tip at bottom, badge extends upward
                      offsetY = -(badgeHeight + ARROW_SIZE);
                      offsetX = -estimatedWidth / 2; // Always center the container
                      containerClass = "pb-1.5";
                      badgeAlignment = "center"; // Centered horizontally
                      // Arrow on bottom edge, positioned at tipOffset pixels from center (pointing down)
                      // Use percentage-based positioning that's immune to zoom changes
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        bottom: 0,
                        left:
                          location.tipOffset === 0
                            ? "50%"
                            : `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, 100%)",
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        bottom: "1.5px",
                        left:
                          location.tipOffset === 0
                            ? "50%"
                            : `calc(50% + ${location.tipOffset}px)`,
                        transform: "translate(-50%, 100%)",
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderTop: "7px solid #080F2C",
                      };
                      break;
                    case "left":
                      // Arrow tip at left, badge extends rightward
                      offsetX = ARROW_SIZE;
                      offsetY = -badgeHeight / 2; // Always center the container
                      containerClass = "pl-1.5";
                      badgeAlignment = "flex-start"; // Badge expands to the right
                      // Arrow on left edge, positioned at tipOffset pixels from center (pointing left)
                      // Use fixed pixel positioning instead of percentage to prevent movement when badge width changes
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        left: 0,
                        top: `${badgeHeight / 2 + location.tipOffset}px`,
                        transform: "translate(-100%, -50%)",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        left: "1.5px",
                        top: `${badgeHeight / 2 + location.tipOffset}px`,
                        transform: "translate(-100%, -50%)",
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        borderRight: "7px solid #080F2C",
                      };
                      break;
                    case "right":
                      // Arrow tip at right, badge extends leftward
                      offsetX = -(estimatedWidth + ARROW_SIZE);
                      offsetY = -badgeHeight / 2; // Always center the container
                      containerClass = "pr-1.5";
                      badgeAlignment = "flex-end"; // Badge expands to the left
                      // Arrow on right edge, positioned at tipOffset pixels from center (pointing right)
                      // Use fixed pixel positioning instead of percentage to prevent movement when badge width changes
                      arrowBeforeStyle = {
                        ...baseArrowStyle,
                        right: 0,
                        top: `${badgeHeight / 2 + location.tipOffset}px`,
                        transform: "translate(100%, -50%)",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "8px solid #323953",
                      };
                      arrowAfterStyle = {
                        ...baseArrowStyle,
                        right: "1.5px",
                        top: `${badgeHeight / 2 + location.tipOffset}px`,
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
                        style={{ overflow: "visible", pointerEvents: "none" }}
                      >
                        <div
                          className={`relative ${containerClass}`}
                          style={{
                            pointerEvents: "none",
                            width: `${estimatedWidth}px`,
                          }}
                        >
                          <div
                            className="relative inline-flex items-center gap-2 px-2 py-1 bg-[#080F2C] border border-[#323953] rounded-[3px] whitespace-nowrap select-none"
                            style={{
                              position: "absolute",
                              pointerEvents: "none",
                              userSelect: "none",
                              ...(badgeAlignment === "flex-end"
                                ? { right: 0 }
                                : badgeAlignment === "center"
                                ? { left: "50%", transform: "translateX(-50%)" }
                                : { left: 0 }),
                            }}
                          >
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

                            <span
                              className="text-white text-md font-semibold tracking-[0.01em] select-none"
                              style={{
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
                            >
                              {location.name}
                            </span>
                            <div style={{ pointerEvents: "none" }}>
                              <SignalBar
                                state={signalState}
                                pollingBar={pollingBar}
                                pixelSize={2.75}
                              />
                            </div>
                            <span
                              className="text-white text-md font-minecraft font-normal select-none"
                              style={{
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
                            >
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

          {/* Hero Overlay - Left aligned with gradient */}
          <div className="absolute top-0 left-0 h-full w-full flex items-center pointer-events-none bg-gradient-to-r from-[#080F2C] from-20% via-[#080F2C]/60 via-40% to-transparent to-60%">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 pointer-events-none">
              <div className="max-w-xl pointer-events-auto">
                <div className="pr-6 md:pr-8 lg:pr-12">
                  {/* Hero Header */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight text-white mb-6 leading-tight">
                    7 global server locations
                  </h1>

                  {/* Location Links */}
                  <div className="space-y-4">
                    <p className="text-gray-300 text-base md:text-lg mb-4">
                      Our servers around the world provide the lowest ping for
                      your players.
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {locations.map((location) => {
                        const ping = pings[location.name];
                        const signalState = pingToSignalState(ping);
                        const pingText =
                          ping === null
                            ? "..."
                            : ping < 0
                            ? "ERR"
                            : `${Math.round(ping)}ms`;

                        return (
                          <button
                            key={location.name}
                            onClick={() => handleLocationClick(location)}
                            className="group relative inline-flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400 rounded-lg text-white transition-all duration-200 font-medium cursor-pointer"
                          >
                            <span className="text-sm md:text-base">
                              {location.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <SignalBar
                                state={signalState}
                                pollingBar={pollingBar}
                                pixelSize={2.5}
                              />
                              <span className="text-xs md:text-sm font-mono text-gray-400 group-hover:text-white transition-colors">
                                {pingText}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                      <button
                        onClick={startPingMeasurements}
                        className="text-sky-400 cursor-pointer hover:text-sky-300 transition-colors"
                      >
                        Retry ping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

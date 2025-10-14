"use client";

import { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type TipDirection = "top" | "bottom" | "left" | "right";

interface Location {
  name: string;
  coordinates: [number, number]; // [longitude, latitude] for the dot
  badgeCoordinates: [number, number]; // [longitude, latitude] for where the ARROW TIP should be
  tipDirection: TipDirection; // Direction the tooltip tip points (badge extends from this tip)
}

const locations: Location[] = [
  {
    name: "Los Angeles",
    coordinates: [-118.2437, 34.0522],
    badgeCoordinates: [-118.2437, 28], // Tip positioned here, badge extends downward
    tipDirection: "top", // Tip points upward to the dot
  },
  {
    name: "Irvine",
    coordinates: [-117.8265, 33.6846],
    badgeCoordinates: [-112, 33.6846], // Tip positioned here, badge extends rightward
    tipDirection: "left", // Tip points left to the dot
  },
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    badgeCoordinates: [-74.006, 46], // Tip positioned here, badge extends upward
    tipDirection: "bottom", // Tip points downward to the dot
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
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});

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

        <div className="relative w-full h-[500px] bg-black rounded-lg overflow-hidden border border-gray-800 flex">
          {/* Map Section - 4/5 width */}
          <div className="w-4/5 h-full bg-ocean-1">
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
                          stroke="#334155"
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
                    <g transform={`scale(${1.5 / position.zoom})`}>
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
                  // Use measured width, fallback to approximate if not yet measured
                  const badgeWidth =
                    badgeWidths[location.name] || location.name.length * 8 + 16;
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
                          1 / position.zoom
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
                        <text
                          textAnchor="middle"
                          y={4}
                          style={{
                            fill: "#fff",
                            fontSize: "15px",
                            fontWeight: "600",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {location.name}
                        </text>
                      </g>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Sidebar - 1/5 width */}
          <div className="w-1/5 h-full bg-bluey-900 border-l border-gray-800 p-6 flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg mb-2">
              Our Locations
            </h3>
            {locations.map((location) => (
              <button
                key={location.name}
                onClick={() => handleLocationClick(location)}
                className="w-full text-left px-4 py-3 bg-bluey-950 border border-gray-700 rounded-lg text-white hover:bg-gray-800 hover:border-blue-500 transition-all duration-200 font-medium"
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

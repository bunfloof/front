import React from "react";

type SignalState = "none" | "1" | "2" | "3" | "4" | "5" | "polling";

interface SignalBarProps {
  state: SignalState;
  pollingBar?: number;
  pixelSize?: number;
}

export function SignalBar({
  state,
  pollingBar = 0,
  pixelSize = 3,
}: SignalBarProps) {
  const signalStates: Record<
    SignalState,
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

  // Bar heights: 3, 4, 5, 6, 7 pixels
  const barHeights = [3, 4, 5, 6, 7];

  return (
    <div className="flex items-end justify-center">
      {barHeights.map((height, barNum) => {
        // Determine if this bar should be lit
        let isLit;
        if (currentState.animate) {
          isLit = barNum === pollingBar;
        } else {
          isLit = barNum < currentState.bars;
        }

        const fgColor = isLit ? currentState.fg : "#1A1A1A";
        const bgColor = isLit ? currentState.bg : "#2D2D2D";

        return (
          <div
            key={barNum}
            className="relative"
            style={{
              width: `${pixelSize * 2}px`,
              height: `${height * pixelSize}px`,
            }}
          >
            {/* Main color column (left side, from row 2 to top) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: `${pixelSize}px`,
                width: `${pixelSize}px`,
                height: `${(height - 1) * pixelSize}px`,
                backgroundColor: fgColor,
              }}
            />

            {/* Backdrop column (right side, from bottom to second-to-last row) */}
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: `${pixelSize}px`,
                height: `${(height - 1) * pixelSize}px`,
                backgroundColor: bgColor,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// Helper function to convert ping (ms) to signal state
export function pingToSignalState(ping: number | null): SignalState {
  if (ping === null) return "polling";
  if (ping < 0) return "none";
  if (ping <= 150) return "5";
  if (ping <= 300) return "4";
  if (ping <= 600) return "3";
  if (ping <= 1000) return "2";
  return "1";
}

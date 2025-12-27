"use client";

import { useCdnLocation } from "@/hooks/useCdnLocation";

interface CdnLocationBadgeProps {
  isDark?: boolean;
  themed?: boolean;
}

export function CdnLocationBadge({
  isDark = true,
  themed = false,
}: CdnLocationBadgeProps) {
  const { cdnLocation, locationInfo } = useCdnLocation();

  if (!cdnLocation) return null;

  // Themed variant uses CSS variables
  if (themed) {
    return (
      <div
        className="w-full -mt-8 lg:-mt-11 pb-5 text-center text-sm transition-colors duration-300"
        style={{ color: "var(--themed-cdn-text)" }}
      >
        <div className="relative inline-flex group">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-base font-normal cursor-help outline-none touch-manipulation"
            onClick={(e) => e.currentTarget.focus()}
          >
            <GitBranchIcon />
            {`${cdnLocation}-web01`}
          </button>

          {locationInfo && (
            <div
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-2 text-sm rounded-lg w-[300px] max-w-[calc(100vw-2rem)] text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 backdrop-blur-sm"
              style={{
                backgroundColor: "var(--themed-tooltip-bg)",
                color: "var(--themed-tooltip-text)",
                border: "1px solid var(--themed-tooltip-border)",
              }}
            >
              You're georouted to our web server in {locationInfo.city},{" "}
              {locationInfo.country}. We've automatically chosen this location
              to give you the fastest experience possible.
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                style={{ borderTopColor: "var(--themed-tooltip-bg)" }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard variant uses isDark prop
  return (
    <div
      className={`w-full -mt-8 lg:-mt-11 pb-5 text-center text-sm transition-colors duration-300 ${
        isDark ? "text-[#7AC2EB]/50" : "text-gray-400"
      }`}
    >
      <div className="relative inline-flex group">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-base font-normal cursor-help outline-none touch-manipulation"
          onClick={(e) => e.currentTarget.focus()}
        >
          <GitBranchIcon />
          {`${cdnLocation}-web01`}
        </button>

        {locationInfo && (
          <div
            className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-2 text-sm rounded-lg w-[300px] max-w-[calc(100vw-2rem)] text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 backdrop-blur-sm ${
              isDark
                ? "bg-[#0D3A54]/80 text-[#BDE0F5] border border-[#1A77AD]/30"
                : "bg-gray-800/80 text-white"
            }`}
          >
            You're georouted to our web server in {locationInfo.city},{" "}
            {locationInfo.country}. We've automatically chosen this location to
            give you the fastest experience possible.
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
                isDark ? "border-t-[#0D3A54]" : "border-t-gray-800"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function GitBranchIcon() {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
    >
      <path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 87.8c18.8-10.9 40.7-17.1 64-17.1l96 0c35.3 0 64-28.7 64-64l0-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 6.7c0 70.7-57.3 128-128 128l-96 0c-35.3 0-64 28.7-64 64l0 6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-6.7 0-198.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    </svg>
  );
}

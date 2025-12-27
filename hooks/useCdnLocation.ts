"use client";

import { useEffect, useState } from "react";
import airports from "airportsjs";

function getCountryName(countryCode: string): string {
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

export interface CdnLocationInfo {
  city: string;
  country: string;
}

export interface UseCdnLocationReturn {
  cdnLocation: string;
  locationInfo: CdnLocationInfo | null;
}

export function useCdnLocation(): UseCdnLocationReturn {
  const [cdnLocation, setCdnLocation] = useState<string>("");
  const [locationInfo, setLocationInfo] = useState<CdnLocationInfo | null>(
    null
  );

  useEffect(() => {
    async function fetchCdnLocation() {
      try {
        const response = await fetch("https://foxomy.com/cdn-cgi/trace");
        const text = await response.text();

        const lines = text.split("\n");
        let colo = "";
        let loc = "";

        for (const line of lines) {
          if (line.startsWith("colo=")) {
            colo = line.split("=")[1];
          } else if (line.startsWith("loc=")) {
            loc = line.split("=")[1];
          }
        }

        if (loc && colo) {
          setCdnLocation(`${loc.toLowerCase()}-${colo.toLowerCase()}`);

          // Look up the airport/city from the IATA code
          const airportData = airports.lookupByIataCode(colo.toUpperCase());

          setLocationInfo({
            city: airportData?.city || colo,
            country: getCountryName(loc),
          });
        }
      } catch (error) {
        console.error("Failed to fetch CDN location:", error);
      }
    }

    fetchCdnLocation();
  }, []);

  return { cdnLocation, locationInfo };
}

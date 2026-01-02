"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Earth,
  MapPin,
  Building2,
  Wifi,
  Navigation,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import "flag-icons/css/flag-icons.min.css";

// API names for display
const API_DISPLAY_NAMES: Record<string, { name: string; url: string }> = {
  extremeip: { name: "ExtremeIP", url: "https://extreme-ip-lookup.com/" },
  ipinfo: { name: "IPinfo", url: "https://ipinfo.io/" },
  ipregistry: { name: "IPregistry", url: "https://ipregistry.co/" },
  ipstack: { name: "IPstack", url: "https://ipstack.com/" },
  nange: { name: "楠格 (Nan Ge)", url: "https://www.nange.cn/" },
  nordvpn: { name: "NordVPN", url: "https://nordvpn.com/" },
};

// Geolocation data structure
interface GeoData {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  isp: string;
  organization: string;
  latitude: string;
  longitude: string;
}

// WebSocket response structure
interface WSResponse {
  api: string;
  data: Record<string, unknown>;
  id: string;
}

// Parse API response to normalized GeoData
function parseApiResponse(api: string, data: Record<string, unknown>): GeoData {
  const unavailable = "Unavailable";

  switch (api) {
    case "extremeip":
      return {
        ip: String(data.query || unavailable),
        country: String(data.country || unavailable),
        countryCode: String(data.countryCode || ""),
        region: String(data.region || unavailable),
        city: String(data.city || unavailable),
        isp: String(data.isp || unavailable),
        organization: String(data.org || data.asnOrg || unavailable),
        latitude: String(data.lat || unavailable),
        longitude: String(data.lon || unavailable),
      };

    case "ipinfo": {
      const loc = String(data.loc || ",").split(",");
      const asn = data.asn as Record<string, unknown> | undefined;
      return {
        ip: String(data.ip || unavailable),
        country: String(data.country || unavailable),
        countryCode: String(data.country || ""),
        region: String(data.region || unavailable),
        city: String(data.city || unavailable),
        isp: String(asn?.name || unavailable),
        organization: String(asn?.name || unavailable),
        latitude: loc[0] || unavailable,
        longitude: loc[1] || unavailable,
      };
    }

    case "ipregistry": {
      const location = data.location as Record<string, unknown> | undefined;
      const country = location?.country as Record<string, unknown> | undefined;
      const region = location?.region as Record<string, unknown> | undefined;
      const connection = data.connection as Record<string, unknown> | undefined;
      const company = data.company as Record<string, unknown> | undefined;
      return {
        ip: String(data.ip || unavailable),
        country: String(country?.name || unavailable),
        countryCode: String(country?.code || ""),
        region: String(region?.name || unavailable),
        city: String(location?.city || unavailable),
        isp: String(company?.name || unavailable),
        organization: String(connection?.organization || unavailable),
        latitude: String(location?.latitude || unavailable),
        longitude: String(location?.longitude || unavailable),
      };
    }

    case "ipstack": {
      const connection = data.connection as Record<string, unknown> | undefined;
      return {
        ip: String(data.ip || unavailable),
        country: String(data.country_name || unavailable),
        countryCode: String(data.country_code || ""),
        region: String(data.region_name || unavailable),
        city: String(data.city || unavailable),
        isp: String(connection?.isp || unavailable),
        organization: String(connection?.isp || unavailable),
        latitude: String(data.latitude || unavailable),
        longitude: String(data.longitude || unavailable),
      };
    }

    case "nange":
      return {
        ip: String(data.ip || unavailable),
        country: String(data.country || unavailable),
        countryCode: String(data.country_code || ""),
        region: String(data.region || unavailable),
        city: String(data.city || unavailable),
        isp: String(data.isp || unavailable),
        organization: String(data.org || data.isp_org || unavailable),
        latitude: String(data.latitude || unavailable),
        longitude: String(data.longitude || unavailable),
      };

    case "nordvpn":
      return {
        ip: String(data.ip || unavailable),
        country: String(data.country || unavailable),
        countryCode: String(data.country_code || ""),
        region: String(data.region || unavailable),
        city: String(data.city || unavailable),
        isp: String(data.isp || unavailable),
        organization: String(
          (data.host as Record<string, unknown>)?.domain || unavailable
        ),
        latitude: String(data.latitude || unavailable),
        longitude: String(data.longitude || unavailable),
      };

    default:
      return {
        ip: unavailable,
        country: unavailable,
        countryCode: "",
        region: unavailable,
        city: unavailable,
        isp: unavailable,
        organization: unavailable,
        latitude: unavailable,
        longitude: unavailable,
      };
  }
}

// Generate random ID for WebSocket requests
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Country flag component using flagcdn
function CountryFlag({ countryCode }: { countryCode: string }) {
  if (!countryCode || countryCode.length !== 2) return null;

  return (
    <span
      className={`fi fi-${countryCode.toLowerCase()} inline-block ml-2 rounded-sm`}
      style={{ fontSize: "1.2em" }}
      aria-label={countryCode}
    />
  );
}

// Data row component
function DataRow({
  icon: Icon,
  label,
  value,
  countryCode,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  countryCode?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-0.75">
      <div
        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: "var(--themed-nav-hover)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--themed-link)" }} />
      </div>
      <div className="grow min-w-0">
        <span className="text-sm" style={{ color: "var(--themed-text-muted)" }}>
          {label}
        </span>
        <div
          className="font-medium truncate"
          style={{ color: "var(--themed-heading)" }}
        >
          {value}
          {countryCode && <CountryFlag countryCode={countryCode} />}
        </div>
      </div>
    </div>
  );
}

// API result card component
function ApiResultCard({
  apiName,
  apiUrl,
  data,
  loading,
  error,
}: {
  apiName: string;
  apiUrl: string;
  data: GeoData | null;
  loading: boolean;
  error: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--themed-bg-secondary)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--themed-border)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 transition-colors duration-300"
        style={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "var(--themed-border)",
          backgroundColor: "var(--themed-nav-hover)",
        }}
      >
        <h4
          className="font-semibold flex items-center gap-2"
          style={{ color: "var(--themed-heading)" }}
        >
          Geolocation data from{" "}
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--themed-accent)" }}
          >
            {apiName}
          </a>
          {loading && (
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: "var(--themed-link)" }}
            />
          )}
          {!loading && data && (
            <CheckCircle2
              className="w-4 h-4"
              style={{ color: "var(--themed-accent)" }}
            />
          )}
          {!loading && error && (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
        </h4>
      </div>

      {/* Content */}
      <div className="px-5 py-2">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "var(--themed-link)" }}
            />
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center py-8 text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Failed to fetch data</span>
          </div>
        )}

        {data && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div>
              <DataRow icon={Globe} label="IP Address" value={data.ip} />
              <DataRow
                icon={MapPin}
                label="Country"
                value={data.country}
                countryCode={data.countryCode}
              />
              <DataRow icon={MapPin} label="Region" value={data.region} />
              <DataRow icon={Building2} label="City" value={data.city} />
            </div>
            <div>
              <DataRow icon={Wifi} label="ISP" value={data.isp} />
              <DataRow
                icon={Building2}
                label="Organization"
                value={data.organization}
              />
              <DataRow
                icon={Navigation}
                label="Latitude"
                value={data.latitude}
              />
              <DataRow
                icon={Navigation}
                label="Longitude"
                value={data.longitude}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Quick info card for initial display - uses same design as ApiResultCard
function QuickInfoCard({
  data,
  loading,
}: {
  data: GeoData | null;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    if (!data?.ip) return;
    try {
      await navigator.clipboard.writeText(data.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = data.ip;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden max-w-2xl mx-auto transition-colors duration-300"
      style={{
        backgroundColor: "var(--themed-bg-secondary)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--themed-border)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 transition-colors duration-300"
        style={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "var(--themed-border)",
          backgroundColor: "var(--themed-nav-hover)",
        }}
      >
        <h4
          className="font-semibold flex items-center gap-2"
          style={{ color: "var(--themed-heading)" }}
        >
          Your IP Information
          {loading && (
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: "var(--themed-link)" }}
            />
          )}
          {!loading && data && (
            <CheckCircle2
              className="w-4 h-4"
              style={{ color: "var(--themed-accent)" }}
            />
          )}
        </h4>
      </div>

      {/* Content */}
      <div className="px-5 py-2">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "var(--themed-link)" }}
            />
          </div>
        )}

        {data && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div>
              {/* IP Address row with copy button */}
              <div className="flex items-center gap-3 py-0.75">
                <div
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--themed-nav-hover)" }}
                >
                  <Globe
                    className="w-4 h-4"
                    style={{ color: "var(--themed-link)" }}
                  />
                </div>
                <div className="grow min-w-0">
                  <span
                    className="text-sm"
                    style={{ color: "var(--themed-text-muted)" }}
                  >
                    IP Address
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-medium truncate"
                      style={{ color: "var(--themed-heading)" }}
                    >
                      {data.ip}
                    </span>
                    <button
                      onClick={copyIP}
                      className="shrink-0 p-1 rounded-md transition-colors hover:opacity-80 cursor-pointer"
                      title="Copy IP address"
                    >
                      {copied ? (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: "var(--themed-accent)" }}
                        />
                      ) : (
                        <Copy
                          className="w-3.5 h-3.5"
                          style={{ color: "var(--themed-link)" }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <DataRow
                icon={MapPin}
                label="Country"
                value={data.country}
                countryCode={data.countryCode}
              />
              <DataRow icon={MapPin} label="Region" value={data.region} />
              <DataRow icon={Building2} label="City" value={data.city} />
            </div>
            <div>
              <DataRow icon={Wifi} label="ISP" value={data.isp} />
              <DataRow
                icon={Building2}
                label="Organization"
                value={data.organization}
              />
              <DataRow
                icon={Navigation}
                label="Latitude"
                value={data.latitude}
              />
              <DataRow
                icon={Navigation}
                label="Longitude"
                value={data.longitude}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Check if a string is a valid IP address (IPv4 or IPv6)
function isValidIP(str: string): boolean {
  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

  if (ipv4Pattern.test(str)) {
    // Validate each octet is 0-255
    const parts = str.split(".");
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  return ipv6Pattern.test(str);
}

// Resolve info structure
interface ResolveInfo {
  input: string;
  host: string;
  ip: string;
  all_ipv4?: string[];
  all_ipv6?: string[];
}

function IPGeolocationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userIP, setUserIP] = useState<string>("");
  const [searchIP, setSearchIP] = useState<string>("");
  const [quickData, setQuickData] = useState<GeoData | null>(null);
  const [quickLoading, setQuickLoading] = useState(true);
  const [apiResults, setApiResults] = useState<
    Record<string, { data: GeoData | null; loading: boolean; error: boolean }>
  >({});
  const [wsConnected, setWsConnected] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [resolveInfo, setResolveInfo] = useState<ResolveInfo | null>(null);
  const [resolveError, setResolveError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pendingRequestsRef = useRef<Map<string, string>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const quickLookupIdRef = useRef<string | null>(null);
  const userIPRef = useRef<string | null>(null);
  const needsQuickLookupRef = useRef(true);
  const urlLookupDoneRef = useRef(false);

  // Connect to WebSocket
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket("wss://ipgeows.foxomy.com");

      ws.onopen = () => {
        setWsConnected(true);
        reconnectAttemptsRef.current = 0;

        // Set up ping every 2 minutes
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
          }
        }, 120000); // 2 minutes

        // If we have the user's IP and haven't completed quick lookup, query now
        if (userIPRef.current && needsQuickLookupRef.current) {
          needsQuickLookupRef.current = false;
          const id = generateId();
          quickLookupIdRef.current = id;
          ws.send(
            JSON.stringify({ api: "nordvpn", ip: userIPRef.current, id })
          );

          // Set timeout for quick lookup
          setTimeout(() => {
            if (quickLookupIdRef.current === id) {
              quickLookupIdRef.current = null;
              setQuickLoading(false);
              setQuickData({
                ip: userIPRef.current || "",
                country: "Unavailable",
                countryCode: "",
                region: "Unavailable",
                city: "Unavailable",
                isp: "Unavailable",
                organization: "Unavailable",
                latitude: "Unavailable",
                longitude: "Unavailable",
              });
            }
          }, 10000);
        }
      };

      ws.onmessage = (event) => {
        try {
          // Handle pong response
          if (event.data === "pong") return;

          const response: WSResponse = JSON.parse(event.data);
          const { api, data, id } = response;

          // Check if this is the quick lookup response
          if (id === quickLookupIdRef.current && api === "nordvpn") {
            quickLookupIdRef.current = null;
            needsQuickLookupRef.current = false;
            const parsedData = parseApiResponse(api, data);
            setQuickData(parsedData);
            setQuickLoading(false);
            return;
          }

          // Check if this response matches a pending request
          const requestedApi = pendingRequestsRef.current.get(id);
          if (requestedApi && requestedApi === api) {
            pendingRequestsRef.current.delete(id);
            const parsedData = parseApiResponse(api, data);
            setApiResults((prev) => ({
              ...prev,
              [api]: { data: parsedData, loading: false, error: false },
            }));
          }
        } catch {
          // Ignore parse errors
        }
      };

      ws.onerror = () => {
        setWsConnected(false);
      };

      ws.onclose = () => {
        setWsConnected(false);
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }

        // Auto-reconnect with exponential backoff
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current),
          30000
        );
        reconnectAttemptsRef.current++;

        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, delay);
      };

      wsRef.current = ws;
    } catch {
      // Connection failed, will retry
    }
  }, []);

  // Query all APIs via WebSocket
  const queryAllApis = useCallback(
    (ip: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        connectWebSocket();
        return;
      }

      const apis = [
        "extremeip",
        "ipinfo",
        "ipregistry",
        "ipstack",
        "nange",
        "nordvpn",
      ];

      // Set all to loading state
      const initialState: Record<
        string,
        { data: GeoData | null; loading: boolean; error: boolean }
      > = {};
      apis.forEach((api) => {
        initialState[api] = { data: null, loading: true, error: false };
      });
      setApiResults(initialState);

      // Send requests for all APIs
      apis.forEach((api) => {
        const id = generateId();
        pendingRequestsRef.current.set(id, api);

        wsRef.current?.send(JSON.stringify({ api, ip, id }));

        // Set timeout for each request
        setTimeout(() => {
          if (pendingRequestsRef.current.has(id)) {
            pendingRequestsRef.current.delete(id);
            setApiResults((prev) => ({
              ...prev,
              [api]: { data: null, loading: false, error: true },
            }));
          }
        }, 15000); // 15 second timeout
      });
    },
    [connectWebSocket]
  );

  // Query quick geolocation via WebSocket
  const queryQuickGeo = useCallback((ip: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      // WebSocket not ready, will retry when connected
      return false;
    }

    needsQuickLookupRef.current = false;
    const id = generateId();
    quickLookupIdRef.current = id;

    wsRef.current.send(JSON.stringify({ api: "nordvpn", ip, id }));

    // Set timeout for quick lookup
    setTimeout(() => {
      if (quickLookupIdRef.current === id) {
        quickLookupIdRef.current = null;
        setQuickLoading(false);
        // Set minimal data with just the IP
        setQuickData({
          ip: ip,
          country: "Unavailable",
          countryCode: "",
          region: "Unavailable",
          city: "Unavailable",
          isp: "Unavailable",
          organization: "Unavailable",
          latitude: "Unavailable",
          longitude: "Unavailable",
        });
      }
    }, 10000); // 10 second timeout

    return true;
  }, []);

  // Fetch user's IP on mount
  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://foxomy.com/cdn-cgi/trace");
        const text = await response.text();

        // Parse the key=value format to extract the IP
        const ip = text
          .split("\n")
          .find((line) => line.startsWith("ip="))
          ?.split("=")[1];

        if (!ip) {
          throw new Error("Could not parse IP from response");
        }

        setUserIP(ip);
        userIPRef.current = ip;

        // Try to query quick geo if websocket is ready
        if (!queryQuickGeo(ip)) {
          // WebSocket not ready, it will be queried when connected
        }
      } catch {
        setQuickLoading(false);
      }
    };

    fetchUserIP();
  }, [queryQuickGeo]);

  // Connect WebSocket on mount
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  // Auto-lookup IP from URL parameter when WebSocket is connected
  useEffect(() => {
    const urlIP = searchParams.get("ip");

    const performLookup = async () => {
      if (!urlIP || !wsConnected || urlLookupDoneRef.current) return;

      urlLookupDoneRef.current = true;
      setSearchIP(urlIP);
      setHasSearched(true);
      setResolveInfo(null);
      setResolveError(null);

      // Check if input is already a valid IP
      if (isValidIP(urlIP)) {
        queryAllApis(urlIP);
        return;
      }

      // Input is not an IP - try to resolve it as a domain
      setIsResolving(true);

      try {
        const response = await fetch(
          `https://fur1.foxomy.com/rustapps/ipgeolocation/resolve?domain=${encodeURIComponent(
            urlIP
          )}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to resolve domain");
        }

        const data: ResolveInfo = await response.json();
        setResolveInfo(data);
        setIsResolving(false);
        queryAllApis(data.ip);
      } catch (error) {
        setIsResolving(false);
        setResolveError(
          error instanceof Error ? error.message : "Failed to resolve domain"
        );
      }
    };

    performLookup();
  }, [searchParams, wsConnected, queryAllApis]);

  // Handle search
  // Update URL with the search parameter
  const updateUrlParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("ip", value);
      } else {
        params.delete("ip");
      }
      router.replace(`/ipgeolocation?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = searchIP.trim();
    if (!input) return;

    // Update URL with the search query
    updateUrlParam(input);

    // Reset previous resolve info
    setResolveInfo(null);
    setResolveError(null);

    // Check if input is already a valid IP
    if (isValidIP(input)) {
      setHasSearched(true);
      queryAllApis(input);
      return;
    }

    // Input is not an IP - try to resolve it as a domain
    setIsResolving(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://fur1.foxomy.com/rustapps/ipgeolocation/resolve?domain=${encodeURIComponent(
          input
        )}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to resolve domain");
      }

      const data: ResolveInfo = await response.json();
      setResolveInfo(data);
      setIsResolving(false);

      // Query using the resolved IP
      queryAllApis(data.ip);
    } catch (error) {
      setIsResolving(false);
      setResolveError(
        error instanceof Error ? error.message : "Failed to resolve domain"
      );
    }
  };

  // Handle search my IP
  const handleSearchMyIP = () => {
    if (!userIP) return;
    setSearchIP(userIP);
    setHasSearched(true);
    setResolveInfo(null);
    setResolveError(null);
    updateUrlParam(userIP);
    queryAllApis(userIP);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-4 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-8"
            >
              <Earth
                className="w-16 h-16"
                style={{ color: "var(--themed-heading)" }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300"
              style={{ color: "var(--themed-heading)" }}
            >
              IP Location Lookup
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mb-4 transition-colors duration-300"
              style={{ color: "var(--themed-text-muted)" }}
            >
              Look up geolocation data for any IP address using multiple APIs
              because I don't the ads and miners on iplocation.net.
            </motion.p>

            {/* Connection status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm"
            >
              <span style={{ color: "var(--themed-text-muted)" }}>
                {wsConnected ? "Websocket:" : "Connecting..."}
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: wsConnected
                    ? "var(--themed-accent)"
                    : "#ef4444",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section
        className="relative py-4 transition-colors duration-300"
        style={{ backgroundColor: "var(--themed-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-3">
                <div className="grow relative">
                  <input
                    type="text"
                    value={searchIP}
                    onChange={(e) => setSearchIP(e.target.value)}
                    placeholder="Enter an IP address or domain to lookup..."
                    className="w-full px-5 py-4 rounded-xl transition-colors duration-300 focus:outline-none"
                    style={{
                      backgroundColor: "var(--themed-bg-secondary)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "var(--themed-border)",
                      color: "var(--themed-heading)",
                    }}
                  />
                  <Search
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--themed-text-muted)" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!wsConnected || !searchIP.trim()}
                  className="px-6 py-4 font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    backgroundColor:
                      wsConnected && searchIP.trim()
                        ? "var(--themed-accent)"
                        : "var(--themed-border)",
                    color:
                      wsConnected && searchIP.trim()
                        ? "var(--themed-bg)"
                        : "var(--themed-text-muted)",
                  }}
                >
                  Lookup
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={handleSearchMyIP}
                disabled={!wsConnected || !userIP}
                className="flex items-center gap-2 transition-colors text-sm cursor-pointer disabled:cursor-not-allowed"
                style={{
                  color:
                    wsConnected && userIP
                      ? "var(--themed-link)"
                      : "var(--themed-text-muted)",
                  opacity: wsConnected && userIP ? 1 : 0.5,
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Lookup my IP ({userIP || "..."})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section - only shown before search */}
      <AnimatePresence>
        {!hasSearched && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-6 transition-colors duration-300"
            style={{ backgroundColor: "var(--themed-bg)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <QuickInfoCard data={quickData} loading={quickLoading} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Resolve Info Section */}
      <AnimatePresence>
        {hasSearched && (isResolving || resolveInfo || resolveError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4"
          >
            <div
              className="rounded-xl p-4 transition-colors duration-300"
              style={{
                backgroundColor: "var(--themed-bg-secondary)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "var(--themed-border)",
              }}
            >
              {isResolving && (
                <div className="flex items-center gap-3">
                  <Loader2
                    className="w-5 h-5 animate-spin"
                    style={{ color: "var(--themed-link)" }}
                  />
                  <span style={{ color: "var(--themed-text)" }}>
                    Resolving domain...
                  </span>
                </div>
              )}

              {resolveError && !isResolving && (
                <div className="flex items-center gap-3">
                  <AlertCircle
                    className="w-5 h-5"
                    style={{ color: "#ef4444" }}
                  />
                  <span style={{ color: "#ef4444" }}>{resolveError}</span>
                </div>
              )}

              {resolveInfo && !isResolving && !resolveError && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="w-5 h-5 shrink-0"
                      style={{ color: "#22c55e" }}
                    />
                    <span style={{ color: "var(--themed-text)" }}>
                      Resolved{" "}
                      <span
                        className="font-mono font-semibold"
                        style={{ color: "var(--themed-heading)" }}
                      >
                        {resolveInfo.host}
                      </span>{" "}
                      to{" "}
                      <span
                        className="font-mono font-semibold"
                        style={{ color: "var(--themed-link)" }}
                      >
                        {resolveInfo.ip}
                      </span>
                    </span>
                  </div>

                  {/* Show all resolved IPs if there are multiple */}
                  {resolveInfo.all_ipv4 && resolveInfo.all_ipv4.length > 1 && (
                    <div
                      className="text-sm pl-7"
                      style={{ color: "var(--themed-text-muted)" }}
                    >
                      All IPv4:{" "}
                      <span className="font-mono">
                        {resolveInfo.all_ipv4.join(", ")}
                      </span>
                    </div>
                  )}
                  {resolveInfo.all_ipv6 && resolveInfo.all_ipv6.length > 0 && (
                    <div
                      className="text-sm pl-7"
                      style={{ color: "var(--themed-text-muted)" }}
                    >
                      IPv6:{" "}
                      <span className="font-mono">
                        {resolveInfo.all_ipv6.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {hasSearched && !resolveError && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-4 transition-colors duration-300"
            style={{ backgroundColor: "var(--themed-bg)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(API_DISPLAY_NAMES).map(
                  ([apiKey, { name, url }]) => {
                    const result = apiResults[apiKey] || {
                      data: null,
                      loading: true,
                      error: false,
                    };
                    return (
                      <ApiResultCard
                        key={apiKey}
                        apiName={name}
                        apiUrl={url}
                        data={result.data}
                        loading={result.loading}
                        error={result.error}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Spacer before footer */}
      <div className="h-12" />

      <ThemedFooter />
    </div>
  );
}

export default function IPGeolocationPage() {
  return (
    <Suspense fallback={null}>
      <IPGeolocationContent />
    </Suspense>
  );
}

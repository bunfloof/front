"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { motion, AnimatePresence } from "motion/react";
import {
  Server,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Users,
  Globe,
  Hash,
  Network,
  Cpu,
} from "lucide-react";
import { SignalBar, pingToSignalState } from "@/components/SignalBar";
import { autoToHTML } from "@sfirew/minecraft-motd-parser";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

// Default Minecraft server icon
const DEFAULT_SERVER_ICON = "/imgs/minecraftserverstatus/defaulticon.png";

// Generate random ID for WebSocket requests
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Server data structure from ping response
interface ServerData {
  id: string;
  description: string;
  favicon: string | null;
  host: string;
  latency: number;
  players: {
    max: number;
    online: number;
    sample?: Array<{ name: string; id: string }>;
  };
  port: number;
  srvRecord: { host: string; port: number } | null;
  version: {
    name: string;
    protocol: number;
  };
}

// Live update data structure from subscribe response
interface LiveData {
  id: string;
  server: string;
  latency: number | null;
  players: {
    online: number;
    max: number;
  } | null;
  error?: string;
}

// Graph data point
interface GraphPoint {
  timestamp: number;
  value: number;
}

// Data row component
function DataRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
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
        </div>
      </div>
    </div>
  );
}

// Format timestamp as HH:MM:SS
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// Chart.js line graph component
function LiveGraph({
  data,
  label,
  color,
  unit,
  maxPoints = 60,
}: {
  data: GraphPoint[];
  label: string;
  color: string;
  unit: string;
  maxPoints?: number;
}) {
  const displayData = data.slice(-maxPoints);

  if (displayData.length < 2) {
    return (
      <div
        className="rounded-xl p-4 h-64 flex items-center justify-center"
        style={{
          backgroundColor: "var(--themed-bg-secondary)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--themed-border)",
        }}
      >
        <span style={{ color: "var(--themed-text-muted)" }}>
          Waiting for {label.toLowerCase()} data...
        </span>
      </div>
    );
  }

  const values = displayData.map((d) => Math.round(d.value));
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const currentValue = Math.round(
    displayData[displayData.length - 1]?.value ?? 0
  );

  // Generate time labels (actual timestamps)
  const chartData = {
    labels: displayData.map((d) => formatTime(d.timestamp)),
    datasets: [
      {
        label: label,
        data: values,
        fill: true,
        backgroundColor: `${color}33`,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        tension: 0, // No curve - straight lines
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: Array<{ label: string }>) => {
            return context[0]?.label ?? "";
          },
          label: (context: { parsed: { y: number | null } }) => {
            const val = Math.round(context.parsed.y ?? 0);
            return `${val.toLocaleString()} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 10,
          },
          maxTicksLimit: 6,
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 10,
          },
          maxTicksLimit: 5,
          stepSize: 1,
          callback: function (value: string | number) {
            if (typeof value === "number") {
              return Math.round(value).toLocaleString();
            }
            return value;
          },
        },
        min: Math.max(0, Math.floor(minVal - range * 0.1)),
        max: Math.ceil(maxVal + range * 0.1),
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: "var(--themed-bg-secondary)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--themed-border)",
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--themed-heading)" }}
        >
          {label}
        </span>
        <span className="text-lg font-bold" style={{ color }}>
          {currentValue.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-48">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div
        className="flex justify-between text-xs mt-1"
        style={{ color: "var(--themed-text-muted)" }}
      >
        <span>
          Min: {minVal.toLocaleString()} {unit}
        </span>
        <span>
          Max: {maxVal.toLocaleString()} {unit}
        </span>
      </div>
    </div>
  );
}

// Server preview card (Minecraft multiplayer list style)
function ServerPreviewCard({
  serverData,
  liveData,
  displayAddress,
  loading,
  error,
  pollingBar,
}: {
  serverData: ServerData | null;
  liveData: LiveData | null;
  displayAddress: string;
  loading: boolean;
  error: string | null;
  pollingBar: number;
}) {
  // Use live data if available, otherwise use initial server data
  const currentPlayers =
    liveData?.players?.online ?? serverData?.players.online ?? 0;
  const maxPlayers = liveData?.players?.max ?? serverData?.players.max ?? 0;
  const currentLatency = liveData?.latency ?? serverData?.latency ?? null;
  const signalState = pingToSignalState(currentLatency);

  // Parse MOTD to HTML
  const motdHtml = serverData?.description
    ? autoToHTML(serverData.description)
    : "";

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
          Server Status
          {loading && (
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: "var(--themed-link)" }}
            />
          )}
          {!loading && serverData && !error && (
            <CheckCircle2
              className="w-4 h-4"
              style={{ color: "var(--themed-accent)" }}
            />
          )}
          {error && <AlertCircle className="w-4 h-4 text-red-400" />}
        </h4>
      </div>

      {/* Content */}
      <div className="p-5">
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
            <span>{error}</span>
          </div>
        )}

        {serverData && !loading && !error && (
          <div
            className="flex gap-4 p-4 rounded-lg"
            style={{
              backgroundImage:
                "url('/imgs/minecraftserverstatus/Dirt_background_BE2.png')",
              backgroundRepeat: "repeat",
              imageRendering: "pixelated",
              fontFamily: "var(--font-minecraft)",
            }}
          >
            {/* Server Icon */}
            <div className="shrink-0">
              <div
                className="rounded overflow-hidden"
                style={{
                  width: "64px",
                  height: "64px",
                  imageRendering: "pixelated",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={serverData.favicon || DEFAULT_SERVER_ICON}
                  alt="Server Icon"
                  width={64}
                  height={64}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </div>

            {/* Server Info */}
            <div className="grow min-w-0 flex flex-col justify-center">
              {/* Top row: Server name and player count */}
              <div className="flex justify-between items-start gap-4">
                <div
                  className="text-white truncate"
                  style={{
                    textShadow: "2px 2px 0px #3f3f3f",
                    lineHeight: "1.4em",
                  }}
                >
                  {displayAddress}
                </div>
                <div
                  className="shrink-0 flex items-center gap-2"
                  style={{
                    color: "#AAAAAA",
                    textShadow: "2px 2px 0px #2a2a2a",
                  }}
                >
                  <span>
                    {currentPlayers.toLocaleString()}/
                    {maxPlayers.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>
                      {currentLatency !== null ? `${currentLatency} ms` : "..."}
                    </span>
                    <SignalBar
                      state={loading ? "polling" : signalState}
                      pollingBar={pollingBar}
                      pixelSize={2}
                    />
                  </span>
                </div>
              </div>

              {/* MOTD - preserve whitespace */}
              <div
                className="overflow-x-auto"
                style={{
                  lineHeight: "1.5em",
                  color: "#AAAAAA",
                  textShadow: "2px 2px 0px #2a2a2a",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: motdHtml }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Server details card
function ServerDetailsCard({
  serverData,
  loading,
}: {
  serverData: ServerData | null;
  loading: boolean;
}) {
  if (loading || !serverData) return null;

  // Safely get player samples
  const playerSamples = serverData.players.sample ?? [];

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
          Server Details
        </h4>
      </div>

      {/* Content */}
      <div className="px-5 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div>
            <DataRow
              icon={Globe}
              label="Host"
              value={
                <a
                  href={`/ipgeolocation?ip=${encodeURIComponent(
                    serverData.host
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "var(--themed-accent)" }}
                >
                  {serverData.host}
                </a>
              }
            />
            <DataRow icon={Hash} label="Port" value={String(serverData.port)} />
            <DataRow
              icon={Network}
              label="SRV Record"
              value={
                serverData.srvRecord
                  ? `${serverData.srvRecord.host}:${serverData.srvRecord.port}`
                  : "None"
              }
            />
          </div>
          <div>
            <DataRow
              icon={Cpu}
              label="Version"
              value={serverData.version.name}
            />
            <DataRow
              icon={Hash}
              label="Protocol"
              value={String(serverData.version.protocol)}
            />
            <DataRow
              icon={Users}
              label="Player Samples"
              value={
                playerSamples.length > 0
                  ? playerSamples.map((p) => p.name).join(", ")
                  : "None"
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MinecraftServerStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchAddress, setSearchAddress] = useState<string>("");
  const [displayAddress, setDisplayAddress] = useState<string>("");
  const [isBedrock, setIsBedrock] = useState<boolean>(false);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingBar, setPollingBar] = useState(0);

  // Graph data
  const [playerHistory, setPlayerHistory] = useState<GraphPoint[]>([]);
  const [latencyHistory, setLatencyHistory] = useState<GraphPoint[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const pendingPingIdRef = useRef<string | null>(null);
  const subscribeIdRef = useRef<string | null>(null);
  const currentServerRef = useRef<{
    address: string;
    port: number;
    bedrock: boolean;
  } | null>(null);
  const urlLookupDoneRef = useRef(false);

  // Parse address into host and port
  const parseAddress = useCallback(
    (addr: string): { host: string; port: number } => {
      const parts = addr.trim().split(":");
      const host = parts[0];
      const port = parts[1]
        ? parseInt(parts[1], 10)
        : isBedrock
        ? 19132
        : 25565;
      return { host, port: isNaN(port) ? (isBedrock ? 19132 : 25565) : port };
    },
    [isBedrock]
  );

  // Connect to WebSocket
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket("wss://dfw1-minecraftping.foxomy.com");

      ws.onopen = () => {
        setWsConnected(true);
        reconnectAttemptsRef.current = 0;

        // Set up ping every 2 minutes to keep connection alive
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
          }
        }, 120000); // 2 minutes
      };

      ws.onmessage = (event) => {
        try {
          // Handle pong response
          if (event.data === "pong") return;

          const response = JSON.parse(event.data);

          // Check if this is a ping response
          if (response.id === pendingPingIdRef.current) {
            pendingPingIdRef.current = null;
            setLoading(false);

            if (response.error) {
              setError(response.error);
              return;
            }

            setServerData(response as ServerData);
            setError(null);

            // Subscribe for live updates
            if (currentServerRef.current && ws.readyState === WebSocket.OPEN) {
              const subId = generateId();
              subscribeIdRef.current = subId;
              ws.send(
                JSON.stringify({
                  action: "subscribe",
                  address: currentServerRef.current.address,
                  port: currentServerRef.current.port,
                  bedrock: currentServerRef.current.bedrock,
                  id: subId,
                })
              );
            }
            return;
          }

          // Check if this is a subscribe response (live update)
          // Match by subscription ID OR by server address (for re-subscriptions to same server)
          const isSubscribeResponse =
            response.id === subscribeIdRef.current ||
            (response.server &&
              currentServerRef.current &&
              response.server ===
                `${currentServerRef.current.address}:${currentServerRef.current.port}`);

          if (isSubscribeResponse && response.server) {
            const live = response as LiveData;

            // Update subscription ID if we got a response for our server
            if (response.id && response.id !== subscribeIdRef.current) {
              subscribeIdRef.current = response.id;
            }

            setLiveData(live);

            // Add to history
            const timestamp = Date.now();
            if (live.players?.online !== undefined) {
              setPlayerHistory((prev) => [
                ...prev.slice(-119), // Keep last 120 points (2 minutes at 1/sec)
                { timestamp, value: live.players!.online },
              ]);
            }
            if (live.latency !== null && live.latency !== undefined) {
              setLatencyHistory((prev) => [
                ...prev.slice(-119),
                { timestamp, value: live.latency! },
              ]);
            }
            return;
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

  // Send ping request
  const sendPing = useCallback(
    (address: string, port: number, bedrock: boolean) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        connectWebSocket();
        return;
      }

      // Check if we're looking up the same server
      const isSameServer =
        currentServerRef.current &&
        currentServerRef.current.address === address &&
        currentServerRef.current.port === port &&
        currentServerRef.current.bedrock === bedrock;

      // Reset state
      setLoading(true);
      setError(null);
      setServerData(null);
      setLiveData(null);

      // Only clear graph data if it's a different server
      if (!isSameServer) {
        setPlayerHistory([]);
        setLatencyHistory([]);
        // Clear old subscription ID only for different servers
        subscribeIdRef.current = null;
      }

      // Store current server info
      currentServerRef.current = { address, port, bedrock };

      // Send ping request
      const id = generateId();
      pendingPingIdRef.current = id;

      wsRef.current.send(
        JSON.stringify({
          action: "ping",
          address,
          port,
          bedrock,
          id,
        })
      );

      // Set timeout
      setTimeout(() => {
        if (pendingPingIdRef.current === id) {
          pendingPingIdRef.current = null;
          setLoading(false);
          setError("Request timed out");
        }
      }, 15000);
    },
    [connectWebSocket]
  );

  // Connect WebSocket on mount
  useEffect(() => {
    connectWebSocket();

    // Polling animation for signal bar
    pollingIntervalRef.current = setInterval(() => {
      setPollingBar((prev) => (prev + 1) % 5);
    }, 200);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  // Auto-lookup from URL parameter
  useEffect(() => {
    const urlAddress = searchParams.get("address");
    const urlBedrock = searchParams.get("bedrock") === "true";

    if (!urlAddress || !wsConnected || urlLookupDoneRef.current) return;

    urlLookupDoneRef.current = true;
    setSearchAddress(urlAddress);
    setDisplayAddress(urlAddress);
    setIsBedrock(urlBedrock);
    setHasSearched(true);

    const { host, port } = parseAddress(urlAddress);
    sendPing(host, port, urlBedrock);
  }, [searchParams, wsConnected, sendPing, parseAddress]);

  // Update URL with search parameters
  const updateUrlParam = useCallback(
    (address: string, bedrock: boolean) => {
      const params = new URLSearchParams();
      if (address) {
        params.set("address", address);
      }
      if (bedrock) {
        params.set("bedrock", "true");
      }
      router.replace(
        `/minecraftserverstatus${
          params.toString() ? `?${params.toString()}` : ""
        }`,
        { scroll: false }
      );
    },
    [router]
  );

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = searchAddress.trim();
    if (!input) return;

    // Set the display address to the searched value (won't change while typing)
    setDisplayAddress(input);
    updateUrlParam(input, isBedrock);
    setHasSearched(true);
    urlLookupDoneRef.current = true;

    const { host, port } = parseAddress(input);
    sendPing(host, port, isBedrock);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300 themed-page"
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
              <Server
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
              Minecraft Server Status
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mb-4 transition-colors duration-300"
              style={{ color: "var(--themed-text-muted)" }}
            >
              Check the status of any Minecraft Java or Bedrock server because I
              don't like how slow mcsrvstat.us is with that Cloudflare
              challenge.
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
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="grow relative">
                  <input
                    type="text"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    placeholder="Enter server address (e.g. mc.hypixel.net)"
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
                  disabled={!wsConnected || !searchAddress.trim()}
                  className="px-6 py-4 font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    backgroundColor:
                      wsConnected && searchAddress.trim()
                        ? "var(--themed-accent)"
                        : "var(--themed-border)",
                    color:
                      wsConnected && searchAddress.trim()
                        ? "var(--themed-bg)"
                        : "var(--themed-text-muted)",
                  }}
                >
                  Lookup
                </button>
              </div>

              {/* Bedrock toggle */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ color: "var(--themed-text-muted)" }}
                >
                  <div
                    className="relative w-11 h-6 rounded-full transition-colors"
                    style={{
                      backgroundColor: isBedrock
                        ? "var(--themed-accent)"
                        : "var(--themed-border)",
                    }}
                    onClick={() => setIsBedrock(!isBedrock)}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                      style={{
                        transform: isBedrock
                          ? "translateX(22px)"
                          : "translateX(2px)",
                      }}
                    />
                  </div>
                  <span>Bedrock Server</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {hasSearched && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-4 transition-colors duration-300"
            style={{ backgroundColor: "var(--themed-bg)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Server Preview Card */}
              <ServerPreviewCard
                serverData={serverData}
                liveData={liveData}
                displayAddress={displayAddress}
                loading={loading}
                error={error}
                pollingBar={pollingBar}
              />

              {/* Server Details Card */}
              <ServerDetailsCard serverData={serverData} loading={loading} />

              {/* Live Graphs */}
              {serverData && !loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LiveGraph
                    data={playerHistory}
                    label="Players Online"
                    color="#00c4aa"
                    unit="players"
                  />
                  <LiveGraph
                    data={latencyHistory}
                    label="Latency"
                    color="#7ac2eb"
                    unit="ms"
                  />
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Quick lookup suggestions when no search */}
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
              <div
                className="max-w-2xl mx-auto rounded-xl p-6 text-center"
                style={{
                  backgroundColor: "var(--themed-bg-secondary)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "var(--themed-border)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--themed-heading)" }}
                >
                  Popular Servers
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "mc.hypixel.net",
                    "play.cubecraft.net",
                    "donutsmp.net",
                    "play.wynncraft.com",
                  ].map((server) => (
                    <button
                      key={server}
                      onClick={() => {
                        setSearchAddress(server);
                        setDisplayAddress(server);
                        setHasSearched(true);
                        urlLookupDoneRef.current = true;
                        const { host, port } = parseAddress(server);
                        updateUrlParam(server, isBedrock);
                        sendPing(host, port, isBedrock);
                      }}
                      className="px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm"
                      style={{
                        backgroundColor: "var(--themed-nav-hover)",
                        color: "var(--themed-link)",
                      }}
                      disabled={!wsConnected}
                    >
                      {server}
                    </button>
                  ))}
                </div>
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

export default function MinecraftServerStatusPage() {
  return (
    <Suspense fallback={null}>
      <MinecraftServerStatusContent />
    </Suspense>
  );
}

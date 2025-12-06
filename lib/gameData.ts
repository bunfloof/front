// Game hosting data - locations, plans, and addons
// This file contains all the configuration for game server hosting

export interface Location {
  codename: string;
  name: string;
  flag: string; // Placeholder flag emoji or path to flag image
  wsUrl: string;
  outOfStock: boolean;
  tier: "premium" | "budget";
  cpu: string;
  pricePerGb: number;
  coordinates: [number, number]; // [longitude, latitude] for map marker
}

export interface Plan {
  id: string;
  locationCode: string;
  ram: number; // in GB
  price: number;
  vCores: number;
  storage: string;
  backupSlots: number;
  containerSplits: number;
  whmcsPid: string;
}

export interface Addon {
  id: string;
  name: string;
  price: string;
  description: string;
  urlParams: string;
}

// Locations available for game hosting
export const locations: Location[] = [
  {
    codename: "dfw-premium",
    name: "Dallas, Texas",
    flag: "🇺🇸",
    wsUrl: "wss://dallas1.cabospeed.com:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900K",
    pricePerGb: 2,
    coordinates: [-96.8066, 32.7767],
  },
  {
    codename: "chi-premium",
    name: "Chicago, Illinois",
    flag: "🇺🇸",
    wsUrl: "wss://speedtest.chi.gigenet.com.prod.hosts.ooklaserver.net:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900K",
    pricePerGb: 2,
    coordinates: [-87.6298, 41.8781],
  },
  {
    codename: "lax-premium",
    name: "Los Angeles, California",
    flag: "🇺🇸",
    wsUrl: "wss://losangeles.ca.speedtest.frontier.com:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900KS",
    pricePerGb: 2,
    coordinates: [-118.2437, 34.0522],
  },
  {
    codename: "nyc-premium",
    name: "New York, New York",
    flag: "🇺🇸",
    wsUrl: "wss://speedtest.is.cc.prod.hosts.ooklaserver.net:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900K",
    pricePerGb: 2,
    coordinates: [-74.006, 40.7128],
  },
  {
    codename: "fra-premium",
    name: "Frankfurt, Germany",
    flag: "🇩🇪",
    wsUrl: "wss://speedtest1.synlinq.de.prod.hosts.ooklaserver.net:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900KS",
    pricePerGb: 2,
    coordinates: [8.6821, 50.1109],
  },
  {
    codename: "hel-premium",
    name: "Helsinki, Finland",
    flag: "🇫🇮",
    wsUrl: "wss://speedtest-hki.retn.net.prod.hosts.ooklaserver.net:8080/ws",
    outOfStock: false,
    tier: "premium",
    cpu: "Intel Core i9-14900K",
    pricePerGb: 2,
    coordinates: [24.9384, 60.1699],
  },
  {
    codename: "hcm-premium",
    name: "Ho Chi Minh, Vietnam",
    flag: "🇻🇳",
    wsUrl: "wss://speedtest.fpt.vn.prod.hosts.ooklaserver.net:8080/ws",
    outOfStock: true,
    tier: "premium",
    cpu: "Intel Core i9-14900KS",
    pricePerGb: 2,
    coordinates: [106.8412, 10.8231],
  },
];

// Plans organized by location - each location has its own unique plans
// Add/modify plans for each location as needed
export const plans: Plan[] = [
  // ============================================
  // Dallas, Texas - Premium ($2/GB)
  // ============================================
  {
    id: "dfw1gb",
    locationCode: "dfw-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "2",
  },
  {
    id: "dfw2gb",
    locationCode: "dfw-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "3",
  },
  {
    id: "dfw4gb",
    locationCode: "dfw-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "5",
  },
  {
    id: "dfw8gb",
    locationCode: "dfw-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "9",
  },
  {
    id: "dfw16gb",
    locationCode: "dfw-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "11",
  },

  // ============================================
  // Chicago, Illinois - Premium ($2/GB)
  // ============================================
  {
    id: "chi1gb",
    locationCode: "chi-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "70",
  },
  {
    id: "chi2gb",
    locationCode: "chi-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "71",
  },
  {
    id: "chi4gb",
    locationCode: "chi-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "73",
  },
  {
    id: "chi8gb",
    locationCode: "chi-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "77",
  },
  {
    id: "chi16gb",
    locationCode: "chi-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "79",
  },

  // ============================================
  // Los Angeles, California - Premium ($2/GB)
  // ============================================
  {
    id: "lax1gb",
    locationCode: "lax-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "83",
  },
  {
    id: "lax2gb",
    locationCode: "lax-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "84",
  },
  {
    id: "lax4gb",
    locationCode: "lax-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "86",
  },
  {
    id: "lax8gb",
    locationCode: "lax-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "90",
  },
  {
    id: "lax16gb",
    locationCode: "lax-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "92",
  },

  // ============================================
  // New York, New York - Premium ($2/GB)
  // ============================================
  {
    id: "nyc1gb",
    locationCode: "nyc-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "96",
  },
  {
    id: "nyc2gb",
    locationCode: "nyc-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "97",
  },
  {
    id: "nyc4gb",
    locationCode: "nyc-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "99",
  },
  {
    id: "nyc8gb",
    locationCode: "nyc-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "103",
  },
  {
    id: "nyc16gb",
    locationCode: "nyc-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "105",
  },

  // ============================================
  // Frankfurt, Germany - Premium ($2/GB)
  // ============================================
  {
    id: "fra1gb",
    locationCode: "fra-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "111",
  },
  {
    id: "fra2gb",
    locationCode: "fra-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "112",
  },
  {
    id: "fra4gb",
    locationCode: "fra-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "114",
  },
  {
    id: "fra8gb",
    locationCode: "fra-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "118",
  },
  {
    id: "fra16gb",
    locationCode: "fra-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "110",
  },

  // ============================================
  // Helsinki, Finland - Premium ($2/GB)
  // ============================================
  {
    id: "hel1gb",
    locationCode: "hel-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "57",
  },
  {
    id: "hel2gb",
    locationCode: "hel-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "58",
  },
  {
    id: "hel4gb",
    locationCode: "hel-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "60",
  },
  {
    id: "hel8gb",
    locationCode: "hel-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "64",
  },
  {
    id: "hel16gb",
    locationCode: "hel-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "66",
  },

  // ============================================
  // Ho Chi Minh, Vietnam - Premium ($2/GB)
  // ============================================
  {
    id: "hcm1gb",
    locationCode: "hcm-premium",
    ram: 1,
    price: 2,
    vCores: 10,
    storage: "20/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "150",
  },
  {
    id: "hcm2gb",
    locationCode: "hcm-premium",
    ram: 2,
    price: 4,
    vCores: 10,
    storage: "40/Unlimited GB",
    backupSlots: 50,
    containerSplits: 1,
    whmcsPid: "151",
  },
  {
    id: "hcm4gb",
    locationCode: "hcm-premium",
    ram: 4,
    price: 8,
    vCores: 10,
    storage: "80/Unlimited GB",
    backupSlots: 50,
    containerSplits: 2,
    whmcsPid: "152",
  },
  {
    id: "hcm8gb",
    locationCode: "hcm-premium",
    ram: 8,
    price: 16,
    vCores: 10,
    storage: "160/Unlimited GB",
    backupSlots: 50,
    containerSplits: 4,
    whmcsPid: "153",
  },
  {
    id: "hcm16gb",
    locationCode: "hcm-premium",
    ram: 16,
    price: 32,
    vCores: 10,
    storage: "320/Unlimited GB",
    backupSlots: 50,
    containerSplits: 8,
    whmcsPid: "154",
  },
];

// Addons available for game hosting
export const addons: Addon[] = [
  {
    id: "dedicated-ip",
    name: "Dedicated IP Address",
    price: "$3",
    description:
      "Get a dedicated IP address for your server for easier connections.",
    urlParams: "&configoption[1]=1",
  },
  {
    id: "priority-support",
    name: "Priority Support",
    price: "$5",
    description: "Get priority support with faster response times.",
    urlParams: "&configoption[2]=1",
  },
];

// Helper function to get plans for a specific location
export function getPlansForLocation(locationCode: string): Plan[] {
  return plans.filter((plan) => plan.locationCode === locationCode);
}

// Helper function to generate WHMCS cart URL
export function generateCartUrl(plan: Plan, selectedAddons: string[]): string {
  const baseUrl = "https://foxomy.com/billing/cart.php?a=add";
  const addonParams = selectedAddons
    .map((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return addon?.urlParams || "";
    })
    .join("");

  return `${baseUrl}&pid=${plan.whmcsPid}${addonParams}`;
}

// Helper to get location by codename
export function getLocationByCode(codename: string): Location | undefined {
  return locations.find((l) => l.codename === codename);
}

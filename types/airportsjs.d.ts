declare module "airportsjs" {
  interface Airport {
    name: string;
    city: string;
    country: string;
    iata: string;
    latitude: number;
    longitude: number;
  }

  interface Airports {
    lookupByIataCode(code: string): Airport | undefined;
    searchByAirportName(name: string): Airport[];
  }

  const airports: Airports;
  export default airports;
}


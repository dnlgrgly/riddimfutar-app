export type VehicleType = "BUS" | "TRAM" | "TROLLEY" | "NIGHT";

export type Vehicle = {
  color: string;
  shortName: string;
  tripHeadsign: string;
  tripId: string;
  type: VehicleType;
};

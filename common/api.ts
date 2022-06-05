import axios from "axios";
import { Vehicle, VehicleType } from "./Types";

// const BASE_URL = "https://riddimfutar.ey.r.appspot.com/api/v1";
const BASE_URL = "http://localhost:8080/api/v1";

const determineVehicleTypeFromColor = (input: string): VehicleType => {
  switch (input) {
    case "009EE3":
      return "BUS";
    case "FFD800":
      return "TRAM";
    case "E41F18":
      return "TROLLEY";
    default:
      return "NIGHT";
  }
};

export const API = {
  getMetadata: async () => axios.get(`${BASE_URL}/metadata`),
  getNearbyVehicles: async (
    lat: number,
    lon: number
  ): Promise<Vehicle[] | undefined> => {
    const { status, data } = await axios.get(
      `${BASE_URL}/vehicles?lat=${lat}&lon=${lon}`
    );

    if (!data || data === "error!" || status !== 200) {
      return undefined;
    }

    return data.map((vehicleWithTrip: any) => {
      console.log(vehicleWithTrip);
      return {
        color: `#${vehicleWithTrip.trip.color}`,
        shortName: vehicleWithTrip.trip.shortName,
        tripHeadsign: vehicleWithTrip.trip.tripHeadsign,
        tripId: vehicleWithTrip.trip.tripId,
        type: determineVehicleTypeFromColor(vehicleWithTrip.trip.color),
      };
    });
  },
};

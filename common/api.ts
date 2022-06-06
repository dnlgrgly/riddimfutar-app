import axios from "axios";
import { MusicResponse, Trip, TripType, VehicleDetails } from "./Types";

// const BASE_URL = "https://riddimfutar.ey.r.appspot.com/api/v1";
const BASE_URL = "http://localhost:8080/api/v1";

const determineTripTypeFromColor = (input: string): TripType => {
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
  ): Promise<Trip[] | undefined> => {
    const { status, data } = await axios.get(
      `${BASE_URL}/vehicles?lat=${lat}&lon=${lon}`
    );

    if (!data || data === "error!" || status !== 200) {
      return undefined;
    }

    return data.map((vehicleWithTrip: any) => {
      const { color, shortName, tripHeadsign, tripId } = vehicleWithTrip.trip;

      return {
        color: `#${color}`,
        shortName,
        tripHeadsign,
        tripId,
        type: determineTripTypeFromColor(vehicleWithTrip.trip.color),
      };
    });
  },
  getVehicleDetails: async (
    vehicleId: string
  ): Promise<VehicleDetails | undefined> => {
    const { status, data } = await axios.get(
      `${BASE_URL}/vehicle/${vehicleId}`
    );

    if (!data || data === "error!" || status !== 200) {
      return undefined;
    }

    return data;
  },
  getMusic: async (
    genre: string = "riddim"
  ): Promise<MusicResponse | undefined> => {
    const { status, data } = await axios.get(`${BASE_URL}/music/${genre}`);

    if (!data || data === "error!" || status !== 200) {
      return undefined;
    }

    const { artist, title, files } = data;

    return {
      artist,
      title,
      files: files.map((file: any) => {
        const {
          bits,
          channels,
          data,
          length,
          sample_rate,
          samples_per_pixel,
          version,
        } = file.waveform;

        return {
          ...file,
          waveform: {
            bits,
            channels,
            data,
            length,
            sampleRate: sample_rate,
            samplesPerPixel: samples_per_pixel,
            version,
          },
        };
      }),
    };
  },
};

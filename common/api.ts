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
      const { color } = vehicleWithTrip.trip;

      return {
        ...vehicleWithTrip.trip,
        color: `#${color}`,
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

    const { stops } = data;

    return {
      ...data,
      stops: stops.map((stop: any) => {
        return {
          ...stop,
          fileURL: `https://storage.googleapis.com/futar/${stop.fileName}`,
        };
      }),
    };
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
        const { sample_rate, samples_per_pixel } = file.waveform;

        return {
          ...file,
          fileURL: file.pathURL,
          waveform: {
            ...file.waveform,
            sampleRate: sample_rate,
            samplesPerPixel: samples_per_pixel,
          },
        };
      }),
    };
  },
};

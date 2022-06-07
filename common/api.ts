import axios from "axios";
import Sound from "react-native-sound";
import { MetadataResponse, MusicResponse, Trip, VehicleDetails } from "./Types";

// const BASE_URL = "https://riddimfutar.ey.r.appspot.com/api/v1";
const BASE_URL = "http://localhost:8080/api/v1";

export const API = {
  getMetadata: async (): Promise<MetadataResponse | undefined> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/metadata`);

      return data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  getNearbyVehicles: async (
    lat: number,
    lon: number
  ): Promise<Trip[] | undefined> => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/vehicles?lat=${lat}&lon=${lon}`
      );

      return data.map((vehicleWithTrip: any) => {
        const { color } = vehicleWithTrip.trip;

        return {
          ...vehicleWithTrip.trip,
          color: `#${color}`,
        };
      });
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  getVehicleDetails: async (
    vehicleId: string
  ): Promise<VehicleDetails | undefined> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/vehicle/${vehicleId}`);

      const { stops } = data;

      return {
        ...data,
        stops: stops.map((stop: any) => {
          return {
            ...stop,
            sound: new Sound(
              `https://storage.googleapis.com/futar/${stop.fileName}`
            ),
          };
        }),
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  getMusic: async (
    genre: string = "riddim"
  ): Promise<MusicResponse | undefined> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/music/${genre}`);
      const { artist, title, files } = data;

      return {
        artist,
        title,
        files: files.map((file: any) => {
          // TODO: once needed, re-add waveform data
          // const { sample_rate, samples_per_pixel } = file.waveform;

          return {
            ...file,
            sound: new Sound(file.pathURL),
            // waveform: {
            //   ...file.waveform,
            //   sampleRate: sample_rate,
            //   samplesPerPixel: samples_per_pixel,
            // },
          };
        }),
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
};

import Sound from "react-native-sound";

export type TripType = "BUS" | "TRAM" | "TROLLEY" | "NIGHT";

export type Trip = {
  color: string;
  shortName: string;
  tripHeadsign: string;
  tripId: string;
  type: TripType;
};

export type Stop = {
  sound: Sound;
  lat: number;
  lon: number;
  musicOverride?: string;
  name: string;
  predictedArrivalTime?: number;
};

export type Vehicle = {
  bearing: number;
  location: {
    lat: number;
    lon: number;
  };
  stopDistancePercent: number;
  stopSequence: number;
};

export type VehicleDetails = {
  stops: Stop[];
  trip: Partial<Trip>;
  vehicle: Vehicle;
};

export type WaveformData = {
  bits: number;
  channels: number;
  data: number[];
  length: number;
  sampleRate: number;
  samplesPerPixel: number;
  version: number;
};

export type MusicFile = {
  announceUnder: boolean;
  breakpoint: number;
  loopable: boolean;
  sound: Sound;
  waveform: WaveformData;
};

export type MusicResponse = {
  artist: string;
  title: string;
  files: MusicFile[];
};

import { GeolocationResponse } from "@react-native-community/geolocation";
import { Stop } from "../../common";

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a));
};

export const calculateProgress = (
  coords: GeolocationResponse,
  previousStop: Stop,
  nextStop: Stop
): number => {
  const { latitude, longitude } = coords.coords;

  const distanceFromPreviousStop = calculateDistance(
    latitude,
    longitude,
    previousStop.lat,
    previousStop.lon
  );

  const distanceUntilNextStop = calculateDistance(
    latitude,
    longitude,
    nextStop.lat,
    nextStop.lon
  );

  const totalDistance = distanceFromPreviousStop + distanceUntilNextStop;

  return (distanceFromPreviousStop / totalDistance) * 100;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

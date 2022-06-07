import { GeolocationResponse } from "@react-native-community/geolocation";
import { MetadataResponse } from "../../common";

export const isOutOfBounds = (
  meta: MetadataResponse,
  coords: GeolocationResponse
) => {
  const { latitude, longitude } = coords.coords;

  if (latitude < meta.lowerLeftLatitude || latitude > meta.upperRightLatitude) {
    return true;
  }

  if (
    longitude < meta.lowerLeftLongitude ||
    longitude > meta.upperRightLongitude
  ) {
    return true;
  }

  return false;
};

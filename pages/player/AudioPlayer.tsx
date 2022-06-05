import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import { API, Trip } from "../../common";

type Props = {
  trip: Trip;
  setNextStop: (name: string) => void;
  setTerminus: (name: string) => void;
};

const calculateDistance = () => {};

export const AudioPlayer = ({ trip, setNextStop, setTerminus }: Props) => {
  // progress of distance between previous and next stop
  const [progress, setProgress] = useState(-1);
  // index of next stop
  const [nextStopIndex, setNextStopIndex] = useState(-1);

  const initFirstStop = async () => {
    const vehicleDetails = await API.getVehicleDetails(trip.tripId);

    if (!vehicleDetails) {
      console.error("AudioPlayer - getVehicleDetails returned null!");
      return;
    }

    setNextStop(vehicleDetails.stops[vehicleDetails.vehicle.stopSequence].name);
    setTerminus(vehicleDetails.stops[vehicleDetails.stops.length - 1].name);
  };

  const startListeningForLocation = async () => {
    Geolocation.watchPosition((item) => {});
  };

  useEffect(() => {
    initFirstStop();
    startListeningForLocation();
  }, []);

  return <></>;
};

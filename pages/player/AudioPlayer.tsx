import Geolocation from "@react-native-community/geolocation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RootStackParamList } from "../../App";
import { API, Trip } from "../../common";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  trip: Trip;
  setNextStop: (name: string) => void;
  setTerminus: (name: string) => void;
};

const calculateDistance = () => {};

export const AudioPlayer = ({
  navigation,
  trip,
  setNextStop,
  setTerminus,
}: Props) => {
  // progress of distance between previous and next stop
  const [progress, setProgress] = useState(-1);
  // index of next stop
  const [nextStopIndex, setNextStopIndex] = useState(-1);

  const initFirstStop = async () => {
    const vehicleDetails = await API.getVehicleDetails(trip.tripId);

    if (!vehicleDetails) {
      console.error("AudioPlayer - getVehicleDetails returned null!");
      Alert.alert("Hiba lépett fel a járatadatok betöltése közben!");
      navigation.goBack();
      return;
    }

    const { stops, vehicle } = vehicleDetails;

    // if vehicle is too close to the next stop when beginning the play,
    // skip that stop
    let sequence = vehicle.stopSequence;
    if (vehicle.stopDistancePercent > 90) {
      sequence++;
    }

    // if vehicle is already approaching terminus when opening, we can't provide a good UX
    if (
      sequence > stops.length ||
      (sequence == stops.length && vehicle.stopDistancePercent > 60)
    ) {
      Alert.alert(
        "A járat túl közel van a végállomáshoz. Legközelebb próbáld hamarabb elindítani a RIDIDMFUTÁRT!"
      );
      navigation.goBack();
      return;
    }

    setNextStop(stops[sequence].name);
    setNextStopIndex(sequence);

    setProgress(vehicle.stopDistancePercent);
    setTerminus(stops[vehicleDetails.stops.length - 1].name);
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

import Geolocation from "@react-native-community/geolocation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Sound from "react-native-sound";
import { RootStackParamList } from "../../App";
import { API, Stop, Trip } from "../../common";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  trip: Trip;
  setNextStop: (name: string) => void;
  setTerminus: (name: string) => void;
};

const calculateDistance = (
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

// const networkSoundWrapper =

const crossfadePlayer = async (sound: Sound, nextSound: Sound) => {
  const length = sound.getDuration() * 1000;

  sound.play();

  return setTimeout(() => {
    nextSound.play(() => {
      return Promise.resolve();
    });
  }, length - 10);
};

export const AudioPlayer = ({
  navigation,
  trip,
  setNextStop,
  setTerminus,
}: Props) => {
  // progress of distance between previous and next stop
  let progress = -1;
  // index of next stop
  let nextStopIndex = -1;
  let stops: Stop[];
  let preloadedMusic: Sound[];

  const quitWithMessage = (message: string) => {
    console.error(message);
    Alert.alert(message);
    navigation.goBack();
  };

  const initFirstStop = async () => {
    const vehicleDetails = await API.getVehicleDetails(trip.tripId);

    if (!vehicleDetails) {
      return quitWithMessage("Hiba lépett fel a járatadatok betöltése közben!");
    }

    const { stops: stopData, vehicle } = vehicleDetails;

    // if vehicle is too close to the next stop when beginning the play,
    // skip that stop
    let sequence = vehicle.stopSequence;
    if (vehicle.stopDistancePercent > 90) {
      sequence++;
    }

    // if vehicle is already approaching terminus when opening, we can't provide a good UX
    if (
      sequence > stopData.length ||
      (sequence == stopData.length && vehicle.stopDistancePercent > 60)
    ) {
      return quitWithMessage(
        "A járat túl közel van a végállomáshoz. Legközelebb próbáld hamarabb elindítani a RIDIDMFUTÁRT!"
      );
    }

    stops = stopData;
    nextStopIndex = sequence;
    progress = vehicle.stopDistancePercent;

    setNextStop(stops[nextStopIndex].name);
    setTerminus(stops[stops.length - 1].name);

    fetchMusic();
    startListeningForLocation();
  };

  const fetchMusic = async () => {
    const music = await API.getMusic();

    if (!music) {
      return quitWithMessage(
        "Hiba lépett fel a zene betöltése közben. Próbáld újra!"
      );
    }

    preloadedMusic = music.files.map((file) => new Sound(file.pathURL));

    const welcomeOnboard = new Sound(
      "https://storage.googleapis.com/futar/EF-udv.mp3"
    );
    const nextStop = new Sound(
      "https://storage.googleapis.com/futar/EF-kov.mp3"
    );
    const stop1 = new Sound(
      `https://storage.googleapis.com/futar/${stops[nextStopIndex].fileName}`
    );

    setTimeout(() => {
      welcomeOnboard.play(() => {
        nextStop.play(() => {
          stop1.play(async () => {
            for (let i = 0; i < preloadedMusic.length - 1; i += 2) {
              await crossfadePlayer(preloadedMusic[i], preloadedMusic[i + 1]);
            }
          });
        });
      });
    }, 1000);
  };

  const startListeningForLocation = async () => {
    Geolocation.watchPosition((item) => {
      const { latitude, longitude } = item.coords;

      const previousStop = stops[nextStopIndex - 1];
      const nextStop = stops[nextStopIndex];

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

      progress = (distanceFromPreviousStop / totalDistance) * 100;
    });
  };

  useEffect(() => {
    initFirstStop();
  }, []);

  return <></>;
};

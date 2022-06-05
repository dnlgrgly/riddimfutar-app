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

const calculateDistance = () => {};

// const networkSoundWrapper =

const crossfadePlayer = async (sound: Sound, nextSound: Sound) => {
  const length = sound.getDuration() * 1000;

  sound.play();

  setTimeout(() => {
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

  const initFirstStop = async () => {
    const vehicleDetails = await API.getVehicleDetails(trip.tripId);

    if (!vehicleDetails) {
      console.error("AudioPlayer - getVehicleDetails returned null!");
      Alert.alert("Hiba lépett fel a járatadatok betöltése közben!");
      navigation.goBack();
      return;
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
      Alert.alert(
        "A járat túl közel van a végállomáshoz. Legközelebb próbáld hamarabb elindítani a RIDIDMFUTÁRT!"
      );
      navigation.goBack();
      return;
    }

    stops = stopData;
    nextStopIndex = sequence;
    progress = vehicle.stopDistancePercent;

    setNextStop(stops[nextStopIndex].name);
    setTerminus(stops[stops.length - 1].name);

    playWelcomeSignal();
  };

  const playWelcomeSignal = () => {
    const welcomeOnboard = new Sound(
      "https://storage.googleapis.com/futar/EF-udv.mp3"
    );
    const nextStop = new Sound(
      "https://storage.googleapis.com/futar/EF-kov.mp3"
    );
    const stop1 = new Sound(
      `https://storage.googleapis.com/futar/${stops[nextStopIndex].fileName}`
    );
    const sound0 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/0.mp3`
    );
    const sound1 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/1.mp3`
    );
    const sound2 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/2.mp3`
    );
    const sound3 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/3.mp3`
    );
    const sound4 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/4.mp3`
    );
    const sound5 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/5.mp3`
    );
    const sound6 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/6.mp3`
    );
    const sound7 = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/7.mp3`
    );
    const drop = new Sound(
      `https://storage.googleapis.com/riddim/riddim/decadonlikethat/drop.mp3`
    );

    setTimeout(() => {
      welcomeOnboard.play(() => {
        nextStop.play(() => {
          stop1.play(() => {
            crossfadePlayer(sound3, sound4);
          });
        });
      });
    }, 1000);
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

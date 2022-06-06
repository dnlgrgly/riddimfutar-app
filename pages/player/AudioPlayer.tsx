import Geolocation from "@react-native-community/geolocation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Sound from "react-native-sound";
import { RootStackParamList } from "../../App";
import { API, Fonts, Stop, Trip, Colors, MusicFile } from "../../common";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateProgress, sleep } from "./utils";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  trip: Trip;
  setNextStop: (name: string) => void;
  setTerminus: (name: string) => void;
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
  const [artist, setArtist] = useState<string>();

  let playingQueue: Sound[] = [];
  let music: MusicFile[];

  const welcomeOnboardAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-udv.mp3"
  );
  const nextStopAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-kov.mp3"
  );
  const terminusAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-veg.mp3"
  );

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

    startListeningForLocation();

    await fetchMusic();

    await sleep(500);

    kickoffAudioPlayback();
  };

  const kickoffAudioPlayback = () => {
    playingQueue.push(welcomeOnboardAudio);
    playingQueue.push(nextStopAudio);
    playingQueue.push(stops[nextStopIndex].sound);

    shiftQueue();
  };

  const shiftQueue = () => {
    const audio = playingQueue.shift();

    if (!audio) {
      // TODO: handle gracefully - there may be cases when we don't need to quit
      return quitWithMessage("Ennyi volt!");
    }

    const length = Math.ceil(audio.getDuration() * 1000);

    audio.play();

    setTimeout(() => {
      shiftQueue();
    }, length - 7.5);
  };

  const fetchMusic = async () => {
    const musicResponse = await API.getMusic();

    if (!musicResponse) {
      return quitWithMessage(
        "Hiba lépett fel a zene betöltése közben. Próbáld újra!"
      );
    }

    music = musicResponse.files;
    setArtist(musicResponse.artist);
  };

  const startListeningForLocation = async () => {
    Geolocation.watchPosition((item) => {
      const previousStop = stops[nextStopIndex - 1];
      const nextStop = stops[nextStopIndex];

      progress = calculateProgress(item, previousStop, nextStop);
    });
  };

  useEffect(() => {
    initFirstStop();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <Image
        source={require("../../assets/images/artist.png")}
        resizeMode="contain"
        style={{ width: "100%" }}
      />
      <View style={styles.absoluteContainer}>
        <Text
          style={{
            fontFamily: Fonts.brand,
            fontSize: 18,
            color: trip.color,
          }}
        >
          Jelenlegi DJ:
        </Text>
        {artist ? (
          <Text
            style={{
              fontFamily: Fonts.uiBold,
              color: Colors.white,
              fontSize: 24,
              textAlign: "center",
            }}
          >
            {artist}
          </Text>
        ) : (
          <ActivityIndicator color={"white"} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginBottom: 30,
    width: "100%",
  },
  absoluteContainer: {
    position: "absolute",
    top: -12.5,
    left: 40,
    right: 40,
  },
});

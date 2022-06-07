import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
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

  let playingMusicIndex = Number.MAX_VALUE;
  let skippedStop = false;
  let playingQueue: Sound[] = [];
  let musicFiles: MusicFile[];

  const welcomeOnboardAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-udv.mp3"
  );
  const nextStopAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-kov.mp3"
  );
  const terminusAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-veg.mp3"
  );
  const goodbyeAudio = new Sound(
    "https://storage.googleapis.com/futar/EF-visz.mp3"
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

    // FUTÁR doesn't provide stopSequence data when vehicle is approaching terminus
    let sequence = vehicle.stopSequence ?? stopData.length - 1;

    // if vehicle is too close to the next stop when beginning the play,
    // skip that stop
    if (vehicle.stopDistancePercent > 90) {
      sequence++;
      skippedStop = true;
    }

    // if vehicle is already approaching terminus when opening, we can't provide a good UX
    if (
      sequence > stopData.length - 1 ||
      (sequence == stopData.length - 1 && vehicle.stopDistancePercent > 60)
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

    updateProgress();
    startListeningForLocation();

    await fetchMusic();

    await sleep(1000);

    kickoffAudioPlayback();
  };

  const kickoffAudioPlayback = () => {
    playingQueue.push(welcomeOnboardAudio);
    announceStop();
    shiftQueue();
  };

  const announceStop = () => {
    playingQueue.push(nextStopAudio);
    playingQueue.push(stops[nextStopIndex].sound);

    if (nextStopIndex === stops.length - 1) {
      playingQueue.push(terminusAudio);
    }
  };

  const updateNextStop = () => {
    nextStopIndex++;

    if (nextStopIndex > stops.length - 1) {
      playingQueue.push(terminusAudio);
      playingQueue.push(goodbyeAudio);
      return quitWithMessage("Végállomás. Viszontlátásra!");
    }

    announceStop();

    fetchMusic();

    progress = -1;
    skippedStop = false;
    playingMusicIndex = Number.MAX_VALUE;

    setTimeout(() => {
      setNextStop(stops[nextStopIndex].name);
    }, 500);
  };

  const determineNextSound = (): Sound | undefined => {
    const shifted = playingQueue.shift();

    if (shifted) {
      return shifted;
    }

    if (nextStopIndex > stops.length - 1) {
      return undefined;
    }

    const progressIndex = musicFiles.findIndex(
      (item) => item.breakpoint - 5 <= progress
    );

    if (progressIndex < playingMusicIndex) {
      if (musicFiles[playingMusicIndex]) {
        musicFiles[playingMusicIndex].sound.stop();
      }

      playingMusicIndex = progressIndex;
    }

    // TODO: check if the music if loopable!

    if (progress > 90 && playingQueue.length == 0) {
      const next = stops[nextStopIndex].sound;
      const drop = musicFiles[0].sound;

      playingQueue.push(drop);

      setTimeout(() => {
        updateNextStop();
      }, (next.getDuration() + drop.getDuration()) * 1000 - 500);

      return next;
    }

    return musicFiles[playingMusicIndex].sound.setNumberOfLoops(-1);
  };

  const shiftQueue = () => {
    let audio = determineNextSound();

    if (!audio) {
      return;
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

    musicFiles = musicResponse.files.reverse();
    setArtist(musicResponse.artist);
  };

  const updateProgress = async (item?: GeolocationResponse) => {
    const previousStop = stops[nextStopIndex - (skippedStop ? 2 : 1)];
    const nextStop = stops[nextStopIndex];

    if (!item) {
      await Geolocation.getCurrentPosition((location) =>
        updateProgress(location)
      );
    } else {
      progress = calculateProgress(item, previousStop, nextStop);
      return;
    }
  };

  const startListeningForLocation = async () => {
    Geolocation.watchPosition(updateProgress);
  };

  useEffect(() => {
    if (!stops) {
      initFirstStop();
    }
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
            shadowColor: Colors.purpleLight,
            shadowOpacity: 1,
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 0,
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

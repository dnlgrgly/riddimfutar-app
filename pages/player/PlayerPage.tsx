import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import { Colors } from "../../common";
import { AudioPlayer } from "./AudioPlayer";
import { MusicVisualizer } from "./MusicVisualizer";
import { OBUDisplay } from "./OBUDisplay";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

export const PlayerPage = ({ route }: Props) => {
  const trip = route.params.trip;
  const [nextStop, setNextStop] = useState<string | undefined>();
  const [terminus, setTerminus] = useState<string | undefined>();

  return (
    <View style={styles.container}>
      <AudioPlayer
        trip={trip}
        setNextStop={setNextStop}
        setTerminus={setTerminus}
      />
      <OBUDisplay trip={trip} nextStop={nextStop} terminus={terminus} />
      <MusicVisualizer tripType={trip.type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.purple,
  },
});

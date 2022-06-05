import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import { Colors } from "../../common";
import { OBUDisplay } from "./OBUDisplay";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

export const PlayerPage = ({ route }: Props) => {
  const vehicle = route.params.vehicle;

  return (
    <View style={styles.container}>
      <OBUDisplay
        vehicle={vehicle}
        terminus={vehicle.tripHeadsign}
        nextStop={vehicle.tripHeadsign}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.purple,
  },
});

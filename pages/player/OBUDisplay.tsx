import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, CommonStyles, Vehicle, VehicleIcon } from "../../common";
import Terminus from "../../assets/svg/terminus.svg";
import Dot from "../../assets/svg/dot.svg";
import DotBackground from "../../assets/svg/dot_background.svg";

type Props = {
  vehicle: Vehicle;
  terminus: string;
  nextStop: string;
};

export const OBUDisplay = ({ vehicle, terminus, nextStop }: Props) => {
  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <View style={styles.vehicleDataRow}>
          <VehicleIcon vehicle={vehicle} size={35} />
          <View
            style={[
              styles.vehicleShortNameBox,
              { backgroundColor: vehicle.color },
            ]}
          >
            <Text
              style={[
                styles.vehicleShortNameText,
                { color: vehicle.type === "TRAM" ? "black" : "white" },
              ]}
            >
              {vehicle.shortName}
            </Text>
          </View>
        </View>
        <View style={styles.terminusRow}>
          <View style={styles.terminusIconColumn}>
            <Terminus width={35} color={vehicle.color} />
            <View
              style={[
                styles.terminusLineExpander,
                { backgroundColor: vehicle.color },
              ]}
            />
          </View>
          <Text style={styles.stopName}>{terminus}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.nextStopRow}>
        <DotBackground width={35} color={vehicle.color} />
        <Dot width={15} height={15} style={styles.dot} />
        <Text style={[styles.stopName, styles.nextStopName]}>{nextStop}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purpleLight,
    padding: 20,
    paddingBottom: 0,
  },
  vehicleDataRow: {
    flexDirection: "row",
  },
  vehicleShortNameBox: {
    height: 35,
    width: 80,
    marginLeft: 10,
    borderRadius: 5,
  },
  vehicleShortNameText: {
    ...CommonStyles.text,
    ...CommonStyles.textBold,
    ...CommonStyles.textCenter,
    fontSize: 24,
  },
  stopName: {
    ...CommonStyles.text,
    ...CommonStyles.textBold,
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 24,
    flex: 1,
  },
  terminusRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  terminusIconColumn: {
    flexDirection: "column",
    height: "100%",
  },
  terminusLineExpander: {
    flexGrow: 1,
    width: 13,
    marginLeft: 11,
  },
  nextStopRow: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  dot: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  nextStopName: {
    marginTop: 30,
    marginRight: 20,
  },
});

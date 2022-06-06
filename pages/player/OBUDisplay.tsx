import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, CommonStyles, Trip, VehicleIcon } from "../../common";
import Terminus from "../../assets/images/terminus.svg";
import Dot from "../../assets/images/dot.svg";
import DotBackground from "../../assets/images/dot_background.svg";

type Props = {
  trip: Trip;
  terminus: string | undefined;
  nextStop: string | undefined;
};

export const OBUDisplay = ({ trip, terminus, nextStop }: Props) => {
  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <View style={styles.vehicleDataRow}>
          <VehicleIcon type={trip.type} size={35} />
          <View
            style={[
              styles.vehicleShortNameBox,
              { backgroundColor: trip.color },
            ]}
          >
            <Text
              style={[
                styles.vehicleShortNameText,
                { color: trip.type === "TRAM" ? "black" : "white" },
              ]}
            >
              {trip.shortName}
            </Text>
          </View>
        </View>
        <View style={styles.terminusRow}>
          <View style={styles.terminusIconColumn}>
            <Terminus width={35} color={trip.color} />
            <View
              style={[
                styles.terminusLineExpander,
                { backgroundColor: trip.color },
              ]}
            />
          </View>
          {terminus ? (
            <Text style={styles.stopName}>{terminus}</Text>
          ) : (
            <ActivityIndicator
              size={"small"}
              color="white"
              style={styles.stopName}
            />
          )}
        </View>
      </SafeAreaView>
      <View style={styles.nextStopRow}>
        <DotBackground width={35} color={trip.color} />
        <Dot width={15} height={15} style={styles.dot} />
        {nextStop ? (
          <Text style={[styles.stopName, styles.nextStopName]}>{nextStop}</Text>
        ) : (
          <ActivityIndicator
            size={"small"}
            color="white"
            style={[styles.stopName, styles.nextStopName]}
          />
        )}
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

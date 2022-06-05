import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  CommonStyles,
  LoadingSpinner,
  Vehicle,
  VehicleIcon,
} from "../../common";
import { ErrorText } from "./ErrorText";

export type VehiclesState = Vehicle[] | "loading" | "error";

type Props = {
  vehicles: VehiclesState;
};

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Pressable
      onTouchEnd={() => {
        console.warn(`hi from: ${vehicle.tripHeadsign}`);
      }}
      style={[styles.cardContainer, { borderColor: vehicle.color }]}
    >
      <VehicleIcon vehicle={vehicle} />
      <Text style={styles.cardText}>
        {`${vehicle.shortName} ▶️ ${vehicle.tripHeadsign}`}
      </Text>
    </Pressable>
  );
};

export const VehicleList = ({ vehicles }: Props) => {
  if (vehicles === "loading") {
    return <LoadingSpinner />;
  } else if (vehicles === "error") {
    return <ErrorText />;
  }

  return (
    <View style={styles.container}>
      <Text style={[CommonStyles.text, CommonStyles.textBold]}>
        Válassz járatot!
      </Text>
      <Text style={CommonStyles.textSmall}>
        A közeledben levő aktív BKK járműveket listázzuk.
      </Text>
      {vehicles.map((vehicle) => {
        return <VehicleCard key={vehicle.tripId} vehicle={vehicle} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.purpleLight,
    padding: 14,
    marginVertical: 10,
    borderLeftWidth: 10,
    borderRadius: 5,
  },
  cardText: {
    ...CommonStyles.text,
    ...CommonStyles.textBold,
    flex: 1,
    marginLeft: 14,
  },
});

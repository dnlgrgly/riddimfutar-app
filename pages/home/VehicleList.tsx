import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommonStyles, Trip } from "../../common";
import { ErrorText } from "./ErrorText";
import { VehicleCard } from "./VehicleCard";

export type VehiclesState = Trip[] | "error" | undefined;

type Props = {
  nearbyVehicles: VehiclesState;
  onCardTap: (trip: Trip) => void;
};

export const VehicleList = ({ nearbyVehicles, onCardTap }: Props) => {
  if (!nearbyVehicles) {
    return <></>;
  } else if (nearbyVehicles === "error" || nearbyVehicles.length === 0) {
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
      {nearbyVehicles.map((trip) => {
        return (
          <VehicleCard key={trip.tripId} trip={trip} onCardTap={onCardTap} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 14,
  },
});

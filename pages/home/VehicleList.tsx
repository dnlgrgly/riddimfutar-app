import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommonStyles, Vehicle } from "../../common";
import { ErrorText } from "./ErrorText";
import { VehicleCard } from "./VehicleCard";

export type VehiclesState = Vehicle[] | "error" | undefined;

type Props = {
  vehicles: VehiclesState;
  onCardTap: (vehicle: Vehicle) => void;
};

export const VehicleList = ({ vehicles, onCardTap }: Props) => {
  if (!vehicles) {
    return <></>;
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
        return (
          <VehicleCard
            key={vehicle.tripId}
            vehicle={vehicle}
            onCardTap={onCardTap}
          />
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

import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, CommonStyles, Vehicle, VehicleIcon } from "../../common";

export type VehiclesState = Vehicle[] | "error" | undefined;

type Props = {
  vehicle: Vehicle;
  onCardTap: (vehicle: Vehicle) => void;
};

export const VehicleCard = ({ vehicle, onCardTap }: Props) => {
  const onTouchEnd = () => {
    onCardTap(vehicle);
  };

  return (
    <Pressable
      onTouchEnd={onTouchEnd}
      style={[styles.cardContainer, { borderColor: vehicle.color }]}
    >
      <VehicleIcon type={vehicle.type} />
      <Text style={styles.cardText}>
        {`${vehicle.shortName} ▶️ ${vehicle.tripHeadsign}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, CommonStyles, Trip, VehicleIcon } from "../../common";

export type VehiclesState = Trip[] | "error" | undefined;

type Props = {
  trip: Trip;
  onCardTap: (trip: Trip) => void;
};

export const VehicleCard = ({ trip, onCardTap }: Props) => {
  const onPress = () => {
    onCardTap(trip);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, { borderColor: trip.color }]}
    >
      <VehicleIcon type={trip.type} />
      <Text style={styles.cardText}>
        {`${trip.shortName} ▶️ ${trip.tripHeadsign}`}
      </Text>
    </TouchableOpacity>
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

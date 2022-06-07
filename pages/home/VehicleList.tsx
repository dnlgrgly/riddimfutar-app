import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommonStyles, Trip } from "../../common";
import { ErrorText } from "./ErrorText";
import { VehicleCard } from "./VehicleCard";

export type VehiclesState = Trip[] | "out-of-bounds" | "error" | undefined;

type Props = {
  nearbyVehicles: VehiclesState;
  onCardTap: (trip: Trip) => void;
};

export const VehicleList = ({ nearbyVehicles, onCardTap }: Props) => {
  if (!nearbyVehicles) {
    return <></>;
  } else if (nearbyVehicles === "out-of-bounds") {
    return (
      <ErrorText
        icon={require("../../assets/images/budapest.png")}
        title="Irány vissza Budapest!"
        body="A RIDDIMFUTÁR jelenleg csak a BKK szolgáltatási határain belül működik. Menj közelebb Budapesthez!"
      />
    );
  } else if (nearbyVehicles === "error" || nearbyVehicles.length === 0) {
    return (
      <ErrorText
        icon={require("../../assets/images/no_vehicles.png")}
        title="Hiba történt!"
        body="Úgy néz ki, nincs a környékeden egy jármű sem ami szolgálatot teljesítene - vagy egyéb hiba történt."
        italicBody="(pl. nincs interneted, vagy nem fértünk hozzá a helyzetedhez)"
      />
    );
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

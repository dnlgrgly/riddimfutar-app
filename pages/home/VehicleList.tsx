import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Colors,
  CommonStyles,
  Fonts,
  Vehicle,
  VehicleType,
} from "../../common";
import Bus from "../../assets/svg/bkk_bus.svg";
import Tram from "../../assets/svg/bkk_tram.svg";
import Trolley from "../../assets/svg/bkk_trolley.svg";
import Night from "../../assets/svg/bkk_night.svg";

export type VehiclesList = Vehicle[] | "loading" | "error";

type Props = {
  vehicles: VehiclesList;
};

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const ICON_SIZE = 30;

  const determineIconFromType = (type: VehicleType): JSX.Element => {
    switch (type) {
      case "BUS":
        return <Bus width={ICON_SIZE} height={ICON_SIZE} />;
      case "TRAM":
        return <Tram width={ICON_SIZE} height={ICON_SIZE} />;
      case "TROLLEY":
        return <Trolley width={ICON_SIZE} height={ICON_SIZE} />;
      case "NIGHT":
        return <Night width={ICON_SIZE} height={ICON_SIZE} />;
    }
  };

  console.log(vehicle);

  return (
    <View style={[styles.cardContainer, { borderColor: vehicle.color }]}>
      {determineIconFromType(vehicle.type)}
      <Text style={[CommonStyles.text, { marginLeft: 14 }]}>
        {`${vehicle.shortName} ▶️ ${vehicle.tripHeadsign}`}
      </Text>
    </View>
  );
};

export const VehicleList = ({ vehicles }: Props) => {
  if (vehicles === "loading") {
    return (
      <View>
        <Text style={CommonStyles.text}>toltes...</Text>
      </View>
    );
  } else if (vehicles === "error") {
    return (
      <View>
        <Text style={CommonStyles.text}>nemjo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={CommonStyles.text}>Válassz járatot!</Text>
      <Text style={CommonStyles.textSmall}>
        A közeledben levő aktív BKK járműveket listázzuk.
      </Text>
      {vehicles.map((vehicle) => {
        return <VehicleCard vehicle={vehicle} />;
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
});

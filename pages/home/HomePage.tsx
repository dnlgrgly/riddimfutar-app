import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  CommonStyles,
  Fonts,
  RollingText,
  Vehicle,
} from "../../common";
import Logo from "../../assets/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { API } from "../../common/api";
import { VehicleList, VehiclesList } from "./VehicleList";

export const HomePage = () => {
  const [announcement, setAnnouncement] = useState("");
  const [data, setData] = useState<VehiclesList>("loading");

  const getAnnouncement = async () => {
    const res = await API.getMetadata();
    setAnnouncement(res.data.message);
  };

  const getList = async (position: GeolocationResponse) => {
    const res = await API.getNearbyVehicles(
      position.coords.latitude,
      position.coords.longitude
    );

    setData(res ? res : "error");
  };

  useEffect(() => {
    getAnnouncement();
    Geolocation.getCurrentPosition((res) => getList(res));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={[CommonStyles.center, { marginBottom: 20 }]}>
        <Logo height={60} width={266} />
      </View>
      <View style={[CommonStyles.center, { marginBottom: 14 }]}>
        <RollingText text={announcement} />
      </View>
      <VehicleList vehicles={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.purple,
    paddingTop: 20,
  },
});

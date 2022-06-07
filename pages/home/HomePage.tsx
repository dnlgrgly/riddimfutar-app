import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import React, { useEffect } from "react";
import { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Colors, CommonStyles, Trip } from "../../common";
import Logo from "../../assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { API } from "../../common/api";
import { VehicleList, VehiclesState } from "./VehicleList";
import { ScrollView } from "react-native-gesture-handler";
import { RollingText } from "./RollingText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { isOutOfBounds } from "./utils";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomePage = ({ navigation }: Props) => {
  const [announcement, setAnnouncement] = useState("");
  const [data, setData] = useState<VehiclesState>();
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setLoading(true);

    Geolocation.getCurrentPosition(async (res) => {
      await getAnnouncement(res);
    });
  };

  const getAnnouncement = async (position: GeolocationResponse) => {
    const res = await API.getMetadata();

    if (!res) {
      setData("error");
      setLoading(false);
      return;
    }

    if (res.message) {
      setAnnouncement(res.message);
    }

    if (isOutOfBounds(res, position)) {
      setData("out-of-bounds");
      setLoading(false);
      return;
    }

    await getList(position);
  };

  const getList = async (position: GeolocationResponse) => {
    const res = await API.getNearbyVehicles(
      position.coords.latitude,
      position.coords.longitude
    );

    setData(res ? res : "error");
    setLoading(false);
  };

  const onCardTap = (trip: Trip) => {
    navigation.navigate("Player", { trip });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={"white"}
          colors={["white"]}
        />
      }
    >
      <SafeAreaView edges={["top", "left", "right"]}>
        <View style={[CommonStyles.center, { marginBottom: 20 }]}>
          <Logo height={60} width={266} />
        </View>
        {announcement ? (
          <View style={[CommonStyles.center, { marginBottom: 15 }]}>
            <RollingText text={announcement} />
          </View>
        ) : (
          <></>
        )}
        <VehicleList nearbyVehicles={data} onCardTap={onCardTap} />
      </SafeAreaView>
    </ScrollView>
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

import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import React, { useEffect } from "react";
import { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Colors, CommonStyles, Vehicle } from "../../common";
import Logo from "../../assets/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { API } from "../../common/api";
import { VehicleList, VehiclesState } from "./VehicleList";
import { ScrollView } from "react-native-gesture-handler";
import { RollingText } from "./RollingText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomePage = ({ navigation }: Props) => {
  const [announcement, setAnnouncement] = useState("");
  const [data, setData] = useState<VehiclesState>();
  const [loading, setLoading] = useState(true);

  const onRefresh = async () => {
    await getAnnouncement();
    await Geolocation.getCurrentPosition(async (res) => await getList(res));
    setLoading(false);
  };

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

  const onCardTap = (vehicle: Vehicle) => {
    navigation.navigate("Player", { vehicle });
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
        <View style={[CommonStyles.center, { marginBottom: 15 }]}>
          <Logo height={60} width={266} />
        </View>
        {announcement ? (
          <View style={[CommonStyles.center, { marginBottom: 15 }]}>
            <RollingText text={announcement} />
          </View>
        ) : (
          <></>
        )}
        <VehicleList vehicles={data} onCardTap={onCardTap} />
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

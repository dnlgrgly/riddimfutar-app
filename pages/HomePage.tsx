import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, CommonStyles, Fonts, RollingText } from "../common";
import Logo from "../assets/svg/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomePage = () => {
  const [announcement, setAnnouncement] = useState("");

  const getAnnouncement = async () => {
    const res = await axios.get(
      "https://riddimfutar.ey.r.appspot.com/api/v1/metadata"
    );

    setAnnouncement(res.data.message);
  };

  useEffect(() => {
    getAnnouncement();
    Geolocation.getCurrentPosition((info) => console.log(info));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Image source={require("../assets/svg/logo.svg")} />
      <View style={[CommonStyles.center, { marginBottom: 14 }]}>
        <Logo height={60} width={266} />
      </View>
      <View style={[CommonStyles.center, { marginBottom: 14 }]}>
        <RollingText text={announcement} />
      </View>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontWeight: "bold",
          color: Colors.white,
        }}
      >
        Hello!
      </Text>
      <Text
        style={{
          fontFamily: Fonts.uiBold,
          color: Colors.white,
        }}
      >
        Hello!
      </Text>
      <Text style={{ fontFamily: Fonts.ui, color: Colors.white }}>Hello!</Text>
      <Text
        style={{
          fontFamily: Fonts.uiItalic,
          color: Colors.white,
        }}
      >
        Hello!
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.purple,
  },
});

import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { forceTouchGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler";
import { Fonts } from "../common/Styles";

export const HomePage = () => {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: Fonts.rolling,
          fontWeight: "bold",
          color: "white",
          fontSize: 30,
        }}
      >
        Hello!
      </Text>
      <Text
        style={{
          fontFamily: Fonts.brand,
          fontWeight: "bold",
          color: "white",
          fontSize: 30,
        }}
      >
        Hello!
      </Text>
      <Text
        style={{
          fontFamily: Fonts.uiBold,
          color: "white",
          fontSize: 30,
        }}
      >
        Hello!
      </Text>
      <Text style={{ fontFamily: Fonts.ui, color: "white", fontSize: 30 }}>
        Hello!
      </Text>
      <Text
        style={{ fontFamily: Fonts.uiItalic, color: "white", fontSize: 30 }}
      >
        Hello!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    color: "white",
  },
});

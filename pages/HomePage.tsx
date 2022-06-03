import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const HomePage = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  }, []);

  return (
    <View style={styles.container}>
      <Text>hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00aaaa",
  },
});

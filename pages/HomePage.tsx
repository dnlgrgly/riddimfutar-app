import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HomePage = () => {
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

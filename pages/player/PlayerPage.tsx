import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../common";

export const PlayerPage = () => {
  return (
    <View style={styles.container}>
      <Text>hello!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
  },
});

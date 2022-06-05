import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

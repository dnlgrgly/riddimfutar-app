import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CommonStyles } from "../../common";

export const ErrorText = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/no_vehicles.png")} />
      <Text style={[CommonStyles.heading, styles.heading]}>
        Hiba történt :(
      </Text>
      <Text style={styles.textBody}>
        Úgy néz ki, nincs a környékeden egy jármű sem ami szolgálatot
        teljesítene - vagy egyéb hiba történt.
      </Text>
      <Text style={[styles.textBody, CommonStyles.textItalic]}>
        (pl. nincs interneted, vagy nem fértünk hozzá a helyzetedhez).
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginHorizontal: 14,
  },
  heading: {
    ...CommonStyles.textCenter,
    marginTop: 20,
    marginBottom: 10,
  },
  textBody: {
    ...CommonStyles.text,
    ...CommonStyles.textCenter,
    marginBottom: 10,
  },
});

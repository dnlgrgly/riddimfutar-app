import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles, Fonts } from "../../common";

type Props = {
  icon: ImageSourcePropType;
  title: string;
  body: string;
  italicBody?: string;
};

export const ErrorText = ({ icon, title, body, italicBody }: Props) => {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <Image source={icon} />
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.textBody}>{body}</Text>
      {italicBody && (
        <Text style={[styles.textBody, CommonStyles.textItalic]}>
          {italicBody}
        </Text>
      )}
    </SafeAreaView>
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
    ...CommonStyles.heading,
    ...CommonStyles.textCenter,
    fontFamily: Fonts.brand,
    marginTop: 40,
    marginBottom: 10,
  },
  textBody: {
    ...CommonStyles.text,
    ...CommonStyles.textCenter,
    marginBottom: 10,
  },
});

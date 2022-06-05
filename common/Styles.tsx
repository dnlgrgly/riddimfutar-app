import { StyleSheet } from "react-native";

export const Fonts = {
  ui: "OpenSans-Regular",
  uiBold: "OpenSans-Bold",
  uiItalic: "OpenSans-Italic",
  rolling: "5by7",
  brand: "RoadRage",
};

export const Colors = {
  yellow: "#FEB22A",
  purple: "#212046",
  purpleLight: "#464770",
  black: "#000000",
  white: "#ffffff",
};

export const CommonStyles = StyleSheet.create({
  heading: {
    fontSize: 28,
    color: Colors.white,
    fontFamily: Fonts.uiBold,
  },
  text: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.ui,
  },
  textSmall: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.ui,
  },
  textBold: {
    fontFamily: Fonts.uiBold,
  },
  textItalic: {
    fontFamily: Fonts.uiItalic,
  },
  textCenter: {
    textAlign: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
  },
});

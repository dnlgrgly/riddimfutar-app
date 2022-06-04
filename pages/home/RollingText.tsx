import React from "react";
import { Easing } from "react-native";
import TextTicker from "react-native-text-ticker";
import { Colors, CommonStyles, Fonts } from "../../common/Styles";

type Props = {
  text: string;
};

export const RollingText = ({ text }: Props) => {
  return (
    <TextTicker
      style={{
        ...CommonStyles.text,
        fontFamily: Fonts.rolling,
        color: Colors.yellow,
        fontSize: 16,
      }}
      loop
      scrollSpeed={20}
      animationType={"scroll"}
      bounce={false}
      scroll={false}
      repeatSpacer={50}
      easing={Easing.linear}
    >
      {text}
    </TextTicker>
  );
};

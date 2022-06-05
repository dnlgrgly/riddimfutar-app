import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { VehicleIcon, VehicleType } from "../../common";

type Props = {
  vehicleType: VehicleType;
};

export const MusicVisualizer = ({ vehicleType }: Props) => {
  const [rotationAnim] = useState(new Animated.Value(0));

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();
  });

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              rotateZ: spin,
            },
          ],
        }}
      >
        <VehicleIcon type={vehicleType} size={150} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

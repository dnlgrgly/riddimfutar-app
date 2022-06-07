import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { TripType, VehicleIcon } from "../../common";

type Props = {
  tripType: TripType;
};

export const MusicVisualizer = ({ tripType }: Props) => {
  const [rotationAnim] = useState(new Animated.Value(0));

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1750,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();
  }, []);

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const reversesSpin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          transform: [
            {
              rotateX: spin,
            },
            {
              rotateY: spin,
            },
            {
              rotateZ: spin,
            },
          ],
        }}
      >
        <VehicleIcon type={tripType} size={150} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          transform: [
            {
              rotateX: reversesSpin,
            },
            {
              rotateY: reversesSpin,
            },
            {
              rotateZ: reversesSpin,
            },
          ],
        }}
      >
        <VehicleIcon type={tripType} size={150} />
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

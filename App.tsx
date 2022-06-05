import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./pages/home/HomePage";
import { PlayerPage } from "./pages/player/PlayerPage";
import { Vehicle } from "./common";
import { StatusBar } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Player: { vehicle: Vehicle };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"light-content"}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Player" component={PlayerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

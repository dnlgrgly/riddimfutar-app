import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./pages/home/HomePage";
import { PlayerPage } from "./pages/player/PlayerPage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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

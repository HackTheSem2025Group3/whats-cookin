import { registerRootComponent } from "expo";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { View } from "react-native";

const App = () => (
  <View>
    <HomeScreen />
  </View>
);
export default App;

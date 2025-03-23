import { registerRootComponent } from "expo";
import React from "react";
import ActivityScreen from "./screens/ActivityScreen";
import { View } from "react-native";

const App = () => (
  <View>
    <ActivityScreen />
  </View>
);
export default App;

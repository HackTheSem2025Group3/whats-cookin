import { registerRootComponent } from "expo";
import React from "react";
import ActivityScreen from "./screens/ActivityScreen";
import Dashboard from "./screens/Dashboard"
import { View } from "react-native";

const App = () => (
  <View>
    {/* <ActivityScreen /> */}
    <Dashboard />
  </View>
);
export default App;

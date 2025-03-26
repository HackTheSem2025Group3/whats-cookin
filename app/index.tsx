import { registerRootComponent } from "expo";
import React from "react";
import ActivityScreen from "./screens/ActivityScreen";
import Scheduler from "./screens/Scheduler"
import { View } from "react-native";

const App = () => (
  <View>
    {/* <ActivityScreen /> */}
    <Scheduler />
  </View>
);
export default App;

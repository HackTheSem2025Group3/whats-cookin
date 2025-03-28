import { registerRootComponent } from "expo";
import React from "react";
import ActivityScreen from "./screens/ActivityScreen";
import Dashboard from "./screens/Dashboard"
import SavedMeals from "./screens/SavedMeals";
import CheckPreferences from "./screens/CheckPreferences"

import { View } from "react-native";

const App = () => (
  <View>
    {/* <ActivityScreen /> */}
    <Dashboard />
    {/* <CheckPreferences/> */}
  </View>
);
export default App;

import React from "react";
import ContextStat from "./components/ContetxStat";
import { registerRootComponent } from "expo";
import StackNavigator from "./navigator/StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

import Apply from "./ingredients/Apply";

export default function App() {
  return (
    <>
      <ContextStat>
        <StackNavigator />
      </ContextStat>
    </>
  );
}
registerRootComponent(App);

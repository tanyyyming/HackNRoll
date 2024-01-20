import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import AlarmClock from './AlarmClock';

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
   <AlarmClock/>
  );
}
//   <View className="flex-1 items-center justify-center bg-white">
//      <Text>Open App.js to start working on your app!</Text>
//      <StatusBar style="auto" />
//    </View>



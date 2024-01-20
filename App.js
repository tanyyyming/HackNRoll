import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlarmClock from './AlarmClock';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
// import Motivation from './Motivation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AlarmClock} />
        {/* <Stack.Screen name="Motivation" component={Motivation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//   <View className="flex-1 items-center justify-center bg-white">
//      <Text>Open App.js to start working on your app!</Text>
//      <StatusBar style="auto" />
//    </View>



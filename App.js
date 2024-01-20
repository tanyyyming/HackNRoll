import React from 'react';
import AlarmClock from './screens/AlarmClock';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Ring from './screens/Ring';
import Lift from './screens/Lift';
import { NativeWindStyleSheet } from "nativewind";
import Motivation from './screens/Motivation';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createStackNavigator();

export default function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Alarm Clock" component={AlarmClock} />
        <Stack.Screen name="Ring" component={Ring} />
        <Stack.Screen name="Motivation" component={Motivation} />
        <Stack.Screen name="Lift" component={Lift} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

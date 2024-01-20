import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import AlarmClock from './AlarmClock';
import Lift from './Lift';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
import Motivation from './Motivation';

export default function App() {
  return (
    <Motivation />
  );
}



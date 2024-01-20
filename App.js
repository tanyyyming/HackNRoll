import React from 'react';
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

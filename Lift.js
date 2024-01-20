import React, { useState, useEffect } from "react";
import { View, Image, Text, Button, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from 'react-native-progress';

function Lift() {

    const [acc, setAcc] = useState(0);
    const threshold = 3;
    return (
  <View className="flex-1 items-center justify-center bg-black">
    <View>
    <Text className="py-12 text-3xl color-white">Raise your phone!</Text>
    </View>
    <Progress.Bar progress={acc/threshold} color={'#FFD500'} height={10} width={300} />
    <Image style={{width: 400, height: 400}} source={require('./assets/23.png')} />
  </View>
 );
}

export default Lift;
//
// <View className="h-3/5 w-2 bg-warm-yellow rounded-lg">
//      <View className="h-1/2 w-2 bg-neutral-200 rounded-lg">
//      </View>
//    </View>


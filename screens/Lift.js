import React, { useState, useEffect } from "react";
import { View, Image, Text, Button, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from 'react-native-progress';
import { Accelerometer } from 'expo-sensors';
import Motivation from './Motivation';

function Lift({navigation}) {
  const [ { x, y, z}, setData] = useState({ x: 0, y: 0, z: 0 });
  const [ maxX, setMaxX ] = useState(0);
  const [ maxY, setMaxY ] = useState(0);
  const [ maxZ, setMaxZ ] = useState(0);
  const [acc, setAcc] = useState(0);
  const REQUIRED_ACC = 7.5;
  const threshold = 3;

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (maxX !== null && x > maxX) {
      setMaxX(x);
    }
    if (maxY!==null && y > maxY) {
      setMaxY(y);
    }
    if (maxZ !== null && z > maxZ) {
      setMaxZ(z);
    }
  }, [x, y, z]);

  useEffect(() => {
    if (maxX !== null && maxX > REQUIRED_ACC) {
      setAcc(acc+1);
      setMaxX(null);
    }
    if (maxY !== null && maxY > REQUIRED_ACC) {
      setAcc(acc+1);
      setMaxY(null);
    }
    if (maxZ !== null && maxZ > REQUIRED_ACC) {
      setAcc(acc+1);
      setMaxZ(null);
    }
    if (acc >= threshold) {
      navigation.navigate('Motivation');
    }
  }, [maxX, maxY, maxZ]);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View>
      <Text className="py-12 text-3xl color-white">Swing your phone in all directions!</Text>
      </View>
      <Progress.Bar progress={acc/threshold} color={'#FFD500'} height={10} width={300} />
      <Image style={{width: 400, height: 400}} source={require('../assets/23.png')} />
      <Button
        title="Go to motivation page"
        onPress={() => navigation.navigate('Motivation')}
        color="#3498db"
      />
    </View>
 );
}

export default Lift;
//
// <View className="h-3/5 w-2 bg-warm-yellow rounded-lg">
//      <View className="h-1/2 w-2 bg-neutral-200 rounded-lg">
//      </View>
//    </View>

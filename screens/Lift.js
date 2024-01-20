import React, { useState, useEffect } from "react";
import { View, Image, Text, Button, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from 'react-native-progress';
import { Accelerometer } from 'expo-sensors';

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
      navigation.navigate('Calculate');
    }
  }, [maxX, maxY, maxZ]);

  return (
    <View className="flex-1 items-center justify-center bg-sky-700">
      <View>
      <Text className="py-12 text-3xl color-white">Swing your phone in all directions!</Text>
      </View>
      <Progress.Bar progress={acc/threshold} color={'#D9B5A9'} height={10} width={300} />
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


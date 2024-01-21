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
  const REQUIRED_ACC = 5.0;
  const threshold = 2;

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
      setAcc(acc => acc + 1);
      setMaxX(null);
    }
    if (maxY !== null && maxY > REQUIRED_ACC) {
      setAcc(acc => acc + 1);
      setMaxY(null);
    }
    if (maxZ !== null && maxZ > REQUIRED_ACC) {
      setAcc(acc => acc + 1);
      setMaxZ(null);
    }
  }, [maxX, maxY, maxZ]);

  useEffect(() => {
    if (acc >= threshold) {
      navigation.navigate('Calculate');
    }
  });

  return (
    <View className="flex-1 align-text align items-center justify-center bg-coconut">
      <View>
      <Text
        className="py-12 text-3xl color-white"
        style={{
          fontFamily: "Optima",
          fontSize: 30,
          fontWeight: "bold",
          color: "#5D2510",
          textAlign: "center",
          marginBottom: -15,
        }}
      >
        Swing Your Phone
      </Text>
      </View>
      <Progress.Bar
        progress={acc/threshold}
        color={'#5D2510'}
        height={10}
        width={300}
        style={{borderRadius: 10, borderWidth: 5, borderColor: '#5D2510'}}
      />
      <Image style={{width: 300, height: 400}} source={require('../assets/swing.png')} />
      {/* <Button
        title="Go to calculate page"
        onPress={() => navigation.navigate('Calculate')}
        color="#3498db"
      /> */}
      <Text
        className="py-12 text-3xl color-white"
        style={{
          fontFamily: "Optima",
          fontSize: 25,
          fontWeight: "bold",
          color: "#5D2510",
          textAlign: "center",
        }}
      >
        In All Directions~
      </Text>
    </View>
 );
}

export default Lift;
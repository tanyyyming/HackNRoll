import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Alert} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";
import { NavigationContainerRefContext } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AlarmClock({ navigation, route }) {
  const [isEnd, setIsEnd]= useState(false);
  const initialAlarmTime = new Date();
  initialAlarmTime.setHours(8, 0, 0, 0);


  const [alarmTime, setAlarmTime] = useState(getData != null? getData():initialAlarmTime);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [sound, setSound] = useState();
  const [soundLoaded, setSoundLoaded] = useState(false);

 const storeData = async (value) => {
   try {
     console.log("store data");
     const jsonValue = JSON.stringify(value);
     await AsyncStorage.setItem('alarm', jsonValue);
   } catch (e) {
     // saving error
   }
 };

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('alarm');
    console.log("get data");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};


  useEffect(() => {
    if (route.params && route.params.isEnd) {
      pauseSound();
    }
  }, [route])

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/ring_song.mp3')
      );
      setSound(sound);
      setSoundLoaded(true);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    hideTimePickerModal();
    if (selectedTime) {
      setAlarmTime(selectedTime);
      storeData(selectedTime);
    }
  };

  async function playSound() {
    if (sound) {
      await sound.playAsync();
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
    }
  }

  useEffect(() => {
    const checkAlarm = setInterval(() => {
        const currentTime = new Date();
        if (
            currentTime.getHours() === alarmTime.getHours() &&
            currentTime.getMinutes() === alarmTime.getMinutes()
        ) {
            playSound();
            // Alert.alert(
            //   "Alarm",
            //   "It is time!",
            //   [
            //     {
            //       text: 'Close',
            //       onPress: () => {
            //         pauseSound();
            //       }
            //     }
            //   ]
            // );
            clearInterval(checkAlarm);
            navigation.navigate('Lift');
        }
    }, 1000);
    return () => clearInterval(checkAlarm);
  }, [soundLoaded, alarmTime]);

  return (
    <View className="flex-1 align-text align items-center justify-center bg-coconut">
      <View className="py-10">
        {!showTimePicker && (
          <Image
            style={{ width: 340, height: 60 }}
            source={require("../assets/logo.png")}
          />
        )}
      </View>
      <View
        style={{
          width: 300,
          height: 300,
          borderRadius: 150,
          borderWidth: 5,
          borderColor: "#5D2510",
          borderStyle: "solid",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          onPress={showTimePickerModal}
          style={{
            fontFamily: "Optima",
            fontSize: 60,
            fontWeight: "bold",
            color: "#5D2510",
            textAlign: "center",
          }}
        >
          {alarmTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={alarmTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          textColor="#5D2510"
          accentColor="#5D2510"
          onChange={handleTimeChange}
        />
      )}

      <View className="py-10">
        <Image
          style={{ width: 110, height: 110 }}
          source={require("../assets/chicken.png")}
        />
      </View>

      {!showTimePicker && (
        <View>
          <Text
            style={{
              fontFamily: "Optima",
              fontSize: 25,
              fontWeight: "bold",
              color: "#5D2510",
              textAlign: "center",
            }}
          >
            All Is Well...
          </Text>
        </View>
      )}

    </View>
  );
}

export default AlarmClock;

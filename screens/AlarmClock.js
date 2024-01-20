import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";

function AlarmClock({ navigation }) {
  const initialAlarmTime = new Date();
  initialAlarmTime.setHours(8, 0, 0, 0);

  const [alarmTime, setAlarmTime] = useState(initialAlarmTime);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [sound, setSound] = useState();
  const [soundLoaded, setSoundLoaded] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/ring_long.mp3')
      );
      setSound(sound);
      setSoundLoaded(true);
      };

      loadSound();

      // Clean up the saound on unmount
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
    }
  };

  function checkAlarm() {
    const currentTime = new Date();
    if (
      currentTime.getHours() === alarmTime.getHours() &&
      currentTime.getMinutes() === alarmTime.getMinutes()
    ) {
      playSound();
      Alert.alert(
        "Alarm",
        "It is time!",
        [
          {
            text: 'Close',
            onPress: () => {
              pauseSound();
            }
          }
        ]
      );
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
    if (soundLoaded) {
      checkAlarm();
    }
  }, [soundLoaded, alarmTime]);

  return (
    <View className="flex-1 align-text align items-center justify-center bg-sky-700">
      <View className="py-10">
        {/* <Text className="text-3xl color-white text-center">Wake</Text> */}
        <Image style={{ width: 340, height: 60}} source={require("../assets/logo.png")} />
      </View>
      <View
        style={{
          width: 300,
          height: 300,
          borderRadius: 150,
          borderWidth: 5,
          borderColor: "#DBD0BD",
          borderStyle: "solid",
          justifyContent: "center",
        }}
      >
        <Text
          onPress={showTimePickerModal}
          style={{
            fontSize: 40,
            color: "white",
            textAlign: "center",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
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
          textColor="white"
          onChange={handleTimeChange}
        />
      )}
      <Button
        title="Go to motivation page"
        onPress={() => navigation.navigate("Motivation")}
        color="#3498db"
      />
      <Button
        title="Go to Lift page"
        onPress={() => navigation.navigate("Lift")}
        color="#3498db"
      />
    </View>
  );
}

export default AlarmClock;

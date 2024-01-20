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
        require("../assets/ring_long.mp3")
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
        Alert.alert("Alarm", "It is time!", [
          {
            text: "Close",
            onPress: () => {
              pauseSound();
            },
          },
        ]);
        clearInterval(checkAlarm);
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
            source={require("../assets/logo.jpg")}
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

      {/* <Button
        title="Go to motivation page"
        onPress={() => navigation.navigate("Motivation")}
        color="#3498db"
      />
      <Button
        title="Go to Lift page"
        onPress={() => navigation.navigate("Lift")}
        color="#3498db"
      /> */}
    </View>
  );
}

export default AlarmClock;

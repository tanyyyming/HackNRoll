import React, { useState, useEffect } from "react";
import { View, Text, Button, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from 'expo-av';

function AlarmClock() {
    const [alarmTime, setAlarmTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [sound, setSound] = useState();
    const [soundLoaded, setSoundLoaded] = useState(false);

    useEffect(() => {
      const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/ring_long.mp3')
        );
        setSound(sound);
        setSoundLoaded(true);
        console.log('sound loaded');
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
      console.log('entered play');
      if (sound) {
        console.log('try to play');
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
        <View className="flex-1 align-text align items-center justify-center bg-black">
          <View className="py-10">
            <Text className="text-3xl color-white">Your next alarm is at</Text>
          </View>
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
              borderWidth: 5,
              borderColor: "#FFD500",
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
                textShadowColor: "rgba(0, 0, 0, 0.5)",
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
              onChange={handleTimeChange}
            />
          )}
        </View>
      );
};

export default AlarmClock;

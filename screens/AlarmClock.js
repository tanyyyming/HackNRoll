
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from 'expo-av';
 
function AlarmClock({navigation}) {
    const [alarmTime, setAlarmTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    
    const [sound, setSound] = useState();
 
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
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('./assets/ring_chicken.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
    }
 
    useEffect(() => {   
        const checkAlarm = setInterval(() => {
            const currentTime = new Date();
            if (
                currentTime.getHours() === alarmTime.getHours() &&
                currentTime.getMinutes() === alarmTime.getMinutes()
            ) {
                // Matched the set alarm time, show an alert
                Alert.alert("Alarm", "It is time!");
                clearInterval(checkAlarm);
                playSound();
            }
        }, 1000); // Check every second
        // Cleanup on component unmount
        return () => {
            clearInterval(checkAlarm);
            if (sound) {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
        };
    }, [alarmTime]);
 
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
            <Button
                title="Go to ringing page"
                onPress={() => navigation.navigate('Ring')}
                color="#3498db"
            />
        </View>
    );
};
 
export default AlarmClock;
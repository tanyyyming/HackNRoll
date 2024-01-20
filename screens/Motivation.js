import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import { Alert } from 'react-native';

function Motivation({ navigation }) {
  const [result, setResult] = useState("");

  const motivationalQuotes = [
    "I am the best, I am the best, I am the best!",
    "I am a winner, I am a winner, I am a winner!",
    "I am a champion, I am a champion, I am a champion!",
  ];
  const [quote, setQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const speechStartHandler = (e) => {
    console.log("speechStart successful", e);
  };
  const speechEndHandler = (e) => {
    console.log("stop handler", e);
  };
  const speechResultsHandler = (e) => {
    const text = e.value[0];
    setResult(text);
  };

  const startRecording = async () => {
    try {
      await Voice.start("en-Us");
    } catch (error) {
      console.log("error", error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      if (isSameSentence(result, quote)) {
        setResult("correct");
        Alert.alert("Congratulation", "You are now awake!");
        navigation.navigate("Alarm Clock");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const clear = () => {
    setResult("");
  };

  const isSameSentence = (str1, str2) => {
    const replacements = [
      { pattern: /\bI'm\b/g, replacement: "I am" },
      { pattern: /\bI've\b/g, replacement: "I have" },
      { pattern: /\bI'll\b/g, replacement: "I will" },
      { pattern: /\bI'd\b/g, replacement: "I would" },
    ]
    for (const { pattern, replacement } of replacements) {
      str1 = str1.replace(pattern, replacement);
      str2 = str2.replace(pattern, replacement);
    }

    const punctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g;
    return (
      str1.replace(punctuation, "").toLowerCase() ===
      str2.replace(punctuation, "").toLowerCase()
    );
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View className="flex-1 align-text align items-center justify-center bg-sky-700">
      <Image style={{ width: 100, height: 100}} source={require("../assets/chicken.png")} />
      <SafeAreaView style={{marginHorizontal:10}} values={['center']}>
        <Text style={styles.headingText}>{quote}</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            multiline={true}
            placeholder="say something!"
            style={{
              flex: 1,
              height: "100%",
            }}
            onChangeText={(text) => setResult(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.speak}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <Icon name="microphone" color="white" size={50} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "light",
    fontSize: 26,
    color: "#DBD0BD",
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: "#DBD0BD",
  },
  speak: {
    backgroundColor: "#D9B5A9",
    display: "flex",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 300,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    with: "50%",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
});
export default Motivation;

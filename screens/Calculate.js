import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Voice from '@react-native-voice/voice';
import { Alert } from 'react-native';

function Calculate({ navigation }) {

  const [answer, setAnswer] = useState('');

  const calculationQnA = [
    {question: '55 x 48', answer: '2640'},
    {question: '33 x 85', answer: '2805'},
    {question: '43 x 79', answer: '3397'},
  ];
  const [qna, setQna] = useState(
    calculationQnA[Math.floor(Math.random() * calculationQnA.length)]
  );

  const handleButtonPress = (digit) => {
    setAnswer(answer + digit,toString());
  }

  const handleDeleteButtonPress = () => {
    setAnswer(answer.slice(0, -1));
  }

  const handleSubmitButtonPress = () => {
    const correctAnswer = qna.answer;
    if (answer === correctAnswer) {
      navigation.navigate("Motivation");
    } else {
      Alert.alert("You are still sleepy!", "Try again my friend");
      setAnswer('');
    }
  }

  return (
    <View className="flex-1 align-text align items-center justify-center bg-coconut">
      <Image style={{ width: 100, height: 100}} source={require("../assets/chicken.png")} />
      <SafeAreaView style={{marginHorizontal:10}} values={['center']}>
        <Text style={styles.headingText}>{qna.question}</Text>
        <View style={styles.btnContainer}>
          <TextInput 
            style={styles.textInputStyle}
            value={answer}
            editable={false}
            placeholder='Your answer'
          />
        </View>
        <View style={styles.btnContainer}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.button}
              onPress={() => handleButtonPress(number)}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btnContainer}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.button}
              onPress={() => handleButtonPress(number)}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btnContainer}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.button}
              onPress={() => handleButtonPress(number)}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btnContainer}>
        <TouchableOpacity
            style={styles.specialButton}
            onPress={handleSubmitButtonPress}
          >
            <Text style={styles.submitButtonText}>OK!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={0}
            style={styles.button}
            onPress={() => handleButtonPress(0)}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.specialButton}
            onPress={handleDeleteButtonPress}
          >
            <Icon name="delete" color="black" size={35} />
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
    fontSize: 40,
    color: "#5D2510",
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  textInputStyle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: "#5D2510",
    fontSize: 24
  },
  button: {
    backgroundColor: "#D9B5A9",
    display: "flex",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 300,
  },
  specialButton: {
    backgroundColor: "#EDE1D2",
    display: "flex",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
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

export default Calculate;

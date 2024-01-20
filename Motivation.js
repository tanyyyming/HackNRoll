import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';

function Motivation() {
  const [result, setResult] = useState('');

  const motivationalQuotes = [
    "I'm the best, I'm the best, I'm the best!",
    "I'm a winner, I'm a winner, I'm a winner!",
    "I'm a champion, I'm a champion, I'm a champion!",
  ];
  const [quote, setQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    console.log('stop handler', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      if (isSameSentence(result, quote)) {
        setResult('correct');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    setResult('');
  };

  const isSameSentence = (str1, str2) => {
    const punctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g;
    return str1.replace(punctuation, '').toLowerCase() === str2.replace(punctuation, '').toLowerCase();
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
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>{quote}</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            multiline={true}
            placeholder= "say something!"
            style={{
              flex: 1,
              height: '100%',
            }}
            onChangeText={text => setResult(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.speak} onPressIn={startRecording} onPressOut={stopRecording}>
            <Icon name="microphone" color="white" size={30}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'red',
    display: 'flex',
    width: '26%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 100,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});
export default Motivation;
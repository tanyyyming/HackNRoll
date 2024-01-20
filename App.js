import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AlarmClock from './screens/AlarmClock';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Ring from './screens/Ring';
import Ex1 from './screens/Ex1';
import Ex2 from './screens/Ex2';

const Stack = createStackNavigator();

export default function App() {
  return (  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Alarm Clock" component={AlarmClock} />
        <Stack.Screen name="Ring" component={Ring} />
        <Stack.Screen name="Ex1" component={Ex1} />
        <Stack.Screen name="Ex2" component={Ex2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

const Ring = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [ { x, y, z}, setData] = useState({ x: 0, y: 0, z: 0 });
  const [ maxX, setMaxX ] = useState(0);
  const [ maxY, setMaxY ] = useState(0);
  const [ maxZ, setMaxZ ] = useState(0);
  
  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (x > maxX) {
      setMaxX(x);
    }
    if (y > maxY) {
      setMaxY(y);
    }
    if (z > maxZ) {
      setMaxZ(z);
    }
  }, [x, y, z]);

  useEffect(() => {
    let subscription;

    const startLocationUpdates = async () => {
      try {
        // Request permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          // Subscribe to location updates
          subscription = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000 },
            (newLocation) => {
              setLocation(newLocation.coords);
            }
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error starting location updates:', error);
      }
    };

    startLocationUpdates();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View>
      {location && (
        <>
          <Text>
            Latitude: {location.latitude.toFixed(6)}, Longitude: {location.longitude.toFixed(6)}, Altitute: {location.altitude}
          </Text>
          <Text>x: {x}</Text>
          <Text>y: {y}</Text>
          <Text>z: {z}</Text>
          <Text>maxX: {maxX}</Text>
          <Text>maxY: {maxY}</Text>
          <Text>maxZ: {maxZ}</Text>
        </>
      )}
    </View>
  );
}

export default Ring
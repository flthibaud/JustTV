import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import VideoScreen from '../screens/VideoScreen';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
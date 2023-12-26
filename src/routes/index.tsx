import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import UploadScreen from '../screens/UploadScreen';
import TabNavigation from './TabNavigation';

const Routes = () => {
  const Stack = createStackNavigator();
  const [isUploaded, setIsUploaded] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isUploaded ? (
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="HomeStack"
            component={TabNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
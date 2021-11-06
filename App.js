import React, {useEffect} from 'react';
import { View, Platform, StatusBar } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import MainNavi from './src/navigation/MainNavi';
import AuthNavi from './src/navigation/AuthNavi';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config)

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthNavi"
          component={AuthNavi}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainNavi"
          component={MainNavi}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

        </Stack.Navigator>
    );
}

export default HomeStack;
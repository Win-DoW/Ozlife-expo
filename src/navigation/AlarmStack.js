import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AlarmScreen from '../screens/Alarm/AlarmScreen';

const Stack = createStackNavigator();

const AlarmStack = () => {
    return (
        <Stack.Navigator initialRouteName="AlarmScreen">

            <Stack.Screen
                name="AlarmScreen"
                component={AlarmScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default AlarmStack;
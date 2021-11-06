import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import OzlifeScreen from '../screens/Ozlife/OzlifeScreen';

const Stack = createStackNavigator();

const OzlifeStack = () => {
    return (
        <Stack.Navigator initialRouteName="OzlifeScreen">

            <Stack.Screen
                name="OzlifeScreen"
                component={OzlifeScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default OzlifeStack;
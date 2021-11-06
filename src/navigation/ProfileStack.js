import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen">

            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default ProfileStack;
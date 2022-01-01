import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ProfileScreen from 'screens/Profile/ProfileScreen';
import ProfileSettingScreen from 'screens/Profile/ProfileSettingScreen';

import ProfileInformationEditScreen from 'screens/Profile/ProfileSetting/ProfileInformationEditScreen';
import NotiManageScreen from 'screens/Profile/ProfileSetting/NotiManageScreen'

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

            <Stack.Screen
                name="ProfileSettingScreen"
                component={ProfileSettingScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="ProfileInformationEditScreen"
                component={ProfileInformationEditScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="NotiManageScreen"
                component={NotiManageScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default ProfileStack;
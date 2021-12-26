import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MainTab from './MainTab';

import ProfileInformationEditScreen from '../screens/Profile/ProfileInformationEditScreen';
import SettingStoreManageScreen from '../screens/Profile/SettingStoreManageScreen'

const Stack = createStackNavigator();

const MainNavi = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen 
                name="MainTab" 
                component={MainTab}
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
                name="SettingStoreManageScreen"
                component={SettingStoreManageScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default MainNavi;
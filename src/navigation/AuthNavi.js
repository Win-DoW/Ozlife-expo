import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MainNavi from 'navigation/MainNavi';

import AppStartScreen from 'screens/Auth/AppStartScreen';

import LoginScreen from 'screens/Auth/Login/LoginScreen';

import SignUpStartScreen from 'screens/Auth/SignUp/SignUpStartScreen';
import SignUpFinishScreen from 'screens/Auth/SignUp/SignUpFinishScreen';

import SignUpStoreSearchScreen from 'screens/Auth/SignUp/Store/SignUpStoreSearchScreen';
import SignUpStoreCheckScreen from 'screens/Auth/SignUp/Store/SignUpStoreCheckScreen';
import SignUpStoreAddScreen from 'screens/Auth/SignUp/Store/SignUpStoreAddScreen';
import SignUpStoreFinishScreen from 'screens/Auth/SignUp/Store/SignUpStoreFinishScreen';

const Stack = createStackNavigator();

const AuthNavi = () => {
    return (
        <Stack.Navigator initialRouteName="AppStartScreen">

            <Stack.Screen
                name="AppStartScreen"
                component={AppStartScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpStartScreen"
                component={SignUpStartScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpFinishScreen"
                component={SignUpFinishScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpStoreSearchScreen"
                component={SignUpStoreSearchScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpStoreCheckScreen"
                component={SignUpStoreCheckScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpStoreAddScreen"
                component={SignUpStoreAddScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUpStoreFinishScreen"
                component={SignUpStoreFinishScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="MainNavi"
                component={MainNavi}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />

        </Stack.Navigator>
    );
}

export default AuthNavi;
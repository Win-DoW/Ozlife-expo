import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MainNavi from './MainNavi';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ConfirmScreen from '../screens/Auth/ConfirmScreen';
import NewProfileScreen from '../screens/Auth/NewProfileScreen';
import FinishScreen from '../screens/Auth/FinishScreen';

const Stack = createStackNavigator();

const AuthNavi = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: "로그인",
                }}
            />

            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: "회원가입",
                }}
            />

            <Stack.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{
                    title: "인증번호 확인",
                    headerLeft: null,
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen
                name="NewProfileScreen"
                component={NewProfileScreen}
                options={{
                    title: "정보 입력",
                    headerLeft: null,
                    gestureEnabled: false,
                }}
            />

            <Stack.Screen
                name="FinishScreen"
                component={FinishScreen}
                options={{
                    title: "가입 완료",
                    headerLeft: null,
                    gestureEnabled: false,
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
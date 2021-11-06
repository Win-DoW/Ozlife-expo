import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FindScreen from '../screens/find/FindScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import NotiScreen from '../screens/notification/NotiScreen';
import OzlifeScreen from '../screens/ozlife/OzlifeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const FindStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NotiStack = createStackNavigator();
const OzlifeStack = createStackNavigator();
const ProfileStack = createStackNavigator();


const FindStackScreen = () => {
    return (
        <FindStack.Navigator>
            <FindStack.Screen
                name='Find'
                component={FindScreen}
                options={{headerShown:false}}
            />
        </FindStack.Navigator>
    );
}

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
                name='Chat'
                component={ChatScreen}
                options={{headerShown:false}}
            />
        </ChatStack.Navigator>
    );
}

const OzlifeStackScreen = () => {
    return (
        <OzlifeStack.Navigator>
            <OzlifeStack.Screen
                name='Ozlife'
                component={OzlifeScreen}
                options={{headerShown:false}}
            />
        </OzlifeStack.Navigator>
    );
}

const NotiStackScreen = () => {
    return (
        <NotiStack.Navigator>
            <NotiStack.Screen
                name='Notification'
                component={NotiScreen}
                options={{headerShown:false}}
            />
        </NotiStack.Navigator>
    );
}

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{headerShown:false}}
            />
        </ProfileStack.Navigator>
    );
}

export default [
    {
        id: 1,
        name: "찾기",
        com: FindStackScreen,
        inactiveIcon: require("../assets/BottomTabIcons/find.png"),
        activeIcon: require("../assets/BottomTabIcons/find_2.png"),
    },
    {
        id: 2,
        name: "채팅",
        com: ChatStackScreen,
        inactiveIcon: require("../assets/BottomTabIcons/savelove.png"),
        activeIcon: require("../assets/BottomTabIcons/savelove_2.png"),
    },
    {
        id: 3,
        name: "오지랖",
        com: OzlifeStackScreen,
        inactiveIcon: require("../assets/BottomTabIcons/ozlife.png"),
        activeIcon: require("../assets/BottomTabIcons/ozlife_2.png"),
    },
    {
        id: 4,
        name: "알림",
        com: NotiStackScreen,
        inactiveIcon: require("../assets/BottomTabIcons/alarmi.png"),
        activeIcon: require("../assets/BottomTabIcons/alarmi_2.png"),
    },
    {
        id: 5,
        name: "프로필",
        com: ProfileStackScreen,
        inactiveIcon: require("../assets/BottomTabIcons/profile.png"),
        activeIcon: require("../assets/BottomTabIcons/profile_2.png"),
    }
];

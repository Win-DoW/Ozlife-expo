import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';

import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import OzlifeStack from './OzlifeStack';
import AlarmStack from './AlarmStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === '찾기') {
                        icon = focused ? iconUrl[0].activeIcon : iconUrl[0].inactiveIcon;
                    } else if (route.name === '채팅') {
                        icon = focused ? iconUrl[1].activeIcon : iconUrl[1].inactiveIcon;
                    } else if (route.name === '오지랖') {
                        icon = focused ? iconUrl[2].activeIcon : iconUrl[2].inactiveIcon;
                    } else if (route.name === '알림') {
                        icon = focused ? iconUrl[3].activeIcon : iconUrl[3].inactiveIcon;
                    } else if (route.name === '프로필') {
                        icon = focused ? iconUrl[4].activeIcon : iconUrl[4].inactiveIcon;
                    }

                    return (
                        <Image
                            source={icon}
                            style={{width: 24, height: 24}}
                        />
                    )
                },
                tabBarShowLabel: true,
            })}
        >

            <Tab.Screen 
                name="찾기" 
                component={HomeStack}
                options={{
                    headerShown: false
                }} 
            />

            <Tab.Screen
                name="채팅" 
                component={ChatStack}
                options={{
                    headerShown: false
                }} 
            />

            <Tab.Screen 
                name="오지랖" 
                component={OzlifeStack}
                options={{
                    headerShown: false
                }} 
            />

            <Tab.Screen 
                name="알림" 
                component={AlarmStack}
                options={{
                    headerShown: false
                }} 
            />

            <Tab.Screen 
                name="프로필" 
                component={ProfileStack}
                options={{
                    headerShown: false
                }} 
            />

        </Tab.Navigator>
    );
}

export default MainTab;

const iconUrl = [
    {
        id: 0,
        name: "찾기",
        inactiveIcon: require("../assets/BottomTabIcons/find.png"),
        activeIcon: require("../assets/BottomTabIcons/find_2.png"),
    },
    {
        id: 1,
        name: "채팅",
        inactiveIcon: require("../assets/BottomTabIcons/savelove.png"),
        activeIcon: require("../assets/BottomTabIcons/savelove_2.png"),
    },
    {
        id: 2,
        name: "오지랖",
        inactiveIcon: require("../assets/BottomTabIcons/ozlife.png"),
        activeIcon: require("../assets/BottomTabIcons/ozlife_2.png"),
    },
    {
        id: 3,
        name: "알림",
        inactiveIcon: require("../assets/BottomTabIcons/alarmi.png"),
        activeIcon: require("../assets/BottomTabIcons/alarmi_2.png"),
    },
    {
        id: 4,
        name: "프로필",
        inactiveIcon: require("../assets/BottomTabIcons/profile.png"),
        activeIcon: require("../assets/BottomTabIcons/profile_2.png"),
    }
];
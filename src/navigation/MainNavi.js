import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MainTab from './MainTab';
import StoreProfileScreen from '../screens/Profile/StoreProfile/StoreProfileScreen'

import ChatRoomScreen from '../screens/Chat/ChatRoomScreen';

import OzlifeDetailScreen from '../screens/Ozlife/OzlifeDetailScreen';
import OzlifeManageScreen from '../screens/Ozlife/OzlifeManageScreen';
import OzlifeMapScreen from '../screens/Ozlife/OzlifeMapScreen';
import OzlifeProfileScreen from '../screens/Ozlife/OzlifeProfileScreen';
import OzlifeTimeScreen from '../screens/Ozlife/OzlifeTimeScreen';
import OzlifeWriteScreen from '../screens/Ozlife/OzlifeWriteScreen';
import First from '../screens/Ozlife/OzlifeVisit/First';
import Second from '../screens/Ozlife/OzlifeVisit/Second';
import Third from '../screens/Ozlife/OzlifeVisit/Third';
import Fourth from '../screens/Ozlife/OzlifeVisit/Fourth';
import Fifth from '../screens/Ozlife/OzlifeVisit/Fifth';

import CommentWriteScreen from '../screens/Ozlife/CommentWriteScreen';
import CommentViewScreen from '../screens/Ozlife/CommentViewScreen';

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
                name="StoreProfileScreen" 
                component={StoreProfileScreen}
                options={{
                    headerShown: false
                }} 
            />

            <Stack.Screen 
                name="ChatRoomScreen" 
                component={ChatRoomScreen}
                options={{
                    headerShown: false
                }} 
            />
            


            <Stack.Screen
                name="OzlifeDetailScreen"
                component={OzlifeDetailScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OzlifeManageScreen"
                component={OzlifeManageScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OzlifeMapScreen"
                component={OzlifeMapScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OzlifeProfileScreen"
                component={OzlifeProfileScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OzlifeTimeScreen"
                component={OzlifeTimeScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OzlifeWriteScreen"
                component={OzlifeWriteScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="First"
                component={First}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Second"
                component={Second}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Third"
                component={Third}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Fourth"
                component={Fourth}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Fifth"
                component={Fifth}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="CommentWriteScreen"
                component={CommentWriteScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="CommentViewScreen"
                component={CommentViewScreen}
                options={{
                    headerShown: false
                }}
            />
            

        </Stack.Navigator>
    );
}

export default MainNavi;
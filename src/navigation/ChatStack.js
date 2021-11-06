import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ChatScreen from '../screens/Chat/ChatScreen';

const Stack = createStackNavigator();

const ChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="ChatScreen">

            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default ChatStack;
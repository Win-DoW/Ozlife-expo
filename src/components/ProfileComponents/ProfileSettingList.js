import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileSettingList = ({ text, press, style, textStyle }) => {

    return (
        <Pressable style={[styles.container, style]} onPress={press}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
            <Pressable>
                <Ionicons name="chevron-forward-outline" size={18} color="#000000" />
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 65,
        backgroundColor: '#FFFFFF',
        paddingLeft: 24,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DDDDDD'
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default ProfileSettingList;
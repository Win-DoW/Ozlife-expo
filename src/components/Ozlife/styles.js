import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 130,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#ffffff'
    },
    image: {
        height: 114,
        aspectRatio: 1/1,
        marginLeft: 20,
        marginRight: 16,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    textbox: {
        height: 114,
        flex: 1,
        marginRight: 20,
        justifyContent: 'space-around'
    }
})

export default styles;
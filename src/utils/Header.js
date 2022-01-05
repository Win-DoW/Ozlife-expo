import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AppHeader = ({
    title,
    titlePress,
    noIcon,
    rightIcon,
    rightIconPress,
    leftIcon,
    leftIconPress,
}) => {

    return (
        <View style={styles.container}>
            {leftIcon &&
                <TouchableOpacity
                    style={styles.leftIcon}
                    onPress={leftIconPress}
                >
                    {leftIcon}
                </TouchableOpacity>

            }
            <View style={[styles.titleContainer, noIcon ? {} : { alignSelf: 'center' }]}>
                <TouchableOpacity
                    onPress={titlePress}
                    disabled={titlePress ? false : true}
                >
                    <Text style={styles.titleText}> {title} </Text>
                </TouchableOpacity>
            </View>
            {rightIcon &&
                <TouchableOpacity
                    style={styles.rightIcon}
                    onPress={rightIconPress}
                >
                    {rightIcon}
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderColor: "#dddddd",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        justifyContent: 'center',
    },
    leftIcon: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center'
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default AppHeader;
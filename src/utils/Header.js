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
    },
    titleContainer: {
        justifyContent: 'center',
    },
    leftIcon: {
        position: 'absolute',
        top: 10,
        left: 20,
        justifyContent: 'center'
    },
    rightIcon: {
        position: 'absolute',
        top: 10,
        right: 20,
        justifyContent: 'center'
    },

    titleText: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default AppHeader;
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const AppStartScreen = ({ navigation, route }) => {

    const goToLogin = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: windowHeight * 0.25 }}>
                <Image
                    source={require('../../assets/Auth/start_logo.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>

            <View style={{ marginTop: 16 }}>
                <Text style={styles.mainText}>소상공인을 위한</Text>
                <Text style={styles.mainText}>따뜻한 컨설팅, 오지랖</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 16, marginBottom: 15 }}>
                <TouchableOpacity style={styles.button} onPress={goToLogin}>
                    <Text style={styles.buttonText}>이메일로 시작하기</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: 156,
        height: 48,
        alignSelf: 'center'
    },
    mainText: {
        fontSize: 16,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#15b6f1',
        borderRadius: 3,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF'
    }
})

export default AppStartScreen;
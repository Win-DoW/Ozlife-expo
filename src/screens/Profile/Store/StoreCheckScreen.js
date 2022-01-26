import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from 'utils/Header';
import axios from 'axios';
import AnimatedLoader from 'react-native-animated-loader';

const StoreCheckScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);

    const [store, setStore] = useState(route.params.store);
    const [type, setType] = useState('');

    const ref_license = useRef();

    const checkStore = async() => {
        try {
            setVisible(true);

            const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=3LxqPx%2FLspeZheroZjI7VTIyuj1Hjp2PIf7jpS28U22lC2iHecTpn8g7UGISPG16LVZudKBfvgrTgRF7unal7A%3D%3D';
            const { data } = await axios({
                method: 'post',
                url,
                headers: {}, 
                data: {
                    "b_no": [
                        store.license
                    ],
                }
            });

            setVisible(false);            

            const storeInfo = data.data[0];
            setType(storeInfo.tax_type);

            console.log(storeInfo.b_stt_cd)

            if(storeInfo.b_stt_cd === "01") {
                navigation.navigate('StoreAddScreen', {
                    store 
                });
            }            

        } catch (e) {
            console.log(e)
            setVisible(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'null'}
        >
            <SafeAreaView style={styles.container}>

                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../../utils/Loader.json")}
                    animationStyle={{width: 300, height: 300}}
                    speed={1}
                />

                <AppHeader
                    title={"사업자등록정보"}
                    noIcon={false}
                    leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                    leftIconPress={() => navigation.goBack()}
                />

                <View style={{...styles.formBox, marginTop: 24}}>
                    <Text style={styles.formBoxTitle}>사업자등록번호</Text>
                    <TextInput
                        ref={ref_license}
                        style={styles.textinput}
                        placeholder="사업자등록번호를 입력하세요."
                        placeholderTextColor="#ddd"
                        onChangeText={(value) => setStore({...store, 'license': value})}
                        returnKeyType='next'
                        value={store.license}
                    />
                </View>

                <Text style={{margin: 20}}>{type}</Text>

                <Pressable 
                    style={styles.button} 
                    onPress={() => checkStore()}
                >
                    <Text style={styles.buttontext}>조회</Text>
                </Pressable>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    formBox: {
        paddingHorizontal: 24,
        marginBottom: 25
    },
    formBoxTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8
    },
    buttonBox: {
        flexDirection: 'row'
    },
    storeExistBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#15b6f1'
    },
    storeExistText: {
        fontSize: 14,
        color: '#FFFFFF'
    },
    storeNoneExistBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC'
    },
    storeNoneExistText: {
        fontSize: 14,
        color: '#CCCCCC'
    },
    textinput: {
        fontSize: 14,
        paddingVertical: 10,
        color: '#666',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    imageview: {
        width: 66,
        height: 66,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePlusBtn: {
        position: 'absolute',
        bottom: -10,
        right: -10,
    },
    imageAddText: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    imageContainer: {
        flexDirection: 'row'
    },
    image: {
        height: 66,
        width: 66,
        justifyContent: 'flex-end',
        marginRight: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        overflow: 'visible'
    },
    optionText: {
        fontSize: 14,
        color: '#AAAAAA'
    },
    errorText: {
        fontSize: 12,
        lineHeight: 24,
        color: '#FF4444',
        fontWeight: '400',
        marginTop: 8
    },
    button: {
        height: 60,
        backgroundColor: '#15b6f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttontext: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    },
})

export default StoreCheckScreen;
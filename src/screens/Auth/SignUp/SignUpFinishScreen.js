import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, ImageBackground, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

import AppHeader from "utils/Header";

const SignUpFinishScreen = ({ navigation, route }) => {

    const ref_nickname = useRef()

    const [nickname, setNickname] = useState('')
    const [file, setFile] = useState(undefined);
    const [interest, setInterest] = useState('')

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setFile(result.uri);
        }
    };

    const checkFile = () => {
        if(file != undefined) {
            return true
        } else {
            return false
        }
    }

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                title={"정보 입력"}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
                leftIconPress={goToBack}
            />

            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.formBox}>
                    <Text style={styles.bigText}>닉네임</Text>
                    <TextInput
                        ref={ref_nickname}
                        style={styles.textInput}
                        placeholder="닉네임을 적어주세요."
                        placeholderTextColor="#dddddd"
                        onChangeText={(text) => setNickname(text)}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_password.current.focus()}
                    />
                </View>

                <View style={styles.formBox}>
                    <Text style={styles.bigText}>프로필 이미지</Text>
                    <ImageBackground
                        style={styles.image}
                        imageStyle={{ borderRadius: 100}}
                        source={checkFile() ?  { uri: file } : require('assets/Auth/image-not-select.png')}
                    >
                        <Pressable onPress={imagePicker}>
                            <Image style={{height: 24, width: 24}} source={require('assets/images/icon-plus.png')}/>
                        </Pressable>
                    </ImageBackground>
                </View>

                <View style={styles.formBox}>
                    <Text style={styles.bigText}>관심 영역 선택</Text>
                    <View style={styles.interestPicker}>
                        <RNPickerSelect
                            value={ interest }
                            placeholder={{ label: '영역을 선택해주세요.' }}
                            name="interest"
                            onValueChange={(value) => setInterest(value)}
                            items={[
                                { label: '맛보기', value: '맛보기' },
                                { label: '홍보/마케팅', value: '홍보/마케팅' },
                                { label: '메뉴개발', value: '메뉴개발' },
                                { label: '인테리어', value: '인테리어' },
                                { label: '디자인', value: '디자인' },
                                { label: '정부지원사업 신청', value: '정부지원사업 신청' },
                                { label: '법률', value: '법률' },
                                { label: '회계', value: '회계' },
                            ]}
                            style={{
                                placeholder: interest === '' ? {color: '#ddd', fontSize: 14} : styles.interestPlaceholder,
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    formBox: {
        paddingHorizontal: 24,
        paddingTop: 24
    },
    bigText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        color: '#000000'
    },
    textInput: {
        fontSize: 14,
        height: 36,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    image: {
        height: 66,
        width: 66,
        borderRadius: 33,
        marginTop: 8,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    interestPicker: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 36,
        justifyContent: 'center'
    },
    interestPlaceholder: {
        color: '#666',
        fontSize: 14
    },
})

export default SignUpFinishScreen;
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView, TextInput, ImageBackground, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileInformationEditScreen = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        id: '',
        email: '',
        nickname: '',
        interest: '',
        profile: '',
        region: ''
    });

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>

<           Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />

            <View style={styles.header}>
                <Pressable style={styles.backIcon} onPress={goToBack}>
                    <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                </Pressable>
                <Text style={styles.headerText}>정보 수정</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.formBox}>
                    <Text style={styles.formMainText}>닉네임</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="최우창"
                        placeholderTextColor="#ddd"
                        onChange={(value) => setInputs({...inputs, 'nickname:': value})}
                    />
                </View>

                <View style={styles.formBox}>
                    <Text style={styles.formMainText}>프로필 이미지</Text>
                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 100}} source={require('../../assets/dog1.jpg')}>
                        <Pressable>
                            <Image style={{height: 24, width: 24}} source={require('../../assets/images/icon-plus.png')}/>
                        </Pressable>
                    </ImageBackground>
                </View>

                <View style={styles.formBox}>
                    <Text style={styles.formMainText}>관심 영역 선택</Text>
                    <View style={styles.interestPicker}>
                        <RNPickerSelect
                            placeholder={ inputs.interest === '' ? { label: "영역을 선택해주세요.", value: '' } : { label: inputs.interest, value: inputs.interest }}
                            name="interest"
                            onValueChange={(value) => setInputs({...inputs, 'interest': value})}
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
                                placeholder: inputs.interest === '' ? {color: '#ddd', fontSize: 14} : styles.interestPlaceholder,
                            }}
                        />
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        width: '100%',
        height: 56,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        position: 'absolute',
        left: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 24
    },
    formBox: {
        marginTop: 25
    },
    formMainText:{
        fontSize: 16,
        fontWeight: '500',
    },
    textinput: {
        fontSize: 14,
        height: 36,
        color: '#666',
        borderBottomColor: '#dddddd',
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
    spinnerTextStyle: {
        color: '#FFF',
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
    }
})

export default ProfileInformationEditScreen;
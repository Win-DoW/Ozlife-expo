import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Image, ImageBackground, Pressable, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import AnimatedLoader from 'react-native-animated-loader';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Device from 'expo-device';

import AppHeader from "utils/Header";

import { createUser, updateUser } from 'graphql/mutations';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'

const SignUpFinishScreen = ({ navigation, route }) => {

    const email = route.params.email
    const password = route.params.password

    const ref_nickname = useRef()
    const ref_phoneNumber = useRef()
    const ref_authNumber = useRef()

    const [visible, setVisible] = useState(false);

    const [nickname, setNickname] = useState('')
    const [file, setFile] = useState('');
    const [interest, setInterest] = useState('')
    const [region, setRegion] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [authNumber, setAuthNumber] = useState('')

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [firstClick, setFirstClick] = useState(false)

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

    const getVerifyNum = async() => {
        try {
            if(!firstClick) {
                setFirstClick(true)
                await Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        phone_number: '+82' + phoneNumber,
                    }
                })
            } else {
                setError(false)
                await Auth.resendSignUp(email)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const registerForPushNotificationsAsync = async() => {
        try {
          let token;
          // 실제 디바이스에서만 동작
          if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            // 권한 부여 됬는지 확인 후 권한을 요청
            if (existingStatus !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
    
            // 아직까지 권한을 받지 못했다면 알림 푸시 토큰을 받지 못했다고 경고
            if (finalStatus !== 'granted') {
              console.log("Failed to get push token for push notification!")
              return;
            }
    
            token = (await Notifications.getExpoPushTokenAsync()).data;
          } else {
            // 에뮬레이터나 시뮬레이터인 경우
            console.log("Must use physical device for Push Notifications")
          }
    
          // 안드로이드의 경우 설정이 별도로 필요
          if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
              name: "Ozlife",
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: "#FF231F7C",
            });
          }
    
          if(token) {
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            await API.graphql(graphqlOperation(updateUser, {
              input: {
                id: userKey.attributes.sub,
                noti_token: token
              }
            }))
          } else {
            console.log('토큰이 존재하지 않습니다.')
          }
        } catch(e) {
          console.log(e)
        }
    }

    const confirmSignUp = async() => {
        try {

            await Auth.confirmSignUp(email, authNumber);
            await Auth.signIn(email, password);

            setVisible(true)
            
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            const photo = await fetch(file)
            const photoBlob = await photo.blob();
            const result = await Storage.put(`${userKey.attributes.sub}/MyProfile.jpg`, photoBlob, {
                contentType: 'image/jpeg',
            });

            await API.graphql(graphqlOperation(createUser, {
                input: {
                    id: userKey.attributes.sub,
                    email: email,
                    nickname: nickname,
                    profile: '',
                    interest: interest,
                    region: region,
                    image: result.key,
                    noti_token: ''
                }
            }))

            registerForPushNotificationsAsync()
            
            setVisible(true)

            navigation.reset({routes: [{name: 'SignUpStoreAddScreen'}]});



        } catch(error) {
            console.log('error confirming sign up', error);
            setError(true);
            setVisible(false);
            if(error.message === 'User already exists') {
                setErrorMessage('이미 가입되어 있는 이메일입니다.')
            } else {
                setErrorMessage('인증에 실패했습니다. 입력하신 정보를 다시 확인해주세요.')
            }
        }
    }

    const checkFile = () => {
        if(file != '') {
            return true
        } else {
            return false
        }
    }

    const checkInput = () => {
        if(nickname != '' && file != '' && interest != '' && region != '') {
            return true;
        } else {
            return false;
        }
    }
    
    const checkPhoneNumber = () => {
        if(phoneNumber.length == 11) {
            return true;
        } else {
            return false;
        }
    }

    const checkAuthNumber = () => {
        if(authNumber != '') {
            return true;
        } else {
            return false;
        }
    }

    const totalCheck = () => {
        if(checkInput() && checkPhoneNumber()) {
            return true;
        } else {
            return false;
        }
    }

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>

            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("utils/Loader.json")}
                animationStyle={{ width: 300, height: 300 }}
                speed={1}
            />

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
                        onSubmitEditing={() => Keyboard.dismiss()}
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
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: '영역을 선택해주세요.', value: '' }}
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
                            style={{ inputAndroid: { color: 'black' } }}
                        />
                    </View>
                </View>

                <View style={styles.formBox}>
                    <Text style={styles.bigText}>거주 지역</Text>
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "지역을 선택해주세요.", value: '' }}
                            name = "region"
                            onValueChange={(value) => setRegion(value)}
                            items={[
                                { label: '부산 부산진구', value: '부산 부산진구' },
                                { label: '부산 해운대구', value: '부산 해운대구' },
                                { label: '부산 사하구', value: '부산 사하구' },
                                { label: '부산 북구', value: '부산 북구' },
                                { label: '부산 남구', value: '부산 남구' },
                                { label: '부산 동래구', value: '부산 동래구' },
                                { label: '부산 금정구', value: '부산 금정구' },
                                { label: '부산 사상구', value: '부산 사상구' },
                                { label: '부산 연제구', value: '부산 연제구' },
                                { label: '부산 수영구', value: '부산 수영구' },
                                { label: '부산 기장군', value: '부산 기장군' },
                                { label: '부산 강서구', value: '부산 강서구' },
                                { label: '부산 영도구', value: '부산 영도구' },
                                { label: '부산 서구', value: '부산 서구' },
                                { label: '부산 동구', value: '부산 동구' },
                                { label: '부산 중구', value: '부산 중구' },
                            ]}
                            style={{ inputAndroid: { color: 'black' } }}
                        />
                    </View>
                </View>
                {
                    checkInput() ?
                    null
                    :
                    <View style={{paddingHorizontal: 24, marginTop: 5}}>
                        <Text style={styles.errorMessage}>모든 정보를 입력해주세요.</Text>
                    </View>
                }

                <View style={styles.formBox}>
                    <Text style={styles.bigText}>휴대폰번호</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <TextInput
                        ref={ref_phoneNumber}
                        style={[styles.textInput, {flex: 1, marginRight: 10}]}
                        placeholder="휴대폰 번호 입력"
                        placeholderTextColor="#CCCCCC"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        maxLength={11}
                        keyboardType="number-pad"
                        returnKeyType="done"
                      />
                      <TouchableOpacity
                        style={{...styles.phoneNumberBoxBtn, backgroundColor: totalCheck() ? '#15b6f1' : '#cccccc'}} 
                        onPress={totalCheck() ? getVerifyNum : null}
                      >
                        <Text style={styles.phoneNumberBoxBtnText}>
                            {
                                firstClick ?
                                '인증번호 재전송'
                                :
                                '인증번호 받기'
                            }
                        </Text>
                      </TouchableOpacity>
                    </View>
                </View>
                {
                    checkPhoneNumber() ?
                    null
                    :
                    <View style={{paddingHorizontal: 24, marginTop: 5}}>
                        <Text style={styles.errorMessage}>11자리 휴대폰 번호를 입력해주세요.</Text>
                    </View>
                }
                {
                    firstClick ?
                    <View style={styles.formBox}>
                      <Text style={styles.bigText}>인증번호 입력</Text>
                      <TextInput
                        ref={ref_authNumber}
                        style={styles.textInput}
                        value={authNumber}
                        onChangeText={(text) => setAuthNumber(text)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                      />
                    </View>
                    :
                    null
                }
                {
                    error ?
                    <View style={{paddingHorizontal: 24, marginTop: 5}}>
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>
                    :
                    null
                }
            </KeyboardAwareScrollView>
            <TouchableOpacity
                style={{...styles.button, backgroundColor: checkAuthNumber() && totalCheck() ? '#15b6f1' : '#cccccc'}}
                onPress={checkAuthNumber() && totalCheck() ? confirmSignUp : null}
            >
                <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>

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
    pickerContainer: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 36,
        justifyContent: 'center'
    },
    button: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
    },
    phoneNumberBoxBtn: {
        width: 112,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    phoneNumberBoxBtnText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 28,
        color: '#FFFFFF',
    },
    errorMessage: {
        fontSize: 12,
        fontWeight: "500",
        color: "#f44",
    },
})

export default SignUpFinishScreen;
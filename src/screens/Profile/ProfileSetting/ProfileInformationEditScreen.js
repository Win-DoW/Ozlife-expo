import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView, TextInput, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUserOnProfileInformationEditScreen } from 'graphql/custom'
import { updateUser } from 'graphql/mutations'

import Header from 'utils/Header';

import RNPickerSelect from 'react-native-picker-select';
import AnimatedLoader from 'react-native-animated-loader';

import * as ImagePicker from 'expo-image-picker';

const ProfileInformationEditScreen = ({ navigation, route }) => {

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        fetchData();
      });

      return unsubscribe;
    }, [navigation]);
    
    const [userData, setUserData] = useState({})
    const [visible, setVisible] = useState(false);
    const [inputs, setInputs] = useState({        
        nickname: '',
        image: '',
        interest: '',
        region: '',
        profile: '',
    });
    const [file, setFile] = useState(undefined);

    const fetchData = async () => {
      try {
        setVisible(true);
        const userKey = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        let user = await API.graphql(
          graphqlOperation(getUserOnProfileInformationEditScreen, {
            id: userKey.attributes.sub,
          })
        );
        const image = await Storage.get(user.data.getUser.image);
        user.data.getUser.get_image = image
        setUserData(user.data.getUser)
        setInputs({
            nickname: user.data.getUser.nickname,
            image: user.data.getUser.image,
            interest: user.data.getUser.interest,
            region: user.data.getUser.region,
            profile: user.data.getUser.profile,
        })
        setVisible(false);
      } catch (e) {
        setVisible(false);
        console.log(e);
      }
    };

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

    const goToBack = () => {
        navigation.pop();
    }
    
    const clickEditComplete = async() => {
        try {
            let storeImage;

            if(file != undefined) {
                const photo = await fetch(file)
                const photoBlob = await photo.blob();

                const result = await Storage.put(`${userData.id}/MyProfile.jpg`, photoBlob, {
                    contentType: 'image/jpeg',
                });

                storeImage = result.key
            } else {
                storeImage = userData.image
            }

            await API.graphql(graphqlOperation(updateUser, {
                input: {
                    id: userData.id,
                    nickname: inputs.nickname,
                    image: storeImage,
                    interest: inputs.interest,
                    region: inputs.region,
                    profile: inputs.profile
                }
            }))
            navigation.pop()
        } catch (e) {
            console.log(e)
        }
    }

    const checkFile = () => {
        if(file != undefined) {
            return true
        } else {
            return false
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
                    source={require("utils/Loader.json")}
                    animationStyle={{ width: 300, height: 300 }}
                    speed={1}
                />

                <Header
                    title={'정보 수정'}
                    noIcon={false}
                    leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
                    leftIconPress={goToBack}
                />

                <ScrollView style={styles.scrollContainer} overScrollMode='always'>
                    <View style={styles.formBox}>
                        <Text style={styles.bigText}>닉네임</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={userData.nickname}
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setInputs({...inputs, 'nickname': value})}
                        >{inputs.nickname}</TextInput>
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.bigText}>프로필 이미지</Text>
                        <ImageBackground style={styles.image} imageStyle={{ borderRadius: 100}} source={{ uri: checkFile() ? file : userData.get_image }}>
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
                                value={ inputs.interest }
                                placeholder={{ label: '영역을 선택해주세요.', value: '' }}
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
                                style={{ inputAndroid: { color: '#666666' }, inputIOS: { color: '#666666' } }}
                            />
                        </View>
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.bigText}>거주 지역</Text>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                value={ inputs.region }
                                placeholder={{ label: "지역을 선택해주세요.", value: '' }}
                                name = "region"
                                onValueChange={(value) => setInputs({...inputs, 'region': value})}
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
                                style={{ inputAndroid: { color: '#666666' }, inputIOS: { color: '#666666' } }}
                            />
                        </View>
                    </View>

                    <View style={[styles.formBox, {marginBottom: 100}]}>
                        <Text style={styles.bigText}>자기소개</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={userData.profile}
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setInputs({...inputs, 'profile': value})}
                        >{inputs.profile}</TextInput>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.bottomBtn} onPress={clickEditComplete}>
                    <Text style={styles.bottomBtnText}>완료</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scrollContainer: {
        paddingHorizontal: 24
    },
    formBox: {
        marginTop: 25
    },
    textInput: {
        fontSize: 14,
        height: 36,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        color: '#666666'
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
    bottomBtn: {
        width: '100%',
        backgroundColor: '#15b6f1',
        paddingTop: 17,
        paddingBottom: 19,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF'
    },
    bigText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        color: '#000000'
    }
})

export default ProfileInformationEditScreen;
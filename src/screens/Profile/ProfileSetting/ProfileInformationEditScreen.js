import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView, TextInput, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUser } from '../../../graphql/queries'
import { updateUser } from '../../../graphql/mutations'

import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';

const ProfileInformationEditScreen = ({ navigation, route }) => {

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        fetchUserData();
      });

      return unsubscribe;
    }, [navigation]);
    
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({        
        nickname: '',
        image: '',
        interest: '',
        profile: '',
    });
    const [file, setFile] = useState(undefined);

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userKey = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        let user = await API.graphql(
          graphqlOperation(getUser, {
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
            profile: user.data.getUser.profile,
        })
        setLoading(false);
      } catch (e) {
        setLoading(false);
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

                <Spinner
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
                <ScrollView style={styles.scrollContainer} overScrollMode='always'>
                    <View style={styles.formBox}>
                        <Text style={styles.formMainText}>닉네임</Text>
                        <TextInput
                            style={styles.textinput}
                            placeholder={userData.nickname}
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setInputs({...inputs, 'nickname': value})}
                        >{inputs.nickname}</TextInput>
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formMainText}>프로필 이미지</Text>
                        <ImageBackground style={styles.image} imageStyle={{ borderRadius: 100}} source={{ uri: checkFile() ? file : userData.get_image }}>
                            <Pressable onPress={imagePicker}>
                                <Image style={{height: 24, width: 24}} source={require('../../../assets/images/icon-plus.png')}/>
                            </Pressable>
                        </ImageBackground>
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formMainText}>관심 영역 선택</Text>
                        <View style={styles.interestPicker}>
                            <RNPickerSelect
                                value={ inputs.interest === '' ? "영역을 선택해주세요." : inputs.interest}
                                placeholder={ inputs.interest === '' ? { label: "영역을 선택해주세요.", value: '영역을 선택해주세요.' } : { label: inputs.interest, value: inputs.interest }}
                                name="interest"
                                onValueChange={(value) => setInputs({...inputs, 'interest': value})}
                                items={[
                                    { label: "영역을 선택해주세요.", value: '영역을 선택해주세요.' },
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

                    <View style={[styles.formBox, {marginBottom: 100}]}>
                        <Text style={styles.formMainText}>자기소개</Text>
                        <TextInput
                            style={styles.textinput}
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
    }
})

export default ProfileInformationEditScreen;
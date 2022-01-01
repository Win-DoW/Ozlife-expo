import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { createStore } from 'graphql/mutations';
import AppHeader from 'utils/Header';
import { CommonActions } from '@react-navigation/native';

const StoreAddScreen = ({ navigation, route }) => {

    const [inputError, setInputError] = useState(false);

    const [userID, setUserID] = useState('');

    const [loading, setLoading] = useState(false);
    const [btnState, setBtnState] = useState(false);
    const [store, setStore] = useState(route.params.store);
    const [images, setImages] = useState([]);
    const [imageIdx, setImageIdx] = useState(0);

    const ref_name = useRef();
    const ref_profile = useRef();
    const ref_tel = useRef();
    const ref_address = useRef();
    const ref_license = useRef();
    const ref_url = useRef();

    useEffect(() => {
        fetchUserKey();
    }, [])

    const fetchUserKey = async() => {
        try {
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            setUserID(userKey.attributes.sub);
        } catch (e) {
            console.log(e)
        }
    }

    const checkInputData = () => {
        if (store.name != '' && store.profile != '' && store.tel != '' && store.address != '' && store.license != '' && store.url != '' && images.length != 0) {
            return true;
        } else {
            return false;
        }
    }

    const checkAndRegister = async() => {
        try {
            if(checkInputData()) {
                // 입력이 완료되어 가게 등록이 가능한 상태
                setInputError(false);
                setLoading(true);

                // 이미지 처리
                const keys = await Promise.all(images.map(async (image, idx) => {
                    const photo = await fetch(image.uri)
                    const photoBlob = await photo.blob();

                    const result = await Storage.put(`${userID}/${store.name}/${idx}.jpg`, photoBlob, {
                        contentType: 'image/jpeg',
                    });

                    return result.key;
                }))

                // 가게 생성
                await API.graphql(graphqlOperation(createStore, {
                    input: {
                        userID,
                        ...store
                    }
                }))

                setLoading(false);

                navigation.navigate('MainTab', { screen: 'ProfileScreen' });

            } else {
                setInputError(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const imagePicker = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([...images, {id: imageIdx, uri: result.uri}]);
        setImageIdx(imageIdx + 1);
      }
    };

    const deleteStoreImage = (idx) => {
        setImages(images.filter(item => item.id != idx))
    }

    const SettingStoreImage = ({ data }) => {

      return (
        <ImageBackground
          style={styles.image}
          imageStyle={{ borderRadius: 4 }}
          source={{ uri: data.uri }}
        >
          <TouchableOpacity
            style={styles.imagePlusBtn}
            onPress={() => deleteStoreImage(data.id)}
          >
            <Image
              style={{ height: 35, width: 35 }}
              source={require("../../../assets/images/icon-minus.png")}
            />
          </TouchableOpacity>
        </ImageBackground>
      );
    };

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

                <AppHeader
                    title={"가게 등록"}
                    noIcon={false}
                    leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                    leftIconPress={() => navigation.goBack()}
                />

                <ScrollView styles={styles.container}>

                    <View style={{...styles.formBox, marginTop: 24}}>
                        <Text style={styles.formBoxTitle}>가게 이름</Text>
                        <TextInput
                            ref={ref_name}
                            style={styles.textinput}
                            placeholder="가게 이름을 적어주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'name': value})}
                            onSubmitEditing={() => ref_profile.current.focus()}
                            returnKeyType="next"
                            value={store.name}
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 설명</Text>
                        <TextInput
                            ref={ref_profile}
                            style={styles.textinput}
                            placeholder="가게 설명을 적어주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'profile': value})}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            value={store.info}
                            multiline={true}
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 사진 추가 <Text style={styles.optionText}>(1개씩 다수 선택 가능)</Text></Text>
                        <View style={styles.imageContainer}>
                            <View style={styles.imageview}>
                                <Text style={styles.imageAddText}>사진추가</Text>
                                <TouchableOpacity style={styles.imagePlusBtn} onPress={imagePicker}>
                                    <Image style={{height: 35, width: 35}} source={require('../../../assets/images/icon-plus.png')}/>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={images}
                                renderItem={({item}) => <SettingStoreImage data={item} />}
                                keyExtractor={( item ) => item.id}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            />
                        </View>
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>전화번호</Text>
                        <TextInput
                            ref={ref_tel}
                            style={styles.textinput}
                            placeholder="전화번호를 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'tel': value})}
                            onSubmitEditing={() => ref_address.current.focus()}
                            returnKeyType='next'
                            keyboardType='number-pad'
                            value={store.tel}
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 위치</Text>
                        <TextInput
                            ref={ref_address}
                            style={styles.textinput}
                            placeholder="가게 위치를 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'address': value})}
                            onSubmitEditing={() => ref_license.current.focus()}
                            returnKeyType='next'
                            value={store.address}
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>사업자등록증</Text>
                        <TextInput
                            ref={ref_license}
                            style={styles.textinput}
                            placeholder="사업자등록번호를 입력하세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'license': value})}
                            onSubmitEditing={() => ref_url.current.focus()}
                            returnKeyType='next'
                            value={store.license}
                        />
                    </View>

                    <View style={{...styles.formBox, marginBottom: 60}}>
                        <Text style={styles.formBoxTitle}>가게 URL</Text>
                        <TextInput
                            ref={ref_url}
                            style={styles.textinput}
                            placeholder="가게 URL을 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStore({...store, 'url': value})}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType='done'
                            value={store.url}
                        />
                    </View>
                </ScrollView>

                <Pressable 
                    style={styles.button} 
                    onPress={() => checkAndRegister()}
                >
                    <Text style={styles.buttontext}>가게 등록</Text>
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
        position: 'absolute',
        bottom: 0,
        width: '100%',
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

export default StoreAddScreen;
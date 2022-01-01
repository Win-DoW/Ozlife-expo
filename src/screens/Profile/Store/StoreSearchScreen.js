import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { createStore } from 'graphql/mutations';

const StoreSearchScreen = ({ navigation, route }) => {

    const [inputError, setInputError] = useState(false);

    const [userId, setUserId] = useState('');

    const [loading, setLoading] = useState(false);
    const [btnState, setBtnState] = useState(false);
    const [storeInfo, setStoreInfo] = useState({        
        storeName: '',
        storeProfile: '',
        storeTel: '',
        storeAddress: '',
        storeLicense: '',
        storeUrl: '',
        storeLongitude: 0,
        storeLatitude: 0,
    });
    const [images, setImages] = useState([]);
    const [imageIdx, setImageIdx] = useState(0);

    const ref_storeName = useRef();
    const ref_storeProfile = useRef();
    const ref_storeTel = useRef();
    const ref_storeAddress = useRef();
    const ref_storeLicense = useRef();
    const ref_storeUrl = useRef();

    useEffect(() => {
        fetchUserKey();
    }, [])

    const fetchUserKey = async() => {
        try {
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            setUserId(userKey.attributes.sub);
        } catch (e) {
            console.log(e)
        }
    }

    const goToBack = () => {
        navigation.pop()
    }

    const checkInputData = () => {
        if (storeInfo.storeName != '' && storeInfo.storeProfile != '' && storeInfo.storeTel != '' && storeInfo.storeAddress != '' && storeInfo.storeLicense != '' && storeInfo.storeUrl != '' && images.length != 0) {
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

                    const result = await Storage.put(`${userId}/${storeInfo.storeName}/${idx}.jpg`, photoBlob, {
                        contentType: 'image/jpeg',
                    });

                    return result.key;
                }))

                // 가게 생성
                await API.graphql(graphqlOperation(createStore, {
                    input: {
                        userID: userId,
                        name: storeInfo.storeName,
                        profile: storeInfo.storeProfile,
                        images: keys,
                        tel: storeInfo.storeTel,
                        address: storeInfo.storeAddress,
                        license: storeInfo.storeLicense,
                        url: storeInfo.storeUrl,
                        longitude: storeLongitude,
                        latitude: storeLatitude,
                    }
                }))

                setLoading(false);
                navigation.pop();

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

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backIcon} onPress={goToBack}>
                        <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>가게 정보</Text>
                    <TouchableOpacity style={styles.headerCompleteBtn} onPress={btnState ? checkAndRegister : null}>
                        <Text style={[styles.headerCompleteText, {color: btnState ? '#15b6f1' : '#dddddd'}]}>완료</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>현재 가게가 있습니까?</Text>
                        <View style={styles.buttonBox}>
                            <TouchableOpacity style={[btnState ? styles.storeExistBtn : styles.storeNoneExistBtn, {marginRight: 16}]} onPress={() => setBtnState(true)}>
                                <Text style={btnState ? styles.storeExistText : styles.storeNoneExistText}>네</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={btnState ? styles.storeNoneExistBtn : styles.storeExistBtn} onPress={() => setBtnState(false)}>
                                <Text style={btnState ? styles.storeNoneExistText : styles.storeExistText}>아니오</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            inputError ?
                            <Text style={styles.errorText}>모든 항목을 입력해주세요.</Text>
                            :
                            null
                        }
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 이름</Text>
                        <TextInput
                            ref={ref_storeName}
                            style={styles.textinput}
                            placeholder="가게 이름을 적어주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeName': value})}
                            onSubmitEditing={() => ref_storeProfile.current.focus()}
                            returnKeyType="next"
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 설명</Text>
                        <TextInput
                            ref={ref_storeProfile}
                            style={styles.textinput}
                            placeholder="가게 설명을 적어주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeProfile': value})}
                            onSubmitEditing={() => Keyboard.dismiss()}
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
                            ref={ref_storeTel}
                            style={styles.textinput}
                            placeholder="전화번호를 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeTel': value})}
                            onSubmitEditing={() => ref_storeAddress.current.focus()}
                            returnKeyType='next'
                            keyboardType='number-pad'
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 위치</Text>
                        <TextInput
                            ref={ref_storeAddress}
                            style={styles.textinput}
                            placeholder="가게 위치를 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeAddress': value})}
                            onSubmitEditing={() => ref_storeLicense.current.focus()}
                            returnKeyType='next'
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>사업자등록증</Text>
                        <TextInput
                            ref={ref_storeLicense}
                            style={styles.textinput}
                            placeholder="사업자등록번호를 입력하세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeLicense': value})}
                            onSubmitEditing={() => ref_storeUrl.current.focus()}
                            returnKeyType='next'
                        />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.formBoxTitle}>가게 URL</Text>
                        <TextInput
                            ref={ref_storeUrl}
                            style={styles.textinput}
                            placeholder="가게 URL을 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setStoreInfo({...storeInfo, 'storeUrl': value})}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType='done'
                        />
                    </View>
                </ScrollView>
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
        alignItems: 'center',
        marginBottom: 24
    },
    backIcon: {
        position: 'absolute',
        left: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerCompleteBtn: {
        position: 'absolute',
        right: 24
    },
    headerCompleteText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        height: 36,
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
    }
})

export default StoreSearchScreen;
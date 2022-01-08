import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import * as ImagePicker from 'expo-image-picker';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { createStore } from 'graphql/mutations';
import AppHeader from 'utils/Header';

const SignUpStoreAddScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);

    const [existStore, setExistStore] = useState(false);

    const [userID, setUserID] = useState('');

    const [name, setName] = useState('')
    const [profile, setProfile] = useState('')
    const [tel, setTel] = useState('')
    const [address, setAddress] = useState('')
    const [url, setUrl] = useState('')
    const [license, setLicense] = useState('')

    const [images, setImages] = useState([]);
    const [imageIdx, setImageIdx] = useState(0);

    const ref_name = useRef();
    const ref_profile = useRef();
    const ref_tel = useRef();
    const ref_address = useRef();
    const ref_url = useRef();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try {
            setVisible(true);

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            setUserID(userKey.attributes.sub);

            setVisible(false);
        } catch (e) {
            console.log(e)
        }
    }

    const checkInputData = () => {
        if (name != '' && profile != '' && tel != '' && address != '' && url != '' && images.length != 0) {
            return true;
        } else {
            return false;
        }
    }

    const storeRegister = async() => {
        try {            
            setVisible(true);

            // 이미지 처리
            const keys = await Promise.all(images.map(async (image, idx) => {
                const photo = await fetch(image.uri)
                const photoBlob = await photo.blob();

                const result = await Storage.put(`${userID}/${name}/${idx}.jpg`, photoBlob, {
                    contentType: 'image/jpeg',
                });

                return result.key;
            }))

            // 가게 생성
            const store = await API.graphql(graphqlOperation(createStore, {
                input: {
                    userID,
                    name,
                    profile,
                    tel,
                    address,
                    license,
                    images: keys,
                }
            }))

            setVisible(false);

            navigation.reset({routes: [{
                name: 'StoreFinishScreen',
                params: {
                    store: store.data.createStore,
                }
            }]})

        } catch (e) {
            console.log(e)
            setVisible(false);
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
                        source={require("assets/images/icon-minus.png")}
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

                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("utils/Loader.json")}
                    animationStyle={{ width: 300, height: 300 }}
                    speed={1}
                />

                <AppHeader
                    title={"가게 등록"}
                    noIcon={true}
                />

                <ScrollView styles={styles.container}>
                    
                    <View style={{...styles.formBox, marginTop: 24}}>
                        <Text style={styles.formBoxTitle}>현재 가게가 있습니까?</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                            <TouchableOpacity
                                style={{...existStore ? styles.selectedBtn : styles.notSelectedBtn, marginRight: 16}}
                                onPress={() => setExistStore(true)}
                            >
                                <Text style={existStore ? styles.selectedBtnText : styles.notSelectedBtnText}>네</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={existStore ? styles.notSelectedBtn : styles.selectedBtn}
                                onPress={() => setExistStore(false)}
                            >
                                <Text style={existStore ? styles.notSelectedBtnText : styles.selectedBtnText}>아니오</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {
                        existStore ? 
                        <View>
                            <View style={styles.formBox}>
                                <Text style={styles.formBoxTitle}>가게 이름</Text>
                                <TextInput
                                    ref={ref_name}
                                    style={styles.textInput}
                                    placeholder="가게 이름을 적어주세요."
                                    placeholderTextColor="#ddd"
                                    onChangeText={(value) => setName(value)}
                                    onSubmitEditing={() => ref_profile.current.focus()}
                                    returnKeyType="next"
                                    value={name}
                                />
                            </View>

                            <View style={styles.formBox}>
                                <Text style={styles.formBoxTitle}>가게 설명</Text>
                                <TextInput
                                    ref={ref_profile}
                                    style={styles.textInput}
                                    placeholder="가게 설명을 적어주세요."
                                    placeholderTextColor="#ddd"
                                    onChangeText={(value) => setProfile(value)}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    value={profile}
                                    multiline={true}
                                />
                            </View>

                            <View style={styles.formBox}>
                                <Text style={styles.formBoxTitle}>가게 사진 추가 <Text style={styles.optionText}>(1개씩 다수 선택 가능)</Text></Text>
                                <View style={styles.imageContainer}>
                                    <View style={styles.imageView}>
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
                                    style={styles.textInput}
                                    placeholder="전화번호를 입력해주세요."
                                    placeholderTextColor="#ddd"
                                    onChangeText={(value) => setTel(value)}
                                    onSubmitEditing={() => ref_address.current.focus()}
                                    returnKeyType='next'
                                    keyboardType='number-pad'
                                    value={tel}
                                />
                            </View>

                            <View style={styles.formBox}>
                                <Text style={styles.formBoxTitle}>가게 위치</Text>
                                <TextInput
                                    ref={ref_address}
                                    style={styles.textInput}
                                    placeholder="가게 위치를 입력해주세요."
                                    placeholderTextColor="#ddd"
                                    onChangeText={(value) => setAddress(value)}
                                    onSubmitEditing={() => ref_url.current.focus()}
                                    returnKeyType='next'
                                    value={address}
                                />
                            </View>

                            <View style={{...styles.formBox, marginBottom: 60}}>
                                <Text style={styles.formBoxTitle}>가게 URL</Text>
                                <TextInput
                                    ref={ref_url}
                                    style={styles.textInput}
                                    placeholder="가게 URL을 입력해주세요."
                                    placeholderTextColor="#ddd"
                                    onChangeText={(value) => setUrl(value)}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    returnKeyType='done'
                                    value={url}
                                />
                            </View>
                        </View>
                        :
                        null
                    }
                </ScrollView>

                <TouchableOpacity 
                    style={{...styles.button, backgroundColor: 
                        existStore ?
                            checkInputData() ?
                            '#15b6f1'
                            :
                            '#cccccc'
                        :
                        '#15b6f1'
                    }} 
                    onPress={() => {
                        if(!existStore) {
                            navigation.reset({routes: [{name: 'MainNavi'}]})
                        } else {
                            if(checkInputData()) {
                                storeRegister()
                            } else {
                                null
                            }
                        }
                    }}
                >
                    <Text style={styles.buttontext}>완료</Text>
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
    formBox: {
        marginTop: 24,
        marginHorizontal: 24,
    },
    formBoxTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "500",
        color: "#000000",
    },
    textInput: {
        fontSize: 14,
        color: "#666666",
        height: 36,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    imageView: {
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
        flexDirection: 'row',
        marginTop: 8
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
    notSelectedBtn: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
    },
    selectedBtn: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15b6f1'
    },
    notSelectedBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#aaaaaa'
    },
    selectedBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    }
})

export default SignUpStoreAddScreen;
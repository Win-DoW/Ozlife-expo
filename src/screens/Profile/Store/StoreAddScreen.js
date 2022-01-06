import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { createStore } from 'graphql/mutations';
import AppHeader from 'utils/Header';
import AnimatedLoader from 'react-native-animated-loader';

const StoreAddScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);

    const [inputError, setInputError] = useState(false);

    const [userID, setUserID] = useState('');

    const store = route.params.store;

    const [name, setName] = useState(store.name)
    const [profile, setProfile] = useState(store.profile)
    const [tel, setTel] = useState(store.tel)
    const [address, setAddress] = useState(store.address)
    const [url, setUrl] = useState(store.url)
    const [license, setLicense] = useState(store.license)

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
        console.log(store)
        if (name != '' && profile != '' && tel != '' && address != '' && url != '' && license != '' && images.length != 0) {
            return true;
        } else {
            return false;
        }
    }

    const checkAndRegister = async() => {
        try {            
            if(checkInputData()) {
                setVisible(true);

                // 입력이 완료되어 가게 등록이 가능한 상태
                setInputError(false);

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

            } else {
                setInputError(true);
            }
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

                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../../utils/Loader.json")}
                    animationStyle={{ width: 300, height: 300 }}
                    speed={1}
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
                            style={styles.textinput}
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
                            style={styles.textinput}
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
                            style={styles.textinput}
                            placeholder="가게 URL을 입력해주세요."
                            placeholderTextColor="#ddd"
                            onChangeText={(value) => setUrl(value)}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType='done'
                            value={url}
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
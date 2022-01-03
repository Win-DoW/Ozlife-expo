import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Storage } from 'aws-amplify';

import AppHeader from 'utils/Header';
import Ozlife from 'components/Ozlife';

import { ReturnChatRoomID } from 'utils/Chat';

const StoreProfileScreen = ({ navigation, route }) => {

    const store = route.params.store;
    const userID = route.params.userID;
    const owner = store.user;
    const userReviews = route.params.userReviews;

    const [storeImages, setStoreImages] = useState([])
    const [ownerImage, setOwnerImage] = useState();
    const [loading, setLoading] = useState(false);
    const [btnState, setBtnState] = useState(0);
    const [ozlifes, setOzlifes] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        })

        return unsubscribe;
        
    }, [navigation])

    const fetchData = async() => {
        try {
            setLoading(true)
            setOzlifes([])
            setStoreImages([])

            await Promise.all(store.images.map(async(image, idx) => {
                const newImage = await Storage.get(image)
                setStoreImages(images => [...images, newImage])
            }))

            const image = await Storage.get(owner.image)
            setOwnerImage(image)

            const ozlifes = store.ozlifeItem.items;
            await Promise.all(ozlifes.map(async (item, idx) => {
                const result = await Storage.get(item.images[0]);
                const newOzlife = {...item, image: result};
                setOzlifes(ozlifes => [...ozlifes, newOzlife]);
            }))

            setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }

    const request = () => {
        navigation.navigate("OzlifeWriteScreen", {
            store
        })
    }

    // 채팅방 이동
    const goToChatRoom = () => {
        const result = ReturnChatRoomID(userID, owner.id).then(response => {
            navigation.navigate('ChatRoomScreen', {
                chatRoomId: response
            })
        })
    }

    const FlatListHeader = () => {
        return (
            <View>
                <View style={styles.imagebox}>
                    <Pressable style={{width: '50%', aspectRatio: 1 / 1, marginRight: 1}}>
                        <Image
                            source={{uri: storeImages[0]}}
                            style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                        />
                    </Pressable>
                    <View style={{flex: 1, height: '100%', marginRight: 1}}>
                        <Pressable style={{width: '100%', flex: 1, marginBottom: 1}}>
                            <Image
                                source={storeImages.length > 1 ? { uri: storeImages[1]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                        <Pressable style={{width: '100%', flex: 1}}>
                            <Image
                                source={storeImages.length > 3 ? { uri: storeImages[3]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                    </View>
                    <View style={{flex:1, height: '100%'}}>
                        <Pressable style={{width: '100%', flex: 1, marginBottom: 1}}>
                            <Image
                                source={storeImages.length > 2 ? { uri: storeImages[2]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                        <ImageBackground
                            style={[styles.backgroundimage, {backgroundColor: storeImages.length > 4 ? 'black' : 'gray'}]}
                            source={storeImages.length > 4 ? { uri: storeImages[4]} : null}
                            imageStyle={{opacity: 0.5}}
                        >
                            {
                                storeImages.length > 4 ?
                                <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={[styles.imagefont, {marginBottom: 3}]}>{storeImages.length}+</Text>
                                    <Text style={styles.imagefont}>더보기</Text>
                                </Pressable>
                                : null
                            }
                        </ImageBackground>
                    </View>
                </View>

                <View style={styles.storeTextBox}>
                    <Text style={styles.storeName}>{store.name}</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                        <Ionicons name="ios-heart-sharp" size={24} color="#ff4444" style={{marginRight: 4}}/>
                        <Text style={styles.heartCountText}>1231</Text>
                    </View>

                    <View style={{alignItems: 'center', paddingHorizontal: 28, marginTop: 12}}>
                        <Text style={{fontSize: 14}}>{store.profile}</Text>
                    </View>
                    
                </View>

                <View style={{height: 16, backgroundColor: '#efefef'}}/>

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.selectBtn, btnState == 0 ? styles.selectedBtn : null]}
                        onPress={() => setBtnState(0)}
                    >
                        <Text style={styles.selectBtnText}>정보</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.selectBtn, btnState == 1 ? styles.selectedBtn : null]}
                        onPress={() => setBtnState(1)}
                    >
                        <Text style={styles.selectBtnText}>오지랖</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const InfoItem = () => {
        return (
            <View style={{paddingHorizontal: 20, marginTop: -20}}>
                <View style={{...styles.line, paddingBottom: 8}}>
                    <Image
                        source={{uri: ownerImage}}
                        style={{width: 28, height: 28, borderRadius: 100, marginRight: 6}}
                    />
                    <Text>{owner.nickname}</Text>
                </View>

                <View style={styles.line}>
                    <Image
                        source={require('../../../assets/images/icon-callnum.png')}
                        style={{width: 16, height: 16, marginHorizontal: 8}}
                    />
                    <Text>{store.tel}</Text>
                </View>

                <View style={styles.line}>
                    <Image
                        source={require('../../../assets/images/icon-location.png')}
                        style={{width: 16, height: 16, marginHorizontal: 8}}
                    />
                    <Text>{store.address}</Text>
                </View>

                <View>
                    <Text style={styles.text, {paddingVertical: 14}}>다른 사이트에서 보기</Text>
                    <View style={{flexDirection: 'row', marginBottom: 60}}>
                        <Pressable>
                            <Image
                                source={require('../../../assets/images/kakao-logo.png')}
                                style={{width: 40, height: 40, marginRight: 8}}
                            />
                        </Pressable>
                        <Pressable>
                            <Image
                                source={require('../../../assets/images/naver-logo.png')}
                                style={{width: 40, height: 40, marginRight: 8}}
                            />
                        </Pressable>
                        <Pressable>
                            <Image
                                source={require('../../../assets/images/bamin-logo.png')}
                                style={{width: 40, height: 40, marginRight: 8}}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={"Loading..."}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />

            <AppHeader
                title={store.name}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                leftIconPress={() => navigation.goBack()}
                rightIcon={
                    <Pressable style={styles.headerStoreEditBtn} onPress={() => navigation.navigate("StoreEditScreen", {store})}>
                        <MaterialCommunityIcons name="square-edit-outline" size={24} color="#15b6f1" />
                        <Text style={styles.headerStoreEditBtnText}>가게 수정</Text>
                    </Pressable>
                }
            />

            {btnState == 0 ?
            <ScrollView>
                {
                    FlatListHeader()
                }
                {
                    InfoItem()
                }
            </ScrollView>
            :
            <FlatList
                data={ozlifes}
                renderItem={({item}) => <Ozlife ozlife={item} userID={userID} userReviews={userReviews} /> }
                keyExtractor={(item) => item.id}
                ListHeaderComponent={FlatListHeader}
            />
            }

            {userID === owner.id ?
            <Pressable style={styles.button} onPress={request}>
                <Text style={styles.buttontext}>오지랖 요청하기</Text>
            </Pressable>
            :
            <Pressable style={styles.button} onPress={goToChatRoom}>
                <Text style={styles.buttontext}>채팅하기</Text>
            </Pressable>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    headerStoreEditBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    headerStoreEditBtnText: {
        fontSize: 12,
        color: '#15b6f1'
    },
    imagebox: {
        width: '100%',
        aspectRatio: 2 / 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    backgroundimage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagefont: {
        fontSize: 12,
        fontWeight: '300',
        color: '#ffffff'
    },
    storeTextBox: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    heartCountText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#f44'
    },
    buttonContainer: {
        height: 48,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    selectBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedBtn: {
        borderBottomColor: '#15b6f1',
        borderBottomWidth: 3
    },
    selectBtnText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    line: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    text: {
        fontSize: 14,
        fontWeight: '500'
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

export default StoreProfileScreen;
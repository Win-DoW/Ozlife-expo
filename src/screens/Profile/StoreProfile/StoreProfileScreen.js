import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { Storage, API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../../graphql/queries';

const StoreProfileScreen = ({ navigation, route }) => {

    const storeData = route.params.store

    const [images, setImages] = useState([])
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);
    const [btnState, setBtnState] = useState(0)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        })

        return unsubscribe;
        
    }, [navigation])

    const fetchData = async() => {
        try {
            setLoading(true)

            await Promise.all(storeData.images.map(async(image, idx) => {
                const fetchImage = await Storage.get(image)
                setImages(images => [...images, fetchImage])
            }))

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            let user = await API.graphql(graphqlOperation(getUser, {
                id: userKey.attributes.sub
              }))
              const image = await Storage.get(user.data.getUser.image)  
              user.data.getUser.image = image
              setUserData(user.data.getUser)

            setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }

    const goToBack = () => {
        navigation.pop()
    }

    const FlatListHeader = () => {
        return (
            <View>
                <View style={styles.HeaderTopBox}>
                    <TouchableOpacity onPress={goToBack}>
                        <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerStoreEditBtn}>
                        <MaterialCommunityIcons name="square-edit-outline" size={24} color="#15b6f1" />
                        <Text style={styles.headerStoreEditBtnText}>가게 수정하기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageTotalBox}>
                    <Image
                        style={styles.imageFirst}
                        source={images.length > 0 ? { uri: images[0]} : require('../../../../assets/ProfileImage/store_none_image.png')}
                    />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, marginRight: 1}}>
                            <Image
                                style={{...styles.imageFirst, marginBottom: 1}}
                                source={images.length > 1 ? { uri: images[1]} : require('../../../../assets/ProfileImage/store_none_image.png')}
                            />
                            <Image
                                style={styles.imageFirst}
                                source={images.length > 2 ? { uri: images[2]} : require('../../../../assets/ProfileImage/store_none_image.png')}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Image
                                style={{...styles.imageFirst, marginBottom: 1}}
                                source={images.length > 3 ? { uri: images[3]} : require('../../../../assets/ProfileImage/store_none_image.png')}
                            />
                            <Image
                                style={styles.imageFirst}
                                source={images.length > 4 ? { uri: images[4]} : require('../../../../assets/ProfileImage/store_none_image.png')}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.storeTextBox}>
                    <View style={{marginBottom: 7}}>
                        <Text style={styles.storeName}>{storeData.name}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                        <Ionicons name="ios-heart-sharp" size={24} color="#ff4444" style={{marginRight: 4}}/>
                        <Text style={styles.heartCountText}>1231</Text>
                    </View>

                    <View>
                        <Text style={styles.storeProfileText}>{storeData.profile}</Text>
                    </View>
                </View>

                <View style={{height: 16, backgroundColor: '#efefef'}}/>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.selectBtn, btnState == 0 ? styles.selectedBtn : null]}
                        onPress={() => setBtnState(0)}
                    >
                        <Text style={styles.selectBtnText}>정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.selectBtn, btnState == 1 ? styles.selectedBtn : null]}
                        onPress={() => setBtnState(1)}
                    >
                        <Text style={styles.selectBtnText}>오지랖</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const InfoItem = () => {
        return (
            <View style={{paddingHorizontal: 20}}>
                <View style={styles.infoBox}>
                    <Image
                        style={styles.infoImage}
                        source={{ uri: userData.image}}
                    />
                    <Text style={styles.infoText}>{userData.nickname}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Ionicons name="md-call-outline" size={16} color="black" style={{marginRight: 10}}/>
                    <Text style={styles.infoText}>{storeData.tel}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Ionicons name="location-outline" size={16} color="black" style={{marginRight: 10}}/>
                    <Text style={styles.infoText}>{storeData.address}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>다른 사이트에서 보기</Text>
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
            {
                btnState == 0 ?
                <ScrollView>
                    {
                        FlatListHeader()
                    }
                    {
                        InfoItem()
                    }
                </ScrollView>
                :
                null
                // 오지랖 관련 FlatList 만들면 될듯
                // <FlatList
                //     data={}
                //     renderItem={}
                //     keyExtractor={}
                //     ListHeaderComponent={FlatListHeader}
                // />
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
    HeaderTopBox: {
        flexDirection: 'row',
        height: 56,
        paddingLeft: 8,
        paddingRight: 20,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerStoreEditBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerStoreEditBtnText: {
        fontSize: 12,
        color: '#15b6f1'
    },
    imageTotalBox: {
        flexDirection: 'row',
        height: 180,
        marginBottom: 12
    },
    imageFirst: {
        flex: 1,
        marginRight: 1
    },
    storeTextBox: {
        paddingHorizontal: 28,
        paddingBottom: 16,
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
    storeProfileText: {
        fontSize: 14,
    },
    buttonContainer: {
        height: 48,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
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
    infoImage: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 6
    },
    infoBox: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500'
    }
})

export default StoreProfileScreen;
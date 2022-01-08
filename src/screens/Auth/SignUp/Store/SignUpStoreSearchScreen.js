import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Modal, Dimensions } from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import * as Location from 'expo-location';
import axios from 'axios';
import AnimatedLoader from 'react-native-animated-loader';

import AppHeader from 'utils/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUpStoreSearchScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [existStore, setExistStore] = useState(false)

    const [places, setPlaces] = useState([]);
    const [search, setSearch] = useState('');

    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)

    const mountedNext = useRef(false)

    useEffect(() => {
        (async () => {
            setVisible(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setVisible(false);
        })();
    }, []);


    const goToMain = () => {
        setVisible(true)
        setModalVisible(false)
        setVisible(false)

        setTimeout(() => {
            navigation.reset({routes: [{name: 'MainNavi'}]})
        }, 500)
        
    }

    const searchPlaces = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: {
                "Authorization": "KakaoAK fa6c86b49ad8cb5ee3fed7c98a3227ee",
            },
            params: {
                "query": search,
                "x": longitude,
                "y": latitude,
                "radius": 10000,
            },
        };
        
        const { data } = await axios.get(url, config);
    
        setPlaces(data.documents);
    }
    
    const PlaceInfo = ({info}) => {

        const selectPlace = (info) => {
            navigation.navigate('SignUpStoreCheckScreen', {
                store : {
                    name: info.place_name,
                    tel: info.phone,
                    address: info.road_address_name,
                    url: info.place_url,
                    longitude: info.x,
                    latitude: info.y,
                }
            });
        }

        const distance = (info.distance >= 1000) ? `${Math.round(info.distance/100)/10}km` : `${info.distance}m`;
        
        return (
            <TouchableOpacity onPress={() => selectPlace(info)} style={styles.place}>

            <View style={styles.rowContainer}>
                <Text style={styles.name}>{info.place_name}</Text>
                <Text style={styles.extra}>{info.category_group_name}</Text>
            </View>

            <View style={styles.rowContainer}>
                <Text style={styles.address}>{info.road_address_name}</Text>
                <Text style={styles.extra}>{distance}</Text>
            </View>

            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../../../utils/Loader.json")}
                animationStyle={{width: 300, height: 300}}
                speed={1}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>가게 등록 없이</Text>
                            <Text style={styles.modalText}>홈으로 이동하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBtnBox}>
                            <TouchableOpacity
                                style={styles.modalHome}
                                onPress={goToMain}
                            >
                                <Text style={styles.modalHomeText}>홈으로 가기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalStore}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalStoreText}>가게 등록하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>


            <AppHeader
                title={'가게 정보'}
                noIcon={false}
                rightIcon={
                    <Text style={styles.completeBtn}>
                        {
                            existStore ?
                            '취소'
                            :
                            '완료'
                        }
                    </Text>
                }
                rightIconPress={
                    existStore ? 
                    () => setExistStore(false)
                    :
                    () => setModalVisible(true)
                }
            />

            {
                existStore ?
                <View>
                    <View style={styles.headerContainer}>
                        <SearchBar
                            placeholder="가게검색"
                            cancelText="취소"
                            onChangeText={(text) => setSearch(text)}
                            value={search}
                            onSubmitEditing={() => searchPlaces()}
                            theme="light"
                            platform="ios"
                            style={{ marginHorizontal: 10 }}
                        />
                    </View>

                    <FlatList
                        data={places}
                        renderItem={({item}) => <PlaceInfo info={item}/>}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                :
                <View style={{paddingHorizontal: 24, marginTop: 24}}>
                    <Text style={styles.bigText}>현재 가게가 있습니까?</Text>
                    <View style={styles.btnBox}>
                        <TouchableOpacity
                            style={{...existStore ? styles.selectedBtn : styles.notSelectedBtn, marginRight: 16}}
                            onPress={() => setExistStore(true)}
                        >
                            <Text style={existStore ? styles.selectedBtnText : styles.notSelectedBtnText}>네</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={!existStore ? styles.selectedBtn : styles.notSelectedBtn}
                            onPress={() => setExistStore(false)}
                        >
                            <Text style={!existStore ? styles.selectedBtnText : styles.notSelectedBtnText}>아니오</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    address: {
        fontSize: 14,
        fontWeight: '300',
        color: '#aaa',
    },
    extra: {
        fontSize: 14,
        fontWeight: '500',
        color: '#777',
    },
    place: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    rowContainer: {
        justifyContent: 'space-between', 
        alignItems:'center', 
        flexDirection: 'row',
        marginVertical: 2,
    },
    headerContainer: {
        marginTop: 8,
        height: 56,
    },
    titleContainer: {
        position: 'absolute',
        top: 8,
        left: 50,
        justifyContent: 'center',
    },
    leftIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        justifyContent: 'center'
    },
    completeBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#15b6f1',
        marginRight: 14
    },
    bigText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    btnBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    selectedBtn: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15b6f1'
    },
    notSelectedBtn: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#cccccc',
        borderWidth: 1
    },
    selectedBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
    },
    notSelectedBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#cccccc',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalBox: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.2,
        backgroundColor: '#FFFFFF'
    },
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBtnBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: windowHeight * 0.2 * 0.3
    },
    modalText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },
    modalHome: {
        flex: 1,
        height: windowHeight * 0.2 * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efefef'
    },
    modalStore: {
        flex: 1,
        height: windowHeight * 0.2 * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15b6f1'
    },
    modalHomeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
    },
    modalStoreText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
    }
})

export default SignUpStoreSearchScreen;
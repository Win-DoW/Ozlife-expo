import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import * as Location from 'expo-location';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedLoader from 'react-native-animated-loader';

import { screen } from '../../../../utils/Styles';

const SignUpStoreSearchScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);

    const [places, setPlaces] = useState([]);
    const [search, setSearch] = useState('');

    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)

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

            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.leftIcon}
                    onPress={goToMain}
                >
                    <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>

                <View style={{ ...styles.titleContainer }}>
                    <SearchBar
                        placeholder="가게검색"
                        cancelText="취소"
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        onSubmitEditing={() => searchPlaces()}
                        theme="light"
                        platform="ios"
                        style={{ width: screen.width - 60 }}
                    />
                </View>
            </View>

            <FlatList
                data={places}
                renderItem={({item}) => <PlaceInfo info={item}/>}
                keyExtractor={(item) => item.id}
            />
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
        height: 56,
        borderColor: "#dddddd",
        borderBottomWidth: 1,
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
})

export default SignUpStoreSearchScreen;
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Pressable, SafeAreaView, ScrollView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { API, Storage, graphqlOperation } from 'aws-amplify';

import { listReviews } from 'graphql/queries';

import AppHeader from 'utils/Header';

const OzlifeProfileScreen = ({ route, navigation }) => {

    const userID = route.params.userID;
    const ozlife = route.params.ozlife;
    const store = ozlife.store;
    const owner = ozlife.user;

    const [loading, setLoading] = useState(false);

    const [ownerImage, setOwnerImage] = useState();
    const [ozlifeImages, setOzlifeImages] = useState([]);

    const [review, setReview] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);
    
    const fetchData = async () => {
        try {      
            setLoading(true);
            setOzlifeImages([]);

            const result = await Storage.get(owner.image);
            setOwnerImage(result);

            await Promise.all(ozlife.images.map(async (item, idx) => {
                const result = await Storage.get(item);
                setOzlifeImages(images => [...images, result]);
            }))

            const reviewsData = await API.graphql(graphqlOperation(listReviews, { filter: { ozlifeID: { eq: ozlife.id }}}));
            const reviews = reviewsData.data.listReviews.items;

            setReview(reviews.find(item => item.userID === userID));

            setLoading(false);
    
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const next = () => {
        navigation.navigate("OzlifeMapScreen", {
            ozlife
        })
    }

    
    return(
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
                title={ozlife.name}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                leftIconPress={() => navigation.goBack()}
            />


            <ScrollView>

                <View style={styles.imagebox}>
                    <Pressable style={{width: '50%', aspectRatio: 1 / 1, marginRight: 1}}>
                        <Image
                            source={{uri: ozlifeImages[0]}}
                            style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                        />
                    </Pressable>
                    <View style={{flex: 1, height: '100%', marginRight: 1}}>
                        <Pressable style={{width: '100%', flex: 1, marginBottom: 1}}>
                            <Image
                                source={ozlifeImages.length > 1 ? { uri: ozlifeImages[1]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                        <Pressable style={{width: '100%', flex: 1}}>
                            <Image
                                source={ozlifeImages.length > 3 ? { uri: ozlifeImages[3]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                    </View>
                    <View style={{flex:1, height: '100%'}}>
                        <Pressable style={{width: '100%', flex: 1, marginBottom: 1}}>
                            <Image
                                source={ozlifeImages.length > 2 ? { uri: ozlifeImages[2]} : null}
                                style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                            />
                        </Pressable>
                        <ImageBackground
                            style={[styles.backgroundimage, {backgroundColor: ozlifeImages.length > 4 ? 'black' : 'gray'}]}
                            source={ozlifeImages.length > 4 ? { uri: ozlifeImages[4]} : null}
                            imageStyle={{opacity: 0.5}}
                        >
                            {
                                ozlifeImages.length > 4 ?
                                <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={[styles.imagefont, {marginBottom: 3}]}>{ozlifeImages.length}+</Text>
                                    <Text style={styles.imagefont}>더보기</Text>
                                </Pressable>
                                : null
                            }
                        </ImageBackground>
                    </View>
                </View>

                <View style={styles.section}>

                    <Text style={styles.title}>{ozlife.title}</Text>

                    <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>{ozlife.name}</Text>
                        <Text style={styles.text, {color: '#ff9a2d', marginLeft: 10}}>{ozlife.visit_date.slice(0, 10)}</Text>
                    </View>

                    <Text style={{fontSize: 14, fontWeight: 'normal', marginVertical: 8}}>{ozlife.profile}</Text>

                    <Text style={styles.text, {color: '#aaa', marginTop: 8}}>{ozlife.tag}</Text>

                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>메뉴</Text>
                    <Text style={{fontSize: 17, color: '#15b6f1', fontWeight: 'bold', marginTop: 16}}>{ozlife.name}</Text>
                    <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{ozlife.original_price}원</Text>
                        <Text style={{fontSize: 15, fontWeight: '500', color: '#aaa', marginLeft: 8, textDecorationLine: 'line-through'}}>{ozlife.discount_price}원</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>가게 정보</Text>

                    <View style={{...styles.line, paddingBottom: 8}}>
                        <Image
                            source={{uri: ownerImage}}
                            style={{width: 28, height: 28, borderRadius: 100, marginRight: 6}}
                        />
                        <Text>{owner.nickname}</Text>
                    </View>

                    <View style={styles.line}>
                        <Image
                            source={require('../../assets/images/icon-callnum.png')}
                            style={{width: 16, height: 16, marginHorizontal: 8}}
                        />
                        <Text>{store.tel}</Text>
                    </View>

                    <View style={styles.line}>
                        <Image
                            source={require('../../assets/images/icon-location.png')}
                            style={{width: 16, height: 16, marginHorizontal: 8}}
                        />
                        <Text>{store.address}</Text>
                    </View>

                    <View>
                        <Text style={styles.text, {paddingVertical: 14}}>다른 사이트에서 보기</Text>
                        <View style={{flexDirection: 'row', marginBottom: 60}}>
                            <Pressable>
                                <Image
                                    source={require('../../assets/images/kakao-logo.png')}
                                    style={{width: 40, height: 40, marginRight: 8}}
                                />
                            </Pressable>
                            <Pressable>
                                <Image
                                    source={require('../../assets/images/naver-logo.png')}
                                    style={{width: 40, height: 40, marginRight: 8}}
                                />
                            </Pressable>
                            <Pressable>
                                <Image
                                    source={require('../../assets/images/bamin-logo.png')}
                                    style={{width: 40, height: 40, marginRight: 8}}
                                />
                            </Pressable>
                        </View>
                    </View>
                
                </View>

 

            </ScrollView>

            {
            userID === owner.id ?
            <Pressable style={styles.button} 
                onPress={() => navigation.navigate("OzlifeManageScreen", {
                    ozlife
                })}
            >
                <Text style={styles.buttontext}>오지랖 관리하기</Text>
            </Pressable>
            :
            review === undefined ?
            <Pressable style={styles.button} onPress={next}>
                <Text style={styles.buttontext}>오지랖 남기기</Text>
            </Pressable>
            :
            <Pressable style={{...styles.button, backgroundColor: '#ccc'}}>
                <Text style={styles.buttontext}>오지랖 남기기 예약중</Text>
            </Pressable>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        backgroundColor: '#FFFFFF'
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
    section: {
        padding: 20,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },    
    title: {
        fontSize: 20,
        fontWeight: 'bold'
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
    line: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})

export default OzlifeProfileScreen;
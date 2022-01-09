import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, FlatList, Image, SafeAreaView } from 'react-native';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';

import { getUserOnOzlifeScreen } from 'graphql/custom';

import Ozlife from 'components/Ozlife';
import AnimatedLoader from 'react-native-animated-loader';
import dayjs from "dayjs";

const OzlifeScreen = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false); 
    const [tabState, setTabState] = useState(0);
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        try {      
            setVisible(true);
            setQuestions([]);
            setAnswers([]);

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
            const userData = await API.graphql(graphqlOperation(getUserOnOzlifeScreen, { id: userKey.attributes.sub }));

            const user = userData.data.getUser;
            const ozlifes = user.ozlifeItem.items;

            const reviews = user.reviewItem.items.sort((a, b) => {
                const firstDate = new Date(a.ozlife.visit_date)
                const secondDate = new Date(b.ozlife.visit_date)

                if (firstDate <= secondDate) {
                    return true;
                } else {
                    return false;
                }
            })

            setUser(user);
            setUserReviews(reviews);

            await Promise.all(ozlifes.map(async (item, idx) => {
                const result = await Storage.get(item.images[0]);
                const newOzlife = {...item, image: result};
                setQuestions(ozlifes => [...ozlifes, newOzlife]);
            }))

            await Promise.all(reviews.map(async (item, idx) => {
                const result = await Storage.get(item.ozlife.images[0]);
                const newOzlife = {...item.ozlife, image: result};
                setAnswers(ozlifes => [...ozlifes, newOzlife]);
            }))

            setVisible(false);

        } catch (e) {
            setVisible(false);
            console.log(e);
        }
    }

    const NoData = () => {
        return (
            <View style={{width: '100%', alignItems: 'center', marginTop: 48}}>
                <Image source={require('../../assets/icon_logo.png')} style={styles.nothingIcon} />
                <Text style={styles.nothingText}>{tabState === 0 ? '아직 오지랖을 답변한 적이 없어요...' : '아직 오지랖을 질문한 적이 없어요...' }</Text>
                <TouchableOpacity style={styles.requestButton} onPress={() => {tabState === 0 ? navigation.navigate('HomeScreen') : navigation.navigate('OzlifeSelectScreen')}} >
                    <Text style={styles.requestText}>{tabState === 0 ? '오지랖 답변하러 가기' : '오지랖 요청하러 가기'}</Text>
                    <Image source={require("../../assets/next.png")} style={{width: 10, height: 15}} />
                </TouchableOpacity>
            </View>
        );
    };

    return (            
        <SafeAreaView style={styles.container}>

            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../utils/Loader.json")}
                animationStyle={{ width: 300, height: 300 }}
                speed={1}
            />

            <View style={styles.head}>
                <Text style={{fontSize: 18, color: '#15b6f1', fontWeight: 'bold'}}>내 오지랖</Text>
            </View>
            <View style={styles.tab}>
                <Pressable 
                    onPress={() => {
                        setTabState(0)
                    }} 
                    style={styles.touch}
                >
                    <Text style={tabState === 0 ? styles.tabTextPress : styles.tabText}>내 답변</Text>
                </Pressable>
                <Pressable 
                    onPress={() => {
                        setTabState(1)
                    }}
                    style={styles.touch}
                >
                    <Text style={tabState === 1 ? styles.tabTextPress : styles.tabText}>내 질문</Text>
                </Pressable>
            </View>

            <FlatList
                data={tabState === 0 ? answers : questions}
                renderItem={({item}) => <Ozlife ozlife={item} userID={user.id} userReviews={userReviews} state={true} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={NoData}
                contentContainerStyle={{marginTop: 20}}
            />
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    head: {
        justifyContent: 'center',
        padding: 20,
    },
    touch: {
        flex: 1,
        marginVertical: 8,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    tab: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    tabText: {
        fontSize: 18,
        letterSpacing: -0.5,
        fontWeight: '500',
        color: "#000",
    },
    tabTextPress: {
        fontSize: 18,
        letterSpacing: -0.5,
        fontWeight: '500',
        color: "#2cc3f2",
        textDecorationLine: 'underline',
    },
    nothingContainer: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    nothingIcon: {
        width: 70,
        height: 70,
        marginBottom: 8,
    },
    nothingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    requestButton: {
        borderWidth: 1, 
        borderColor: '#15b6f1',
        width: 230,
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginTop: 10, 
        borderRadius: 10, 
        paddingHorizontal: 20,
    },
    requestText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#15b6f1'
    },
})

export default OzlifeScreen;
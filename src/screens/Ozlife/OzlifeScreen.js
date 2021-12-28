import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, FlatList, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';

import { getUser, listOzlives, listReviews } from '../../graphql/queries';

import Ozlife from '../../components/Ozlife';

const OzlifeScreen = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);  
    const [tabState, setTabState] = useState(0);
    const [user, setUser] = useState({});
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        try {      
            setLoading(true);
            setQuestions([]);

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
            const userData = await API.graphql(graphqlOperation(getUser, { id: userKey.attributes.sub }));
            const questions = await API.graphql(graphqlOperation(listOzlives, { filter: { owner: { eq: userKey.attributes.sub }}}));
            const reviews = await API.graphql(graphqlOperation(listReviews, { filter: { reviewer: { eq: userKey.attributes.sub }}}));

            setUser(userData.data.getUser);

            await Promise.all(questions.data.listOzlives.items.map(async (item, idx) => {
                const result = await Storage.get(item.images[0]);
                const newOzlife = {...item, images: result};
                setQuestions(ozlifes => [...ozlifes, newOzlife]);
            }))

            await Promise.all(reviews.data.listReviews.items.map(async (item, idx) => {
                const ozlife = item.ozlife;
                const result = await Storage.get(ozlife.images[0]);
                const newOzlife = {...ozlife, images: result, reviews: item.reviews};
                setAnswers(ozlifes => [...ozlifes, newOzlife]);
            }))

            setLoading(false);

        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const NoData = () => {
        return (
            <View style={{width: '100%', alignItems: 'center', marginTop: 48}}>
                <Image source={require('../../assets/icon_logo.png')} style={styles.nothingIcon} />
                <Text style={styles.nothingText}>아직 오지랖을 답변한 적이 없어요...</Text>
                <TouchableOpacity style={styles.requestButton}>
                    { tabState === 0 ?
                    <Text style={styles.requestText}>오지랖 답변하러 가기</Text>
                    :
                    <Text style={styles.requestText}>오지랖 요청하러 가기</Text>
                    }
                    <Image source={require("../../assets/next.png")} style={{width: 10, height: 15}} />
                </TouchableOpacity>
            </View>
        );
    };

    const Main = () => {
        return (            
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, color: '#15b6f1', fontWeight: 'bold'}}>내 오지랖</Text>
                </View>
                <View style={styles.tab}>
                    <Pressable onPress={() => setTabState(0)} style={styles.touch}>
                        <Text style={tabState === 0 ? styles.tabTextPress : styles.tabText}>내 답변</Text>
                    </Pressable>
                    <Pressable onPress={() => setTabState(1)} style={styles.touch}>
                        <Text style={tabState === 1 ? styles.tabTextPress : styles.tabText}>내 질문</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            { tabState === 0 &&
            <FlatList
                ListHeaderComponent={Main}
                data={answers}
                renderItem={({item}) => <Ozlife ozlife={item} userId={user.id} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={NoData}
            />
            }
            { tabState === 1 &&
            <FlatList
                ListHeaderComponent={Main}
                data={questions}
                renderItem={({item}) => <Ozlife ozlife={item} userId={user.id} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={NoData}
            />
            }
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
        borderColor: '#ddd'
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
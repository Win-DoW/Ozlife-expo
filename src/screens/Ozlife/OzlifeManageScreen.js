import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, FlatList, Pressable, SafeAreaView, ScrollView } from 'react-native'
import { screen } from 'utils/Styles';

import { Ionicons } from '@expo/vector-icons';
import { Storage } from 'aws-amplify';

import Ozlifer from 'components/Ozlifer';
import AppHeader from 'utils/Header';
import { ReturnChatRoomID } from 'utils/Chat';

const OzlifeManageScreen = ({ route, navigation }) => {

    const userID = route.params.userID;
    const ozlife = route.params.ozlife;
    const questions = ozlife.question;
    const reviews = ozlife.reviewItem.items;

    const [users, setUsers] = useState([]);
    const [ozlifers, setOzlifers] = useState([]);
    const [ozlifer, setOzlifer] = useState({});
    const [index, setIndex] = useState(0);

    const [tabState, setTabState] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        setOzlifer(ozlifers[index])
    }, [index]);

    const fetchData = async () => {
        try {
            setUsers([]);
            setOzlifers([]);

            let users = [];
            let ozlifers = [];
            await Promise.all(reviews.map(async (item, idx) => {
                console.log()
                const result = await Storage.get(item.user.image);
                const newUser = { ...item.user, image: result };
                users = [...users, newUser];

                if (item.status === 1) {
                    const newOzlifer = { ...newUser, reviews: item.reviews }
                    ozlifers = [...ozlifers, newOzlifer];
                }
            }))
            setUsers(users);
            setOzlifers(ozlifers);
            setOzlifer(ozlifers[0]);

        } catch (e) {
            console.log(e);
        }
    }

    const goToChatRoom = () => {
        const result = ReturnChatRoomID(userID, ozlifer.id).then(response => {
            navigation.navigate('ChatRoomScreen', {
                chatRoomId: response
            })
        })
    }

    const Applicants = () => {
        return (
            <FlatList
                ListHeaderComponent={
                    <View style={styles.textBox}>
                        <Text style={styles.countText}>{reviews.length}명</Text>
                        <Text style={styles.explainText}>의 오지라퍼가 신청했어요!</Text>
                    </View>
                }
                data={users}
                renderItem={({item}) => <Ozlifer user={item} />}
                keyExtractor={(item) => item.id}
            />
        );
    }

    const OzliferHeader = () => {
        return (
            <View style={styles.ozliferHeader}>
                <Pressable onPress={() => index === 0 ? null : setIndex(index-1)}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Pressable>
                <View style={styles.ozliferContainer}>
                    <Image style={styles.image} source={{ uri: ozlifer.image }} />
                    <View style={{ height: screen.width * 0.25, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#aaaaaa', marginTop: 8 }}>전문 오지라퍼</Text>
                        <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 8 }}>{ozlifer.nickname}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: 24, height: 24, marginRight: 4 }}
                                source={require('../../assets/images/icon-heart.png')}
                            />
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#ff4444' }}>1000</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={() => index === reviews.length-1 ? null : setIndex(index+1)}>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </Pressable>
            </View>
        )
    }

    const Reviews = () => {
        return (
            <ScrollView style={{flex: 1}}>
                
                <View style={styles.textBox}>
                    <Text style={styles.countText}>{reviews.length}개</Text>
                    <Text style={styles.explainText}>의 따뜻한 오지랖이 도착했어요!</Text>
                </View>

                <OzliferHeader />

                <View style={{marginTop: 40}}>
                    {questions.map((question, i) => {
                        return (
                            <View style={styles.section} key={i}>
                                <View>
                                    <View style={styles.rowContainer}>
                                        <Text style={{...styles.title, color: '#15b6f1'}}>Q{i+1}. </Text>
                                        <Text style={styles.title}>{question}</Text>
                                    </View>
                                    <Text style={styles.answer}>{ozlifer.reviews[i]}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <AppHeader
                title={"오지랖 관리"}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                leftIconPress={() => navigation.goBack()}
            />

            <View style={styles.tab}>
                <Pressable style={styles.tabBox} onPress={() => setTabState(0)}>
                    <View style={tabState === 0 ? styles.tabUnderLine : null}>
                        <Text style={[styles.tabText, {color: tabState === 0 ? '#15b6f1' : 'black'}]}>신청한 사람들</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.tabBox} onPress={() => setTabState(1)}>
                    <View style={tabState === 1 ? styles.tabUnderLine : null}>
                        <Text style={[styles.tabText, {color: tabState === 1 ? '#15b6f1' : 'black'}]}>오지랖 후기</Text>
                    </View>
                </Pressable>
            </View>

            {
                tabState === 0 ?
                <Applicants/>
                :
                <>
                    <Reviews />
                    <Pressable style={styles.button} onPress={goToChatRoom}>
                        <Text style={styles.buttonFirstText}>채팅으로 추가 질문하기</Text>
                        <Text style={styles.buttonSecondText}>답변이 필수가 아닙니다.</Text>
                    </Pressable>
                </>
            }
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingHorizontal: 60,
        height: 48,
    },
    tabBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 1,
    },
    tabUnderLine: {
        borderBottomColor: '#15b6f1',
        borderBottomWidth: 1
    },
    textBox: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        margin: 20,
    },

    countText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#15b6f1',
    },
    explainText: {
        fontSize: 18,
        fontWeight: '500',
    },

    ozliferHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    ozliferContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
    },
    image: {
        width: screen.width*0.25,
        aspectRatio: 1,
        marginRight: 16,
        borderRadius: 100
    },

    section: {
        margin: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    answer: {
        fontSize: 14,
        marginTop: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    buttonFirstText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    buttonSecondText: {
        fontSize: 12,
        fontWeight: '300',
        textDecorationLine: 'underline',
        color: '#fff'
    }
})

export default OzlifeManageScreen;
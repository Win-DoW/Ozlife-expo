import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, FlatList, Image } from 'react-native';

import PickOzlifer from '../../components/PickOzlifer';
import QuestionListItem from '../../components/QuestionListItem';

import MyPickUserData from '../../data/MyPickUserData';
import QuestionListData from '../../data/QuestionListData';

const OzlifeManageScreen = () => {

    const [tabState, setTabState] = useState(0);
    const countOzlifer = MyPickUserData.length

    const peopleTab = () => {
        setTabState(0)
    }

    const ozlifeTab = () => {
        setTabState(1)
    }

    const Applicants = () => {
        return (
          <View style={{width: '100%', height: '100%'}}>
            <View style={styles.textBox}>
              <Text style={styles.countText}>{countOzlifer}명</Text>
              <Text style={styles.explainText}>의 오지라퍼가 신청했어요!</Text>
            </View>

            <FlatList
              data={MyPickUserData}
              renderItem={item => <PickOzlifer info={item} state={true} />}
              style={{marginBottom: 17}}
              keyExtractor={item => item.id}
            />
          </View>
        );
    }

    const ReviewHeader = () => {
        return (
            <View style={styles.ozlifeHeader}>
                <Pressable onPress={() => console.log("H")}>
                    <Image
                        source={require('../../assets/images/icon-back-black-left.png')}
                        style={styles.directionImage}
                    />
                </Pressable>
                <View style={{height: '100%', flex: 1, flexDirection: 'row', paddingLeft: 36}}>
                    <Image
                        source={require('../../../assets/dog1.jpg')}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileTextBox}>
                        <Text style={{fontSize: 12, color: '#aaa'}}>전문 오지라퍼</Text>
                        <Text style={{fontSize: 20, fontWeight: '500', marginVertical: 4}}>최우창</Text>
                        <View style={styles.heartBox}>
                            <Image
                                source={require('../../assets/images/icon-heart.png')}
                                style={styles.heartImage}
                            />
                            <Text style={{fontSize: 12, fontWeight: '500', color: '#f44'}}>1231</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={() => console.log("H")}>
                    <Image
                        source={require('../../assets/images/icon-back-black-right.png')}
                        style={styles.directionImage}
                    />
                </Pressable>
            </View>
        )
    }

    const ReviewOzlife = () => {
        return (
            <View style={{width: '100%', flex: 1}}>
                <View style={styles.ozlifeTextBox}>
                    <Text style={styles.countText}>2개</Text>
                    <Text style={styles.explainText}>의 따뜻한 오지랖이 도착했어요!</Text>
                </View>

                <FlatList
                    ListHeaderComponent={ReviewHeader}
                    data={QuestionListData}
                    renderItem={(item) => <QuestionListItem data={item}/>}
                    keyExtractor={(item) => item.id}
                />

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.tabBox} onPress={peopleTab}>
                    <View style={tabState === 0 ? styles.tabUnderLine : null}>
                        <Text style={[styles.tabText, {color: tabState === 0 ? '#15b6f1' : 'black'}]}>신청한 사람들</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.tabBox} onPress={ozlifeTab}>
                    <View style={tabState === 1 ? styles.tabUnderLine : null}>
                        <Text style={[styles.tabText, {color: tabState === 1 ? '#15b6f1' : 'black'}]}>오지랖 후기</Text>
                    </View>
                </Pressable>
            </View>

            {
                tabState === 0 ?
                <Applicants/>
                :
                <ReviewOzlife/>
            }

            {
                tabState === 1 ?
                <Pressable style={styles.chattingButton}>
                    <Text style={styles.buttonFirstText}>채팅으로 추가 질문하기</Text>
                    <Text style={styles.buttonSecondText}>답변이 필수가 아닙니다.</Text>
                </Pressable>
                :
                null
            }
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tabBox: {
        width: "44%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    tabUnderLine: {
        borderBottomColor: '#15b6f1',
        borderBottomWidth: 1
    },
    textBox: {
        width: '100%',
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#15b6f1',
        marginLeft: 20
    },
    explainText: {
        fontSize: 18
    },
    ozlifeTextBox: {
        width: '100%',
        marginTop: 27,
        marginBottom: 42,
        alignItems: 'center',
        flexDirection: 'row',
    },
    ozlifeHeader: {
        width: '100%',
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
    },
    directionImage: {
        width: 32,
        height: 40,
    },
    profileImage: {
        height: '100%',
        width: 88,
        borderRadius: 44,
        marginRight: 16
    },
    profileTextBox: {
        height: '100%',
        justifyContent: 'center'
    },
    heartImage: {
        width: 24,
        height: 24,
        marginRight: 4
    },
    heartBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    chattingButton: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15b6f1'
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
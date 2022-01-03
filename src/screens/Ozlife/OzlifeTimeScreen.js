import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createReview } from 'graphql/mutations';
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';

const OzlifeTimeScreen = ({ navigation, route }) => {

    const ozlife = route.params.ozlife;
    const toDay = {
        0 : '월',
        1 : '화',
        2 : '화',
        3 : '수',
        4 : '목',
        5 : '금',
        6 : '토',
    };

    const visit_date = dayjs(ozlife.visit_date);

    const year = visit_date.year();
    const month = visit_date.month()+1;
    const date = visit_date.date();
    const day = toDay[visit_date.day()];

    const hour = visit_date.hour();
    const minute = visit_date.minute();
    const time = hour > 12 ? `오후 ${hour-12}시 ${minute}분` : `오전 ${hour}시 ${minute}분`;

    const next = async () => {
        try {
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
            const userID = userKey.attributes.sub;
      
            await API.graphql(graphqlOperation(createReview, { input: {
                userID,
                ozlifeID: ozlife.id,
                status: 0,
            }}));

            navigation.navigate("MainNavi")
           
          } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <AppHeader
                title={"방문 온라인 피드백"}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                leftIconPress={() => navigation.goBack()}
            />

            <ScrollView>

                <View style={styles.section}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{...styles.date, color: '#15b6f1'}}>{year}</Text>
                            <Text style={styles.date}>년</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                            <Text style={{...styles.date, color: '#15b6f1'}}>{month}</Text>
                            <Text style={styles.date}>월</Text>
                            <Text style={{...styles.date, color: '#15b6f1', marginLeft: 10}}>{date}</Text>
                            <Text style={styles.date}>일</Text>
                            <Text style={{...styles.date, color: '#15b6f1', marginLeft: 10}}>{day}</Text>
                            <Text style={styles.date}>요일</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 24}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                            <Text style={styles.text}>{time}</Text>
                            <Text style={styles.text}>까지 방문하셔야 합니다.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>약속된 일자에 방문하지 않은 경우</Text>
                    <Text style={styles.text}>앱 사용이 제한될 수 있습니다.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>주문 시, 오지랖 신청 사실 및 본인 확인을 진행해주세요.</Text>
                    <Text style={styles.text}>지정된 메뉴는 필수적으로 주문해주세요.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{...styles.text, color: '#aaa'}}>취소는 모집 마감일로부터 일주일 전까지는 가능하며, 방문하지 않을 경우 서비스 사용이 제한될 수 있습니다.</Text>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.button} onPress={next}>
                        <Text style={styles.buttonText}>방문 날짜와 시간 확인했어요!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    section: {
      padding: 20,
    },
    date: {
        fontSize: 35,
        fontWeight: 'bold',
      },
    text: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 30,
    },
    button: {
      marginTop: 16,
      width: '100%',
      height: 60,
      backgroundColor: '#15b6f1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#fff',
    },
});

export default OzlifeTimeScreen;
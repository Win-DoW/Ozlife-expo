import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';

import { listUsers } from '../../graphql/queries';
import { createReview } from '../../graphql/mutations';

const OzlifeTimeScreen = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false); 
    const [user, setUser] = useState({});
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
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        fetchUser();
        const visit_date = new Date(ozlife.visit_date);

        setYear(visit_date.getFullYear());
        setMonth(visit_date.getMonth()+1);
        setDate(visit_date.getDate());
        setDay(toDay[visit_date.getDay()])

        const hours = visit_date.getHours();
        const minutes = visit_date.getMinutes();
        const time = hours > 12 ? `오후 ${hours-12}:${minutes} ` : `오전 ${hours}:${minutes} `;
        setTime(time);

        console.log(visit_date);
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
            const user = await API.graphql(graphqlOperation(listUsers, { filter: { id: { eq: userKey.attributes.sub }}}));

            setUser(user.data.listUsers.items[0]);
            setLoading(false);

        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const next = async () => {
        try {
            setLoading(true);
      
            await API.graphql(graphqlOperation(createReview, { input: {
                reviewer: userId,
                ozlifeId: ozlife.id
            }}));
      
            setLoading(false);

            navigation.navigate("OzlifeProfile", {
                ozlifeId: ozlife.id
            })
           
          } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
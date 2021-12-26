import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect } from 'react';


const OzlifeCard = ( props ) => {
    const { CardData } = props;

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('OzlifeDetail', {
            name: "test1",
        });
    }

    const onClick2 = () => {
        navigation.navigate('OzlifeWriteComment');
    }

    return (
        <View style={{marginTop: 9, marginBottom: 9, }}>
            <TouchableWithoutFeedback onPress={onClick}>
                <View style={styles.card}>
                    <View style={styles.image}>
                        <ImageBackground source={require('../../assets/noimage.png')}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain',  }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: moment(CardData.date).diff(moment(), 'days') >= 0 ? "#dd000070" : "#00000050" , alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{textAlign: 'center', color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                                D{ moment(CardData.date).diff(moment(), 'days') >= 0 ? '-' : '+' }
                                {moment(CardData.date).diff(moment(), 'days')  >= 0 ? moment(CardData.date).diff(moment(), 'days') : moment(CardData.date).diff(moment(), 'days').toString().slice(1, )  }
                                </Text>
                                <Text style={{textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                                    {moment(CardData.date).format('MM/DD')}(화)
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.descriptions}>
                        <Text style={{width: '100%', fontSize: 12, color: '#aaaaaa',}}>#맛평가 #경영진단</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardtitle}>{CardData.title}</Text>
                        
                        {moment(CardData.date).diff(moment(), 'days')  >= 0 ? 
                        <View>
                            <Text style={{width: '100%', fontWeight: 'bold', fontSize: 14, color: '#15b6f1', marginBottom: 8, }}>새우아보카도샐러드</Text>
                            <View style={{width: '100%', flexDirection:'row', alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight: 'bold', fontSize: 14, color: '#000', marginRight: 8, }}>2000원</Text>
                                <Text style={{fontSize: 12, color: '#cccccc', textDecorationLine: 'line-through'}}>8000원</Text>
                            </View>
                        </View>
                        : 
                        <View style={{width: 130, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 5}}>
                            <TouchableWithoutFeedback onPress={onClick2}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>오지랖 남기기</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        }  
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    DateText: {
        paddingStart: 28, 
        paddingTop: 8,
        paddingBottom: 8, 
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
    DateText2: {
        paddingStart: 14, 
        paddingTop: 8,
        paddingBottom: 8, 
        color: 'red',
        fontSize: 12,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFF",
        paddingStart: 20,
    },
    image: {
        width: 120,
        height: 120,
        backgroundColor: '#000',
        borderRadius: 4,
        borderColor: '#aaa',
        borderWidth: 1,
        flexDirection: 'column',
    },
    descriptions: {
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingStart: 20,
        paddingRight: 28,
    },
    cardtitle: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    cardtag: {
        color: '#999',
        fontSize: 12,
    },
    cardnum: {
        color: '#000',
        fontSize: 14,
    }
})

export default OzlifeCard;
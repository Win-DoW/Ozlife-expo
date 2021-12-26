import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect } from 'react';


const OzlifeCommentCard = () => {

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('OzlifeWriteComment');
    }

    return (
        <View style={{marginBottom: 36,}}>
            <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/dog1.jpg')} style={styles.avatar}></Image>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 4}}>강쥐</Text>
                    <Text style={{fontSize: 12, color: 'grey', }}>12시간 전</Text>
                </View>
            </View>
            <View style={{marginTop: 16, }}>
                <Text>
                    저는 이거 딱 봤을 때 비주얼이 되게 좋아서 한껏 기대했는데,
                    막상 먹으려고 보니 섞기가 힘들어서 제가 생각했을 때, 잘 섞을 수 있는 도구를 따로 주시면 좋을 것 같아요!
                </Text>
            </View>
            <TouchableOpacity onPress={onClick}>
                <View style={{width: '100%', alignItems: 'center', backgroundColor: '#15B6F1', marginTop: 16, }}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 14, marginBottom: 14, }}>댓글 남기기</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginEnd: 20,
    },
})

export default OzlifeCommentCard;